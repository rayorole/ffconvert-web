"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

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

// Generate daily data for the past month (July 2024 as an example)
const generateDailyData = () => {
  const data = [];
  const startDate = new Date("2024-07-01");
  for (let i = 0; i < 31; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    data.push({
      date: date.toISOString().slice(0, 10), // YYYY-MM-DD
      desktop: Math.floor(Math.random() * 300) + 50 // Random data for example
    });
  }
  return data;
}

const chartData = generateDailyData();

const chartConfig = {
  desktop: {
    label: "Conversion",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function Areachart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Conversion</CardTitle>
        <CardDescription>
          Showing total visitors for the past month (July 2024)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(5, 10)} // Display MM-DD format
            />
            <YAxis hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="desktop"
              type="monotone"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>

    </Card>
  )
}
