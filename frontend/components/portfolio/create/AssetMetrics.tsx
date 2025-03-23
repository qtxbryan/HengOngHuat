import type { Asset } from "@/components/portfolio/create/asset";
import { Card } from "@/components/ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Activity,
  BarChart3,
} from "lucide-react";

interface AssetMetricsProps {
  asset: Asset | null;
}

export function AssetMetrics({ asset }: AssetMetricsProps) {
  if (!asset) return null;

  // Mock metrics data
  const metrics = {
    price: asset.price,
    change: asset.changePercentage,
    ma50: asset.price * (1 + (Math.random() * 0.1 - 0.05)), // Random 50-day MA
    rsi: Math.floor(Math.random() * 40) + 30, // Random RSI between 30-70
    macd: (Math.random() * 2 - 1).toFixed(2), // Random MACD between -1 and 1
    macdSignal: (Math.random() * 2 - 1).toFixed(2), // Random MACD Signal
    volume: Math.floor(Math.random() * 10000000) + 1000000, // Random volume
    marketCap: Math.floor(Math.random() * 1000000000000) + 10000000000, // Random market cap
  };

  // Helper function to format large numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`;
    } else if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    } else {
      return `$${num.toLocaleString()}`;
    }
  };

  // Determine RSI status
  const getRsiStatus = (rsi: number) => {
    if (rsi > 70) return { text: "Overbought", color: "text-red-500" };
    if (rsi < 30) return { text: "Oversold", color: "text-green-500" };
    return { text: "Neutral", color: "text-yellow-500" };
  };

  const rsiStatus = getRsiStatus(metrics.rsi);

  // Determine MACD status
  const getMacdStatus = (macd: number, signal: number) => {
    if (macd > signal) return { text: "Bullish", color: "text-green-500" };
    return { text: "Bearish", color: "text-red-500" };
  };

  const macdStatus = getMacdStatus(
    Number.parseFloat(metrics.macd),
    Number.parseFloat(metrics.macdSignal)
  );

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-3 border-border/40 bg-card/80">
          <div className="text-sm text-muted-foreground mb-1 flex items-center">
            <Activity className="h-3.5 w-3.5 mr-1" />
            Current Price
          </div>
          <div className="text-lg font-semibold">
            ${metrics.price.toLocaleString()}
          </div>
          <div
            className={`text-sm flex items-center mt-1 ${metrics.change >= 0 ? "text-green-500" : "text-red-500"}`}
          >
            {metrics.change >= 0 ? (
              <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5 mr-1" />
            )}
            {Math.abs(metrics.change)}%
          </div>
        </Card>

        <Card className="p-3 border-border/40 bg-card/80">
          <div className="text-sm text-muted-foreground mb-1 flex items-center">
            <TrendingUp className="h-3.5 w-3.5 mr-1" />
            50-Day MA
          </div>
          <div className="text-lg font-semibold">
            ${metrics.ma50.toLocaleString()}
          </div>
          <div
            className={`text-sm mt-1 ${metrics.price > metrics.ma50 ? "text-green-500" : "text-red-500"}`}
          >
            {metrics.price > metrics.ma50 ? "Above MA" : "Below MA"}
          </div>
        </Card>
      </div>

      <Card className="p-4 border-border/40 bg-card/80">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-1 text-primary" />
            <span className="font-medium">RSI (14)</span>
          </div>
          <span className={`text-sm ${rsiStatus.color}`}>{rsiStatus.text}</span>
        </div>
        <div className="h-2 bg-muted/30 rounded-full overflow-hidden mb-1">
          <div
            className={`h-full ${
              metrics.rsi > 70
                ? "bg-red-500"
                : metrics.rsi < 30
                  ? "bg-green-500"
                  : "bg-yellow-500"
            }`}
            style={{ width: `${metrics.rsi}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Oversold</span>
          <span>{metrics.rsi}</span>
          <span>Overbought</span>
        </div>
      </Card>

      <Card className="p-4 border-border/40 bg-card/80">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Activity className="h-4 w-4 mr-1 text-primary" />
            <span className="font-medium">MACD</span>
          </div>
          <span className={`text-sm ${macdStatus.color}`}>
            {macdStatus.text}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground mb-1">MACD Line</div>
            <div
              className={`font-medium ${Number.parseFloat(metrics.macd) >= 0 ? "text-green-500" : "text-red-500"}`}
            >
              {metrics.macd}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              Signal Line
            </div>
            <div
              className={`font-medium ${Number.parseFloat(metrics.macdSignal) >= 0 ? "text-green-500" : "text-red-500"}`}
            >
              {metrics.macdSignal}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card className="p-3 border-border/40 bg-card/80">
          <div className="text-sm text-muted-foreground mb-1">Volume (24h)</div>
          <div className="font-medium">{formatNumber(metrics.volume)}</div>
        </Card>

        <Card className="p-3 border-border/40 bg-card/80">
          <div className="text-sm text-muted-foreground mb-1">Market Cap</div>
          <div className="font-medium">{formatNumber(metrics.marketCap)}</div>
        </Card>
      </div>
    </div>
  );
}
