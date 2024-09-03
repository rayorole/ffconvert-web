import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileIcon,
  ArrowRightIcon,
  RefreshCwIcon,
  ZapIcon,
  UploadIcon,
  LinkIcon,
  FileVideoIcon,
  ImageIcon,
  FileImageIcon,
  FilmIcon,
} from "lucide-react";
import FileUploaderZone from "@/components/upload/dropzone";

export default function Home() {
  return (
    <div>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Convert Your Files with Ease
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Transform your files to any format quickly and securely. No
                  software installation required.
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <Tabs defaultValue="file" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="file">Upload from PC</TabsTrigger>
                    <TabsTrigger value="url">URL</TabsTrigger>
                  </TabsList>

                  <TabsContent value="file">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="flex items-center justify-center w-full border border-dashed rounded hover:border-solid hover:bg-muted/40">
                        <FileUploaderZone />
                      </div>
                      <div className="w-full flex">
                        <Button className="flex-1">Convert File</Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="url">
                    <form className="flex flex-col space-y-2">
                      <Input
                        className="flex-1 p-3"
                        placeholder="Enter file URL"
                        type="url"
                      />
                      <div className="w-full flex">
                        <Button type="submit" className="flex-1">
                          Convert from URL
                        </Button>
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Supported formats: MP4, PNG, JPG, MKV, GIF, WEBM, and more
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 text-center">
                <ArrowRightIcon className="h-10 w-10 text-primary" />
                <h2 className="text-xl font-bold">Easy to Use</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Simply upload your file or provide a URL, and we'll handle the
                  rest.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <RefreshCwIcon className="h-10 w-10 text-primary" />
                <h2 className="text-xl font-bold">Multiple Formats</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Convert between a wide range of file formats with just a few
                  clicks.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <ZapIcon className="h-10 w-10 text-primary" />
                <h2 className="text-xl font-bold">Fast & Secure</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Lightning-fast conversions with bank-level security to protect
                  your files.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
