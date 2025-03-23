"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Info } from "lucide-react";
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

// Sample holdings data
const portfolioHoldings = {
  "1": [
    { symbol: "AAPL", name: "Apple Inc.", allocation: 12.5, change: 2.3 },
    { symbol: "MSFT", name: "Microsoft Corp.", allocation: 10.2, change: 1.7 },
    { symbol: "AMZN", name: "Amazon.com Inc.", allocation: 8.5, change: -0.8 },
    { symbol: "GOOGL", name: "Alphabet Inc.", allocation: 7.3, change: 1.2 },
    {
      symbol: "BND",
      name: "Vanguard Total Bond ETF",
      allocation: 15.0,
      change: 0.3,
    },
  ],
  "2": [
    {
      symbol: "VTI",
      name: "Vanguard Total Stock Market ETF",
      allocation: 25.0,
      change: 1.5,
    },
    {
      symbol: "VXUS",
      name: "Vanguard Total International Stock ETF",
      allocation: 20.0,
      change: -0.5,
    },
    {
      symbol: "BND",
      name: "Vanguard Total Bond ETF",
      allocation: 30.0,
      change: 0.3,
    },
    {
      symbol: "VNQ",
      name: "Vanguard Real Estate ETF",
      allocation: 10.0,
      change: 2.1,
    },
    { symbol: "CASH", name: "Cash", allocation: 15.0, change: 0.0 },
  ],
  "3": [
    { symbol: "QQQ", name: "Invesco QQQ Trust", allocation: 30.0, change: 2.8 },
    { symbol: "TSLA", name: "Tesla Inc.", allocation: 15.0, change: 4.2 },
    { symbol: "NVDA", name: "NVIDIA Corp.", allocation: 12.5, change: 3.5 },
    {
      symbol: "AMD",
      name: "Advanced Micro Devices",
      allocation: 10.0,
      change: -1.2,
    },
    {
      symbol: "SOXX",
      name: "iShares Semiconductor ETF",
      allocation: 17.5,
      change: 2.1,
    },
  ],
  "4": [
    {
      symbol: "SCHD",
      name: "Schwab US Dividend Equity ETF",
      allocation: 25.0,
      change: 0.8,
    },
    {
      symbol: "VYM",
      name: "Vanguard High Dividend Yield ETF",
      allocation: 20.0,
      change: 0.6,
    },
    {
      symbol: "PFF",
      name: "iShares Preferred & Income Securities ETF",
      allocation: 15.0,
      change: 0.2,
    },
    {
      symbol: "VNQ",
      name: "Vanguard Real Estate ETF",
      allocation: 15.0,
      change: 2.1,
    },
    {
      symbol: "VCLT",
      name: "Vanguard Long-Term Corporate Bond ETF",
      allocation: 10.0,
      change: -0.3,
    },
  ],
};

interface PortfolioHoldingsProps {
  portfolioId: string;
}

export default function PortfolioHoldings({
  portfolioId,
}: PortfolioHoldingsProps) {
  const holdings =
    portfolioHoldings[portfolioId as keyof typeof portfolioHoldings] ||
    portfolioHoldings["1"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="dashboard-card-stats h-full"
    >
      <div className="dashboard-card-content h-full">
        <div className="flex items-center mb-4">
          <h2 className="dashboard-stat-label">Top Holdings</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                  <Info className="h-4 w-4 text-dashboard-text-secondary" />
                  <span className="sr-only">Top holdings information</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-dashboard-card border-dashboard-card-border text-dashboard-text-primary">
                <p>Your portfolio&apos;s largest positions by allocation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="overflow-hidden rounded-md border border-dashboard-card-border">
          <Table>
            <TableHeader className="bg-dashboard-card">
              <TableRow className="hover:bg-transparent border-dashboard-card-border">
                <TableHead className="text-dashboard-text-secondary w-[20%]">
                  Symbol
                </TableHead>
                <TableHead className="text-dashboard-text-secondary w-[40%]">
                  Name
                </TableHead>
                <TableHead className="text-dashboard-text-secondary text-right">
                  Allocation
                </TableHead>
                <TableHead className="text-dashboard-text-secondary text-right">
                  Change
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holdings.map((holding) => (
                <TableRow
                  key={holding.symbol}
                  className="hover:bg-dashboard-card/30 border-dashboard-card-border"
                >
                  <TableCell className="font-medium text-dashboard-accent-indigo">
                    {holding.symbol}
                  </TableCell>
                  <TableCell className="text-dashboard-text-primary">
                    {holding.name}
                  </TableCell>
                  <TableCell className="text-dashboard-text-primary text-right">
                    {holding.allocation}%
                  </TableCell>
                  <TableCell className="text-right">
                    <div
                      className={`flex items-center justify-end ${
                        holding.change > 0
                          ? "text-emerald-400"
                          : holding.change < 0
                            ? "text-red-400"
                            : "text-dashboard-text-secondary"
                      }`}
                    >
                      {holding.change > 0 ? (
                        <ArrowUpRight className="mr-1 h-4 w-4" />
                      ) : holding.change < 0 ? (
                        <ArrowDownRight className="mr-1 h-4 w-4" />
                      ) : null}
                      {Math.abs(holding.change)}%
                    </div>
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
