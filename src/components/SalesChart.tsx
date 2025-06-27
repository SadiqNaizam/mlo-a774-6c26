import React, { useState, useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

// Mock data for different timeframes
const salesData7d = [
  { date: 'Mon', sales: Math.floor(Math.random() * 2000) + 1000 },
  { date: 'Tue', sales: Math.floor(Math.random() * 2000) + 1500 },
  { date: 'Wed', sales: Math.floor(Math.random() * 2000) + 1200 },
  { date: 'Thu', sales: Math.floor(Math.random() * 2000) + 2500 },
  { date: 'Fri', sales: Math.floor(Math.random() * 2000) + 3000 },
  { date: 'Sat', sales: Math.floor(Math.random() * 2000) + 4500 },
  { date: 'Sun', sales: Math.floor(Math.random() * 2000) + 4000 },
];

const salesData30d = [
  { date: 'Week 1', sales: Math.floor(Math.random() * 10000) + 5000 },
  { date: 'Week 2', sales: Math.floor(Math.random() * 10000) + 7000 },
  { date: 'Week 3', sales: Math.floor(Math.random() * 10000) + 6500 },
  { date: 'Week 4', sales: Math.floor(Math.random() * 10000) + 9000 },
];

const salesDataYTD = [
    { date: 'Jan', sales: Math.floor(Math.random() * 15000) + 20000 },
    { date: 'Feb', sales: Math.floor(Math.random() * 15000) + 22000 },
    { date: 'Mar', sales: Math.floor(Math.random() * 15000) + 25000 },
    { date: 'Apr', sales: Math.floor(Math.random() * 15000) + 27000 },
    { date: 'May', sales: Math.floor(Math.random() * 15000) + 30000 },
    { date: 'Jun', sales: Math.floor(Math.random() * 15000) + 28000 },
    { date: 'Jul', sales: Math.floor(Math.random() * 15000) + 32000 },
    { date: 'Aug', sales: Math.floor(Math.random() * 15000) + 35000 },
    // Add more months as needed
];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--primary))",
  },
};

const SalesChart = () => {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | 'ytd'>('30d');
  console.log('SalesChart loaded');

  const data = useMemo(() => {
    switch (timeframe) {
      case '7d':
        return salesData7d;
      case '30d':
        return salesData30d;
      case 'ytd':
        return salesDataYTD;
      default:
        return salesData30d;
    }
  }, [timeframe]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>
            Showing sales data for the selected period.
          </CardDescription>
        </div>
        <ToggleGroup
          type="single"
          value={timeframe}
          onValueChange={(value) => {
            if (value) setTimeframe(value as '7d' | '30d' | 'ytd');
          }}
          aria-label="Select timeframe"
          size="sm"
        >
          <ToggleGroupItem value="7d" aria-label="Last 7 days">
            7D
          </ToggleGroupItem>
          <ToggleGroupItem value="30d" aria-label="Last 30 days">
            30D
          </ToggleGroupItem>
          <ToggleGroupItem value="ytd" aria-label="Year to date">
            YTD
          </ToggleGroupItem>
        </ToggleGroup>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
                tickFormatter={(value) => `$${Number(value) / 1000}k`}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent 
                  formatter={(value) => `$${Number(value).toLocaleString()}`} 
                  indicator="dot"
                />}
              />
              <Bar 
                dataKey="sales" 
                fill="var(--color-sales)" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SalesChart;