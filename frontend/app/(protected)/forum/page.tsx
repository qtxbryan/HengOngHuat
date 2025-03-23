"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MessageSquare,
  Search,
  TrendingUp,
  Users,
  MessageCircle,
  Clock,
  Filter,
} from "lucide-react";
import { ForumCategoryCard } from "@/components/forum/CategoryCard";
import { ForumTopicCard } from "@/components/forum/TopicCard";
import { CreatePostDialog } from "@/components/forum/PostDialog";
import {
  ForumCategorySkeleton,
  ForumContentSkeleton,
  ForumStatsSkeleton,
  ForumTopicSkeleton,
} from "@/components/forum/Skeleton";
import Header from "@/components/Header";

export default function ForumPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isTopicsLoading, setIsTopicsLoading] = useState(false);

  const categories = [
    {
      id: "all",
      name: "All Topics",
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      id: "general",
      name: "General",
      icon: <MessageCircle className="h-4 w-4" />,
    },
    {
      id: "announcements",
      name: "Announcements",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    { id: "help", name: "Help & Support", icon: <Users className="h-4 w-4" /> },
  ];

  const discussionTopics = [
    {
      id: 1,
      title: "Welcome to our new forum platform!",
      author: "Admin",
      avatar: "/placeholder.svg?height=40&width=40",
      category: "announcements",
      replies: 24,
      views: 1204,
      lastActivity: "2 hours ago",
      isPinned: true,
      isHot: true,
    },
    {
      id: 2,
      title: "How to get started with the forum",
      author: "Moderator",
      avatar: "/placeholder.svg?height=40&width=40",
      category: "help",
      replies: 15,
      views: 432,
      lastActivity: "5 hours ago",
      isPinned: true,
      isHot: false,
    },
    {
      id: 3,
      title: "Introducing yourself - Community thread",
      author: "CommunityManager",
      avatar: "/placeholder.svg?height=40&width=40",
      category: "general",
      replies: 156,
      views: 2345,
      lastActivity: "1 day ago",
      isPinned: false,
      isHot: true,
    },
    {
      id: 4,
      title: "Tips and tricks for new members",
      author: "Veteran",
      avatar: "/placeholder.svg?height=40&width=40",
      category: "help",
      replies: 42,
      views: 876,
      lastActivity: "3 days ago",
      isPinned: false,
      isHot: false,
    },
    {
      id: 5,
      title: "Monthly community challenge - March",
      author: "EventCoordinator",
      avatar: "/placeholder.svg?height=40&width=40",
      category: "announcements",
      replies: 89,
      views: 1567,
      lastActivity: "1 week ago",
      isPinned: false,
      isHot: true,
    },
    {
      id: 6,
      title: "Feature request: Dark mode toggle",
      author: "NightOwl",
      avatar: "/placeholder.svg?height=40&width=40",
      category: "general",
      replies: 37,
      views: 654,
      lastActivity: "2 weeks ago",
      isPinned: false,
      isHot: false,
    },
  ];

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Simulate loading when changing categories
  useEffect(() => {
    if (!isLoading) {
      setIsTopicsLoading(true);
      const timer = setTimeout(() => {
        setIsTopicsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [activeCategory, isLoading]);

  const filteredTopics = discussionTopics.filter(
    (topic) =>
      (activeCategory === "all" || topic.category === activeCategory) &&
      (searchQuery === "" ||
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreatePost = (
    title: string,
    content: string,
    category: string
  ) => {
    // Here you would typically send the new post to your backend
    console.log({ title, content, category });
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header Skeleton */}
        <header className="border-b border-border/40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="skeleton-pulse h-8 w-8 mr-2"></div>
                <div className="skeleton-pulse h-8 w-40"></div>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <div className="skeleton-pulse h-10 w-full"></div>
                </div>
                <div className="skeleton-pulse h-10 w-28"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Skeleton */}
        <main className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Skeleton */}
            <div className="lg:col-span-1">
              <div className="grid gap-6">
                <ForumCategorySkeleton />
                <ForumStatsSkeleton />
              </div>
            </div>

            {/* Discussion Topics Skeleton */}
            <div className="lg:col-span-3">
              <ForumContentSkeleton />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex-1 transition-all duration-300 ease-in-out md:ml-[280px]">
      {/* Header */}
      <Header
        topic="Bento Forum"
        description="Join the community and discuss your ideas"
      />

      {/* Main Content */}
      <main className="p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div
              className="grid gap-6 slide-up"
              style={{ animationDelay: "100ms" }}
            >
              {/* Categories */}
              <ForumCategoryCard
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
              />

              {/* Stats */}
              <Card className="dashboard-card hover-glow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-card-foreground">
                    Forum Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="flex items-center gap-2 transition-transform hover:translate-x-1 duration-200">
                      <MessageSquare className="h-4 w-4 text-accent" />
                      <span className="text-muted-foreground">Topics:</span>
                      <span className="text-card-foreground font-medium">
                        1,245
                      </span>
                    </div>
                    <div className="flex items-center gap-2 transition-transform hover:translate-x-1 duration-200">
                      <MessageCircle className="h-4 w-4 text-accent" />
                      <span className="text-muted-foreground">Posts:</span>
                      <span className="text-card-foreground font-medium">
                        8,763
                      </span>
                    </div>
                    <div className="flex items-center gap-2 transition-transform hover:translate-x-1 duration-200">
                      <Users className="h-4 w-4 text-accent" />
                      <span className="text-muted-foreground">Members:</span>
                      <span className="text-card-foreground font-medium">
                        3,421
                      </span>
                    </div>
                    <div className="flex items-center gap-2 transition-transform hover:translate-x-1 duration-200">
                      <Clock className="h-4 w-4 text-accent" />
                      <span className="text-muted-foreground">
                        Latest Member:
                      </span>
                      <span className="text-card-foreground font-medium">
                        ForumUser42
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Discussion Topics */}
          <div className="lg:col-span-3">
            <Card
              className="dashboard-card slide-up"
              style={{ animationDelay: "200ms" }}
            >
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-card-foreground">
                    Discussion Topics
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Browse and participate in community discussions
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border/40 text-muted-foreground transition-colors hover:text-card-foreground"
                  >
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                  <Tabs
                    defaultValue="latest"
                    className="transition-all duration-300"
                  >
                    <TabsList className="bg-muted/20">
                      <TabsTrigger
                        value="latest"
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                      >
                        Latest
                      </TabsTrigger>
                      <TabsTrigger
                        value="popular"
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                      >
                        Popular
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {isTopicsLoading ? (
                    // Show loading skeletons when changing categories
                    Array.from({ length: 5 }).map((_, index) => (
                      <ForumTopicSkeleton key={index} />
                    ))
                  ) : filteredTopics.length > 0 ? (
                    filteredTopics.map((topic, index) => (
                      <div
                        key={topic.id}
                        className="fade-in hover-lift"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <ForumTopicCard
                          topic={topic}
                          categoryName={
                            categories.find((c) => c.id === topic.category)
                              ?.name || topic.category
                          }
                        />
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 bounce-in">
                      <p className="text-muted-foreground mb-2">
                        No topics found matching your criteria
                      </p>
                      <Button
                        className="mt-4 dashboard-button-gradient"
                        onClick={() => {
                          setActiveCategory("all");
                          setSearchQuery("");
                        }}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-border/30 pt-4">
                <Button
                  variant="outline"
                  className="border-border/40 text-muted-foreground hover:text-card-foreground transition-all duration-200"
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-8 h-8 p-0 border-border/40 bg-primary/10 text-primary transition-colors hover:bg-primary/20"
                  >
                    1
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-8 h-8 p-0 border-border/40 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    2
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-8 h-8 p-0 border-border/40 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    3
                  </Button>
                  <span className="text-muted-foreground mx-1">...</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-8 h-8 p-0 border-border/40 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    12
                  </Button>
                </div>
                <Button
                  variant="outline"
                  className="border-border/40 text-muted-foreground hover:text-card-foreground transition-all duration-200"
                >
                  Next
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
