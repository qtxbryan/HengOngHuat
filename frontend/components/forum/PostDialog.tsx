"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";

interface CreatePostDialogProps {
  onCreatePost: (title: string, content: string, category: string) => void;
}

export function CreatePostDialog({ onCreatePost }: CreatePostDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    // Simulate submitting the post with loading state
    setIsSubmitting(true);
    setTimeout(() => {
      onCreatePost(title, content, category);
      setTitle("");
      setContent("");
      setCategory("general");
      setIsSubmitting(false);
      setIsOpen(false);
    }, 800);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="dashboard-button-gradient hover-lift">
          <PlusCircle className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </DialogTrigger>
      <DialogContent className="dashboard-card">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">
            Create New Post
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Share your thoughts with the community
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label
              htmlFor="title"
              className="text-sm font-medium text-muted-foreground"
            >
              Title
            </label>
            <Input
              id="title"
              placeholder="Enter post title"
              className="dashboard-input transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="category"
              className="text-sm font-medium text-muted-foreground"
            >
              Category
            </label>
            <select
              id="category"
              className="dashboard-input rounded-md p-2 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="general">General</option>
              <option value="help">Help & Support</option>
              <option value="announcements">Announcements</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="content"
              className="text-sm font-medium text-muted-foreground"
            >
              Content
            </label>
            <Textarea
              id="content"
              placeholder="Write your post content here..."
              className="dashboard-input min-h-[150px] transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="border-border/40 text-card-foreground transition-all duration-200 hover:bg-primary/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="dashboard-button-gradient relative overflow-hidden"
            disabled={!title.trim() || !content.trim() || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="animate-pulse">Posting...</span>
                <span className="absolute bottom-0 left-0 h-1 bg-primary-foreground/30 animate-[progressBar_1s_ease-in-out]"></span>
              </>
            ) : (
              "Post"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
