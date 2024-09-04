import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans"; // import font
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "ffconvert",
  description: "Convert your files with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <div className="flex flex-col min-h-screen">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
