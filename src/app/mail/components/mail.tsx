"use client"
import React from 'react'
import { ResizableHandle, ResizablePanelGroup, ResizablePanel } from '@/components/ui/resizable'
import { TooltipProvider } from '@/components/ui/tooltip'

type Props = {
  defaultLayout: number[] | undefined,
  navCollapsedSize: number,
}

const MailPage = ({defaultLayout = [20, 32, 48], navCollapsedSize}: Props) => {
  return (
    <TooltipProvider delayDuration={0}>
       <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
            sizes
          )}`
        }}
        className="items-stretch h-full min-h-screen"
      >
        <ResizablePanel defaultSize={(defaultLayout[0])} ></ResizablePanel>
        </ResizablePanelGroup>
    </TooltipProvider>
  )
}

export default MailPage