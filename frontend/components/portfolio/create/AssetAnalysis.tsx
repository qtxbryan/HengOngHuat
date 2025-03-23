"use client";

import type { Asset } from "@/components/portfolio/create/asset";
import { Card } from "@/components/ui/card";
import {
  ThumbsUp,
  AlertTriangle,
  BrainCircuit,
  LineChart,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect } from "react";

interface AssetAnalysisProps {
  asset: Asset | null;
}

interface AnalysisData {
  sentimentScore: number;
  sentimentText: string;
  concerns: string[];
  strengths: string[];
  prediction: {
    shortTerm: string;
    midTerm: string;
    longTerm: string;
  };
  aiInsight: string;
  lastUpdated: string;
}

export function AssetAnalysis({ asset }: AssetAnalysisProps) {
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);

  useEffect(() => {
    if (asset) {
      // Generate mock analysis data based on the asset
      const mockAnalysis: AnalysisData = {
        sentimentScore: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
        sentimentText: asset.changePercentage >= 0 ? "Bullish" : "Cautious",
        concerns: [
          `${asset.type === "crypto" ? "Regulatory uncertainty" : "Increasing competition"} in the market`,
          `Potential ${asset.type === "crypto" ? "volatility due to market sentiment" : "slowdown in consumer spending"}`,
          `${asset.changePercentage < 0 ? "Recent negative price action" : "Valuation concerns at current levels"}`,
        ],
        strengths: [
          `Strong ${asset.type === "crypto" ? "community support and adoption" : "market position and brand recognition"}`,
          `Innovative ${asset.type === "crypto" ? "technology and use cases" : "product pipeline and R&D investments"}`,
          `${asset.changePercentage >= 0 ? "Positive momentum and technical indicators" : "Attractive entry point after recent pullback"}`,
        ],
        prediction: {
          shortTerm:
            asset.changePercentage >= 0
              ? "Continued upward momentum expected"
              : "Potential consolidation phase",
          midTerm: "Likely to outperform the broader market",
          longTerm: "Strong growth prospects with some volatility",
        },
        aiInsight: `Based on current market conditions and technical analysis, ${asset.name} (${asset.ticker}) shows ${
          asset.changePercentage >= 0
            ? "promising potential"
            : "signs of undervaluation"
        }. The ${asset.type} sector is experiencing ${
          Math.random() > 0.5
            ? "increased institutional interest"
            : "growing retail participation"
        }, which could benefit ${asset.ticker} in the coming months. Consider ${
          asset.changePercentage >= 0
            ? "taking profits at key resistance levels"
            : "dollar-cost averaging to build a position"
        } while maintaining appropriate risk management.`,
        lastUpdated: new Date().toLocaleString(),
      };

      setAnalysis(mockAnalysis);
    }
  }, [asset]);

  if (!asset || !analysis) return null;

  return (
    <div className="space-y-4 animate-fadeIn">
      <Card className="p-4 border-border/40 bg-card/80">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <BrainCircuit className="h-4 w-4 mr-1 text-primary" />
            <span className="font-medium">AI-Generated Analysis</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Updated: {analysis.lastUpdated}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          {analysis.aiInsight}
        </p>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <ThumbsUp className="h-4 w-4 mr-1 text-primary" />
            <span className="text-sm font-medium">Sentiment Score</span>
          </div>
          <span
            className={`text-sm ${analysis.sentimentScore > 70 ? "text-green-500" : "text-yellow-500"}`}
          >
            {analysis.sentimentText}
          </span>
        </div>

        <div className="h-2 bg-muted/30 rounded-full overflow-hidden mb-4">
          <div
            className={`h-full ${
              analysis.sentimentScore > 80
                ? "bg-green-500"
                : analysis.sentimentScore > 60
                  ? "bg-yellow-500"
                  : "bg-red-500"
            }`}
            style={{ width: `${analysis.sentimentScore}%` }}
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 border-border/40 bg-card/80">
          <div className="flex items-center mb-3">
            <AlertTriangle className="h-4 w-4 mr-1 text-amber-500" />
            <span className="font-medium">Potential Concerns</span>
          </div>

          <ul className="space-y-2">
            {analysis.concerns.map((concern, index) => (
              <li key={index} className="text-sm flex items-start">
                <ArrowRight className="h-3.5 w-3.5 mr-1 mt-0.5 text-amber-500" />
                <span className="text-muted-foreground">{concern}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-4 border-border/40 bg-card/80">
          <div className="flex items-center mb-3">
            <ThumbsUp className="h-4 w-4 mr-1 text-green-500" />
            <span className="font-medium">Key Strengths</span>
          </div>

          <ul className="space-y-2">
            {analysis.strengths.map((strength, index) => (
              <li key={index} className="text-sm flex items-start">
                <ArrowRight className="h-3.5 w-3.5 mr-1 mt-0.5 text-green-500" />
                <span className="text-muted-foreground">{strength}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="p-4 border-border/40 bg-card/80">
        <div className="flex items-center mb-3">
          <LineChart className="h-4 w-4 mr-1 text-primary" />
          <span className="font-medium">Price Prediction</span>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">
                Short-term (1-3 months)
              </span>
              <span className="text-xs font-medium text-primary">
                {asset.changePercentage >= 0 ? "↗" : "↘"}
              </span>
            </div>
            <p className="text-sm">{analysis.prediction.shortTerm}</p>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">
                Mid-term (3-6 months)
              </span>
              <span className="text-xs font-medium text-primary">↗</span>
            </div>
            <p className="text-sm">{analysis.prediction.midTerm}</p>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">
                Long-term (6-12 months)
              </span>
              <span className="text-xs font-medium text-primary">↗</span>
            </div>
            <p className="text-sm">{analysis.prediction.longTerm}</p>
          </div>
        </div>
      </Card>

      <div className="text-xs text-muted-foreground italic text-center">
        Disclaimer: This analysis is generated by AI and should not be
        considered financial advice. Always conduct your own research before
        making investment decisions.
      </div>
    </div>
  );
}
