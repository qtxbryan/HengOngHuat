// TODO TO BE COMBINED WITH TIMESERIES CHART
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

// Generate sample data for portfolio and S&P500
const generateData = (timeframe: string) => {
  const data = [];
  let points = 0;
  const startValue = 100; // Starting at 100 for percentage comparison
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
    case "5Y":
      points = 5;
      labels = ["2020", "2021", "2022", "2023", "2024"];
      break;
  }

  // Create data with portfolio outperforming S&P500 slightly
  let portfolioValue = startValue;
  let spValue = startValue;

  for (let i = 0; i < points; i++) {
    const randomPortfolioChange = Math.random() * 8 - 2; // -2% to +6%
    const randomSpChange = Math.random() * 6 - 2; // -2% to +4%

    portfolioValue *= 1 + randomPortfolioChange / 100;
    spValue *= 1 + randomSpChange / 100;

    data.push({
      name: labels[i],
      portfolio: Math.round(portfolioValue * 100) / 100,
      sp500: Math.round(spValue * 100) / 100,
    });
  }

  return data;
};

interface PortfolioPerformanceGraphProps {
  portfolioId: string;
}

export default function PortfolioPerformanceGraph({
  portfolioId,
}: PortfolioPerformanceGraphProps) {
  const [timeframe, setTimeframe] = useState("1Y");
  const [data, setData] = useState(generateData(timeframe));

  useEffect(() => {
    setData(generateData(timeframe));
  }, [timeframe, portfolioId]);

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
          <p className="text-sm font-medium text-dashboard-text-primary mb-1">
            {label}
          </p>
          <p className="text-xs text-dashboard-accent-indigo flex items-center">
            <span className="h-2 w-2 rounded-full bg-dashboard-accent-indigo mr-2"></span>
            Portfolio: {payload[0].value}%
          </p>
          <p className="text-xs text-dashboard-accent-purple flex items-center">
            <span className="h-2 w-2 rounded-full bg-dashboard-accent-purple mr-2"></span>
            S&P 500: {payload[1].value}%
          </p>
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
    { value: "5Y", label: "5Y" },
  ];

  // Calculate performance metrics
  const firstValue = data[0];
  const lastValue = data[data.length - 1];
  const portfolioPerformance =
    ((lastValue.portfolio - firstValue.portfolio) / firstValue.portfolio) * 100;
  const spPerformance =
    ((lastValue.sp500 - firstValue.sp500) / firstValue.sp500) * 100;
  const outperformance = portfolioPerformance - spPerformance;

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
            <h2 className="dashboard-stat-label">Portfolio vs S&P 500</h2>
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                    <Info className="h-4 w-4 text-dashboard-text-secondary" />
                    <span className="sr-only">
                      Performance comparison information
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-dashboard-card border-dashboard-card-border text-dashboard-text-primary">
                  <p>
                    Comparison of your portfolio performance against the S&P 500
                    index
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-dashboard-card/30 rounded-lg p-3">
            <p className="text-xs text-dashboard-text-secondary">
              Portfolio Performance
            </p>
            <p
              className={`text-lg font-semibold ${portfolioPerformance >= 0 ? "text-emerald-400" : "text-red-400"}`}
            >
              {portfolioPerformance.toFixed(2)}%
            </p>
          </div>
          <div className="bg-dashboard-card/30 rounded-lg p-3">
            <p className="text-xs text-dashboard-text-secondary">
              S&P 500 Performance
            </p>
            <p
              className={`text-lg font-semibold ${spPerformance >= 0 ? "text-emerald-400" : "text-red-400"}`}
            >
              {spPerformance.toFixed(2)}%
            </p>
          </div>
          <div className="bg-dashboard-card/30 rounded-lg p-3">
            <p className="text-xs text-dashboard-text-secondary">
              Outperformance
            </p>
            <p
              className={`text-lg font-semibold ${outperformance >= 0 ? "text-emerald-400" : "text-red-400"}`}
            >
              {outperformance.toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="h-[300px] w-full">
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
                formatter={(value) => (
                  <span className="text-dashboard-text-primary">{value}</span>
                )}
              />
              <Line
                type="monotone"
                dataKey="portfolio"
                stroke="#6366f1"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: "#6366f1", stroke: "#fff" }}
                name="Portfolio"
              />
              <Line
                type="monotone"
                dataKey="sp500"
                stroke="#a855f7"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: "#a855f7", stroke: "#fff" }}
                name="S&P 500"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
