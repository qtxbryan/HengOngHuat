"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

const generateData = (timeframe: string) => {
  const data = [];
  let points = 0;
  const startValue = 90000;
  const maxValue = 130000;
  let labels = [];

  switch (timeframe) {
    case "1D":
      points = 24;
      labels = Array.from({ length: points }, (_, i) => `${i}:00`);
      break;
    case "1W":
      points = 7;
      labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      break;
    case "1M":
      points = 30;
      labels = Array.from({ length: points }, (_, i) => `${i + 1}`);
      break;
    case "3M":
      points = 12;
      labels = Array.from({ length: points }, (_, i) => `Week ${i + 1}`);
      break;
    case "6M":
      points = 6;
      labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
      break;
    case "1Y":
    default:
      points = 12;
      labels = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      break;
    case "ALL":
      points = 5;
      labels = ["2020", "2021", "2022", "2023", "2024"];
      break;
  }

  // Create a wavy pattern with an upward trend
  for (let i = 0; i < points; i++) {
    const randomFactor = Math.random() * 0.2 - 0.1; // -10% to +10%
    const trendFactor = (i / points) * 0.4; // 0% to 40% upward trend
    const value = startValue * (1 + randomFactor + trendFactor);

    data.push({
      name: labels[i],
      value: Math.min(Math.round(value), maxValue),
    });
  }

  return data;
};

interface PortfolioChartProps {
  timeframe: string;
  setTimeframe: (timeframe: string) => void;
}

const TimeseriesChart = ({ timeframe, setTimeframe }: PortfolioChartProps) => {
  const [data, setData] = useState(generateData(timeframe));

  useEffect(() => {
    setData(generateData(timeframe));
  }, [timeframe]);

  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  const formatTooltipValue = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a1a2e] border border-[#3a3a5e] rounded-md shadow-lg p-3"
        >
          <p className="text-sm font-medium text-white">{label}</p>
          <p className="text-sm font-semibold text-[#6c5dd3]">
            {formatTooltipValue(payload[0].value)}
          </p>
        </motion.div>
      );
    }
    return null;
  };

  const timeOptions = [
    { value: "1D", label: "1D" },
    { value: "1W", label: "1W" },
    { value: "1M", label: "1M" },
    { value: "3M", label: "3M" },
    { value: "6M", label: "6M" },
    { value: "1Y", label: "1Y" },
    { value: "ALL", label: "ALL" },
  ];

  return (
    <motion.div
      className="h-[350px] w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="dashboard-card-content h-full flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div>
            <h2 className="dashboard-stat-label">Portfolio Performance</h2>
            <p className="text-sm text-dashboard-text-secondary">
              Your investment growth over time
            </p>
          </div>
          <div className="flex items-center mt-2 sm:mt-0">
            <Tabs
              value={timeframe}
              onValueChange={setTimeframe}
              className="mr-2"
            >
              <TabsList className="bg-dashboard-card">
                {timeOptions.map((option) => (
                  <TabsTrigger
                    key={option.value}
                    value={option.value}
                    className="text-xs font-medium data-[state=active]:text-dashboard-text-primary data-[state=active]:bg-dashboard-accent-indigo"
                    aria-label={`Show ${option.label} data`}
                  >
                    {option.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-dashboard-card-border"
              aria-label="Download chart data"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 w-full min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6c5dd3" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6c5dd3" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#a5a5c0", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                tickFormatter={formatYAxis}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#a5a5c0", fontSize: 12 }}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#6c5dd3"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default TimeseriesChart;
