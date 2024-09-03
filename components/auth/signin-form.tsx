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
import { createAuthorizationUrl, login } from "../../app/actions/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CircularProgress } from "@nextui-org/progress";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function SigninForm() {
  const router = useRouter();
  async function signupGoogle() {
    const res = await createAuthorizationUrl();
    if (res.error) {
      console.error(res.error);
      return;
    }

    console.log(res.data);
    window.location.href = res.data!.toString();
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const status = await login(values.email, values.password);
    if (status.error) {
      form.setError("email", {
        type: "manual",
        message: status.error,
      });
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Welcome back!</CardTitle>
              <CardDescription>Log in to start converting.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                type="button"
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
                <div className="text-sm text-gray-500">
                  Or continue with email
                </div>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MailIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@doe.com"
                          className="pl-8"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <LockIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="********"
                          className="pl-8"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <Button
                  className="w-full"
                  type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <CircularProgress
                      color="secondary"
                      aria-label="Loading..."
                      size="sm"
                      className="scale-75"
                    />
                  ) : (
                    "Sign In"
                  )}
                </Button>
                <div className="text-center text-sm text-gray-500 mt-2">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </div>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </main>
  );
}
