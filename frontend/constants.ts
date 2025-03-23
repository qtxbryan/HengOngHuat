import { Tab } from "./types";
import {
  BarChart,
  PieChart,
  Settings,
  Newspaper,
  ChartArea,
  ChartCandlestick,
  Handshake,
  Bot,
} from "lucide-react";

export const SIDEBAR_LINKS = [
  {
    icon: BarChart,
    label: "Summary",
    href: "/",
  },
  {
    icon: PieChart,
    label: "Portfolios",
    href: "/portfolios",
  },
  {
    icon: Newspaper,
    label: "News",
    href: "/news",
    badge: "10",
  },
  {
    icon: ChartArea,
    label: "Analysis",
    href: "/appointment",
  },
  {
    icon: ChartCandlestick,
    label: "Assets",
    href: "/analytics",
  },
  {
    icon: Handshake,
    label: "Discussion Forum",
    href: "/forum",
  },
  {
    icon: Bot,
    label: "Chatbot",
    href: "/chat",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
  },
];
export const HEADER_TABS: Tab[] = [
  {
    label: "Overview",
    href: "/",
  },
  {
    label: "Analysis",
    href: "/analysis",
  },
];

export const ACCORDION_TABS = [
  "AI Analysis",
  "Technical Analysis",
  "Fundamental Analysis",
];

export const NEWS_TABS: Tab[] = [
  { label: "Trending", href: "/news" },
  { label: "Latest", href: "/news/latest" },
  { label: "Top", href: "/news/top" },
];

export const PORTFOLIO_TABS: Tab[] = [
  { label: "Overview", href: "/1" },
  { label: "Sector", href: "/1/sector" },
  { label: "Projection and Analysis", href: "#projections" },
];

export const TIME_PERIODS = ["1d", "7d", "30d", "6m", "12m", "max"];

export const STEPS = [
  {
    title: "Step 1",
    description: "Personal Information",
  },
  {
    title: "Step 2",
    description: "Financial Information",
  },
];

export const MAJOR_EXPENSES_OPTIONS = [
  { value: "house", label: "House Construction" },
  { value: "education", label: "Education" },
  { value: "medical", label: "Medical Treatment" },
  { value: "vehicle", label: "Vehicle Purchase" },
  { value: "business", label: "Business Investment" },
];

export const MARITAL_STATUS_OPTIONS = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "divorced", label: "Divorced" },
  { value: "widowed", label: "Widowed" },
];

export const INVESTMENT_GOALS = [
  { value: "growth", label: "Long-term Growth" },
  { value: "income", label: "Regular Income" },
  { value: "preservation", label: "Capital Preservation" },
  { value: "aggressive", label: "Aggressive Growth" },
];

export const INVESTMENT_KNOWLEDGE = [
  { value: "expert", label: "Expert" },
  { value: "advanced", label: "Advanced" },
  { value: "intermediate", label: "Intermediate" },
  { value: "beginner", label: "Beginner" },
];

export const RISK_PERCEPTION = [
  { value: "opportunity", label: "Opportunity for Growth" },
  { value: "uncertainty", label: "Market Uncertainty" },
  { value: "loss", label: "Potential Loss" },
  { value: "volatility", label: "Price Volatility" },
];

export const DECISION_STYLE = [
  { value: "analytical", label: "Analytical and Research-based" },
  { value: "intuitive", label: "Intuitive and Quick" },
  { value: "cautious", label: "Cautious and Methodical" },
  { value: "collaborative", label: "Collaborative and Advised" },
];

export const INITIAL_INVESTMENT = [
  { value: "5000", label: "$5,000 - $10,000" },
  { value: "10000", label: "$10,000 - $25,000" },
  { value: "25000", label: "$25,000 - $50,000" },
  { value: "50000", label: "$50,000+" },
];

export const FLUCTUATION_TOLERANCE = [
  { value: "conservative", label: "±5% ($500 on $10,000)" },
  { value: "moderate", label: "±10% ($1,000 on $10,000)" },
  { value: "aggressive", label: "±20% ($2,000 on $10,000)" },
  { value: "very_aggressive", label: "±30% ($3,000 on $10,000)" },
];

export const MONTHLY_CONTRI = [
  { value: "100", label: "$100 - $250" },
  { value: "250", label: "$250 - $500" },
  { value: "500", label: "$500 - $1,000" },
  { value: "1000", label: "$1,000+" },
];

export const INCOME_DURATION = [
  { value: "5", label: "5-10 years" },
  { value: "10", label: "10-20 years" },
  { value: "20", label: "20-30 years" },
  { value: "30", label: "30+ years" },
];
