"use client";

import React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  ChevronUp,
  Eye,
  PlusCircle,
  ArrowUpDown,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

// Sample portfolio data
const portfolios = [
  {
    id: 1,
    name: "Growth Portfolio",
    value: 58750.42,
    change: 15.3,
    allocation: [
      { name: "Stocks", percentage: 70, color: "bg-indigo-500" },
      { name: "Bonds", percentage: 20, color: "bg-purple-500" },
      { name: "Cash", percentage: 10, color: "bg-emerald-500" },
    ],
  },
  {
    id: 2,
    name: "Retirement Fund",
    value: 32456.18,
    change: 8.7,
    allocation: [
      { name: "Stocks", percentage: 60, color: "bg-indigo-500" },
      { name: "Bonds", percentage: 30, color: "bg-purple-500" },
      { name: "Real Estate", percentage: 10, color: "bg-amber-500" },
    ],
  },
  {
    id: 3,
    name: "Tech Investments",
    value: 18965.75,
    change: 22.4,
    allocation: [
      { name: "Tech Stocks", percentage: 85, color: "bg-indigo-500" },
      { name: "Cash", percentage: 15, color: "bg-emerald-500" },
    ],
  },
  {
    id: 4,
    name: "Dividend Income",
    value: 14395.54,
    change: 5.2,
    allocation: [
      { name: "Dividend Stocks", percentage: 75, color: "bg-indigo-500" },
      { name: "REITs", percentage: 15, color: "bg-amber-500" },
      { name: "Bonds", percentage: 10, color: "bg-purple-500" },
    ],
  },
];

const PortfolioTable = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("value");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  const sortedPortfolios = [...portfolios].sort((a, b) => {
    let comparison = 0;

    if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === "value") {
      comparison = a.value - b.value;
    } else if (sortBy === "change") {
      comparison = a.change - b.change;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="dashboard-card-stats"
    >
      <div className="dashboard-card-content">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="dashboard-stat-label">Your Portfolios</h2>
            <p className="text-sm text-dashboard-text-secondary">
              Manage and track your investment portfolios
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/portfolios/create">
              <Button
                variant="outline"
                className="gap-2 bg-[#0f3460]/50 border-[#0f3460] text-purple-300 hover:text-white hover:bg-[#0f3460]"
              >
                <PlusCircle className="h-4 w-4" />
                Add Portfolio
              </Button>
            </Link>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
              <Plus className="mr-2 h-4 w-4" /> AI creation
            </Button>
          </div>
        </div>

        <div className="rounded-md border border-dashboard-card-border overflow-hidden">
          <Table>
            <TableHeader className="bg-dashboard-card">
              <TableRow className="hover:bg-transparent border-dashboard-card-border">
                <TableHead
                  className="text-dashboard-text-secondary cursor-pointer w-[40%]"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center pl-2">
                    Portfolio Name
                    <ArrowUpDown
                      className={`ml-1 h-4 w-4 ${sortBy === "name" ? "opacity-100" : "opacity-50"}`}
                    />
                  </div>
                </TableHead>
                <TableHead
                  className="text-dashboard-text-secondary cursor-pointer"
                  onClick={() => handleSort("value")}
                >
                  <div className="flex items-center">
                    Current Value
                    <ArrowUpDown
                      className={`ml-1 h-4 w-4 ${sortBy === "value" ? "opacity-100" : "opacity-50"}`}
                    />
                  </div>
                </TableHead>
                <TableHead
                  className="text-dashboard-text-secondary cursor-pointer"
                  onClick={() => handleSort("change")}
                >
                  <div className="flex items-center">
                    Change
                    <ArrowUpDown
                      className={`ml-1 h-4 w-4 ${sortBy === "change" ? "opacity-100" : "opacity-50"}`}
                    />
                  </div>
                </TableHead>
                <TableHead className="text-dashboard-text-secondary text-right">
                  Composition
                </TableHead>
                <TableHead className="text-dashboard-text-secondary text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedPortfolios.map((portfolio) => (
                <React.Fragment key={portfolio.id}>
                  <TableRow className="hover:bg-dashboard-card/30 border-dashboard-card-border">
                    <TableCell className="font-medium text-dashboard-text-primary">
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mr-2 p-0 h-6 w-6"
                          onClick={() => toggleExpand(portfolio.id)}
                          aria-label={
                            expandedId === portfolio.id
                              ? "Collapse details"
                              : "Expand details"
                          }
                        >
                          {expandedId === portfolio.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                        {portfolio.name}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-dashboard-text-primary">
                      {formatCurrency(portfolio.value)}
                    </TableCell>
                    <TableCell>
                      <div
                        className={`flex items-center ${portfolio.change > 0 ? "text-emerald-400" : "text-red-400"}`}
                      >
                        {portfolio.change > 0 ? (
                          <ArrowUpRight className="mr-1 h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="mr-1 h-4 w-4" />
                        )}
                        {portfolio.change}%
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-1">
                        {portfolio.allocation.map((asset, index) => (
                          <div
                            key={index}
                            className={`h-3 w-3 rounded-full ${asset.color}`}
                            title={`${asset.name}: ${asset.percentage}%`}
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 hover:bg-dashboard-accent-indigo/20"
                        aria-label={`View details for ${portfolio.name}`}
                        onClick={() => toggleExpand(portfolio.id)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline">Details</span>
                      </Button>
                    </TableCell>
                  </TableRow>

                  <AnimatePresence>
                    {expandedId === portfolio.id && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-dashboard-card/30 border-dashboard-card-border"
                      >
                        <td colSpan={5} className="p-0">
                          <div className="p-4">
                            <h4 className="font-medium mb-3 text-dashboard-text-primary">
                              Asset Allocation
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-3">
                                {portfolio.allocation.map((asset, index) => (
                                  <div key={index} className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-dashboard-text-secondary">
                                        {asset.name}
                                      </span>
                                      <span className="text-dashboard-text-primary">
                                        {asset.percentage}%
                                      </span>
                                    </div>
                                    <Progress
                                      value={asset.percentage}
                                      className={`h-2 ${asset.color}`}
                                    />
                                  </div>
                                ))}
                              </div>
                              <div className="flex flex-col justify-between">
                                <div>
                                  <p className="text-sm text-dashboard-text-secondary mb-1">
                                    Portfolio Description
                                  </p>
                                  <p className="text-sm text-dashboard-text-primary">
                                    {portfolio.name} is designed to{" "}
                                    {portfolio.name.includes("Growth")
                                      ? "maximize long-term growth potential with higher risk tolerance"
                                      : portfolio.name.includes("Retirement")
                                        ? "provide stable growth for retirement planning"
                                        : portfolio.name.includes("Tech")
                                          ? "capitalize on technology sector growth opportunities"
                                          : "generate consistent income through dividend-paying assets"}
                                    .
                                  </p>
                                </div>
                                <div className="flex justify-end gap-2 mt-4">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-dashboard-card-border"
                                  >
                                    Add Funds
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="dashboard-button-gradient"
                                  >
                                    <Link href={`/portfolios/${portfolio.id}`}>
                                      View Details
                                    </Link>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioTable;
