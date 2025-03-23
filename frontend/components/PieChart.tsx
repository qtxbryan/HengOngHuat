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

// Sample portfolio data
const portfolios = [
  {
    id: "1",
    name: "Growth Portfolio",
    allocation: [
      { name: "US Stocks", value: 45, color: "#6366f1" },
      { name: "International Stocks", value: 25, color: "#a855f7" },
      { name: "Bonds", value: 20, color: "#10b981" },
      { name: "Cash", value: 10, color: "#f59e0b" },
    ],
  },
  {
    id: "2",
    name: "Retirement Fund",
    allocation: [
      { name: "US Stocks", value: 40, color: "#6366f1" },
      { name: "International Stocks", value: 20, color: "#a855f7" },
      { name: "Bonds", value: 30, color: "#10b981" },
      { name: "Real Estate", value: 10, color: "#f59e0b" },
    ],
  },
  {
    id: "3",
    name: "Tech Investments",
    allocation: [
      { name: "US Tech Stocks", value: 65, color: "#6366f1" },
      { name: "International Tech", value: 20, color: "#a855f7" },
      { name: "Cash", value: 15, color: "#f59e0b" },
    ],
  },
  {
    id: "4",
    name: "Dividend Income",
    allocation: [
      { name: "Dividend Stocks", value: 60, color: "#6366f1" },
      { name: "REITs", value: 15, color: "#a855f7" },
      { name: "Preferred Stocks", value: 15, color: "#10b981" },
      { name: "Bonds", value: 10, color: "#f59e0b" },
    ],
  },
];

interface AssetAllocationChartProps {
  portfolioId: string;
}

export default function AssetAllocationChart({
  portfolioId,
}: AssetAllocationChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Find the portfolio by ID
  const portfolio =
    portfolios.find((p) => p.id === portfolioId) || portfolios[0];

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
          <p className="text-sm font-semibold text-dashboard-accent-indigo">
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="dashboard-card-stats h-full"
    >
      <div className="dashboard-card-content h-full">
        <div className="flex items-center mb-4">
          <h2 className="dashboard-stat-label">Asset Allocation</h2>
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                  <Info className="h-4 w-4 text-dashboard-text-secondary" />
                  <span className="sr-only">Asset allocation information</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-dashboard-card border-dashboard-card-border text-dashboard-text-primary">
                <p>Breakdown of your portfolio by asset class</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>

        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={portfolio.allocation}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                activeIndex={activeIndex}
                activeShape={(props) => {
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
                  const sin = Math.sin(-RADIAN * midAngle);
                  const cos = Math.cos(-RADIAN * midAngle);
                  const mx = cx + (outerRadius + 10) * cos;
                  const my = cy + (outerRadius + 10) * sin;

                  return (
                    <g>
                      <text
                        x={cx}
                        y={cy}
                        dy={8}
                        textAnchor="middle"
                        fill="#a5a5c0"
                        className="text-xs"
                      >
                        {payload.name}
                      </text>
                      <text
                        x={cx}
                        y={cy + 20}
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
                }}
              >
                {portfolio.allocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                formatter={(value) => (
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
