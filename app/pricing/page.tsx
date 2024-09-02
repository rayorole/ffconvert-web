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
import { CheckIcon, XIcon } from "lucide-react";

export default function page() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Choose Your Plan
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Select the perfect plan for your file conversion needs. Upgrade
                anytime to unlock premium features.
              </p>
            </div>
          </div>
          <div className="grid gap-6 mt-12 md:grid-cols-2 md:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription>
                  For casual users and small tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="text-4xl font-bold">$0</div>
                <ul className="grid gap-2">
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                    <span>10MB max file size</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                    <span>Standard conversion speed</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                    <span>Basic file formats supported</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                    <span>Ad-supported</span>
                  </li>
                  <li className="flex items-center">
                    <XIcon className="mr-2 h-4 w-4 text-red-500" />
                    <span className="text-gray-500">No batch processing</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get Started</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Premium</CardTitle>
                <CardDescription>
                  For power users and businesses
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="text-4xl font-bold">
                  $9.99<span className="text-xl font-normal">/month</span>
                </div>
                <ul className="grid gap-2">
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                    <span>3GB max file size</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                    <span>Priority conversion (up to 5x faster)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                    <span>All file formats supported</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                    <span>Ad-free experience</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                    <span>Batch processing (up to 10 files)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                    <span>Priority customer support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Upgrade to Premium</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
