

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Piechart } from "@/components/dashboard/piechart"
import { Areachart } from "@/components/dashboard/areachart"

const recentConversions = [
  { id: 1, filename: "video1.mp4", convertedTo: "AVI", date: "2023-06-07", status: "Completed" },
  { id: 2, filename: "presentation.ppt", convertedTo: "PDF", date: "2023-06-07", status: "Completed" },
  { id: 3, filename: "audio.wav", convertedTo: "MP3", date: "2023-06-06", status: "Failed" },
  { id: 4, filename: "document.docx", convertedTo: "PDF", date: "2023-06-06", status: "Completed" },
  { id: 5, filename: "image.png", convertedTo: "JPG", date: "2023-06-05", status: "Completed" },
]



export default function StatisticsPage() {

 

  return (
    <div className="container mx-auto p-4 space-y-6">
  

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,270</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.2%</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2 TB</div>
            <p className="text-xs text-muted-foreground">+8.7% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <Progress value={75} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">of monthly limit</p>
          </CardContent>
        </Card>
        <Piechart />
        <div className="w-full md:col-span-2">
          <Areachart />
        </div>

      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Conversions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File Name</TableHead>
                <TableHead>Converted To</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentConversions.map((conversion) => (
                <TableRow key={conversion.id}>
                  <TableCell>{conversion.filename}</TableCell>
                  <TableCell>{conversion.convertedTo}</TableCell>
                  <TableCell>{conversion.date}</TableCell>
                  <TableCell>{conversion.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}