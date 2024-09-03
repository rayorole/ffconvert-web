import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CloudIcon,
  KeyIcon,
  SettingsIcon,
  CodeIcon,
  FileIcon,
} from "lucide-react";

export default function DevelopersPage() {
  return (
    <main className="flex-1 py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              ffconvert for Developers
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Integrate powerful file conversion capabilities into your
              applications with our robust API and Node.js library.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-4xl mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                To access our API and Node.js library, you need to upgrade to a
                premium account. Once upgraded, you'll receive your API key to
                start integrating ffconvert into your projects.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="mt-4">Upgrade to Premium</Button>
            </CardContent>
          </Card>
          <div className="grid gap-6 mt-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CloudIcon className="w-6 h-6 mr-2" />
                  Cloud-Based Conversion
                </CardTitle>
              </CardHeader>
              <CardContent>
                Our API leverages cloud infrastructure for fast and reliable
                file conversions, allowing you to process files without
                straining your own servers.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <KeyIcon className="w-6 h-6 mr-2" />
                  Secure API Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                We use API keys to ensure secure access to our services. Your
                data and conversions are protected with industry-standard
                encryption.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <SettingsIcon className="w-6 h-6 mr-2" />
                  Custom Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                Tailor the conversion process to your needs with custom settings
                for each file type, allowing for precise control over the
                output.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CodeIcon className="w-6 h-6 mr-2" />
                  Node.js Library
                </CardTitle>
              </CardHeader>
              <CardContent>
                Our Node.js library simplifies integration, allowing you to
                convert files with just a few lines of code.
              </CardContent>
            </Card>
          </div>
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Code Example</CardTitle>
              <CardDescription>
                Here's a quick example of how to use our Node.js library to
                convert a file:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm font-medium">
                  {`const ffconvert = require('ffconvert');

const converter = new ffconvert('YOUR_API_KEY');

converter.convert({
  inputFile: 'path/to/input.docx',
  outputFormat: 'pdf',
  options: {
    quality: 'high',
    pageSize: 'A4'
  }
})
.then(result => {
  console.log('Conversion successful:', result.outputFile);
})
.catch(error => {
  console.error('Conversion failed:', error);
});`}
                </code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
