"use client";

import { replies, topic } from "@/app/data/forum-data";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Flag, MoreHorizontal, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

const page = () => {
  const router = useRouter();
  const [replyContent, setReplyContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmitReply = () => {
    // Simulate submitting the reply with loading state
    setIsSubmitting(true);
    setTimeout(() => {
      // Here you would typically send the reply to your backend
      console.log({ topicId: topic.id, content: replyContent });
      // Reset form and submitting state
      setReplyContent("");
      setIsSubmitting(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header Skeleton */}
        <header className="border-b border-border/40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center">
              <div className="skeleton-pulse h-9 w-36 mr-2"></div>
              <div className="skeleton-pulse h-6 w-64"></div>
            </div>
          </div>
        </header>

        {/* Main Content Skeleton */}
        <main className="container mx-auto px-4 py-6">
          <div className="grid gap-6">
            {/* Topic Card Skeleton */}
            <Card className="dashboard-card">
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="skeleton-pulse h-5 w-16"></div>
                      <div className="skeleton-pulse h-5 w-16"></div>
                    </div>
                    <div className="skeleton-pulse h-7 w-full max-w-xl mb-2"></div>
                    <div className="skeleton-pulse h-4 w-48"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="skeleton-pulse h-8 w-20"></div>
                    <div className="skeleton-pulse h-8 w-20"></div>
                    <div className="skeleton-pulse h-8 w-8"></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="hidden md:block">
                    <div className="skeleton-pulse h-10 w-10 rounded-full"></div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="skeleton-pulse h-4 w-full"></div>
                    <div className="skeleton-pulse h-4 w-full"></div>
                    <div className="skeleton-pulse h-4 w-3/4"></div>
                    <div className="skeleton-pulse h-4 w-full"></div>
                    <div className="skeleton-pulse h-4 w-5/6"></div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-border/30 pt-4 flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="skeleton-pulse h-9 w-24"></div>
                  <div className="skeleton-pulse h-9 w-24"></div>
                </div>
              </CardFooter>
            </Card>

            {/* Reply Cards Skeleton */}
            <div className="grid gap-4">
              <div className="skeleton-pulse h-8 w-32"></div>

              {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="dashboard-card">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="hidden md:block">
                        <div className="skeleton-pulse h-10 w-10 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                          <div>
                            <div className="skeleton-pulse h-5 w-32 mb-1"></div>
                          </div>
                          <div className="skeleton-pulse h-8 w-8"></div>
                        </div>
                        <div className="skeleton-pulse h-4 w-full mb-1"></div>
                        <div className="skeleton-pulse h-4 w-full mb-1"></div>
                        <div className="skeleton-pulse h-4 w-3/4 mb-4"></div>
                        <div className="flex items-center gap-2">
                          <div className="skeleton-pulse h-8 w-16"></div>
                          <div className="skeleton-pulse h-8 w-16"></div>
                          <div className="skeleton-pulse h-8 w-16"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="text-muted-foreground mr-2 transition-all duration-200 hover:text-card-foreground hover:bg-primary/10"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Forums
            </Button>
            <h1 className="text-xl font-bold dashboard-gradient-text truncate">
              {topic.title}
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid gap-6">
          {/* Topic Card */}
          <Card className="dashboard-card slide-up hover-glow">
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {topic.isPinned && (
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/20 transition-colors hover:bg-primary/20"
                      >
                        Pinned
                      </Badge>
                    )}
                    {topic.isHot && (
                      <Badge className="bg-destructive/20 text-destructive border-destructive/20 transition-colors hover:bg-destructive/30">
                        Hot
                      </Badge>
                    )}
                    <Badge
                      variant="outline"
                      className="bg-accent/10 text-accent border-accent/20 transition-colors hover:bg-accent/20"
                    >
                      Announcements
                    </Badge>
                  </div>
                  <CardTitle className="text-card-foreground text-2xl">
                    {topic.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground mt-2">
                    Posted by{" "}
                    <span className="text-accent">{topic.author}</span> on{" "}
                    {topic.createdAt} • {topic.views} views
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border/40 text-muted-foreground transition-all duration-200 hover:text-card-foreground"
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border/40 text-muted-foreground transition-all duration-200 hover:text-card-foreground"
                  >
                    <Flag className="h-4 w-4 mr-1" />
                    Report
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border/40 text-muted-foreground p-0 w-8 h-8 transition-colors hover:text-card-foreground"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="hidden md:block">
                  <Avatar className="h-10 w-10 border border-border/40 ring-2 ring-primary/10">
                    <AvatarImage src={topic.avatar} alt={topic.author} />
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {topic.author.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div
                    className="prose prose-invert max-w-none text-card-foreground"
                    dangerouslySetInnerHTML={{ __html: topic.content }}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/30 pt-4 flex justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border/40 text-muted-foreground group hover:border-primary/40 transition-all duration-200"
                >
                  <Heart className="h-4 w-4 mr-1 group-hover:text-primary transition-colors duration-200" />
                  <span className="group-hover:text-card-foreground transition-colors duration-200">
                    Like ({topic.likes})
                  </span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border/40 text-muted-foreground group hover:border-primary/40 transition-all duration-200"
                >
                  <MessageCircle className="h-4 w-4 mr-1 group-hover:text-primary transition-colors duration-200" />
                  <span className="group-hover:text-card-foreground transition-colors duration-200">
                    Reply
                  </span>
                </Button>
              </div>
            </CardFooter>
          </Card>

          {/* Replies */}
          <div className="grid gap-4">
            <h2
              className="text-xl font-bold text-card-foreground slide-up"
              style={{ animationDelay: "150ms" }}
            >
              Replies ({replies.length})
            </h2>

            {replies.map((reply, index) => (
              <Card
                key={reply.id}
                className="dashboard-card hover-lift slide-up"
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="hidden md:block">
                      <Avatar className="h-10 w-10 border border-border/40 ring-1 ring-primary/10">
                        <AvatarImage src={reply.avatar} alt={reply.author} />
                        <AvatarFallback className="bg-primary/20 text-primary">
                          {reply.author.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                        <div>
                          <span className="font-medium text-accent">
                            {reply.author}
                          </span>
                          <span className="text-sm text-muted-foreground ml-2">
                            {reply.createdAt}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-border/40 text-muted-foreground p-0 w-8 h-8 self-end md:self-auto transition-colors hover:text-card-foreground"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-card-foreground mb-4">
                        {reply.content}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-border/40 text-muted-foreground h-8 px-2 hover:bg-primary/10 hover:text-primary transition-colors group"
                        >
                          <ThumbsUp className="h-4 w-4 mr-1 group-hover:text-primary" />
                          {reply.likes}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-border/40 text-muted-foreground h-8 px-2 hover:bg-destructive/10 hover:text-destructive transition-colors group"
                        >
                          <ThumbsDown className="h-4 w-4 mr-1 group-hover:text-destructive" />
                          {reply.dislikes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground h-8 hover:text-primary hover:bg-primary/10 transition-colors"
                        >
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Reply Form */}
          <Card
            className="dashboard-card slide-up"
            style={{ animationDelay: "500ms" }}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-card-foreground">
                Post a Reply
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Share your thoughts on this topic
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Textarea
                  placeholder="Write your reply here..."
                  className="dashboard-input min-h-[150px] transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/30 pt-4 flex justify-end">
              <Button
                className="dashboard-button-gradient relative overflow-hidden transition-all duration-300"
                onClick={handleSubmitReply}
                disabled={!replyContent.trim() || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-pulse">Posting...</span>
                    <span className="absolute bottom-0 left-0 h-1 bg-primary-foreground/30 animate-[progressBar_1s_ease-in-out]"></span>
                  </>
                ) : (
                  "Post Reply"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default page;
