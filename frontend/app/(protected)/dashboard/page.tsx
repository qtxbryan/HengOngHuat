"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bell,
  CreditCard,
  DollarSign,
  Download,
  HelpCircle,
  Home,
  LineChart,
  LogOut,
  Menu,
  PieChart,
  Plus,
  Search,
  Settings,
  TrendingDown,
  TrendingUp,
  User,
  Wallet,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";

// Import chart components
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample data for charts
const portfolioPerformanceData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
  { name: "Jul", value: 3490 },
  { name: "Aug", value: 4000 },
  { name: "Sep", value: 5000 },
  { name: "Oct", value: 6000 },
  { name: "Nov", value: 7000 },
  { name: "Dec", value: 9000 },
];

const assetAllocationData = [
  { name: "Stocks", value: 60 },
  { name: "Bonds", value: 20 },
  { name: "Cash", value: 10 },
  { name: "Real Estate", value: 10 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const monthlyInvestmentData = [
  { name: "Jan", amount: 1000 },
  { name: "Feb", amount: 1500 },
  { name: "Mar", amount: 1200 },
  { name: "Apr", amount: 1800 },
  { name: "May", amount: 2000 },
  { name: "Jun", amount: 1700 },
];

const recentTransactions = [
  {
    id: 1,
    type: "deposit",
    description: "Deposit to Investment Account",
    amount: 5000,
    date: "2023-03-15",
    status: "completed",
  },
  {
    id: 2,
    type: "withdrawal",
    description: "Withdrawal from Savings",
    amount: 1000,
    date: "2023-03-10",
    status: "completed",
  },
  {
    id: 3,
    type: "buy",
    description: "Purchase of AAPL Shares",
    amount: 2500,
    date: "2023-03-05",
    status: "completed",
  },
  {
    id: 4,
    type: "sell",
    description: "Sale of TSLA Shares",
    amount: 3000,
    date: "2023-03-01",
    status: "completed",
  },
  {
    id: 5,
    type: "dividend",
    description: "Dividend Payment",
    amount: 150,
    date: "2023-02-28",
    status: "completed",
  },
];

export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex-1 transition-all duration-300 ease-in-out md:ml-[280px]">
      <main className="p-4 md:-6 max-w-7xl mx-auto ">
        <DashboardContent />
      </main>
    </div>
  );
}

function DashboardContent() {
  return (
    <div className="space-y-8">
      {/* Header with welcome message and actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <motion.h1
            className="text-2xl md:text-3xl font-bold text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome back, Alex
          </motion.h1>
          <motion.p
            className="text-purple-300 mt-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {`Here's what's happening with your investments today`}
          </motion.p>
        </div>

        <motion.div
          className="flex items-center space-x-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="text-purple-300 hover:text-white hover:bg-[#0f3460]/50"
            >
              <Bell />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
          </div>

          <div className="relative">
            <Input
              placeholder="Search..."
              className="w-40 md:w-64 bg-[#0f3460]/50 border-[#0f3460] text-white focus-visible:ring-indigo-500"
            />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-purple-400" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="@user"
                  />
                  <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                    A
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-[#16213e] border-[#0f3460] text-purple-200"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-white">
                    Alex Johnson
                  </p>
                  <p className="text-xs leading-none text-purple-400">
                    alex@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#0f3460]" />
              <DropdownMenuItem className="hover:bg-[#0f3460]/50 hover:text-white cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#0f3460]/50 hover:text-white cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#0f3460]" />
              <DropdownMenuItem className="hover:bg-[#0f3460]/50 hover:text-white cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </div>

      {/* Key metrics */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-[#16213e] border-[#0f3460]/50 shadow-xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-300">
                  Total Portfolio Value
                </p>
                <h3 className="text-2xl font-bold text-white mt-1">
                  $124,567.89
                </h3>
                <div className="flex items-center mt-1 text-green-400 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+12.5% this month</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-indigo-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#16213e] border-[#0f3460]/50 shadow-xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-300">
                  Monthly Returns
                </p>
                <h3 className="text-2xl font-bold text-white mt-1">
                  $2,845.00
                </h3>
                <div className="flex items-center mt-1 text-green-400 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+5.2% from last month</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                <LineChart className="h-6 w-6 text-indigo-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#16213e] border-[#0f3460]/50 shadow-xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-300">
                  Total Investments
                </p>
                <h3 className="text-2xl font-bold text-white mt-1">
                  $98,750.00
                </h3>
                <div className="flex items-center mt-1 text-green-400 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+8.3% this year</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                <Wallet className="h-6 w-6 text-indigo-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#16213e] border-[#0f3460]/50 shadow-xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-300">
                  Available Cash
                </p>
                <h3 className="text-2xl font-bold text-white mt-1">
                  $25,817.89
                </h3>
                <div className="flex items-center mt-1 text-purple-300 text-sm">
                  <span>Ready to invest</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-indigo-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Portfolio Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-[#16213e] border-[#0f3460]/50 shadow-xl">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">
                  Portfolio Performance
                </CardTitle>
                <CardDescription className="text-purple-300">
                  Your investment growth over time
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Tabs defaultValue="1y" className="w-[200px]">
                  <TabsList className="bg-[#0f3460]/50">
                    <TabsTrigger
                      value="1m"
                      className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                    >
                      1M
                    </TabsTrigger>
                    <TabsTrigger
                      value="3m"
                      className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                    >
                      3M
                    </TabsTrigger>
                    <TabsTrigger
                      value="6m"
                      className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                    >
                      6M
                    </TabsTrigger>
                    <TabsTrigger
                      value="1y"
                      className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                    >
                      1Y
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-[#0f3460]/50 border-[#0f3460] text-purple-300 hover:text-white hover:bg-[#0f3460]"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={portfolioPerformanceData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#0f3460" />
                  <XAxis dataKey="name" stroke="#a78bfa" />
                  <YAxis stroke="#a78bfa" />
                  <ReTooltip
                    contentStyle={{
                      backgroundColor: "#16213e",
                      borderColor: "#0f3460",
                      color: "#fff",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Asset Allocation and Monthly Investment */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="bg-[#16213e] border-[#0f3460]/50 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white">Asset Allocation</CardTitle>
            <CardDescription className="text-purple-300">
              Your current investment mix
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={assetAllocationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {assetAllocationData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#16213e] border-[#0f3460]/50 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white">Monthly Investments</CardTitle>
            <CardDescription className="text-purple-300">
              Your investment contributions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyInvestmentData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#0f3460" />
                  <XAxis dataKey="name" stroke="#a78bfa" />
                  <YAxis stroke="#a78bfa" />
                  <ReTooltip
                    contentStyle={{
                      backgroundColor: "#16213e",
                      borderColor: "#0f3460",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="amount" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="bg-[#16213e] border-[#0f3460]/50 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-white">Recent Transactions</CardTitle>
              <CardDescription className="text-purple-300">
                Your latest financial activities
              </CardDescription>
            </div>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
              <Plus className="mr-2 h-4 w-4" /> New Transaction
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#0f3460]">
                    <th className="px-4 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0f3460]">
                  {recentTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="hover:bg-[#0f3460]/30 transition-colors"
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div
                            className={cn(
                              "h-8 w-8 rounded-full flex items-center justify-center mr-3",
                              transaction.type === "deposit" &&
                                "bg-green-500/20 text-green-400",
                              transaction.type === "withdrawal" &&
                                "bg-red-500/20 text-red-400",
                              transaction.type === "buy" &&
                                "bg-blue-500/20 text-blue-400",
                              transaction.type === "sell" &&
                                "bg-yellow-500/20 text-yellow-400",
                              transaction.type === "dividend" &&
                                "bg-purple-500/20 text-purple-400"
                            )}
                          >
                            {transaction.type === "deposit" && (
                              <TrendingUp className="h-4 w-4" />
                            )}
                            {transaction.type === "withdrawal" && (
                              <TrendingDown className="h-4 w-4" />
                            )}
                            {transaction.type === "buy" && (
                              <ArrowUpRight className="h-4 w-4" />
                            )}
                            {transaction.type === "sell" && (
                              <ArrowUpRight className="h-4 w-4 transform rotate-90" />
                            )}
                            {transaction.type === "dividend" && (
                              <DollarSign className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">
                              {transaction.description}
                            </div>
                            <div className="text-xs text-purple-300 capitalize">
                              {transaction.type}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div
                          className={cn(
                            "text-sm font-medium",
                            transaction.type === "deposit" ||
                              transaction.type === "sell" ||
                              transaction.type === "dividend"
                              ? "text-green-400"
                              : "text-red-400"
                          )}
                        >
                          {transaction.type === "deposit" ||
                          transaction.type === "sell" ||
                          transaction.type === "dividend"
                            ? `+$${transaction.amount.toLocaleString()}`
                            : `-$${transaction.amount.toLocaleString()}`}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-purple-300">
                        {transaction.date}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                          {transaction.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-4">
              <Button
                variant="outline"
                className="bg-[#0f3460]/50 border-[#0f3460] text-purple-300 hover:text-white hover:bg-[#0f3460]"
              >
                View All Transactions
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="bg-[#16213e] border-[#0f3460]/50 shadow-xl">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-4">
              <Plus className="h-6 w-6 text-indigo-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Add Funds</h3>
            <p className="text-sm text-purple-300 mb-4">
              Deposit money to your investment account
            </p>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white w-full">
              Deposit Now
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#16213e] border-[#0f3460]/50 shadow-xl">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-indigo-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Invest Now</h3>
            <p className="text-sm text-purple-300 mb-4">
              Explore new investment opportunities
            </p>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white w-full">
              Start Investing
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#16213e] border-[#0f3460]/50 shadow-xl">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-4">
              <LineChart className="h-6 w-6 text-indigo-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              Portfolio Analysis
            </h3>
            <p className="text-sm text-purple-300 mb-4">
              Get detailed insights about your investments
            </p>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white w-full">
              View Analysis
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
