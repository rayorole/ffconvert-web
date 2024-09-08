
import { Piechart } from "@/components/dashboard/piechart";
import { Areachart } from "@/components/dashboard/areachart";
import { StatisticCard } from "@/components/dashboard/cards/staticscard";
import { FileTypeSuccessTable } from "@/components/dashboard/cards/filetypesuccestab";
import { ConversionTable } from "@/components/dashboard/cards/conversiontable";
import { APIUsageCard } from "@/components/dashboard/cards/apiusagecard";

const recentConversions = [
  { id: 1, filename: "video1.mp4", convertedTo: "AVI", date: "2023-06-07", status: "Completed" },
  { id: 2, filename: "presentation.ppt", convertedTo: "PDF", date: "2023-06-07", status: "Completed" },
  { id: 3, filename: "audio.wav", convertedTo: "MP3", date: "2023-06-06", status: "Failed" },
  { id: 4, filename: "document.docx", convertedTo: "PDF", date: "2023-06-06", status: "Completed" },
  { id: 5, filename: "image.png", convertedTo: "JPG", date: "2023-06-05", status: "Completed" },
];

const fileConversionStats = [
  { fileType: "AVI", successRate: 95 },
  { fileType: "PDF", successRate: 98 },
  { fileType: "MP3", successRate: 85 },
  { fileType: "JPG", successRate: 100 },
];

export default function StatisticsPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatisticCard title="Total Conversions" value="1,270" description="+20.1% from last month" />
        <StatisticCard title="Conversion Rate" value="98.2%" description="+2.5% from last month" />
        <StatisticCard title="Storage Used" value="1.2 TB" description="+8.7% from last month" />
        <APIUsageCard usage={75} />
        <Piechart />
        <div className="w-full md:col-span-2">
          <Areachart />
        </div>  
          <FileTypeSuccessTable stats={fileConversionStats} />
      </div>
        <ConversionTable conversions={recentConversions} />
    </div>
  );
}
