"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpDown, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Sample sector metrics data
const sectorMetricsData = {
  "1": [
    {
      sector: "Technology",
      allocation: 35,
      return: 18.5,
      volatility: 22.3,
      sharpe: 0.83,
      beta: 1.25,
      alpha: 3.2,
      pe: 28.5,
      dividendYield: 1.2,
    },
    {
      sector: "Healthcare",
      allocation: 20,
      return: 12.3,
      volatility: 18.5,
      sharpe: 0.67,
      beta: 0.85,
      alpha: 2.1,
      pe: 22.3,
      dividendYield: 1.8,
    },
    {
      sector: "Financials",
      allocation: 15,
      return: 9.8,
      volatility: 20.1,
      sharpe: 0.49,
      beta: 1.1,
      alpha: 0.8,
      pe: 15.2,
      dividendYield: 2.5,
    },
    {
      sector: "Consumer Discretionary",
      allocation: 12,
      return: 14.2,
      volatility: 19.8,
      sharpe: 0.72,
      beta: 1.05,
      alpha: 2.5,
      pe: 24.8,
      dividendYield: 1.5,
    },
    {
      sector: "Industrials",
      allocation: 10,
      return: 7.5,
      volatility: 17.2,
      sharpe: 0.44,
      beta: 0.95,
      alpha: 0.3,
      pe: 18.5,
      dividendYield: 2.1,
    },
    {
      sector: "Utilities",
      allocation: 8,
      return: 5.2,
      volatility: 12.5,
      sharpe: 0.42,
      beta: 0.65,
      alpha: 0.1,
      pe: 16.2,
      dividendYield: 3.5,
    },
  ],
  "2": [
    {
      sector: "Financials",
      allocation: 25,
      return: 10.5,
      volatility: 19.2,
      sharpe: 0.55,
      beta: 1.15,
      alpha: 1.2,
      pe: 14.8,
      dividendYield: 2.8,
    },
    {
      sector: "Technology",
      allocation: 20,
      return: 15.8,
      volatility: 21.5,
      sharpe: 0.73,
      beta: 1.2,
      alpha: 2.8,
      pe: 27.2,
      dividendYield: 1.0,
    },
    {
      sector: "Healthcare",
      allocation: 18,
      return: 9.2,
      volatility: 17.8,
      sharpe: 0.52,
      beta: 0.8,
      alpha: 1.5,
      pe: 21.5,
      dividendYield: 2.0,
    },
    {
      sector: "Utilities",
      allocation: 15,
      return: 6.5,
      volatility: 11.8,
      sharpe: 0.55,
      beta: 0.6,
      alpha: 0.5,
      pe: 15.8,
      dividendYield: 3.8,
    },
    {
      sector: "Consumer Discretionary",
      allocation: 12,
      return: 11.3,
      volatility: 18.5,
      sharpe: 0.61,
      beta: 1.0,
      alpha: 1.8,
      pe: 23.5,
      dividendYield: 1.7,
    },
    {
      sector: "Industrials",
      allocation: 10,
      return: 8.1,
      volatility: 16.5,
      sharpe: 0.49,
      beta: 0.9,
      alpha: 0.7,
      pe: 17.8,
      dividendYield: 2.3,
    },
  ],
  "3": [
    {
      sector: "Technology",
      allocation: 65,
      return: 22.5,
      volatility: 25.8,
      sharpe: 0.87,
      beta: 1.35,
      alpha: 4.5,
      pe: 32.5,
      dividendYield: 0.8,
    },
    {
      sector: "Consumer Discretionary",
      allocation: 15,
      return: 16.8,
      volatility: 21.2,
      sharpe: 0.79,
      beta: 1.15,
      alpha: 3.2,
      pe: 26.8,
      dividendYield: 1.2,
    },
    {
      sector: "Healthcare",
      allocation: 10,
      return: 14.2,
      volatility: 19.5,
      sharpe: 0.73,
      beta: 0.9,
      alpha: 2.8,
      pe: 24.5,
      dividendYield: 1.5,
    },
    {
      sector: "Financials",
      allocation: 5,
      return: 8.5,
      volatility: 18.2,
      sharpe: 0.47,
      beta: 1.05,
      alpha: 0.5,
      pe: 15.5,
      dividendYield: 2.2,
    },
    {
      sector: "Industrials",
      allocation: 5,
      return: 7.2,
      volatility: 16.8,
      sharpe: 0.43,
      beta: 0.95,
      alpha: 0.2,
      pe: 18.2,
      dividendYield: 2.0,
    },
  ],
  "4": [
    {
      sector: "Financials",
      allocation: 30,
      return: 8.2,
      volatility: 17.5,
      sharpe: 0.47,
      beta: 1.05,
      alpha: 0.6,
      pe: 14.2,
      dividendYield: 3.2,
    },
    {
      sector: "Utilities",
      allocation: 25,
      return: 5.5,
      volatility: 10.8,
      sharpe: 0.51,
      beta: 0.55,
      alpha: 0.3,
      pe: 15.5,
      dividendYield: 4.2,
    },
    {
      sector: "Consumer Discretionary",
      allocation: 15,
      return: 9.8,
      volatility: 17.2,
      sharpe: 0.57,
      beta: 0.95,
      alpha: 1.2,
      pe: 22.2,
      dividendYield: 2.0,
    },
    {
      sector: "Healthcare",
      allocation: 15,
      return: 7.5,
      volatility: 16.5,
      sharpe: 0.45,
      beta: 0.75,
      alpha: 0.8,
      pe: 20.5,
      dividendYield: 2.5,
    },
    {
      sector: "Technology",
      allocation: 10,
      return: 12.5,
      volatility: 20.2,
      sharpe: 0.62,
      beta: 1.15,
      alpha: 1.8,
      pe: 26.2,
      dividendYield: 1.2,
    },
    {
      sector: "Industrials",
      allocation: 5,
      return: 6.2,
      volatility: 15.5,
      sharpe: 0.4,
      beta: 0.85,
      alpha: 0.2,
      pe: 17.5,
      dividendYield: 2.2,
    },
  ],
};

// Metric descriptions for tooltips
const metricDescriptions = {
  allocation: "Percentage of portfolio allocated to this sector",
  return: "Annual percentage return for this sector",
  volatility: "Standard deviation of returns, a measure of risk",
  sharpe: "Risk-adjusted return (higher is better)",
  beta: "Sensitivity to market movements (>1 means more volatile than market)",
  alpha: "Excess return compared to benchmark",
  pe: "Price-to-earnings ratio",
  dividendYield: "Annual dividend as percentage of share price",
};

interface SectorMetricsTableProps {
  portfolioId: string;
}

export default function SectorMetricsTable({
  portfolioId,
}: SectorMetricsTableProps) {
  const [sortBy, setSortBy] = useState<string>("allocation");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Get data for the portfolio
  const data =
    sectorMetricsData[portfolioId as keyof typeof sectorMetricsData] ||
    sectorMetricsData["1"];

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a] as number;
    const bValue = b[sortBy as keyof typeof b] as number;

    return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="dashboard-card-stats"
    >
      <div className="dashboard-card-content">
        <div className="flex items-center mb-4">
          <h2 className="dashboard-stat-label">Sector Metrics</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                  <Info className="h-4 w-4 text-dashboard-text-secondary" />
                  <span className="sr-only">Sector metrics information</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-dashboard-card border-dashboard-card-border text-dashboard-text-primary">
                <p>
                  Detailed performance metrics for each sector in your portfolio
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-dashboard-card">
              <TableRow className="hover:bg-transparent border-dashboard-card-border">
                <TableHead className="text-dashboard-text-secondary">
                  Sector
                </TableHead>

                <TableHead
                  className="text-dashboard-text-secondary cursor-pointer text-right"
                  onClick={() => handleSort("allocation")}
                >
                  <div className="flex items-center justify-end">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="flex items-center">
                          Allocation
                          <ArrowUpDown
                            className={`ml-1 h-4 w-4 ${sortBy === "allocation" ? "opacity-100" : "opacity-50"}`}
                          />
                        </TooltipTrigger>
                        <TooltipContent className="bg-dashboard-card border-dashboard-card-border text-dashboard-text-primary">
                          <p>{metricDescriptions.allocation}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableHead>

                <TableHead
                  className="text-dashboard-text-secondary cursor-pointer text-right"
                  onClick={() => handleSort("return")}
                >
                  <div className="flex items-center justify-end">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="flex items-center">
                          Return
                          <ArrowUpDown
                            className={`ml-1 h-4 w-4 ${sortBy === "return" ? "opacity-100" : "opacity-50"}`}
                          />
                        </TooltipTrigger>
                        <TooltipContent className="bg-dashboard-card border-dashboard-card-border text-dashboard-text-primary">
                          <p>{metricDescriptions.return}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableHead>

                <TableHead
                  className="text-dashboard-text-secondary cursor-pointer text-right"
                  onClick={() => handleSort("volatility")}
                >
                  <div className="flex items-center justify-end">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="flex items-center">
                          Volatility
                          <ArrowUpDown
                            className={`ml-1 h-4 w-4 ${sortBy === "volatility" ? "opacity-100" : "opacity-50"}`}
                          />
                        </TooltipTrigger>
                        <TooltipContent className="bg-dashboard-card border-dashboard-card-border text-dashboard-text-primary">
                          <p>{metricDescriptions.volatility}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableHead>

                <TableHead
                  className="text-dashboard-text-secondary cursor-pointer text-right"
                  onClick={() => handleSort("sharpe")}
                >
                  <div className="flex items-center justify-end">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="flex items-center">
                          Sharpe
                          <ArrowUpDown
                            className={`ml-1 h-4 w-4 ${sortBy === "sharpe" ? "opacity-100" : "opacity-50"}`}
                          />
                        </TooltipTrigger>
                        <TooltipContent className="bg-dashboard-card border-dashboard-card-border text-dashboard-text-primary">
                          <p>{metricDescriptions.sharpe}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableHead>

                <TableHead
                  className="text-dashboard-text-secondary cursor-pointer text-right"
                  onClick={() => handleSort("beta")}
                >
                  <div className="flex items-center justify-end">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="flex items-center">
                          Beta
                          <ArrowUpDown
                            className={`ml-1 h-4 w-4 ${sortBy === "beta" ? "opacity-100" : "opacity-50"}`}
                          />
                        </TooltipTrigger>
                        <TooltipContent className="bg-dashboard-card border-dashboard-card-border text-dashboard-text-primary">
                          <p>{metricDescriptions.beta}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableHead>

                <TableHead
                  className="text-dashboard-text-secondary cursor-pointer text-right"
                  onClick={() => handleSort("alpha")}
                >
                  <div className="flex items-center justify-end">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="flex items-center">
                          Alpha
                          <ArrowUpDown
                            className={`ml-1 h-4 w-4 ${sortBy === "alpha" ? "opacity-100" : "opacity-50"}`}
                          />
                        </TooltipTrigger>
                        <TooltipContent className="bg-dashboard-card border-dashboard-card-border text-dashboard-text-primary">
                          <p>{metricDescriptions.alpha}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableHead>

                <TableHead
                  className="text-dashboard-text-secondary cursor-pointer text-right"
                  onClick={() => handleSort("pe")}
                >
                  <div className="flex items-center justify-end">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="flex items-center">
                          P/E
                          <ArrowUpDown
                            className={`ml-1 h-4 w-4 ${sortBy === "pe" ? "opacity-100" : "opacity-50"}`}
                          />
                        </TooltipTrigger>
                        <TooltipContent className="bg-dashboard-card border-dashboard-card-border text-dashboard-text-primary">
                          <p>{metricDescriptions.pe}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableHead>

                <TableHead
                  className="text-dashboard-text-secondary cursor-pointer text-right"
                  onClick={() => handleSort("dividendYield")}
                >
                  <div className="flex items-center justify-end">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="flex items-center">
                          Div Yield
                          <ArrowUpDown
                            className={`ml-1 h-4 w-4 ${sortBy === "dividendYield" ? "opacity-100" : "opacity-50"}`}
                          />
                        </TooltipTrigger>
                        <TooltipContent className="bg-dashboard-card border-dashboard-card-border text-dashboard-text-primary">
                          <p>{metricDescriptions.dividendYield}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((row, index) => (
                <TableRow
                  key={row.sector}
                  className="hover:bg-dashboard-card/30 border-dashboard-card-border"
                >
                  <TableCell className="font-medium text-dashboard-text-primary">
                    {row.sector}
                  </TableCell>
                  <TableCell className="text-dashboard-text-primary text-right">
                    {row.allocation}%
                  </TableCell>
                  <TableCell className="text-dashboard-text-primary text-right">
                    {row.return}%
                  </TableCell>
                  <TableCell className="text-dashboard-text-primary text-right">
                    {row.volatility}%
                  </TableCell>
                  <TableCell className="text-dashboard-text-primary text-right">
                    {row.sharpe}
                  </TableCell>
                  <TableCell className="text-dashboard-text-primary text-right">
                    {row.beta}
                  </TableCell>
                  <TableCell className="text-dashboard-text-primary text-right">
                    {row.alpha}%
                  </TableCell>
                  <TableCell className="text-dashboard-text-primary text-right">
                    {row.pe}
                  </TableCell>
                  <TableCell className="text-dashboard-text-primary text-right">
                    {row.dividendYield}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </motion.div>
  );
}
