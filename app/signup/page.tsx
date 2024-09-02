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
import { Checkbox } from "@/components/ui/checkbox";
import { FileIcon, LockIcon, MailIcon, UserIcon } from "lucide-react";

export default function SignupPage() {
  return (
    <main className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up for ffconvert</CardTitle>
          <CardDescription>
            Create your account to start converting files with ease.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <UserIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input id="name" placeholder="John Doe" className="pl-8" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <MailIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="email"
                placeholder="john@example.com"
                type="email"
                className="pl-8"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <LockIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input id="password" type="password" className="pl-8" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="text-sm">
              I agree to the{" "}
              <Link href="#" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </Label>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <Button className="w-full">Sign Up</Button>
            <div className="text-center text-sm text-gray-500 mt-2">
              Already have an account?{" "}
              <Link href="/signin" className="text-primary hover:underline">
                Log in
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
