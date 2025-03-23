"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  LineChart,
  BarChart,
} from "lucide-react";
import CountUp from "react-countup";

export default function PortfolioSummary() {
  const portfolioValue = 124567.89;
  const changeAmount = 13750.42;
  const changePercent = 12.5;
  const isPositive = changePercent > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="dashboard-card-stats h-full flex flex-col"
    >
      <div className="dashboard-card-content flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h2 className="dashboard-stat-label text-lg">
            Total Portfolio Value
          </h2>
          <div className="dashboard-icon-bg">
            <DollarSign className="h-5 w-5 text-dashboard-accent-indigo" />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-dashboard-text-primary">
              $
            </span>
            <CountUp
              end={portfolioValue}
              decimals={2}
              duration={2}
              separator=","
              className="text-6xl font-bold text-dashboard-text-primary"
            />
          </div>

          <div
            className={`flex items-center mt-2 ${isPositive ? "text-emerald-400" : "text-red-400"}`}
          >
            {isPositive ? (
              <ArrowUpRight className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 mr-1" />
            )}
            <CountUp
              end={changeAmount}
              decimals={2}
              duration={2}
              separator=","
              prefix="$"
              className="font-medium text-sm"
            />
            <span className="mx-1">•</span>
            <span className="font-medium text-sm">{changePercent}%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-dashboard-card/95 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-dashboard-text-secondary">
                Initial Investment
              </p>
              <LineChart className="h-3 w-3 text-dashboard-accent-indigo" />
            </div>
            <p className="text-sm font-semibold mt-1">$98,750.00</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
