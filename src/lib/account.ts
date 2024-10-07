import { EmailMessage, SyncResponse, SyncUpdatedResponse } from "@/types";
import axios from "axios";

export class Account {
    private token: string;

    constructor(token: string) {
        this.token = token;
    }

    private async startSync() {
        const response  = await axios.post<SyncResponse>('https://api.aurinko.io/v1/email/sync', {}, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
            params: {
                daysWithin: 2,
                bodyType: 'html'
            }
        })
        return response.data;
    }

    async getUpdatedEmails({ deltaToken, pageToken }: { deltaToken?: string, pageToken?: string }): Promise<SyncUpdatedResponse> {
        let params: Record<string, string> = {};
        if (deltaToken) {
            params.deltaToken = deltaToken;
        }
        if (pageToken) {
            params.pageToken = pageToken;
        }
        const response = await axios.get<SyncUpdatedResponse>(
            'https://api.aurinko.io/v1/email/sync/updated',
            {
                params,
                headers: { Authorization: `Bearer ${this.token}` }
            }
        );
        return response.data;
    }

    async performInitialSync() {
        try {
            let syncResponse = await this.startSync();

            while(!syncResponse.ready) {
                await new Promise(resolve => setTimeout(resolve, 1000))
                syncResponse = await this.startSync();
            }

            let storedDeltaToken: string = syncResponse.syncUpdatedToken
            let updatedResponse = await this.getUpdatedEmails({ deltaToken: storedDeltaToken });
            if (updatedResponse.nextDeltaToken) {
                storedDeltaToken = updatedResponse.nextDeltaToken
            }
            let allEmails: EmailMessage[] = updatedResponse.records;

            // Fetch all pages if there are more
            while (updatedResponse.nextPageToken) {
                updatedResponse = await this.getUpdatedEmails({ pageToken: updatedResponse.nextPageToken });
                allEmails = allEmails.concat(updatedResponse.records);
                if (updatedResponse.nextDeltaToken) {
                    storedDeltaToken = updatedResponse.nextDeltaToken
                }
            }

             console.log('Initial Sync Completed', allEmails.length, 'emails synced');

            return {
                emails: allEmails,
                deltaToken: storedDeltaToken
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error during sync:', JSON.stringify(error.response?.data, null, 2));
            } else {
                console.error('Error during sync:', error);
            }
        }
    }
}