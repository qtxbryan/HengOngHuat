import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Users, Clock } from "lucide-react";
import Link from "next/link";

interface Topic {
  id: number;
  title: string;
  author: string;
  avatar: string;
  category: string;
  replies: number;
  views: number;
  lastActivity: string;
  isPinned: boolean;
  isHot: boolean;
}

interface ForumTopicCardProps {
  topic: Topic;
  categoryName: string;
}

export function ForumTopicCard({ topic, categoryName }: ForumTopicCardProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border border-border/40 bg-card/80 shadow-sm transition-all duration-200 hover:shadow-md hover:bg-card">
      <div className="flex items-start gap-4 mb-4 md:mb-0">
        <Avatar className="h-10 w-10 border border-border/40 ring-1 ring-primary/10 transition-all duration-300 hover:ring-primary/30">
          <AvatarImage src={topic.avatar} alt={topic.author} />
          <AvatarFallback className="bg-primary/20 text-primary">
            {topic.author.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
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
              {categoryName}
            </Badge>
          </div>
          <h3 className="font-medium text-card-foreground hover:text-primary transition-colors duration-300">
            <Link href={`/topic/${topic.id}`} className="hover:underline">
              {topic.title}
            </Link>
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Posted by <span className="text-accent">{topic.author}</span>
          </p>
        </div>
      </div>
      <div className="flex flex-row md:flex-col lg:flex-row gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1 transition-transform duration-200 hover:translate-x-1 group">
          <MessageCircle className="h-4 w-4 group-hover:text-primary transition-colors duration-200" />
          <span className="group-hover:text-card-foreground transition-colors duration-200">
            {topic.replies} replies
          </span>
        </div>
        <div className="flex items-center gap-1 transition-transform duration-200 hover:translate-x-1 group">
          <Users className="h-4 w-4 group-hover:text-primary transition-colors duration-200" />
          <span className="group-hover:text-card-foreground transition-colors duration-200">
            {topic.views} views
          </span>
        </div>
        <div className="flex items-center gap-1 transition-transform duration-200 hover:translate-x-1 group">
          <Clock className="h-4 w-4 group-hover:text-primary transition-colors duration-200" />
          <span className="group-hover:text-card-foreground transition-colors duration-200">
            {topic.lastActivity}
          </span>
        </div>
      </div>
    </div>
  );
}
