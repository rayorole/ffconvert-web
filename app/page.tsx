
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
                <Tabs defaultValue="mp4" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="mp4">MP4</TabsTrigger>
                    <TabsTrigger value="png">PNG</TabsTrigger>
                    <TabsTrigger value="jpg">JPG</TabsTrigger>
                    <TabsTrigger value="mkv">MKV</TabsTrigger>
                    <TabsTrigger value="url">URL</TabsTrigger>
                  </TabsList>
                  {["mp4", "png", "jpg", "mkv"].map((format) => (
                    <TabsContent key={format} value={format}>
                      <div className="flex flex-col items-center space-y-2">
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor={`dropzone-file-${format}`}
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              {format === "mp4" && (
                                <FileVideoIcon className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                              )}
                              {format === "png" && (
                                <ImageIcon className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                              )}
                              {format === "jpg" && (
                                <FileImageIcon className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                              )}
                              {format === "mkv" && (
                                <FilmIcon className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                              )}
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Upload your {format.toUpperCase()} file here
                              </p>
                            </div>
                            <input
                              id={`dropzone-file-${format}`}
                              type="file"
                              className="hidden"
                              accept={`.${format}`}
                            />
                          </label>
                        </div>
                        <div className="w-full flex space-x-2">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select output format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mp4">MP4</SelectItem>
                              <SelectItem value="png">PNG</SelectItem>
                              <SelectItem value="jpg">JPG</SelectItem>
                              <SelectItem value="mkv">MKV</SelectItem>
                              <SelectItem value="gif">GIF</SelectItem>
                              <SelectItem value="webm">WEBM</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button className="flex-1">Convert File</Button>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                  <TabsContent value="url">
                    <form className="flex flex-col space-y-2">
                      <Input
                        className="flex-1"
                        placeholder="Enter file URL"
                        type="url"
                      />
                      <div className="w-full flex space-x-2">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select output format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mp4">MP4</SelectItem>
                            <SelectItem value="png">PNG</SelectItem>
                            <SelectItem value="jpg">JPG</SelectItem>
                            <SelectItem value="mkv">MKV</SelectItem>
                            <SelectItem value="gif">GIF</SelectItem>
                            <SelectItem value="webm">WEBM</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button type="submit" className="flex-1">
                          Convert URL
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
