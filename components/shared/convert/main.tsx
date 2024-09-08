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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { fileTypes } from "@/lib/conversion";

type ConvertFormValues = {
  file: File;
  outputFormat: string;
  open: boolean;
  status: "ready" | "converting" | "done" | "error";
};

export default function ConvertComponent() {
  // const [uploadedFiles, setUploadedFiles] = useState<File[] | null>(null);
  const [converting, setConverting] = useState(false);
  const [convertToFiles, setConvertToFiles] = useState<ConvertFormValues[]>([]);

  function handleFileUpload(files: File[]) {
    for (const file of files) {
      setConvertToFiles((prevFiles) => [
        ...prevFiles,
        { file, outputFormat: "", open: false, status: "ready" },
      ]);
      setConverting(true);
      console.log(files);
    }
  }
  async function handleFileConversion() {
    Promise.all(
      convertToFiles.map(async (file) => {
        setConvertToFiles((prevFiles) =>
          prevFiles.map((prevFile) => {
            if (prevFile.file === file.file) {
              return {
                ...prevFile,
                status: "converting",
              };
            }
            return prevFile;
          })
        );

        const formData = new FormData();
        formData.append("file", file.file);
        formData.append("outputFormat", file.outputFormat);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FFCONVERT_BACKEND_URL}/convert`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          console.log("Error");

          // Get message from body
          const data = await response.json();
          console.log(data);

          return;
        }

        const data = await response.json();

        setConvertToFiles((prevFiles) =>
          prevFiles.map((prevFile) => {
            if (prevFile.file === file.file) {
              return {
                ...prevFile,
                status: "done",
              };
            }
            return prevFile;
          })
        );

        console.log(data);
      })
    );
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
      <div className="w-full max-w-md lg:max-w-screen-md space-y-2">
        {converting ? (
          <>
            <Table>
              <TableCaption>Ready when you are 💫</TableCaption>
              <TableBody>
                {convertToFiles
                  .filter((file) => file.file)
                  .map((file, i) => (
                    <TableRow key={i} className="hover:bg-transparent">
                      <TableCell className="font-medium hover:bg-muted/20 bg-muted/20 text-secondary-foreground">
                        <div className="flex items-center space-x-1">
                          <FileImageIcon className="h-5 w-5 mr-2" />
                          <span>{file.file.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hover:bg-muted/20 bg-muted/20">
                        <Popover
                          open={file.open}
                          onOpenChange={(isOpen) => {
                            setConvertToFiles((prevFiles) =>
                              prevFiles.map((prevFile, index) => {
                                if (index === i) {
                                  return {
                                    ...prevFile,
                                    open: isOpen,
                                  };
                                }
                                return prevFile;
                              })
                            );
                          }}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-[100px] justify-between"
                            >
                              {file.outputFormat
                                ? fileTypes.find(
                                    (type) => type.value === file.outputFormat
                                  )?.label
                                : "To..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search file type..." />
                              <CommandList>
                                <CommandEmpty>No file type found.</CommandEmpty>
                                <CommandGroup>
                                  {fileTypes.map((type) => (
                                    <CommandItem
                                      key={type.value}
                                      value={type.value}
                                      onSelect={(currentValue) => {
                                        setConvertToFiles((prevFiles) =>
                                          prevFiles.map((prevFile, index) => {
                                            if (index === i) {
                                              return {
                                                ...prevFile,
                                                outputFormat: currentValue,
                                                open: false,
                                              };
                                            }
                                            return prevFile;
                                          })
                                        );
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          file.outputFormat === type.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {type.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                      <TableCell className="hover:bg-muted/20 bg-muted/20">
                        {file.status === "converting" ? (
                          <Badge variant="default">Converting</Badge>
                        ) : file.status === "done" ? (
                          <Badge variant="success">Done</Badge>
                        ) : file.status === "error" ? (
                          <Badge variant="error">Error</Badge>
                        ) : (
                          <Badge variant="warning">Ready</Badge>
                        )}
                      </TableCell>
                      <TableCell className="hover:bg-muted/20 bg-muted/20 text-xs font-medium">
                        {readableFileSize(file.file.size)}
                      </TableCell>
                      <TableCell className="text-right hover:bg-muted/20 bg-muted/20">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => {
                            // Remove this file from the list
                            setConvertToFiles((prevFiles) =>
                              prevFiles.filter((_, index) => index !== i)
                            );

                            // If no files left, stop converting
                            if (convertToFiles.length === 1) {
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

            <Button
              variant="ringHover"
              className="flex-1 w-full"
              onClick={handleFileConversion}
            >
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
                      files={convertToFiles.map((file) => file.file)}
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
