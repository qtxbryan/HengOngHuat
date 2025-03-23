"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  CreditCard,
  Home,
  LineChart,
  LogOut,
  PieChart,
  Settings,
  User,
  Handshake,
} from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 280, opacity: 1 }}
        exit={{ width: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden md:block fixed top-0 left-0 h-screen z-30 bg-sidebar border-r border-indigo-900/50"
      >
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-indigo-800/30">
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                <LineChart className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold dashboard-gradient-text">
                InvestFlow
              </h1>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-3">
            <div className="space-y-1 mb-6">
              <p className="text-xs font-semibold text-indigo-300/70 uppercase tracking-wider px-3 mb-2">
                Overview
              </p>
              <SidebarItem
                icon={Home}
                label="Dashboard"
                isActive
                href="/dashboard"
              />
              <SidebarItem
                icon={PieChart}
                label="Portfolio"
                href="/portfolios"
              />
              <SidebarItem icon={Handshake} label="Community" href="/forum" />
            </div>

            <div className="space-y-1 mb-6">
              <p className="text-xs font-semibold text-indigo-300/70 uppercase tracking-wider px-3 mb-2">
                News
              </p>
              <SidebarItem icon={CreditCard} label="News" href="/news" />
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-indigo-300/70 uppercase tracking-wider px-3 mb-2">
                Account
              </p>
              <SidebarItem icon={User} label="Profile" href="/profile" />
              <SidebarItem icon={Settings} label="Settings" href="/settings" />
              <SidebarItem icon={LogOut} label="Logout" href="/auth" />
            </div>
          </div>

          <div className="p-4 border-t border-indigo-800/30">
            <div className="bg-indigo-900/30 rounded-lg p-3">
              <div className="flex items-center space-x-3 mb-3">
                <Avatar className="h-10 w-10 border-2 border-indigo-500/30">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="@user"
                  />
                  <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                    A
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-white">Alex Johnson</p>
                  <p className="text-xs text-indigo-300">Premium Plan</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-indigo-800/30 border-indigo-700/50 text-indigo-200 hover:bg-indigo-700/50 hover:text-white"
              >
                <User className="mr-2 h-4 w-4" />
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Sidebar;
