"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Calendar, TrendingUp, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/Header";
import NewsCard from "./NewsCard";
import newsData from "@/app/data/news-data";

// Categories for filtering
const categories = [
  { id: "all", name: "All News" },
  { id: "market", name: "Market Updates" },
  { id: "stocks", name: "Stocks" },
  { id: "crypto", name: "Cryptocurrency" },
  { id: "economy", name: "Economy" },
  { id: "company", name: "Company News" },
];

// Sources for filtering
const sources = [
  { id: "all", name: "All Sources" },
  { id: "bloomberg", name: "Bloomberg" },
  { id: "reuters", name: "Reuters" },
  { id: "wsj", name: "Wall Street Journal" },
  { id: "cnbc", name: "CNBC" },
  { id: "ft", name: "Financial Times" },
];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSource, setActiveSource] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [filteredNews, setFilteredNews] = useState(newsData);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const observerTarget = useRef(null);

  // Filter news based on active filters and search query
  useEffect(() => {
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      let filtered = [...newsData];

      // Filter by category
      if (activeCategory !== "all") {
        filtered = filtered.filter((item) => item.category === activeCategory);
      }

      // Filter by source
      if (activeSource !== "all") {
        filtered = filtered.filter((item) => item.source === activeSource);
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (item) =>
            item.title.toLowerCase().includes(query) ||
            item.summary.toLowerCase().includes(query)
        );
      }

      // Sort the results
      if (sortBy === "latest") {
        filtered.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      } else if (sortBy === "popular") {
        filtered.sort((a, b) => b.readCount - a.readCount);
      }

      setFilteredNews(filtered);
      setIsLoading(false);
      // Reset visible count when filters change
      setVisibleCount(12);
    }, 600);
  }, [activeCategory, activeSource, sortBy, searchQuery]);

  // Handle infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isLoading &&
          filteredNews.length > visibleCount
        ) {
          // Load more items when scrolling to the bottom
          setVisibleCount((prev) => prev + 8);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [isLoading, filteredNews.length, visibleCount]);

  // Show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset all filters
  const resetFilters = () => {
    setActiveCategory("all");
    setActiveSource("all");
    setSortBy("latest");
    setSearchQuery("");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
      <Header
        topic="Financial News"
        description="Stay updated with the latest market news and insights"
      />
      <main className="p-4 md:p-6">
        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-6 flex flex-col md:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-dashboard-text-secondary" />
            <Input
              type="search"
              placeholder="Search news..."
              className="pl-10 dashboard-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`border-dashboard-card-border ${activeCategory !== "all" || activeSource !== "all" || sortBy !== "latest" || searchQuery ? "bg-dashboard-accent-indigo/10 text-dashboard-accent-indigo" : ""}`}
              onClick={resetFilters}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>

            <div className="relative group">
              <Button
                variant="outline"
                size="sm"
                className={`border-dashboard-card-border ${sortBy !== "latest" ? "bg-dashboard-accent-indigo/10 text-dashboard-accent-indigo" : ""}`}
              >
                <Calendar className="h-4 w-4 mr-2" />
                {sortBy === "latest" ? "Latest" : "Popular"}
              </Button>
              <div className="absolute right-0 mt-2 w-40 bg-dashboard-card border border-dashboard-card-border rounded-md shadow-lg z-10 hidden group-hover:block">
                <div
                  className={`px-4 py-2 hover:bg-dashboard-accent-indigo/10 cursor-pointer ${sortBy === "latest" ? "text-dashboard-accent-indigo" : ""}`}
                  onClick={() => setSortBy("latest")}
                >
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Latest
                </div>
                <div
                  className={`px-4 py-2 hover:bg-dashboard-accent-indigo/10 cursor-pointer ${sortBy === "popular" ? "text-dashboard-accent-indigo" : ""}`}
                  onClick={() => setSortBy("popular")}
                >
                  <TrendingUp className="h-4 w-4 inline mr-2" />
                  Popular
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-6"
        >
          <Tabs
            defaultValue="all"
            value={activeCategory}
            onValueChange={setActiveCategory}
          >
            <TabsList className="bg-dashboard-card border border-dashboard-card-border mb-4 overflow-x-auto flex-nowrap w-full">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm text-dashboard-text-secondary mr-2 flex items-center">
              <Filter className="h-4 w-4 mr-1" />
              Sources:
            </span>
            {sources.map((source) => (
              <Badge
                key={source.id}
                variant="outline"
                className={`cursor-pointer hover:bg-dashboard-accent-indigo/10 ${
                  activeSource === source.id
                    ? "bg-dashboard-accent-indigo/10 text-dashboard-accent-indigo border-dashboard-accent-indigo"
                    : "border-dashboard-card-border"
                }`}
                onClick={() => setActiveSource(source.id)}
              >
                {source.name}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* News Grid */}
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="dashboard-card-stats p-0 overflow-hidden"
              >
                <Skeleton className="h-40 w-full bg-dashboard-card-border" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2 bg-dashboard-card-border" />
                  <Skeleton className="h-4 w-full mb-1 bg-dashboard-card-border" />
                  <Skeleton className="h-4 w-5/6 mb-3 bg-dashboard-card-border" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20 bg-dashboard-card-border" />
                    <Skeleton className="h-4 w-16 bg-dashboard-card-border" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <>
            {filteredNews.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <div className="h-24 w-24 rounded-full bg-dashboard-card-border/20 flex items-center justify-center mb-4">
                  <Search className="h-12 w-12 text-dashboard-text-secondary/50" />
                </div>
                <h3 className="text-xl font-medium text-dashboard-text-primary mb-2">
                  No results found
                </h3>
                <p className="text-dashboard-text-secondary text-center max-w-md">
                  We couldn&apos;t find any news matching your search criteria.
                  Try adjusting your filters or search query.
                </p>
                <Button
                  variant="outline"
                  className="mt-4 border-dashboard-card-border"
                  onClick={resetFilters}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset Filters
                </Button>
              </motion.div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr"
              >
                <AnimatePresence>
                  {filteredNews.slice(0, visibleCount).map((article, index) => (
                    <motion.div
                      key={article.id}
                      variants={itemVariants}
                      layout
                      className={`${
                        // Create a more interesting bento layout with some items spanning multiple columns or rows
                        index % 7 === 0
                          ? "md:col-span-2 md:row-span-2"
                          : index % 5 === 0
                            ? "md:col-span-2"
                            : index % 11 === 0
                              ? "md:row-span-2"
                              : ""
                      }`}
                    >
                      <NewsCard article={article} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Load more trigger for infinite scrolling */}
            {filteredNews.length > visibleCount && (
              <div
                ref={observerTarget}
                className="h-20 flex items-center justify-center mt-4"
              >
                <Skeleton className="h-10 w-10 rounded-full bg-dashboard-card-border/50" />
              </div>
            )}
          </>
        )}

        {/* Scroll to top button */}
        <AnimatePresence>
          {showScrollButton && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-dashboard-accent-indigo flex items-center justify-center shadow-lg"
              onClick={scrollToTop}
              aria-label="Scroll to top"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
