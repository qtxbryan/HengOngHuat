import type { Asset } from "@/types/asset";

export const mockAssets: Asset[] = [
  {
    ticker: "AAPL",
    name: "Apple Inc.",
    type: "stock",
    price: 182.52,
    changePercentage: 1.25,
  },
  {
    ticker: "MSFT",
    name: "Microsoft Corporation",
    type: "stock",
    price: 417.88,
    changePercentage: 0.75,
  },
  {
    ticker: "GOOGL",
    name: "Alphabet Inc.",
    type: "stock",
    price: 175.98,
    changePercentage: -0.32,
  },
  {
    ticker: "AMZN",
    name: "Amazon.com Inc.",
    type: "stock",
    price: 178.75,
    changePercentage: 2.15,
  },
  {
    ticker: "TSLA",
    name: "Tesla, Inc.",
    type: "stock",
    price: 175.34,
    changePercentage: -1.45,
  },
  {
    ticker: "BTC",
    name: "Bitcoin",
    type: "crypto",
    price: 68245.12,
    changePercentage: 3.78,
  },
  {
    ticker: "ETH",
    name: "Ethereum",
    type: "crypto",
    price: 3521.67,
    changePercentage: 2.91,
  },
  {
    ticker: "AGG",
    name: "iShares Core U.S. Aggregate Bond ETF",
    type: "bond",
    price: 98.32,
    changePercentage: 0.12,
  },
  {
    ticker: "VTI",
    name: "Vanguard Total Stock Market ETF",
    type: "etf",
    price: 252.87,
    changePercentage: 0.85,
  },
  {
    ticker: "QQQ",
    name: "Invesco QQQ Trust",
    type: "etf",
    price: 438.27,
    changePercentage: 1.05,
  },
  {
    ticker: "GLD",
    name: "SPDR Gold Shares",
    type: "commodity",
    price: 207.45,
    changePercentage: 0.65,
  },
  {
    ticker: "SLV",
    name: "iShares Silver Trust",
    type: "commodity",
    price: 25.78,
    changePercentage: 1.23,
  },
];
