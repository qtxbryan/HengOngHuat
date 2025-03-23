"use client";

import { DialogFooter } from "@/components/ui/dialog";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import type { Asset, SelectedAsset } from "@/components/portfolio/create/asset";
import {
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Plus,
  Percent,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssetMetrics } from "@/components/portfolio/create/AssetMetrics";
import { AssetNews } from "@/components/portfolio/create/AssetNews";
import { AssetAnalysis } from "@/components/portfolio/create/AssetAnalysis";
import {
  MetricsSkeleton,
  NewsSkeleton,
  AnalysisSkeleton,
} from "@/components/portfolio/create/AssetSkeleton";

interface AssetTableProps {
  assets: Asset[];
  onAddAsset: (asset: Asset, allocation: number) => void;
  selectedAssets: SelectedAsset[];
}

export function AssetTable({
  assets,
  onAddAsset,
  selectedAssets,
}: AssetTableProps) {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [allocation, setAllocation] = useState<number>(5);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isLoadingMetrics, setIsLoadingMetrics] = useState<boolean>(false);
  const [isLoadingNews, setIsLoadingNews] = useState<boolean>(false);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState<boolean>(false);

  const handleOpenDialog = (asset: Asset) => {
    setSelectedAsset(asset);

    // If asset is already selected, use its current allocation
    const existingAsset = selectedAssets.find(
      (item) => item.ticker === asset.ticker
    );
    if (existingAsset) {
      setAllocation(existingAsset.allocation);
    } else {
      setAllocation(5); // Default allocation
    }

    setIsDialogOpen(true);
  };

  const handleAddToPortfolio = () => {
    if (selectedAsset) {
      onAddAsset(selectedAsset, allocation);
      setIsDialogOpen(false);
    }
  };

  const isAssetSelected = (ticker: string) => {
    return selectedAssets.some((asset) => asset.ticker === ticker);
  };

  useEffect(() => {
    if (isDialogOpen) {
      // Simulate loading metrics data
      setIsLoadingMetrics(true);
      const metricsTimer = setTimeout(() => {
        setIsLoadingMetrics(false);
      }, 1000);

      // Simulate loading news data
      setIsLoadingNews(true);
      const newsTimer = setTimeout(() => {
        setIsLoadingNews(false);
      }, 1500);

      // Simulate loading analysis data
      setIsLoadingAnalysis(true);
      const analysisTimer = setTimeout(() => {
        setIsLoadingAnalysis(false);
      }, 2000);

      return () => {
        clearTimeout(metricsTimer);
        clearTimeout(newsTimer);
        clearTimeout(analysisTimer);
      };
    }
  }, [isDialogOpen]);

  return (
    <>
      <div className="rounded-md border border-border/40 overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/20">
            <TableRow className="hover:bg-muted/10">
              <TableHead className="w-[100px]">Ticker</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Change</TableHead>
              <TableHead className="text-right w-[100px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  No assets found matching your criteria
                </TableCell>
              </TableRow>
            ) : (
              assets.map((asset) => (
                <TableRow
                  key={asset.ticker}
                  className={`hover:bg-muted/10 transition-colors ${isAssetSelected(asset.ticker) ? "bg-primary/5" : ""}`}
                >
                  <TableCell className="font-medium">{asset.ticker}</TableCell>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="capitalize bg-muted/20 hover:bg-muted/30"
                    >
                      {asset.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    ${asset.price.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`flex items-center justify-end ${asset.changePercentage >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {asset.changePercentage >= 0 ? (
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                      )}
                      {Math.abs(asset.changePercentage)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenDialog(asset)}
                      className="hover:bg-primary/20 hover:text-primary transition-colors"
                    >
                      {isAssetSelected(asset.ticker) ? (
                        <span className="flex items-center">
                          <MoreHorizontal className="h-4 w-4 mr-1" />
                          Edit
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </span>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card border-border/40 sm:max-w-[550px] max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {selectedAsset?.name} ({selectedAsset?.ticker})
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Configure allocation and view detailed information
            </DialogDescription>
          </DialogHeader>

          <Tabs
            defaultValue="metrics"
            className="flex-1 overflow-hidden flex flex-col"
          >
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger
                value="metrics"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Metrics
              </TabsTrigger>
              <TabsTrigger
                value="news"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                News
              </TabsTrigger>
              <TabsTrigger
                value="analysis"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Analysis
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-hidden">
              <TabsContent
                value="metrics"
                className="mt-0 h-full overflow-y-auto pr-1 data-[state=active]:animate-fadeIn"
              >
                {isLoadingMetrics ? (
                  <MetricsSkeleton />
                ) : (
                  <AssetMetrics asset={selectedAsset} />
                )}
              </TabsContent>

              <TabsContent
                value="news"
                className="mt-0 h-full overflow-y-auto pr-1 data-[state=active]:animate-fadeIn"
              >
                {isLoadingNews ? (
                  <NewsSkeleton />
                ) : (
                  <AssetNews asset={selectedAsset} />
                )}
              </TabsContent>

              <TabsContent
                value="analysis"
                className="mt-0 h-full overflow-y-auto pr-1 data-[state=active]:animate-fadeIn"
              >
                {isLoadingAnalysis ? (
                  <AnalysisSkeleton />
                ) : (
                  <AssetAnalysis asset={selectedAsset} />
                )}
              </TabsContent>
            </div>
          </Tabs>

          <div className="border-t border-border/30 pt-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center">
                  Allocation Percentage
                  <Percent className="h-4 w-4 ml-1 text-muted-foreground" />
                </label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[allocation]}
                    min={1}
                    max={100}
                    step={1}
                    onValueChange={(value) => setAllocation(value[0])}
                    className="flex-1"
                  />
                  <div className="w-16">
                    <Input
                      type="number"
                      value={allocation}
                      onChange={(e) => setAllocation(Number(e.target.value))}
                      min={1}
                      max={100}
                      className="bg-muted/30 border-border/40"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  This asset will represent {allocation}% of your portfolio
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="border-border/40 hover:bg-muted/20 hover:text-foreground"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddToPortfolio}
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/90"
            >
              {isAssetSelected(selectedAsset?.ticker || "")
                ? "Update Allocation"
                : "Add to Portfolio"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
