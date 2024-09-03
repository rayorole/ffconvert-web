"use client";

import { useState } from "react";
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "@/components/ui/dropzone";
import { Paperclip, UploadCloudIcon } from "lucide-react";

const FileSvgDraw = () => {
  return (
    <>
      <UploadCloudIcon className="h-8 w-8 text-primary mb-3" />
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span>
        &nbsp; or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        SVG, PNG, JPG or GIF
      </p>
    </>
  );
};

const FileUploaderZone = ({
  filesToParent,
  files,
}: {
  filesToParent: (files: File[]) => void;
  files: File[] | null;
}) => {
  const dropZoneConfig = {
    maxFiles: 3,
    maxSize: 1024 * 1024 * 4, // 4MB
    multiple: true,
  };

  return (
    <FileUploader
      value={files}
      onValueChange={(files) => {
        filesToParent(files!);
      }}
      dropzoneOptions={dropZoneConfig}
      className="relative rounded-lg p-2"
    >
      <FileInput className="outline-dashed outline-1 outline-white">
        <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full h-44">
          <FileSvgDraw />
        </div>
      </FileInput>
      <FileUploaderContent>
        {files &&
          files.length > 0 &&
          files.map((file, i) => (
            <FileUploaderItem key={i} index={i}>
              <Paperclip className="h-4 w-4 stroke-current" />
              <span>{file.name}</span>
            </FileUploaderItem>
          ))}
      </FileUploaderContent>
    </FileUploader>
  );
};

export default FileUploaderZone;
