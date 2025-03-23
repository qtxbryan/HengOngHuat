"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { Download, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Sample sector data
const sectors = [
  { id: "technology", name: "Technology", color: "#6366f1" },
  { id: "healthcare", name: "Healthcare", color: "#a855f7" },
  { id: "financials", name: "Financials", color: "#10b981" },
  { id: "consumer", name: "Consumer Discretionary", color: "#f59e0b" },
  { id: "industrials", name: "Industrials", color: "#ef4444" },
  { id: "utilities", name: "Utilities", color: "#3b82f6" },
];

// Generate sample data for sector performance
const generateSectorData = (timeframe: string) => {
  const data = [];
  let points = 0;
  let labels = [];

  switch (timeframe) {
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
    case "3Y":
      points = 12;
      labels = [
        "2021 Q1",
        "2021 Q2",
        "2021 Q3",
        "2021 Q4",
        "2022 Q1",
        "2022 Q2",
        "2022 Q3",
        "2022 Q4",
        "2023 Q1",
        "2023 Q2",
        "2023 Q3",
        "2023 Q4",
      ];
      break;
  }

  // Create data with different performance for each sector
  for (let i = 0; i < points; i++) {
    const dataPoint: any = {
      name: labels[i],
    };

    sectors.forEach((sector) => {
      // Different base performance and volatility for each sector
      let basePerformance = 0;
      let volatility = 0;

      switch (sector.id) {
        case "technology":
          basePerformance = 15;
          volatility = 4;
          break;
        case "healthcare":
          basePerformance = 10;
          volatility = 2;
          break;
        case "financials":
          basePerformance = 8;
          volatility = 3;
          break;
        case "consumer":
          basePerformance = 12;
          volatility = 3.5;
          break;
        case "industrials":
          basePerformance = 7;
          volatility = 2.5;
          break;
        case "utilities":
          basePerformance = 5;
          volatility = 1.5;
          break;
      }

      // Calculate performance with some randomness
      const randomFactor = (Math.random() * 2 - 1) * volatility;
      const trendFactor = (i / points) * basePerformance;
      const value = 100 + trendFactor + randomFactor;

      dataPoint[sector.id] = Math.round(value * 10) / 10;
    });

    data.push(dataPoint);
  }

  return data;
};

interface SectorPerformanceGraphProps {
  portfolioId: string;
}

export default function SectorPerformanceGraph({
  portfolioId,
}: SectorPerformanceGraphProps) {
  const [timeframe, setTimeframe] = useState("1Y");
  const [data, setData] = useState(generateSectorData(timeframe));
  const [visibleSectors, setVisibleSectors] = useState<string[]>(
    sectors.map((s) => s.id)
  );

  useEffect(() => {
    setData(generateSectorData(timeframe));
  }, [timeframe, portfolioId]);

  const formatYAxis = (value: number) => {
    return value.toFixed(0);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dashboard-card border border-dashboard-card-border rounded-md shadow-lg p-3"
        >
          <p className="text-sm font-medium text-dashboard-text-primary mb-2">
            {label}
          </p>
          {payload.map((entry: any, index: number) => {
            const sector = sectors.find((s) => s.id === entry.dataKey);
            if (!sector) return null;

            return (
              <p
                key={`item-${index}`}
                className="text-xs flex items-center mb-1"
                style={{ color: sector.color }}
              >
                <span
                  className="h-2 w-2 rounded-full mr-2"
                  style={{ backgroundColor: sector.color }}
                ></span>
                {sector.name}: {entry.value.toFixed(1)}
              </p>
            );
          })}
        </motion.div>
      );
    }
    return null;
  };

  const timeOptions = [
    { value: "1M", label: "1M" },
    { value: "3M", label: "3M" },
    { value: "6M", label: "6M" },
    { value: "1Y", label: "1Y" },
    { value: "3Y", label: "3Y" },
  ];

  const toggleSector = (sectorId: string) => {
    if (visibleSectors.includes(sectorId)) {
      setVisibleSectors(visibleSectors.filter((id) => id !== sectorId));
    } else {
      setVisibleSectors([...visibleSectors, sectorId]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="dashboard-card-stats"
    >
      <div className="dashboard-card-content">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div className="flex items-center">
            <h2 className="dashboard-stat-label">Sector Performance</h2>
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                    <Info className="h-4 w-4 text-dashboard-text-secondary" />
                    <span className="sr-only">
                      Sector performance information
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-dashboard-card border-dashboard-card-border text-dashboard-text-primary">
                  <p>
                    Performance of different market sectors over time (indexed
                    to 100)
                  </p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center mt-2 sm:mt-0">
            <div className="flex bg-dashboard-card rounded-lg p-1 mr-2">
              {timeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTimeframe(option.value)}
                  className={`relative px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                    timeframe === option.value
                      ? "text-dashboard-text-primary bg-dashboard-accent-indigo"
                      : "text-dashboard-text-secondary hover:text-dashboard-text-primary"
                  }`}
                  aria-pressed={timeframe === option.value}
                  aria-label={`Show ${option.label} data`}
                >
                  {option.label}
                </button>
              ))}
            </div>
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

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
                vertical={false}
              />
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
                width={40}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                height={36}
                onClick={(e) => toggleSector(e.dataKey)}
                formatter={(value, entry) => {
                  const sector = sectors.find((s) => s.id === value);
                  if (!sector) return value;

                  const isActive = visibleSectors.includes(value);
                  return (
                    <span
                      className={`text-xs font-medium ${isActive ? "opacity-100" : "opacity-50"}`}
                      style={{ color: sector.color }}
                    >
                      {sector.name}
                    </span>
                  );
                }}
              />

              {sectors.map(
                (sector) =>
                  visibleSectors.includes(sector.id) && (
                    <Line
                      key={sector.id}
                      type="monotone"
                      dataKey={sector.id}
                      stroke={sector.color}
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6, fill: sector.color, stroke: "#fff" }}
                      name={sector.id}
                    />
                  )
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
