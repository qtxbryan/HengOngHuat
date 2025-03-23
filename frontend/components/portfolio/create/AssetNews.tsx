"use client";

import type { Asset } from "@/components/portfolio/create/asset";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Clock, Newspaper } from "lucide-react";
import { useState, useEffect } from "react";

interface AssetNewsProps {
  asset: Asset | null;
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: string;
  sentiment: "positive" | "negative" | "neutral";
}

export function AssetNews({ asset }: AssetNewsProps) {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    if (asset) {
      // Mock news data based on the asset
      const mockNews: NewsItem[] = [
        {
          id: "1",
          title: `${asset.name} Reports Strong Q2 Earnings, Exceeding Analyst Expectations`,
          summary: `${asset.name} announced quarterly earnings that surpassed Wall Street expectations, with revenue growing 15% year-over-year. The company also raised its full-year guidance.`,
          source: "Financial Times",
          url: "https://example.com/news/1",
          publishedAt: "2 hours ago",
          sentiment: "positive",
        },
        {
          id: "2",
          title: `${asset.name} Expands into New Markets with Strategic Acquisition`,
          summary: `${asset.name} has acquired a smaller competitor for $2.5 billion, allowing it to expand into emerging markets and diversify its product offerings.`,
          source: "Bloomberg",
          url: "https://example.com/news/2",
          publishedAt: "5 hours ago",
          sentiment: "positive",
        },
        {
          id: "3",
          title: `Regulatory Concerns Grow for ${asset.name} Amid Industry Scrutiny`,
          summary: `Regulators are increasing their focus on ${asset.type === "crypto" ? "cryptocurrency exchanges" : "the tech sector"}, potentially impacting ${asset.name}'s operations in key markets.`,
          source: "Reuters",
          url: "https://example.com/news/3",
          publishedAt: "1 day ago",
          sentiment: "negative",
        },
        {
          id: "4",
          title: `${asset.name} Announces New ${asset.type === "crypto" ? "Protocol Upgrade" : "Product Line"}`,
          summary: `The company revealed plans for a major ${asset.type === "crypto" ? "protocol upgrade" : "product line"} that aims to address user concerns and improve overall performance.`,
          source: "TechCrunch",
          url: "https://example.com/news/4",
          publishedAt: "2 days ago",
          sentiment: "neutral",
        },
        {
          id: "5",
          title: `Analyst Upgrades ${asset.ticker} Rating to "Buy" with Increased Price Target`,
          summary: `A prominent Wall Street analyst has upgraded ${asset.name} to a "Buy" rating, citing strong growth prospects and competitive advantages in the market.`,
          source: "CNBC",
          url: "https://example.com/news/5",
          publishedAt: "3 days ago",
          sentiment: "positive",
        },
      ];

      setNews(mockNews);
    }
  }, [asset]);

  if (!asset) return null;

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-medium flex items-center">
          <Newspaper className="h-4 w-4 mr-1 text-primary" />
          Latest News for {asset.ticker}
        </h3>
      </div>

      {news.length === 0 ? (
        <Card className="p-4 border-border/40 bg-card/80 text-center">
          <p className="text-muted-foreground">
            No recent news available for {asset.name}
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {news.map((item) => (
            <Card
              key={item.id}
              className="p-4 border-border/40 bg-card/80 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <Badge
                  variant="outline"
                  className={`
                    ${
                      item.sentiment === "positive"
                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                        : item.sentiment === "negative"
                          ? "bg-red-500/10 text-red-500 border-red-500/20"
                          : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                    }
                  `}
                >
                  {item.sentiment.charAt(0).toUpperCase() +
                    item.sentiment.slice(1)}
                </Badge>
                <div className="text-xs text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {item.publishedAt}
                </div>
              </div>

              <h4 className="font-medium mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">
                {item.summary}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Source: {item.source}
                </span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:text-primary/80 flex items-center transition-colors"
                >
                  Read More
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
