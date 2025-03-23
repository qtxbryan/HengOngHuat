"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Sample sector correlation data
const sectorCorrelations = {
  "1": [
    { sector1: "Technology", sector2: "Healthcare", correlation: 0.65 },
    { sector1: "Technology", sector2: "Financials", correlation: 0.45 },
    { sector1: "Technology", sector2: "Consumer", correlation: 0.7 },
    { sector1: "Technology", sector2: "Industrials", correlation: 0.55 },
    { sector1: "Technology", sector2: "Utilities", correlation: 0.25 },
    { sector1: "Healthcare", sector2: "Financials", correlation: 0.4 },
    { sector1: "Healthcare", sector2: "Consumer", correlation: 0.5 },
    { sector1: "Healthcare", sector2: "Industrials", correlation: 0.35 },
    { sector1: "Healthcare", sector2: "Utilities", correlation: 0.3 },
    { sector1: "Financials", sector2: "Consumer", correlation: 0.55 },
    { sector1: "Financials", sector2: "Industrials", correlation: 0.6 },
    { sector1: "Financials", sector2: "Utilities", correlation: 0.5 },
    { sector1: "Consumer", sector2: "Industrials", correlation: 0.45 },
    { sector1: "Consumer", sector2: "Utilities", correlation: 0.25 },
    { sector1: "Industrials", sector2: "Utilities", correlation: 0.4 },
  ],
  "2": [
    { sector1: "Technology", sector2: "Healthcare", correlation: 0.55 },
    { sector1: "Technology", sector2: "Financials", correlation: 0.5 },
    { sector1: "Technology", sector2: "Consumer", correlation: 0.65 },
    { sector1: "Technology", sector2: "Industrials", correlation: 0.6 },
    { sector1: "Technology", sector2: "Utilities", correlation: 0.3 },
    { sector1: "Healthcare", sector2: "Financials", correlation: 0.45 },
    { sector1: "Healthcare", sector2: "Consumer", correlation: 0.4 },
    { sector1: "Healthcare", sector2: "Industrials", correlation: 0.3 },
    { sector1: "Healthcare", sector2: "Utilities", correlation: 0.35 },
    { sector1: "Financials", sector2: "Consumer", correlation: 0.5 },
    { sector1: "Financials", sector2: "Industrials", correlation: 0.65 },
    { sector1: "Financials", sector2: "Utilities", correlation: 0.55 },
    { sector1: "Consumer", sector2: "Industrials", correlation: 0.4 },
    { sector1: "Consumer", sector2: "Utilities", correlation: 0.2 },
    { sector1: "Industrials", sector2: "Utilities", correlation: 0.45 },
  ],
  "3": [
    { sector1: "Technology", sector2: "Healthcare", correlation: 0.75 },
    { sector1: "Technology", sector2: "Financials", correlation: 0.4 },
    { sector1: "Technology", sector2: "Consumer", correlation: 0.8 },
    { sector1: "Technology", sector2: "Industrials", correlation: 0.65 },
    { sector1: "Healthcare", sector2: "Financials", correlation: 0.35 },
    { sector1: "Healthcare", sector2: "Consumer", correlation: 0.6 },
    { sector1: "Healthcare", sector2: "Industrials", correlation: 0.4 },
    { sector1: "Financials", sector2: "Consumer", correlation: 0.45 },
    { sector1: "Financials", sector2: "Industrials", correlation: 0.55 },
    { sector1: "Consumer", sector2: "Industrials", correlation: 0.5 },
  ],
  "4": [
    { sector1: "Technology", sector2: "Healthcare", correlation: 0.5 },
    { sector1: "Technology", sector2: "Financials", correlation: 0.55 },
    { sector1: "Technology", sector2: "Consumer", correlation: 0.6 },
    { sector1: "Technology", sector2: "Industrials", correlation: 0.45 },
    { sector1: "Technology", sector2: "Utilities", correlation: 0.35 },
    { sector1: "Healthcare", sector2: "Financials", correlation: 0.5 },
    { sector1: "Healthcare", sector2: "Consumer", correlation: 0.45 },
    { sector1: "Healthcare", sector2: "Industrials", correlation: 0.3 },
    { sector1: "Healthcare", sector2: "Utilities", correlation: 0.4 },
    { sector1: "Financials", sector2: "Consumer", correlation: 0.45 },
    { sector1: "Financials", sector2: "Industrials", correlation: 0.55 },
    { sector1: "Financials", sector2: "Utilities", correlation: 0.65 },
    { sector1: "Consumer", sector2: "Industrials", correlation: 0.35 },
    { sector1: "Consumer", sector2: "Utilities", correlation: 0.3 },
    { sector1: "Industrials", sector2: "Utilities", correlation: 0.5 },
  ],
};

// List of sectors
const sectors = [
  "Technology",
  "Healthcare",
  "Financials",
  "Consumer",
  "Industrials",
  "Utilities",
];

interface SectorCorrelationMatrixProps {
  portfolioId: string;
}

export default function SectorCorrelationMatrix({
  portfolioId,
}: SectorCorrelationMatrixProps) {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  // Get correlation data for the portfolio
  const correlations =
    sectorCorrelations[portfolioId as keyof typeof sectorCorrelations] ||
    sectorCorrelations["1"];

  // Create a matrix from the correlation data
  const matrix: Record<string, Record<string, number>> = {};

  // Initialize matrix with empty values
  sectors.forEach((sector1) => {
    matrix[sector1] = {};
    sectors.forEach((sector2) => {
      matrix[sector1][sector2] = sector1 === sector2 ? 1.0 : 0;
    });
  });

  // Fill in the matrix with correlation values
  correlations.forEach((item) => {
    matrix[item.sector1][item.sector2] = item.correlation;
    matrix[item.sector2][item.sector1] = item.correlation; // Matrix is symmetric
  });

  // Color scale for correlation values
  const getCorrelationColor = (value: number) => {
    if (value >= 0.8) return "bg-emerald-500 bg-opacity-90";
    if (value >= 0.6) return "bg-emerald-500 bg-opacity-70";
    if (value >= 0.4) return "bg-emerald-500 bg-opacity-50";
    if (value >= 0.2) return "bg-emerald-500 bg-opacity-30";
    if (value > 0) return "bg-emerald-500 bg-opacity-10";
    if (value === 0) return "bg-gray-500 bg-opacity-10";
    if (value >= -0.2) return "bg-red-500 bg-opacity-10";
    if (value >= -0.4) return "bg-red-500 bg-opacity-30";
    if (value >= -0.6) return "bg-red-500 bg-opacity-50";
    if (value >= -0.8) return "bg-red-500 bg-opacity-70";
    return "bg-red-500 bg-opacity-90";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="dashboard-card-stats h-full"
    >
      <div className="dashboard-card-content h-full">
        <div className="flex items-center mb-4">
          <h2 className="dashboard-stat-label">Sector Correlation</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                  <Info className="h-4 w-4 text-dashboard-text-secondary" />
                  <span className="sr-only">
                    Sector correlation information
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-dashboard-card border-dashboard-card-border text-dashboard-text-primary max-w-[250px]">
                <p>
                  Correlation between different market sectors. Higher values
                  (green) indicate sectors that tend to move together, while
                  lower values indicate less correlation.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="p-1 text-xs text-dashboard-text-secondary"></th>
                {sectors.map((sector) => (
                  <th
                    key={sector}
                    className="p-1 text-xs text-dashboard-text-secondary font-medium"
                  >
                    {sector.substring(0, 3)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sectors.map((sector1) => (
                <tr key={sector1}>
                  <td className="p-1 text-xs text-dashboard-text-secondary font-medium">
                    {sector1.substring(0, 3)}
                  </td>
                  {sectors.map((sector2) => {
                    const cellId = `${sector1}-${sector2}`;
                    const value = matrix[sector1][sector2];

                    return (
                      <td
                        key={cellId}
                        className={`p-0 relative ${getCorrelationColor(value)}`}
                        onMouseEnter={() => setHoveredCell(cellId)}
                        onMouseLeave={() => setHoveredCell(null)}
                      >
                        <div className="w-8 h-8 flex items-center justify-center text-xs font-medium text-dashboard-text-primary">
                          {value.toFixed(2)}
                        </div>

                        {hoveredCell === cellId && (
                          <TooltipProvider>
                            <Tooltip open={true}>
                              <TooltipContent
                                className="bg-dashboard-card border-dashboard-card-border text-dashboard-text-primary"
                                side="top"
                              >
                                <p className="text-xs">
                                  <span className="font-medium">{sector1}</span>{" "}
                                  to{" "}
                                  <span className="font-medium">{sector2}</span>
                                  : {value.toFixed(2)}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
