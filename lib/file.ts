export function readableFileSize(attachmentSize: number | null) {
  const DEFAULT_SIZE = 0;
  const fileSize = attachmentSize ?? DEFAULT_SIZE;

  if (!fileSize) {
    return `${DEFAULT_SIZE} kb`;
  }

  const sizeInKb = fileSize / 1024;

  if (
    // Add GB
    sizeInKb >
    1024 * 1024
  ) {
    return `${(sizeInKb / (1024 * 1024)).toFixed(2)} GB`;
  } else if (sizeInKb > 1024) {
    return `${(sizeInKb / 1024).toFixed(2)} MB`;
  } else {
    return `${sizeInKb.toFixed(2)} KB`;
  }
}
