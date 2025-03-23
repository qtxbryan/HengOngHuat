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

// Sample top movers data
const topMovers = {
  "1": {
    gainers: [
      { symbol: "NVDA", name: "NVIDIA Corp.", change: 8.5, price: 845.2 },
      { symbol: "TSLA", name: "Tesla Inc.", change: 5.2, price: 178.35 },
      {
        symbol: "AMD",
        name: "Advanced Micro Devices",
        change: 4.8,
        price: 172.4,
      },
    ],
    losers: [
      { symbol: "INTC", name: "Intel Corp.", change: -3.2, price: 32.15 },
      { symbol: "NFLX", name: "Netflix Inc.", change: -2.5, price: 605.8 },
      { symbol: "AMZN", name: "Amazon.com Inc.", change: -1.8, price: 178.35 },
    ],
  },
  "2": {
    gainers: [
      {
        symbol: "VNQ",
        name: "Vanguard Real Estate ETF",
        change: 3.1,
        price: 85.4,
      },
      {
        symbol: "VTI",
        name: "Vanguard Total Stock Market ETF",
        change: 1.5,
        price: 245.2,
      },
      {
        symbol: "BND",
        name: "Vanguard Total Bond ETF",
        change: 0.5,
        price: 72.35,
      },
    ],
    losers: [
      {
        symbol: "VXUS",
        name: "Vanguard Total International Stock ETF",
        change: -0.8,
        price: 58.75,
      },
      {
        symbol: "VWO",
        name: "Vanguard Emerging Markets ETF",
        change: -0.6,
        price: 42.3,
      },
      {
        symbol: "VSS",
        name: "Vanguard FTSE All-World ex-US Small-Cap ETF",
        change: -0.4,
        price: 112.85,
      },
    ],
  },
  "3": {
    gainers: [
      { symbol: "TSLA", name: "Tesla Inc.", change: 7.2, price: 178.35 },
      { symbol: "NVDA", name: "NVIDIA Corp.", change: 6.5, price: 845.2 },
      {
        symbol: "SOXX",
        name: "iShares Semiconductor ETF",
        change: 4.1,
        price: 205.4,
      },
    ],
    losers: [
      {
        symbol: "AMD",
        name: "Advanced Micro Devices",
        change: -2.2,
        price: 172.4,
      },
      { symbol: "INTC", name: "Intel Corp.", change: -1.8, price: 32.15 },
      { symbol: "QCOM", name: "Qualcomm Inc.", change: -1.2, price: 165.3 },
    ],
  },
  "4": {
    gainers: [
      {
        symbol: "VNQ",
        name: "Vanguard Real Estate ETF",
        change: 2.1,
        price: 85.4,
      },
      {
        symbol: "SCHD",
        name: "Schwab US Dividend Equity ETF",
        change: 1.2,
        price: 78.25,
      },
      {
        symbol: "VYM",
        name: "Vanguard High Dividend Yield ETF",
        change: 0.9,
        price: 112.4,
      },
    ],
    losers: [
      {
        symbol: "VCLT",
        name: "Vanguard Long-Term Corporate Bond ETF",
        change: -0.7,
        price: 78.15,
      },
      {
        symbol: "PFF",
        name: "iShares Preferred & Income Securities ETF",
        change: -0.4,
        price: 31.8,
      },
      {
        symbol: "SPHD",
        name: "Invesco S&P 500 High Dividend Low Volatility ETF",
        change: -0.3,
        price: 44.25,
      },
    ],
  },
};

interface TopMoversProps {
  portfolioId: string;
}

export default function TopMovers({ portfolioId }: TopMoversProps) {
  const movers =
    topMovers[portfolioId as keyof typeof topMovers] || topMovers["1"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="dashboard-card-stats"
    >
      <div className="dashboard-card-content">
        <div className="flex items-center mb-4">
          <h2 className="dashboard-stat-label">Top Movers</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                  <Info className="h-4 w-4 text-dashboard-text-secondary" />
                  <span className="sr-only">Top movers information</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-dashboard-card border-dashboard-card-border text-dashboard-text-primary">
                <p>Holdings with the largest price movements today</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-emerald-400 mb-2">
              Top Gainers
            </h3>
            <div className="overflow-hidden rounded-md border border-dashboard-card-border">
              <Table>
                <TableHeader className="bg-dashboard-card">
                  <TableRow className="hover:bg-transparent border-dashboard-card-border">
                    <TableHead className="text-dashboard-text-secondary">
                      Symbol
                    </TableHead>
                    <TableHead className="text-dashboard-text-secondary hidden sm:table-cell">
                      Name
                    </TableHead>
                    <TableHead className="text-dashboard-text-secondary text-right">
                      Price
                    </TableHead>
                    <TableHead className="text-dashboard-text-secondary text-right">
                      Change
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {movers.gainers.map((stock) => (
                    <TableRow
                      key={stock.symbol}
                      className="hover:bg-dashboard-card/30 border-dashboard-card-border"
                    >
                      <TableCell className="font-medium text-dashboard-accent-indigo">
                        {stock.symbol}
                      </TableCell>
                      <TableCell className="text-dashboard-text-primary hidden sm:table-cell">
                        {stock.name}
                      </TableCell>
                      <TableCell className="text-dashboard-text-primary text-right">
                        ${stock.price}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end text-emerald-400">
                          <ArrowUpRight className="mr-1 h-4 w-4" />
                          {stock.change}%
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-red-400 mb-2">
              Top Losers
            </h3>
            <div className="overflow-hidden rounded-md border border-dashboard-card-border">
              <Table>
                <TableHeader className="bg-dashboard-card">
                  <TableRow className="hover:bg-transparent border-dashboard-card-border">
                    <TableHead className="text-dashboard-text-secondary">
                      Symbol
                    </TableHead>
                    <TableHead className="text-dashboard-text-secondary hidden sm:table-cell">
                      Name
                    </TableHead>
                    <TableHead className="text-dashboard-text-secondary text-right">
                      Price
                    </TableHead>
                    <TableHead className="text-dashboard-text-secondary text-right">
                      Change
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {movers.losers.map((stock) => (
                    <TableRow
                      key={stock.symbol}
                      className="hover:bg-dashboard-card/30 border-dashboard-card-border"
                    >
                      <TableCell className="font-medium text-dashboard-accent-indigo">
                        {stock.symbol}
                      </TableCell>
                      <TableCell className="text-dashboard-text-primary hidden sm:table-cell">
                        {stock.name}
                      </TableCell>
                      <TableCell className="text-dashboard-text-primary text-right">
                        ${stock.price}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end text-red-400">
                          <ArrowDownRight className="mr-1 h-4 w-4" />
                          {Math.abs(stock.change)}%
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
