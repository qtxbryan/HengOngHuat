"use client";

import { useState } from "react";
import type { SelectedAsset } from "@/components/portfolio/create/asset";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Trash2, Edit2, Check, X, Percent } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SelectedAssetsProps {
  assets: SelectedAsset[];
  onUpdateAllocation: (ticker: string, allocation: number) => void;
  onRemoveAsset: (ticker: string) => void;
}

export function SelectedAssets({
  assets,
  onUpdateAllocation,
  onRemoveAsset,
}: SelectedAssetsProps) {
  const [editingAsset, setEditingAsset] = useState<string | null>(null);
  const [editAllocation, setEditAllocation] = useState<number>(0);

  const handleStartEdit = (asset: SelectedAsset) => {
    setEditingAsset(asset.ticker);
    setEditAllocation(asset.allocation);
  };

  const handleSaveEdit = (ticker: string) => {
    onUpdateAllocation(ticker, editAllocation);
    setEditingAsset(null);
  };

  const handleCancelEdit = () => {
    setEditingAsset(null);
  };

  // Calculate total allocation
  const totalAllocation = assets.reduce(
    (sum, asset) => sum + asset.allocation,
    0
  );
  const isBalanced = Math.abs(totalAllocation - 100) < 0.01;

  if (assets.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground border border-dashed border-border/40 rounded-md">
        <p>No assets selected yet</p>
        <p className="text-sm mt-2">
          Add assets from the table to build your portfolio
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">
          Total Allocation:
        </span>
        <span
          className={`font-medium ${isBalanced ? "text-green-500" : "text-amber-500"}`}
        >
          {totalAllocation}%
        </span>
      </div>

      {!isBalanced && (
        <div
          className={`p-2 rounded-md text-sm ${Math.abs(totalAllocation - 100) < 10 ? "bg-amber-500/10 text-amber-400" : "bg-red-500/10 text-red-400"}`}
        >
          {totalAllocation < 100
            ? `Your allocation is ${(100 - totalAllocation).toFixed(1)}% below 100%`
            : `Your allocation is ${(totalAllocation - 100).toFixed(1)}% above 100%`}
        </div>
      )}

      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
        {assets.map((asset) => (
          <div
            key={asset.ticker}
            className="p-3 rounded-md border border-border/40 bg-card transition-all hover:shadow-md"
          >
            {editingAsset === asset.ticker ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{asset.ticker}</span>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCancelEdit}
                      className="h-7 w-7 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSaveEdit(asset.ticker)}
                      className="h-7 w-7 hover:bg-green-500/10 hover:text-green-400"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Slider
                    value={[editAllocation]}
                    min={1}
                    max={100}
                    step={1}
                    onValueChange={(value) => setEditAllocation(value[0])}
                    className="flex-1"
                  />
                  <div className="w-14">
                    <Input
                      type="number"
                      value={editAllocation}
                      onChange={(e) =>
                        setEditAllocation(Number(e.target.value))
                      }
                      min={1}
                      max={100}
                      className="h-7 bg-muted/30 border-border/40"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{asset.ticker}</span>
                    <Badge
                      variant="outline"
                      className="capitalize text-xs bg-muted/20"
                    >
                      {asset.type}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1 truncate max-w-[180px]">
                    {asset.name}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleStartEdit(asset)}
                      className="h-7 w-7 hover:bg-primary/10 hover:text-primary"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveAsset(asset.ticker)}
                      className="h-7 w-7 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-sm font-medium mt-1 flex items-center">
                    <Percent className="h-3 w-3 mr-1 text-muted-foreground" />
                    {asset.allocation}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
