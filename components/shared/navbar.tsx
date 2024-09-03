import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileInputIcon } from "lucide-react";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export default async function Navbar() {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value;
  let loggedIn = false;
  if (sessionId) {
    const { user, session } = await lucia.validateSession(sessionId);
    if (user) {
      loggedIn = true;
    }
  }

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="/">
        <span className="sr-only">ffconvert</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>

        <h1 className="ml-2 text-lg font-bold tracking-tight">ffconvert</h1>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/"
        >
          Convert
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/pricing"
        >
          Pricing
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/developers"
        >
          Developers
        </Link>
        <div className="flex items-center space-x-2 border-l pl-2">
          {loggedIn ? (
            <Button asChild size="sm" className="rounded-full lg:px-4">
              <Link className="text-sm font-medium" href="/dashboard">
                Dashboard
              </Link>
            </Button>
          ) : (
            <>
              <Button
                asChild
                size="sm"
                variant="ghost"
                className="rounded-full lg:px-4"
              >
                <Link className="text-sm font-medium" href="/signin">
                  Sign In
                </Link>
              </Button>
              <Button asChild size="sm" className="rounded-full lg:px-4">
                <Link className="text-sm font-medium" href="/signup">
                  Sign Up
                </Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
