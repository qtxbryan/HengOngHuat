"use client";

import type React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface ForumCategoryCardProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function ForumCategoryCard({
  categories,
  activeCategory,
  onCategoryChange,
}: ForumCategoryCardProps) {
  return (
    <Card className="dashboard-card hover-glow">
      <CardHeader className="pb-3">
        <CardTitle className="text-card-foreground">Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <nav className="grid gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              className={`justify-start transition-all duration-200 ${
                activeCategory === category.id
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-card-foreground"
              }`}
              onClick={() => onCategoryChange(category.id)}
            >
              {category.icon}
              <span className="ml-2">{category.name}</span>
            </Button>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
}
