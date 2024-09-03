"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A simple pie chart showing file format usage"

const chartData = [
  { format: "MP3", usage: 350, fill: "var(--color-mp3)" },
  { format: "MP4", usage: 280, fill: "var(--color-mp4)" },
  { format: "AVI", usage: 150, fill: "var(--color-avi)" },
  { format: "WMV", usage: 120, fill: "var(--color-wmv)" },
  { format: "Other", usage: 100, fill: "var(--color-other)" },
]

const chartConfig = {
  usage: {
    label: "Usage",
  },
  mp3: {
    label: "MP3",
    color: "hsl(var(--chart-1))",
  },
  mp4: {
    label: "MP4",
    color: "hsl(var(--chart-2))",
  },
  avi: {
    label: "AVI",
    color: "hsl(var(--chart-3))",
  },
  wmv: {
    label: "WMV",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function Piechart() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-left">File Types Converted</CardTitle>
        <CardDescription>
            A breakdown of the different file formats converted
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="usage" nameKey="format" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
