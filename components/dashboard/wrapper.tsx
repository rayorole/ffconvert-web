"use client";

import React, { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Nav } from "@/components/dashboard/nav";
import {
  Bolt,
  ChartArea,
  ChartAreaIcon,
  Database,
  FileIcon,
  Globe,
  HardDrive,
  History,
  Home,
  HomeIcon,
  Key,
  Settings,
} from "lucide-react";
import { Separator } from "../ui/seperator";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import H3 from "../typography/h3";

interface WrapperProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed: boolean;
  navCollapsedSize: number;
  children: React.ReactNode;
}

export default function Wrapper({
  defaultLayout = [20, 32, 48],
  defaultCollapsed = false,
  navCollapsedSize,
  children,
}: WrapperProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-screen w-screen items-stretch"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
            sizes
          )}`;
        }}
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={12}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`;
          }}
          onResize={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`;
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div className="h-14 border-b flex items-center justify-start p-3">
            <H3 className="font-bold text-2xl">
              <FileIcon />
            </H3>
          </div>

          <Nav
            links={[
              {
                icon: ChartArea,
                title: "Statistics",
                variant: "ghost",
                href: `/dashboard`,
              },
              {
                icon: History,
                title: "Conversion history",
                variant: "ghost",
                href: `/dashboard/history`,
              },
              {
                icon: Key,
                title: "API keys",
                variant: "ghost",
                href: `/dashboard/api`,
              },
              {
                icon: Settings,
                title: "Settings",
                variant: "ghost",
                href: `/dashboard/settings`,
              },
            ]}
            isCollapsed={isCollapsed}
          />
          <Separator />
          <Nav
            links={[
              {
                icon: Home,
                title: "Back to homepage",
                variant: "ghost",
                href: `/`,
              },
            ]}
            isCollapsed={isCollapsed}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={85}>
          <div className="">{children}</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
