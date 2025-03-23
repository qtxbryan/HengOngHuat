"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Generate sample drawdown data
const generateDrawdownData = (portfolioId: string) => {
  const data = [];
  const points = 24; // 2 years of monthly data

  // Different max drawdown based on portfolio
  let maxDrawdown = -0.15;
  if (portfolioId === "1") maxDrawdown = -0.18;
  if (portfolioId === "2") maxDrawdown = -0.12;
  if (portfolioId === "3") maxDrawdown = -0.25;
  if (portfolioId === "4") maxDrawdown = -0.1;

  let currentDrawdown = 0;
  const drawdownStart = Math.floor(Math.random() * 8) + 4; // Start drawdown between month 4-12
  const drawdownEnd = drawdownStart + Math.floor(Math.random() * 6) + 3; // End 3-8 months later

  for (let i = 0; i < points; i++) {
    const month = `${Math.floor(i / 12) + 2022}-${(i % 12) + 1}`;

    if (i < drawdownStart) {
      // Before drawdown
      currentDrawdown = Math.random() * -0.03;
    } else if (i <= drawdownEnd) {
      // During drawdown
      const progress = (i - drawdownStart) / (drawdownEnd - drawdownStart);
      currentDrawdown = maxDrawdown * progress;
    } else {
      // Recovery
      const recoveryRate = Math.random() * 0.02 + 0.01;
      currentDrawdown = Math.min(currentDrawdown + recoveryRate, 0);
    }

    data.push({
      month,
      drawdown: Math.round(currentDrawdown * 1000) / 10, // Convert to percentage with 1 decimal
    });
  }

  return data;
};

interface MaxDrawdownChartProps {
  portfolioId: string;
}

export default function MaxDrawdownChart({
  portfolioId,
}: MaxDrawdownChartProps) {
  const [data, setData] = useState(generateDrawdownData(portfolioId));

  useEffect(() => {
    setData(generateDrawdownData(portfolioId));
  }, [portfolioId]);

  const formatYAxis = (value: number) => {
    return `${value}%`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dashboard-card border border-dashboard-card-border rounded-md shadow-lg p-3"
        >
          <p className="text-sm font-medium text-dashboard-text-primary">
            {label}
          </p>
          <p className="text-sm font-semibold text-red-400">
            Drawdown: {payload[0].value}%
          </p>
        </motion.div>
      );
    }
    return null;
  };

  // Find the maximum drawdown
  const maxDrawdown = Math.min(...data.map((item) => item.drawdown));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="dashboard-card-stats"
    >
      <div className="dashboard-card-content">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h2 className="dashboard-stat-label">Maximum Drawdown</h2>
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                    <Info className="h-4 w-4 text-dashboard-text-secondary" />
                    <span className="sr-only">
                      Maximum drawdown information
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-dashboard-card border-dashboard-card-border text-dashboard-text-primary max-w-[300px]">
                  <p>
                    Maximum drawdown represents the largest peak-to-trough
                    decline in your portfolio's value. It helps assess risk and
                    potential losses during market downturns.
                  </p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </div>
          <div className="bg-dashboard-card/30 rounded-lg px-3 py-2">
            <p className="text-xs text-dashboard-text-secondary">
              Max Drawdown
            </p>
            <p className="text-lg font-semibold text-red-400">{maxDrawdown}%</p>
          </div>
        </div>

        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorDrawdown" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#a5a5c0", fontSize: 12 }}
                dy={10}
                tickFormatter={(value) => {
                  const parts = value.split("-");
                  return `${parts[0]}-${parts[1]}`;
                }}
              />
              <YAxis
                tickFormatter={formatYAxis}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#a5a5c0", fontSize: 12 }}
                width={40}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={0} stroke="rgba(255,255,255,0.3)" />
              <Area
                type="monotone"
                dataKey="drawdown"
                stroke="#ef4444"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorDrawdown)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
