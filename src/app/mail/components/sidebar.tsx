"use client";

import React from "react";
import { useLocalStorage } from "usehooks-ts";
import { Nav } from "./navbar";
import { File, Inbox, Send } from "lucide-react";
import { api } from "@/trpc/react";

type Props = {
  isCollapsed: boolean;
};

const Sidebar = ({ isCollapsed }: Props) => {
  const [accountId, setAccountId] = useLocalStorage("accountId", "");
  const [tab] = useLocalStorage<"inbox" | "sent" | "drafts">(
    "mailverra-tab",
    "inbox",
  );

  const {data: inboxThreads} = api.account.getNumThreads.useQuery({
    accountId,
    tab: "inbox",
  })

  const {data: draftThreads} = api.account.getNumThreads.useQuery({
    accountId,
    tab: "draft",
  })

  const {data: sentThreads} = api.account.getNumThreads.useQuery({
    accountId,
    tab: "sent",
  })

  return (
    <>
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Inbox",
            label: inboxThreads?.toString() ?? "0",
            icon: Inbox,
            variant: tab === "inbox" ? "default" : "ghost",
          },
          {
            title: "Drafts",
            label: draftThreads?.toString() ?? "0",
            icon: File,
            variant: tab === "drafts" ? "default" : "ghost",
          },
          {
            title: "Sent",
            label: sentThreads?.toString() ?? "0",
            icon: Send,
            variant: tab === "sent" ? "default" : "ghost",
          },
        ]}
      />
    </>
  );
};

export default Sidebar;
