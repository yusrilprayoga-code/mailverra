"use client";
import React from "react";
import {
  ResizableHandle,
  ResizablePanelGroup,
  ResizablePanel,
} from "@/components/ui/resizable";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountSwitcher } from "./account-switcher";
import Sidebar from "./sidebar";
import ThreadList from "./thread-list";
import ThreadDisplay from "./thread-display";
import AiComposeButton from "./ai-compose-button";
import { generate } from "./action";
import { readStreamableValue } from "ai/rsc";

type Props = {
  defaultLayout: number[] | undefined;
  navCollapsedSize: number;
  defaultCollapsed?: boolean;
  defaultToolbarExpanded?: boolean
};

const MailPage = ({
  defaultLayout = [20, 32, 48],
  navCollapsedSize,
  defaultCollapsed = false,
  defaultToolbarExpanded,
}: Props) => {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);
  const [generation, setGeneration] = React.useState('');

//   const aiGenerate = async (prompt: string) => {
//     try {
//         console.log("Generating AI response for prompt:", prompt);
//         const { output } = await generate(prompt);

//         console.log("Started reading from stream");
//         for await (const delta of readStreamableValue(output)) {
//             console.log("Received delta:", delta);
//             if (delta) {
//                 setGeneration(delta);
//             }
//         }
//         console.log("Finished reading stream");
//     } catch (error) {
//         console.error("Error during AI generation:", error);
//     }
// }

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
            sizes,
          )}`;
        }}
        className="h-full min-h-screen items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={40}
          onCollapse={() => {
            setCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true,
            )}`;
          }}
          onResize={() => {
            setCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false,
            )}`;
          }}
          className={cn(
            collapsed && "min-w-[50px] transition-all duration-300 ease-in-out",
          )}
        >
          <div className="flex h-full flex-1 flex-col mt-1">
            <div
              className={cn(
                "item-center flex h-[52px] justify-between",
                collapsed ? "h-[52px]" : "px-2",
              )}
            >

              {/* Account Switcher */}
              <AccountSwitcher isCollapsed={collapsed} />

            </div>
            
            <Separator />

            {/* sidebar */}
            <Sidebar isCollapsed={collapsed}/>

            <div className="flex-1"></div>

            {/* Ai */}
            {/* <AiComposeButton
                isComposing={defaultToolbarExpanded}
                onGenerate={setGeneration}
              /> */}
            {/* Ask Ai */}

          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="inbox">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Inbox</h1>
              <TabsList className="ml-auto">
                <TabsTrigger
                  value="inbox"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Inbox
                </TabsTrigger>
                <TabsTrigger
                  value="Done"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Done
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            {/* search bar */}
            Search Bar
            {/* email list */}
            <TabsContent value="inbox">
              {/* <ThreadList /> */}
              <ThreadList />
            </TabsContent>
            <TabsContent value="Done">
              <ThreadList />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
          <ThreadDisplay />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};

export default MailPage;
