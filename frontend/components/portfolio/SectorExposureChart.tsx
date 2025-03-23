"use client";

import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
} from "recharts";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Sample sector exposure and return data
const sectorExposureData = {
  "1": [
    { name: "Tech", exposure: 35, return: 18.5, color: "#6366f1" },
    { name: "Health", exposure: 20, return: 12.3, color: "#a855f7" },
    { name: "Fin", exposure: 15, return: 9.8, color: "#10b981" },
    { name: "Cons", exposure: 12, return: 14.2, color: "#f59e0b" },
    { name: "Ind", exposure: 10, return: 7.5, color: "#ef4444" },
    { name: "Util", exposure: 8, return: 5.2, color: "#3b82f6" },
  ],
  "2": [
    { name: "Fin", exposure: 25, return: 10.5, color: "#10b981" },
    { name: "Tech", exposure: 20, return: 15.8, color: "#6366f1" },
    { name: "Health", exposure: 18, return: 9.2, color: "#a855f7" },
    { name: "Util", exposure: 15, return: 6.5, color: "#3b82f6" },
    { name: "Cons", exposure: 12, return: 11.3, color: "#f59e0b" },
    { name: "Ind", exposure: 10, return: 8.1, color: "#ef4444" },
  ],
  "3": [
    { name: "Tech", exposure: 65, return: 22.5, color: "#6366f1" },
    { name: "Cons", exposure: 15, return: 16.8, color: "#f59e0b" },
    { name: "Health", exposure: 10, return: 14.2, color: "#a855f7" },
    { name: "Fin", exposure: 5, return: 8.5, color: "#10b981" },
    { name: "Ind", exposure: 5, return: 7.2, color: "#ef4444" },
  ],
  "4": [
    { name: "Fin", exposure: 30, return: 8.2, color: "#10b981" },
    { name: "Util", exposure: 25, return: 5.5, color: "#3b82f6" },
    { name: "Cons", exposure: 15, return: 9.8, color: "#f59e0b" },
    { name: "Health", exposure: 15, return: 7.5, color: "#a855f7" },
    { name: "Tech", exposure: 10, return: 12.5, color: "#6366f1" },
    { name: "Ind", exposure: 5, return: 6.2, color: "#ef4444" },
  ],
};

interface SectorExposureChartProps {
  portfolioId: string;
}

export default function SectorExposureChart({
  portfolioId,
}: SectorExposureChartProps) {
  // Get data for the portfolio
  const data =
    sectorExposureData[portfolioId as keyof typeof sectorExposureData] ||
    sectorExposureData["1"];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dashboard-card border border-dashboard-card-border rounded-md shadow-lg p-3"
        >
          <p className="text-sm font-medium text-dashboard-text-primary">
            {payload[0].payload.name}
          </p>
          <p className="text-xs text-dashboard-text-secondary">
            Exposure: {payload[0].value}%
          </p>
          <p className="text-xs text-dashboard-text-secondary">
            Return: {payload[0].payload.return}%
          </p>
        </motion.div>
      );
    }
    return null;
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
          <h2 className="dashboard-stat-label">Sector Exposure & Return</h2>
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                  <Info className="h-4 w-4 text-dashboard-text-secondary" />
                  <span className="sr-only">Sector exposure information</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-dashboard-card border-dashboard-card-border text-dashboard-text-primary">
                <p>Portfolio exposure by sector with corresponding returns</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>

        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              layout="vertical"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
                horizontal={true}
                vertical={false}
              />
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#a5a5c0", fontSize: 12 }}
                domain={[0, "dataMax + 5"]}
              />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#a5a5c0", fontSize: 12 }}
                width={40}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="exposure" radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                  <motion.rect
                    key={`cell-${index}`}
                    fill={entry.color}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  />
                ))}
                <LabelList
                  dataKey="return"
                  position="right"
                  formatter={(value: number) => `${value}%`}
                  fill="#a5a5c0"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
