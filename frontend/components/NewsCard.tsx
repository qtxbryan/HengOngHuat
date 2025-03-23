"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, BookmarkPlus, Share2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDistanceToNow } from "date-fns";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  source: string;
  sourceUrl: string;
  category: string;
  date: string;
  readCount: number;
  readTime: number;
  tags: string[];
}

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Format the date as "time ago"
  const timeAgo = formatDistanceToNow(new Date(article.date), {
    addSuffix: true,
  });

  // Get source display name
  const getSourceName = (sourceId: string) => {
    const sources: Record<string, string> = {
      bloomberg: "Bloomberg",
      reuters: "Reuters",
      wsj: "Wall Street Journal",
      cnbc: "CNBC",
      ft: "Financial Times",
    };
    return sources[sourceId] || sourceId;
  };

  // Get category display name
  const getCategoryName = (categoryId: string) => {
    const categories: Record<string, string> = {
      market: "Market Updates",
      stocks: "Stocks",
      crypto: "Cryptocurrency",
      economy: "Economy",
      company: "Company News",
    };
    return categories[categoryId] || categoryId;
  };

  // Handle bookmark click
  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  // Handle share click
  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Implement share functionality
    console.log("Share article:", article.title);
  };

  return (
    <motion.div
      className="dashboard-card-stats p-0 overflow-hidden h-full flex flex-col cursor-pointer group"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.open(article.sourceUrl, "_blank")}
    >
      <div className="relative overflow-hidden">
        <motion.div
          className="h-48 w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${article.image})` }}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        />

        <div className="absolute top-2 left-2 flex gap-2">
          <Badge className="bg-dashboard-accent-indigo text-white">
            {getCategoryName(article.category)}
          </Badge>
        </div>

        <div className="absolute top-2 right-2">
          <Badge className="bg-dashboard-card/80 backdrop-blur-sm border-dashboard-card-border text-dashboard-text-primary">
            {getSourceName(article.source)}
          </Badge>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-dashboard-accent-indigo transition-colors">
          {article.title}
        </h3>

        <p className="text-dashboard-text-secondary text-sm mb-4 line-clamp-3 flex-1">
          {article.summary}
        </p>

        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center text-xs text-dashboard-text-secondary">
            <Clock className="h-3 w-3 mr-1" />
            <span>{timeAgo}</span>
          </div>

          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-dashboard-accent-indigo/10"
                    onClick={handleBookmarkClick}
                  >
                    <BookmarkPlus
                      className={`h-4 w-4 ${isBookmarked ? "text-dashboard-accent-indigo fill-dashboard-accent-indigo" : "text-dashboard-text-secondary"}`}
                    />
                    <span className="sr-only">Bookmark</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{isBookmarked ? "Remove bookmark" : "Add to bookmarks"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-dashboard-accent-indigo/10"
                    onClick={handleShareClick}
                  >
                    <Share2 className="h-4 w-4 text-dashboard-text-secondary" />
                    <span className="sr-only">Share</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Share article</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-dashboard-accent-indigo/10"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(article.sourceUrl, "_blank");
                    }}
                  >
                    <ExternalLink className="h-4 w-4 text-dashboard-text-secondary" />
                    <span className="sr-only">Open article</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Read full article</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
