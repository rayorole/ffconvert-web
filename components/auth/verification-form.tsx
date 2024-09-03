"use client";

import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { emailVerification } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@nextui-org/progress";
import { useState } from "react";
import { CheckIcon } from "lucide-react";

const formSchema = z.object({
  otp: z.string().length(6),
});

export const VerificationForm = () => {
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await emailVerification(values.otp);
    if (!res.success) {
      form.setError("otp", {
        type: "manual",
        message: res.error,
      });

      return;
    }

    setSuccess(true);
    router.push("/dashboard");
  }

  return (
    <main className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Email verification</CardTitle>
              <CardDescription>
                We have sent a one-time password to your email. Please enter it
                below.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {success ? (
                  <CheckIcon className="w-5 h-5" />
                ) : form.formState.isSubmitting ? (
                  <CircularProgress
                    color="secondary"
                    aria-label="Loading..."
                    size="sm"
                    className="scale-75"
                  />
                ) : (
                  "Verify"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </main>
  );
};
