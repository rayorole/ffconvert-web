"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileIcon, LockIcon, MailIcon, UserIcon } from "lucide-react";

export default function SigninPage() {
  return (
    <main className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome back!</CardTitle>
          <CardDescription>Log in to start converting.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <MailIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input id="email" type="email" className="pl-8" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <LockIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input id="password" type="password" className="pl-8" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <Button className="w-full">Sign in</Button>
            <div className="text-center text-sm text-gray-500 mt-2">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
