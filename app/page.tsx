import { ArrowRightIcon, RefreshCwIcon, ZapIcon } from "lucide-react";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import ConvertComponent from "@/components/shared/convert/main";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
            <ConvertComponent />
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
      <Footer />
    </div>
  );
}
