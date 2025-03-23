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
  ReferenceLine,
} from "recharts";
import { Download, Info, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Generate Monte Carlo simulation data
const generateMonteCarloData = (
  portfolioId: string,
  years: number,
  simulations: number
) => {
  // Get initial portfolio value based on ID
  let initialValue = 100000;
  if (portfolioId === "1") initialValue = 58750;
  if (portfolioId === "2") initialValue = 32456;
  if (portfolioId === "3") initialValue = 18965;
  if (portfolioId === "4") initialValue = 14395;

  // Different expected returns and volatility based on portfolio
  let expectedReturn = 0.08;
  let volatility = 0.15;

  if (portfolioId === "1") {
    expectedReturn = 0.09;
    volatility = 0.17;
  } else if (portfolioId === "2") {
    expectedReturn = 0.07;
    volatility = 0.12;
  } else if (portfolioId === "3") {
    expectedReturn = 0.11;
    volatility = 0.22;
  } else if (portfolioId === "4") {
    expectedReturn = 0.06;
    volatility = 0.1;
  }

  // Generate time points (years)
  const timePoints = Array.from({ length: years + 1 }, (_, i) => i);

  // Generate simulation paths
  const simulationPaths = [];

  for (let sim = 0; sim < simulations; sim++) {
    const path = [];
    let currentValue = initialValue;

    for (let year = 0; year <= years; year++) {
      if (year === 0) {
        path.push({
          year,
          value: currentValue,
        });
      } else {
        // Random annual return based on expected return and volatility
        const annualReturn =
          expectedReturn + volatility * (Math.random() * 2 - 1);
        currentValue = currentValue * (1 + annualReturn);

        path.push({
          year,
          value: Math.round(currentValue),
        });
      }
    }

    simulationPaths.push(path);
  }

  // Calculate percentiles for each year
  const percentileData = timePoints.map((year) => {
    const yearValues = simulationPaths.map((path) => path[year].value);
    yearValues.sort((a, b) => a - b);

    const p10 = yearValues[Math.floor(yearValues.length * 0.1)];
    const p25 = yearValues[Math.floor(yearValues.length * 0.25)];
    const p50 = yearValues[Math.floor(yearValues.length * 0.5)];
    const p75 = yearValues[Math.floor(yearValues.length * 0.75)];
    const p90 = yearValues[Math.floor(yearValues.length * 0.9)];

    return {
      year,
      p10,
      p25,
      p50,
      p75,
      p90,
    };
  });

  return {
    percentileData,
    simulationPaths,
    initialValue,
  };
};

interface MonteCarloProjectionGraphProps {
  portfolioId: string;
}

export default function MonteCarloProjectionGraph({
  portfolioId,
}: MonteCarloProjectionGraphProps) {
  const [years, setYears] = useState(20);
  const [simulations, setSimulations] = useState(100);
  const [showSimulations, setShowSimulations] = useState(false);
  const [data, setData] = useState(() =>
    generateMonteCarloData(portfolioId, years, simulations)
  );

  useEffect(() => {
    setData(generateMonteCarloData(portfolioId, years, simulations));
  }, [portfolioId, years, simulations]);

  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
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
            Year {label}
          </p>
          {payload.map((entry: any, index: number) => {
            if (entry.dataKey === "p50") {
              return (
                <p
                  key={`median-${index}`}
                  className="text-xs text-dashboard-accent-indigo"
                >
                  Median: {formatYAxis(entry.value)}
                </p>
              );
            }
            if (entry.dataKey === "p10") {
              return (
                <p key={`p10-${index}`} className="text-xs text-red-400">
                  10th Percentile: {formatYAxis(entry.value)}
                </p>
              );
            }
            if (entry.dataKey === "p90") {
              return (
                <p key={`p90-${index}`} className="text-xs text-emerald-400">
                  90th Percentile: {formatYAxis(entry.value)}
                </p>
              );
            }
            return null;
          })}
        </motion.div>
      );
    }
    return null;
  };

  const handleRefresh = () => {
    setData(generateMonteCarloData(portfolioId, years, simulations));
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
            <h2 className="dashboard-stat-label">Monte Carlo Projection</h2>
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                    <Info className="h-4 w-4 text-dashboard-text-secondary" />
                    <span className="sr-only">
                      Monte Carlo projection information
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-dashboard-card border-dashboard-card-border text-dashboard-text-primary max-w-[300px]">
                  <p>
                    Monte Carlo simulation showing potential future portfolio
                    values based on historical returns and volatility. The
                    colored bands represent different percentile outcomes.
                  </p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </div>

          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <div className="flex items-center gap-2">
              <Select
                value={years.toString()}
                onValueChange={(value) => setYears(Number.parseInt(value))}
              >
                <SelectTrigger className="w-[100px] h-8 bg-dashboard-card border-dashboard-card-border">
                  <SelectValue placeholder="Years" />
                </SelectTrigger>
                <SelectContent className="bg-dashboard-card border-dashboard-card-border text-dashboard-text-primary">
                  <SelectItem value="5">5 Years</SelectItem>
                  <SelectItem value="10">10 Years</SelectItem>
                  <SelectItem value="20">20 Years</SelectItem>
                  <SelectItem value="30">30 Years</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                className="h-8 border-dashboard-card-border"
                onClick={() => setShowSimulations(!showSimulations)}
              >
                {showSimulations ? "Hide Paths" : "Show Paths"}
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-dashboard-card-border"
                onClick={handleRefresh}
                aria-label="Refresh simulation"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>

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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-dashboard-card/30 rounded-lg p-3">
            <p className="text-xs text-dashboard-text-secondary">
              Initial Investment
            </p>
            <p className="text-lg font-semibold text-dashboard-text-primary">
              ${data.initialValue.toLocaleString()}
            </p>
          </div>
          <div className="bg-dashboard-card/30 rounded-lg p-3">
            <p className="text-xs text-dashboard-text-secondary">
              Median Outcome
            </p>
            <p className="text-lg font-semibold text-dashboard-accent-indigo">
              $
              {data.percentileData[
                data.percentileData.length - 1
              ].p50.toLocaleString()}
            </p>
          </div>
          <div className="bg-dashboard-card/30 rounded-lg p-3">
            <p className="text-xs text-dashboard-text-secondary">
              Optimistic (90th)
            </p>
            <p className="text-lg font-semibold text-emerald-400">
              $
              {data.percentileData[
                data.percentileData.length - 1
              ].p90.toLocaleString()}
            </p>
          </div>
          <div className="bg-dashboard-card/30 rounded-lg p-3">
            <p className="text-xs text-dashboard-text-secondary">
              Conservative (10th)
            </p>
            <p className="text-lg font-semibold text-red-400">
              $
              {data.percentileData[
                data.percentileData.length - 1
              ].p10.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data.percentileData}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
                vertical={false}
              />
              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#a5a5c0", fontSize: 12 }}
                dy={10}
                label={{
                  value: "Years",
                  position: "insideBottom",
                  offset: -5,
                  fill: "#a5a5c0",
                }}
              />
              <YAxis
                tickFormatter={formatYAxis}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#a5a5c0", fontSize: 12 }}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                height={36}
                formatter={(value) => {
                  if (value === "p10")
                    return (
                      <span className="text-red-400 text-xs">
                        10th Percentile
                      </span>
                    );
                  if (value === "p25")
                    return (
                      <span className="text-orange-400 text-xs">
                        25th Percentile
                      </span>
                    );
                  if (value === "p50")
                    return (
                      <span className="text-dashboard-accent-indigo text-xs">
                        Median
                      </span>
                    );
                  if (value === "p75")
                    return (
                      <span className="text-blue-400 text-xs">
                        75th Percentile
                      </span>
                    );
                  if (value === "p90")
                    return (
                      <span className="text-emerald-400 text-xs">
                        90th Percentile
                      </span>
                    );
                  return value;
                }}
              />

              {/* Simulation paths in the background */}
              {showSimulations &&
                data.simulationPaths
                  .slice(0, 30)
                  .map((path, index) => (
                    <Line
                      key={`sim-${index}`}
                      data={path}
                      dataKey="value"
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeWidth={1}
                      dot={false}
                      activeDot={false}
                      isAnimationActive={false}
                      legendType="none"
                    />
                  ))}

              {/* Percentile lines */}
              <Line
                type="monotone"
                dataKey="p10"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: "#ef4444", stroke: "#fff" }}
                name="p10"
              />
              <Line
                type="monotone"
                dataKey="p25"
                stroke="#f97316"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: "#f97316", stroke: "#fff" }}
                name="p25"
              />
              <Line
                type="monotone"
                dataKey="p50"
                stroke="#6366f1"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, fill: "#6366f1", stroke: "#fff" }}
                name="p50"
              />
              <Line
                type="monotone"
                dataKey="p75"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: "#3b82f6", stroke: "#fff" }}
                name="p75"
              />
              <Line
                type="monotone"
                dataKey="p90"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: "#10b981", stroke: "#fff" }}
                name="p90"
              />

              {/* Initial investment reference line */}
              <ReferenceLine
                y={data.initialValue}
                stroke="rgba(255, 255, 255, 0.5)"
                strokeDasharray="3 3"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
