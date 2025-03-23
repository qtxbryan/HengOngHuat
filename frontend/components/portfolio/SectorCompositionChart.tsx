"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Sector,
} from "recharts";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Sample sector composition data
const sectorComposition = {
  "1": [
    { name: "Technology", value: 35, color: "#6366f1" },
    { name: "Healthcare", value: 20, color: "#a855f7" },
    { name: "Financials", value: 15, color: "#10b981" },
    { name: "Consumer", value: 12, color: "#f59e0b" },
    { name: "Industrials", value: 10, color: "#ef4444" },
    { name: "Utilities", value: 8, color: "#3b82f6" },
  ],
  "2": [
    { name: "Financials", value: 25, color: "#10b981" },
    { name: "Technology", value: 20, color: "#6366f1" },
    { name: "Healthcare", value: 18, color: "#a855f7" },
    { name: "Utilities", value: 15, color: "#3b82f6" },
    { name: "Consumer", value: 12, color: "#f59e0b" },
    { name: "Industrials", value: 10, color: "#ef4444" },
  ],
  "3": [
    { name: "Technology", value: 65, color: "#6366f1" },
    { name: "Consumer", value: 15, color: "#f59e0b" },
    { name: "Healthcare", value: 10, color: "#a855f7" },
    { name: "Financials", value: 5, color: "#10b981" },
    { name: "Industrials", value: 5, color: "#ef4444" },
  ],
  "4": [
    { name: "Financials", value: 30, color: "#10b981" },
    { name: "Utilities", value: 25, color: "#3b82f6" },
    { name: "Consumer", value: 15, color: "#f59e0b" },
    { name: "Healthcare", value: 15, color: "#a855f7" },
    { name: "Technology", value: 10, color: "#6366f1" },
    { name: "Industrials", value: 5, color: "#ef4444" },
  ],
};

interface SectorCompositionChartProps {
  portfolioId: string;
}

export default function SectorCompositionChart({
  portfolioId,
}: SectorCompositionChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Get sector data for the portfolio
  const data =
    sectorComposition[portfolioId as keyof typeof sectorComposition] ||
    sectorComposition["1"];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dashboard-card border border-dashboard-card-border rounded-md shadow-lg p-3"
        >
          <p className="text-sm font-medium text-dashboard-text-primary">
            {payload[0].name}
          </p>
          <p
            className="text-sm font-semibold"
            style={{ color: payload[0].payload.color }}
          >
            {payload[0].value}%
          </p>
        </motion.div>
      );
    }
    return null;
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      value,
    } = props;

    return (
      <g>
        <text
          x={cx}
          y={cy}
          dy={-10}
          textAnchor="middle"
          fill="#a5a5c0"
          className="text-xs"
        >
          {payload.name}
        </text>
        <text
          x={cx}
          y={cy}
          dy={10}
          textAnchor="middle"
          fill="#fff"
          className="text-lg font-bold"
        >
          {`${value}%`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 5}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="dashboard-card-stats h-full"
    >
      <div className="dashboard-card-content h-full">
        <div className="flex items-center mb-4">
          <h2 className="dashboard-stat-label">Sector Composition</h2>
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                  <Info className="h-4 w-4 text-dashboard-text-secondary" />
                  <span className="sr-only">
                    Sector composition information
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-dashboard-card border-dashboard-card-border text-dashboard-text-primary">
                <p>Breakdown of your portfolio by market sectors</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>

        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                activeIndex={activeIndex !== null ? activeIndex : undefined}
                activeShape={renderActiveShape}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                formatter={(value, entry) => (
                  <span className="text-dashboard-text-primary text-xs">
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
