"use client"
import { useState } from 'react'
import { CalendarIcon,  FileIcon, DownloadIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// TypeScript interface for conversion data
interface ConversionType {
  id: number;
  fileName: string;
  conversionType: string;
  startTime: string;
  duration: string;
  status: string;
  fileSize: string;
}

// Mock data for demonstration
const mockConversions: ConversionType[] = [
  { id: 1, fileName: 'video1.mp4', conversionType: 'MP4 to AVI', startTime: '2023-06-01 10:00:00', duration: '00:05:23', status: 'Completed', fileSize: '250 MB' },
  { id: 2, fileName: 'audio1.wav', conversionType: 'WAV to MP3', startTime: '2023-06-02 14:30:00', duration: '00:01:45', status: 'Completed', fileSize: '45 MB' },
  { id: 3, fileName: 'video2.mov', conversionType: 'MOV to MP4', startTime: '2023-06-03 09:15:00', duration: '00:08:12', status: 'Failed', fileSize: '500 MB' },
  { id: 4, fileName: 'audio2.flac', conversionType: 'FLAC to AAC', startTime: '2023-06-04 16:45:00', duration: '00:03:30', status: 'In Progress', fileSize: '80 MB' },
  { id: 5, fileName: 'video3.avi', conversionType: 'AVI to WebM', startTime: '2023-06-05 11:20:00', duration: '00:06:55', status: 'Completed', fileSize: '320 MB' },
]

export default function EnhancedConversionHistory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedConversion, setSelectedConversion] = useState<ConversionType | null>(null)

  const itemsPerPage = 5
  const totalPages = Math.ceil(mockConversions.length / itemsPerPage)

  const filteredConversions = mockConversions.filter(conversion => 
    conversion.fileName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === 'All' || conversion.status === statusFilter) &&
    (!dateRange.from || new Date(conversion.startTime) >= dateRange.from) &&
    (!dateRange.to || new Date(conversion.startTime) <= dateRange.to)
  )

  const paginatedConversions = filteredConversions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalConversions = mockConversions.length
  const completedConversions = mockConversions.filter(c => c.status === 'Completed').length
  const failedConversions = mockConversions.filter(c => c.status === 'Failed').length

  return (
    <div className={`container mx-auto py-10 `}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConversions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedConversions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{failedConversions}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between mb-5">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search by file name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[280px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {dateRange.from.toDateString()} - {dateRange.to.toDateString()}
                  </>
                ) : (
                  dateRange.from.toDateString()
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={dateRange}
              onSelect={(range) => setDateRange(range || {})}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>File Name</TableHead>
            <TableHead>Conversion Type</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedConversions.map((conversion) => (
            <TableRow key={conversion.id}>
              <TableCell>{conversion.fileName}</TableCell>
              <TableCell>{conversion.conversionType}</TableCell>
              <TableCell>{conversion.startTime}</TableCell>
              <TableCell>{conversion.duration}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${conversion.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                    conversion.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                    'bg-red-100 text-red-800'}`}>
                  {conversion.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedConversion(conversion)}>
                        <FileIcon className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Conversion Details</DialogTitle>
                      </DialogHeader>
                      {selectedConversion && (
                        <div>
                          <p><strong>File Name:</strong> {selectedConversion.fileName}</p>
                          <p><strong>Conversion Type:</strong> {selectedConversion.conversionType}</p>
                          <p><strong>Start Time:</strong> {selectedConversion.startTime}</p>
                          <p><strong>Duration:</strong> {selectedConversion.duration}</p>
                          <p><strong>Status:</strong> {selectedConversion.status}</p>
                          <p><strong>File Size:</strong> {selectedConversion.fileSize}</p>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" size="sm">
                    <DownloadIcon className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between mt-5">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
