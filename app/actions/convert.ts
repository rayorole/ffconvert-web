"use server";

export type ConvertFileInput = {
  file: File;
  outputFormat: string;
};

export async function convertFiles(inputs: ConvertFileInput[]) {
  const formData = new FormData();
  inputs.forEach((input) => {
    formData.append("files", input.file);
    formData.append("outputFormat", input.outputFormat);
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_FFCONVERT_BACKEND_URL}/convert`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to convert files");
  }

  return response.json();
}
