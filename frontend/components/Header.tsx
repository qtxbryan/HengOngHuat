import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Header({
  topic,
  description,
}: {
  topic: string;
  description: string;
}) {
  return (
    <header className="bg-dashboard-bg border-b border-dashboard-card-border py-4 px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold dashboard-gradient-text">
            {topic}
          </h1>
          <p className="text-dashboard-text-secondary">{description}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-dashboard-text-secondary" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 w-64 dashboard-input"
            />
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full"></span>
          </Button>
          <div className="h-8 w-8 rounded-full bg-dashboard-accent-indigo flex items-center justify-center text-white">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
