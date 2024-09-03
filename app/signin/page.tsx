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
import Image from "next/image";
import { createAuthorizationUrl } from "../actions/auth";

export default function SigninPage() {
  async function signupGoogle() {
    const res = await createAuthorizationUrl();
    if (res.error) {
      console.error(res.error);
      return;
    }

    console.log(res.data);
    window.location.href = res.data!.toString();
  }
  return (
    <main className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome back!</CardTitle>
          <CardDescription>Log in to start converting.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full space-x-2"
            onClick={signupGoogle}
          >
            <Image
              src="/google.png"
              alt="Google"
              className="w-5 h-5"
              width={20}
              height={20}
            />
            <span>Sign in with Google</span>
          </Button>
          <div className="flex items-center space-x-2">
            <div className="flex-1 border-t border-gray-200"></div>
            <div className="text-sm text-gray-500">Or continue with email</div>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>
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
