import type React from "react";
import Sidebar from "@/components/Sidebar";
import Chatbot from "@/components/Chatbot";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <Sidebar />
      {children}
      <Chatbot />
    </div>
  );
}
