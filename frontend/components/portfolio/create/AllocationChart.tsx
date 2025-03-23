"use client";

import { useEffect, useRef } from "react";
import type { SelectedAsset } from "@/components/portfolio/create/asset";

interface AllocationChartProps {
  assets: SelectedAsset[];
}

export function AllocationChart({ assets }: AllocationChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || assets.length === 0) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Set dimensions
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Calculate total allocation
    const totalAllocation = assets.reduce(
      (sum, asset) => sum + asset.allocation,
      0
    );

    // Generate colors based on asset types
    const colorMap: Record<string, string> = {
      stock: "rgba(124, 58, 237, 0.8)", // Purple (primary)
      crypto: "rgba(236, 72, 153, 0.8)", // Pink (accent)
      bond: "rgba(59, 130, 246, 0.8)", // Blue
      etf: "rgba(16, 185, 129, 0.8)", // Green
      commodity: "rgba(245, 158, 11, 0.8)", // Amber
    };

    // Draw pie chart
    let startAngle = 0;
    assets.forEach((asset) => {
      const sliceAngle = (asset.allocation / totalAllocation) * 2 * Math.PI;

      // Draw slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();

      // Fill with color based on asset type
      ctx.fillStyle = colorMap[asset.type] || "rgba(156, 163, 175, 0.8)"; // Gray fallback
      ctx.fill();

      // Draw border
      ctx.strokeStyle = "rgba(30, 41, 59, 0.5)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Calculate position for label
      const labelAngle = startAngle + sliceAngle / 2;
      const labelRadius = radius * 0.7;
      const labelX = centerX + Math.cos(labelAngle) * labelRadius;
      const labelY = centerY + Math.sin(labelAngle) * labelRadius;

      // Draw label if slice is big enough
      if (asset.allocation / totalAllocation > 0.05) {
        ctx.font = "12px Inter, sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(asset.ticker, labelX, labelY);
      }

      startAngle += sliceAngle;
    });

    // Draw center circle (donut hole)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.4, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(30, 41, 59, 0.8)";
    ctx.fill();

    // Draw total allocation in center
    ctx.font = "bold 14px Inter, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${totalAllocation}%`, centerX, centerY - 10);
    ctx.font = "12px Inter, sans-serif";
    ctx.fillText("Allocated", centerX, centerY + 10);
  }, [assets]);

  if (assets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[250px] text-center text-muted-foreground border border-dashed border-border/40 rounded-md p-4">
        <p>No allocation data</p>
        <p className="text-sm mt-2">Add assets to see allocation chart</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-4 h-[250px]">
      <canvas
        ref={canvasRef}
        width={250}
        height={250}
        className="animate-fadeIn"
      />
    </div>
  );
}
