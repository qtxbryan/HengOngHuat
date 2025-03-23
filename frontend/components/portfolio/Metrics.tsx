"use client";

import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function PortfolioMetrics() {
  // Sample metrics data
  const metrics = [
    {
      name: "Total Return",
      value: "32.5%",
      isPositive: true,
      tooltip: "The total percentage return of your portfolio since inception.",
    },
    {
      name: "Annualized Return",
      value: "15.8%",
      isPositive: true,
      tooltip:
        "The average annual rate of return of your portfolio, adjusted for the time period.",
    },
    {
      name: "Sharpe Ratio",
      value: "1.42",
      isPositive: true,
      tooltip:
        "A measure of risk-adjusted return. Higher values indicate better risk-adjusted performance.",
    },
    {
      name: "Volatility",
      value: "12.3%",
      isPositive: false,
      tooltip:
        "A measure of the portfolio's price fluctuation. Lower volatility generally indicates lower risk.",
    },
    {
      name: "Max Drawdown",
      value: "-18.7%",
      isPositive: false,
      tooltip:
        "The maximum observed loss from a peak to a trough of your portfolio, before a new peak is attained.",
    },
    {
      name: "Beta",
      value: "0.85",
      isPositive: true,
      tooltip:
        "A measure of your portfolio's volatility compared to the market. Beta < 1 means less volatile than the market.",
    },
    {
      name: "Alpha",
      value: "3.2%",
      isPositive: true,
      tooltip:
        "The excess return of your portfolio relative to the benchmark's return.",
    },
    {
      name: "Dividend Yield",
      value: "2.4%",
      isPositive: true,
      tooltip:
        "The annual dividend income divided by the portfolio's current value.",
    },
    {
      name: "Expense Ratio",
      value: "0.35%",
      isPositive: false,
      tooltip:
        "The percentage of your portfolio's assets that go toward fees and operating expenses.",
    },
    {
      name: "Turnover Ratio",
      value: "28%",
      isPositive: null,
      tooltip:
        "The percentage of your portfolio's holdings that have been replaced in a given year.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="dashboard-card-stats"
    >
      <div className="dashboard-card-content">
        <div className="flex items-center mb-4">
          <h2 className="dashboard-stat-label">Key Metrics</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                  <Info className="h-4 w-4 text-dashboard-text-secondary" />
                  <span className="sr-only">Key metrics information</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-dashboard-card border-dashboard-card-border text-dashboard-text-primary">
                <p>Performance metrics to help you evaluate your portfolio</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 * index }}
              className="bg-dashboard-card/30 rounded-lg p-3"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs text-dashboard-text-secondary">
                  {metric.name}
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 -mr-1"
                      >
                        <Info className="h-3 w-3 text-dashboard-text-secondary" />
                        <span className="sr-only">
                          {metric.name} information
                        </span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="bg-dashboard-card border-dashboard-card-border text-dashboard-text-primary max-w-[200px]"
                    >
                      <p className="text-xs">{metric.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p
                className={`text-lg font-semibold ${
                  metric.isPositive === true
                    ? "text-emerald-400"
                    : metric.isPositive === false
                      ? "text-red-400"
                      : "text-dashboard-text-primary"
                }`}
              >
                {metric.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
