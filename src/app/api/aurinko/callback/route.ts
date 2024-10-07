import { waitUntil } from '@vercel/functions'
import { exchangeCodeForAccessToken, getAccountDetails } from "@/lib/aurinko";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const GET = async (req: NextRequest) => {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

    const params = req.nextUrl.searchParams
    const status = params.get('status');
    if (status !== 'success') return NextResponse.json({ error: "Account connection failed" }, { status: 400 });

    const code = params.get('code');
    const token = await exchangeCodeForAccessToken(code as string)
    if (!token) return NextResponse.json({ error: "Failed to fetch token" }, { status: 400 });
    const accountDetails = await getAccountDetails(token.accessToken)
    
    await db.account.upsert({
        where: {
            id: token.accountId.toString(),
        },
        update: {
            accessToken: token.accessToken,
        },
        create: {
            id: token.accountId.toString(),
            userId,
            emailAddress: accountDetails.email,
            name: accountDetails.name,
            accessToken: token.accessToken,
        }
    })

    //trigger initial sync
    waitUntil(
        axios.post(`${process.env.NEXT_PUBLIC_URL}/api/initial-sync`, 
            { accountId: token.accountId.toString(), userId })
            .then((response) => {
            console.log('Initial sync triggered', response.data)
        }).catch((err) => {
            console.log('Failed to trigger initial sync', err)
        })
    )

    return NextResponse.redirect(new URL('/mail', req.url))
}

