"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Header from "@/components/Header";
import PerformanceChart from "./PerformanceChart";
import PortfolioMetrics from "./Metrics";
import AssetAllocationChart from "@/components/PieChart";
import PortfolioHoldings from "./PortfolioHoldingTable";
import TopMoversTable from "./TopMoversTable";
import MaxDrawdownChart from "./MaxDrawdownChart";
import SectorPerformanceGraph from "./SectorPerformanceChart";
import SectorCompositionChart from "./SectorCompositionChart";
import SectorCorrelationMatrix from "./SectorCorrelationMatrix";
import SectorExposureChart from "./SectorExposureChart";
import SectorMetricsTable from "./SectorMetricsTable";
import MonteCarloProjectionGraph from "./MonteCarloChart";
import AnalysisCard from "./AnalysisCard";

// Sample portfolio data
const portfolios = [
  {
    id: "1",
    name: "Growth Portfolio",
    value: 58750.42,
    change: 15.3,
    allocation: [
      { name: "Stocks", percentage: 70, color: "#6366f1" },
      { name: "Bonds", percentage: 20, color: "#a855f7" },
      { name: "Cash", percentage: 10, color: "#10b981" },
    ],
  },
  {
    id: "2",
    name: "Retirement Fund",
    value: 32456.18,
    change: 8.7,
    allocation: [
      { name: "Stocks", percentage: 60, color: "#6366f1" },
      { name: "Bonds", percentage: 30, color: "#a855f7" },
      { name: "Real Estate", percentage: 10, color: "#f59e0b" },
    ],
  },
  {
    id: "3",
    name: "Tech Investments",
    value: 18965.75,
    change: 22.4,
    allocation: [
      { name: "Tech Stocks", percentage: 85, color: "#6366f1" },
      { name: "Cash", percentage: 15, color: "#10b981" },
    ],
  },
  {
    id: "4",
    name: "Dividend Income",
    value: 14395.54,
    change: 5.2,
    allocation: [
      { name: "Dividend Stocks", percentage: 75, color: "#6366f1" },
      { name: "REITs", percentage: 15, color: "#f59e0b" },
      { name: "Bonds", percentage: 10, color: "#a855f7" },
    ],
  },
];

interface DetailedPortfolioProps {
  portfolioId: string;
}

export default function DetailedPortfolio({
  portfolioId,
}: DetailedPortfolioProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Find the portfolio by ID
  const portfolio =
    portfolios.find((p) => p.id === portfolioId) || portfolios[0];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="flex-1 transition-all duration-300 ease-in-out md:ml-[280px]">
      <Header topic="Portfolio" description="Detailed Portfolio" />
      <main className="p-4 md:p-6">
        <motion.div
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center text-dashboard-text-secondary mb-2"
          >
            <Link
              href="/portfolios"
              className="hover:text-dashboard-text-primary transition-colors"
            >
              Portfolios
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-dashboard-text-primary">
              {portfolio.name}
            </span>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex justify-between items-center mt-4"
          >
            <h1 className="text-2xl font-bold text-dashboard-text-primary">
              {portfolio.name}
            </h1>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-dashboard-card-border"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-dashboard-card-border"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mb-4"
        >
          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="bg-dashboard-card border border-dashboard-card-border mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sector">Sector</TabsTrigger>
              <TabsTrigger value="projection">Projection</TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="overview" className="mt-0">
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 gap-4"
                >
                  <div className="grid grid-cols-1 gap-4">
                    <PerformanceChart portfolioId={portfolioId} />
                    <PortfolioMetrics />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <AssetAllocationChart portfolioId={portfolioId} />
                      <PortfolioHoldings portfolioId={portfolioId} />
                    </div>

                    <TopMoversTable portfolioId={portfolioId} />

                    <MaxDrawdownChart portfolioId={portfolioId} />
                  </div>
                </motion.div>
              </TabsContent>

              {/* TAB 2 */}
              <TabsContent value="sector" className="mt-0">
                <motion.div
                  key="sector"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 gap-4">
                    <SectorPerformanceGraph portfolioId={portfolioId} />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <SectorCompositionChart portfolioId={portfolioId} />
                      <SectorCorrelationMatrix portfolioId={portfolioId} />
                      <SectorExposureChart portfolioId={portfolioId} />
                    </div>

                    <SectorMetricsTable portfolioId={portfolioId} />
                  </div>
                </motion.div>
              </TabsContent>

              {/* TAB 3 */}
              <TabsContent value="projection" className="mt-0">
                <motion.div
                  key="projection"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 gap-4">
                    <MonteCarloProjectionGraph portfolioId={portfolioId} />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <AnalysisCard
                        portfolioId={portfolioId}
                        type="general"
                        title="General Market Analysis"
                      />
                      <AnalysisCard
                        portfolioId={portfolioId}
                        type="portfolio"
                        title="Portfolio-Specific Analysis"
                      />
                      <AnalysisCard
                        portfolioId={portfolioId}
                        type="sector"
                        title="Sector-Specific Analysis"
                      />
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}
