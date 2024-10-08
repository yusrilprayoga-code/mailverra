import { threadIdAtom } from "@/app/mail/components/thread-list";
import { api } from "@/trpc/react";
import { useAtom } from "jotai";
import React from "react";
import { useLocalStorage } from "usehooks-ts";

const useThreads = () => {
  const { data: account } = api.account.getAccounts.useQuery();
  const [accountId, setAccountId] = useLocalStorage("accountId", "");
  const [tab] = useLocalStorage("mailverra-tab", "inbox");
  const [done] = useLocalStorage("mailverra-done", false);
  const [threadId, setThreadId] = useAtom(threadIdAtom);

    const {data: threads, isFetching, refetch} = api.account.getThreads.useQuery({
        accountId,
        tab,
        done
    }, {
        enabled: !!accountId && !!tab, placeholderData: e => e, refetchInterval: 5000
    })

    return {
        threads,
        isFetching,
        refetch,
        accountId,
        threadId, 
        setThreadId,
        account: account?.find(e => e.id === accountId)
    }
};

export default useThreads;
