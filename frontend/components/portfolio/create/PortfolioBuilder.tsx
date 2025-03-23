"use client";

import React, { useState, useEffect } from "react";
import { Asset, SelectedAsset } from "./asset";
import Header from "@/components/Header";
import {
  Filter,
  Search,
  Briefcase,
  PieChart,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TableSkeleton } from "@/components/portfolio/create/TableSkeleton";
import { AssetTable } from "@/components/portfolio/create/AssetTable";
import { SelectedAssets } from "@/components/portfolio/create/SelectedAsset";
import { mockAssets } from "@/app/data/mock-assets";
import { SelectedAssetsSkeleton } from "@/components/portfolio/create/SelectedAssetsSkeleton";
import { AllocationChartSkeleton } from "./AllocationChartSkeleton";
import { AllocationChart } from "./AllocationChart";
import { motion } from "framer-motion";

const PortfolioBuilder = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAssets, setSelectedAssets] = useState<SelectedAsset[]>([]);
  const [portfolioName, setPortfolioName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setAssets(mockAssets);
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddAsset = (asset: Asset, allocation: number) => {
    // Check if asset already exists
    if (selectedAssets.some((item) => item.ticker === asset.ticker)) {
      // Update allocation if it exists
      setSelectedAssets((prev) =>
        prev.map((item) =>
          item.ticker === asset.ticker ? { ...item, allocation } : item
        )
      );
    } else {
      // Add new asset
      setSelectedAssets((prev) => [...prev, { ...asset, allocation }]);
    }
  };

  const handleUpdateAllocation = (ticker: string, allocation: number) => {
    setSelectedAssets((prev) =>
      prev.map((asset) =>
        asset.ticker === ticker ? { ...asset, allocation } : asset
      )
    );
  };

  const handleRemoveAsset = (ticker: string) => {
    setSelectedAssets((prev) =>
      prev.filter((asset) => asset.ticker !== ticker)
    );
  };

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.ticker.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || asset.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const assetTypes = [
    "all",
    ...Array.from(new Set(assets.map((asset) => asset.type))),
  ];

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
      <Header
        topic="Portfolio Builder"
        description="Build your portfolio with ease"
      />
      <main className="p-4 md:p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Asset Table */}
          <div className="w-full lg:w-2/3 space-y-6 animate-fadeIn">
            <motion.div
              variants={itemVariants}
              className="flex items-center text-dashboard-text-secondary mb-2"
            >
              <Link
                href="/portfolio"
                className="hover:text-dashboard-text-primary transition-colors"
              >
                Portfolios
              </Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-dashboard-text-primary">New Portfolio</span>
            </motion.div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                Build Your Portfolio
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Enter Portfolio Name"
                  value={portfolioName}
                  onChange={(e) => setPortfolioName(e.target.value)}
                  className="bg-card border-border/40 focus-visible:ring-primary/50"
                />
              </div>
            </div>

            <Card className="border-border/40 bg-card/80 shadow-sm transition-all duration-200 hover:shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-foreground flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-primary" />
                  Filter Assets
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Browse and select assets for your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search assets..."
                      className="pl-8 bg-muted/30 border-border/40 focus-visible:ring-primary/50"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Tabs defaultValue="all" className="w-full md:w-auto">
                    <TabsList className="bg-muted/20 h-10">
                      {assetTypes.map((type) => (
                        <TabsTrigger
                          key={type}
                          value={type}
                          onClick={() => setActiveFilter(type)}
                          className="capitalize data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                          {type}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>

                {isLoading ? (
                  <TableSkeleton />
                ) : (
                  <AssetTable
                    assets={filteredAssets}
                    onAddAsset={handleAddAsset}
                    selectedAssets={selectedAssets}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Selected Assets & Allocation */}
          <div
            className="w-full lg:w-1/3 space-y-6 lg:sticky lg:top-6 self-start animate-fadeIn"
            style={{ animationDelay: "200ms" }}
          >
            <Card className="border-border/40 bg-card/80 shadow-sm transition-all duration-200 hover:shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-foreground flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-primary" />
                  Selected Assets
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {selectedAssets.length} assets selected
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <SelectedAssetsSkeleton />
                ) : (
                  <SelectedAssets
                    assets={selectedAssets}
                    onUpdateAllocation={handleUpdateAllocation}
                    onRemoveAsset={handleRemoveAsset}
                  />
                )}
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-card/80 shadow-sm transition-all duration-200 hover:shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-foreground flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-primary" />
                  Allocation Overview
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Visual breakdown of your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                {isLoading ? (
                  <AllocationChartSkeleton />
                ) : (
                  <AllocationChart assets={selectedAssets} />
                )}
              </CardContent>
              <CardFooter className="border-t border-border/30 pt-4 flex justify-end">
                <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/90 transition-all duration-300">
                  Finalize Portfolio
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PortfolioBuilder;
