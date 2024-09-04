"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileUploaderZone from "@/components/upload/dropzone";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileImageIcon, Trash2Icon } from "lucide-react";
import { readableFileSize } from "@/lib/file";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

const frameworks = [
  {
    value: "mp4",
    label: "MP4",
  },
  {
    value: "png",
    label: "PNG",
  },
  {
    value: "jpg",
    label: "JPG",
  },
  {
    value: "mkv",
    label: "MKV",
  },
  {
    value: "gif",
    label: "GIF",
  },
  {
    value: "webm",
    label: "WEBM",
  },
];

export default function ConvertComponent() {
  const [uploadedFiles, setUploadedFiles] = useState<File[] | null>(null);
  const [converting, setConverting] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  function handleFileUpload(files: File[]) {
    setUploadedFiles(files);
    setConverting(true);
    console.log(files);
  }

  return (
    <motion.div
      className="flex flex-col items-center space-y-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-2 mb-3">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
          Convert Your Files with Ease
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          Transform your files to any format quickly and securely. No software
          installation required.
        </p>
      </div>
      <div className="w-full max-w-md lg:max-w-xl space-y-2">
        {converting ? (
          <>
            <Table>
              <TableCaption>Ready when you are 💫</TableCaption>
              <TableBody>
                {uploadedFiles?.map((file, i) => (
                  <TableRow key={i} className="hover:bg-transparent">
                    <TableCell className="font-medium hover:bg-muted/20 bg-muted/20 text-secondary-foreground">
                      <div className="flex items-center space-x-1">
                        <FileImageIcon className="h-5 w-5 mr-2" />
                        <span>{file.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hover:bg-muted/20 bg-muted/20">
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[100px] justify-between"
                          >
                            {value
                              ? frameworks.find(
                                  (framework) => framework.value === value
                                )?.label
                              : "To ..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search file type..." />
                            <CommandList>
                              <CommandEmpty>No file type found.</CommandEmpty>
                              <CommandGroup>
                                {frameworks.map((framework) => (
                                  <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                      setValue(
                                        currentValue === value
                                          ? ""
                                          : currentValue
                                      );
                                      setOpen(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        value === framework.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {framework.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                    <TableCell className="hover:bg-muted/20 bg-muted/20">
                      <Badge variant="warning">Ready</Badge>
                    </TableCell>
                    <TableCell className="hover:bg-muted/20 bg-muted/20 text-xs font-medium text-muted-foreground">
                      {readableFileSize(file.size)}
                    </TableCell>
                    <TableCell className="text-right hover:bg-muted/20 bg-muted/20">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          // Remove this file from the list
                          setUploadedFiles((prevFiles) =>
                            prevFiles!.filter((_, index) => index !== i)
                          );

                          // If no files left, stop converting
                          if (uploadedFiles!.length === 1) {
                            setConverting(false);
                          }
                        }}
                      >
                        <Trash2Icon className="h-5 w-5 text-muted-foreground hover:text-primary" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Button type="submit" variant="ringHover" className="flex-1 w-full">
              Convert files
            </Button>
          </>
        ) : (
          <>
            <Tabs defaultValue="file" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="file">Upload from PC</TabsTrigger>
                <TabsTrigger value="url">URL</TabsTrigger>
              </TabsList>

              <TabsContent value="file">
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex items-center justify-center w-full border border-dashed rounded hover:border-solid hover:bg-muted/40">
                    <FileUploaderZone
                      filesToParent={handleFileUpload}
                      files={uploadedFiles}
                    />
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
                    <Button
                      type="submit"
                      variant="ringHover"
                      className="flex-1"
                    >
                      Convert from URL
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Supported formats: MP4, PNG, JPG, MKV, GIF, WEBM, and more
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
}
