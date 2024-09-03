import Wrapper from "@/components/dashboard/wrapper";
import { cookies } from "next/headers";
import React from "react";
import UserMenu from "@/components/shared/dash-navbar-menu";
import { Button } from "@/components/ui/button";
import { BellDotIcon, LinkIcon } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { getSessionId } from "../actions/auth";
import { lucia } from "@/lib/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const layout = cookies().get("react-resizable-panels:layout:mail");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  const sessionId = await getSessionId();

  const { user, session } = await lucia.validateSession(sessionId!);

  if (!user?.emailVerified) {
    redirect("/signup/verification");
  }

  return (
    <Wrapper
      defaultCollapsed={defaultCollapsed}
      defaultLayout={defaultLayout}
      navCollapsedSize={2}
    >
      <div className="h-14 w-full border-b flex items-center justify-between px-4">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className="gap-2 flex items-center">
          <Button variant="outline" size="icon" className="h-9 w-9">
            <BellDotIcon size={16} />
          </Button>
          <UserMenu user={user} />
        </div>
      </div>
      <main className="p-3 md:p-5 lg:p-8">{children}</main>
    </Wrapper>
  );
}
