export const HOLDINGS_MOCK = [
  {
    ticker: "AAPL",
    holdingValue: 10000,
    initialInvestment: 8000,
    change1D: 2.5,
    change1M: 5.2,
    changeYTD: 15.3,
    changeOverall: 25.0,
  },
  {
    ticker: "GOOGL",
    holdingValue: 15000,
    initialInvestment: 12000,
    change1D: -1.2,
    change1M: 3.8,
    changeYTD: 10.5,
    changeOverall: 25.0,
  },
  {
    ticker: "MSFT",
    holdingValue: 12000,
    initialInvestment: 10000,
    change1D: 1.8,
    change1M: 4.5,
    changeYTD: 12.7,
    changeOverall: 20.0,
  },
];

export const HOLDINGS_CHART_MOCK = {
  AAPL: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Stock Price",
        data: [150, 155, 160, 165, 170, 175],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  },
  GOOGL: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Stock Price",
        data: [2800, 2850, 2900, 2950, 3000, 3050],
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  },
  MSFT: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Stock Price",
        data: [300, 310, 320, 330, 340, 350],
        borderColor: "rgb(53, 162, 235)",
        tension: 0.1,
      },
    ],
  },
};

export const NEWS_DATA_MOCK = [
  {
    title: "IYW: Tech Stocks Due For A Breather",
    source: "SeekingAlpha",
    date: "2025-01-22T18:06:45",
    description:
      "IYWâs technical outlook shows negative momentum divergence, suggesting a possible test of the 200-day moving average. Click here to read why IYW ETF is a Hold.",
    url: "https://finnhub.io/api/news?id=c9054fc68fcfea700ed8d5a71d8d92eec901506895d2b6d1110347392788317e",
    sentiment: "Negative",
  },
  {
    title:
      "Apple Miami Worldcenter opens Friday, January 24, in downtown Miami",
    source: "Finnhub",
    date: "2025-01-22T17:09:03",
    description:
      "The new store offers customers the full lineup of products and features an industry-leading environmental store design...",
    url: "https://finnhub.io/api/news?id=694d30002912bbfd7d33c3e9fe53eddaa9ecf9501aef7055bd0e7a97ad861bcf",
    sentiment: "Neutral",
  },
  {
    title: "Harding Loevner Global Equity Q4 2024 Report",
    source: "SeekingAlpha",
    date: "2025-01-22T17:00:00",
    description:
      "The Global Equity composite fell 0.86% gross of fees in the fourth quarter, in line with the 0.89% decline of the MSCI ACWI Index.",
    url: "https://finnhub.io/api/news?id=88aa6dca33bf2b79b4dd6455ec870b2218dedbf9c6e71a1765d4f728ad2465b7",
    sentiment: "Negative",
  },
];

export const TIME_SERIES_MOCK = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Portfolio Value",
      data: [1200, 1500, 1700, 1400, 1800, 2000],
      borderColor: "#7dd1e7",
      backgroundColor: "rgba(125, 209, 231, 0.3)",
    },
    {
      label: "Invested Amount",
      data: [1000, 1300, 1600, 1200, 1700, 1900],
      borderColor: "#fbbf24",
      backgroundColor: "rgba(251, 191, 36, 0.3)",
    },
  ],
};

export const CHART_DATA_MOCK = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Total Value",
      data: [
        50000, 51000, 52000, 54000, 53000, 55000, 56000, 57000, 58000, 58144.8,
      ],
      borderColor: "#7dd1e7",
      backgroundColor: "rgba(125, 209, 231, 0.1)",
    },
    {
      label: "Invested Capital",
      data: [
        50000, 50500, 51000, 51500, 52000, 52500, 53000, 53500, 54000, 54500,
      ],
      borderColor: "#a8d897",
      backgroundColor: "rgba(168, 216, 151, 0.1)",
    },
  ],
};

export const PORTFOLIO_DATA_MOCK = [
  {
    id: "1",
    name: "Tech Growth Portfolio",
    value: 25000.0,
    change: 15.3,
    composition: "AAPL 40%, GOOGL 30%, MSFT 30%",
  },
  {
    id: "2",
    name: "Dividend Income",
    value: 18000.0,
    change: 5.7,
    composition: "JNJ 25%, PG 25%, KO 25%, VZ 25%",
  },
  {
    id: "3",
    name: "Green Energy",
    value: 15144.8,
    change: -2.1,
    composition: "TSLA 40%, ENPH 30%, SEDG 30%",
  },
];

export const PORTFOLIO_PERFORMANCE_MOCK = {
  labels: [
    "Dec 2020",
    "Jan 2021",
    "Feb 2021",
    "Mar 2021",
    "Apr 2021",
    "May 2021",
    "Jun 2021",
  ],
  datasets: [
    {
      label: "Portfolio",
      data: [100, 120, 115, 125, 110, 130, 125],
      borderColor: "#7dd1e7",
      backgroundColor: "rgba(125, 209, 231, 0.1)",
      tension: 0.4,
    },
    {
      label: "S&P 500",
      data: [100, 110, 108, 115, 105, 120, 115],
      borderColor: "#a8d897",
      backgroundColor: "rgba(168, 216, 151, 0.1)",
      tension: 0.4,
    },
  ],
};

export const PORTFOLIO_METRICS_MOCK = [
  {
    title: "Annualized Return",
    value: "15.1%",
    tooltip:
      "Converts daily portfolio returns into an annualized figure for easier comparison. If your portfolio grows by 2% per month, your annualized return would be approximately 26.8%.",
  },
  {
    title: "Cumulative Return",
    value: "16.9%",
    tooltip:
      "Tracks the total percentage gain or loss from the start of the investment. If you invested $10,000 and it grows to $15,000, your cumulative return is 50%.",
  },
  {
    title: "Max Drawdown",
    value: "5.2%",
    tooltip:
      "Measures the worst peak-to-trough decline in your portfolio. If your portfolio peaked at $100,000 but later dropped to $80,000, the maximum drawdown is -20%.",
  },
  {
    title: "Sharpe Ratio",
    value: "1.13",
    tooltip:
      "Measures how much return you get for each unit of risk taken. A Sharpe ratio of 2 means you’re earning twice the return for the risk taken, which is good.",
  },
  {
    title: "Sortino Ratio",
    value: "1.37",
    tooltip:
      "Similar to the Sharpe ratio but only considers downside risk (negative volatility). If your portfolio has a Sortino ratio of 3, it means you earn 3x more return than the downside risk you take.",
  },
  {
    title: "Annualized Volatility",
    value: "18.2%",
    tooltip:
      "Measures how much portfolio value fluctuates annually. If your daily volatility is 1.2%, the annualized volatility might be 19%, indicating a higher risk.",
  },
  {
    title: "Beta",
    value: "0.90",
    tooltip:
      "Measures how sensitive your portfolio is to market movements. If your portfolio has a beta of 1.5, it tends to rise 1.5x more than the market when the S&P 500 goes up.",
  },
  {
    title: "Correlation to S&P 500",
    value: "0.85",
    tooltip:
      "Measures how your portfolio moves in relation to the S&P 500 index. If your portfolio has a correlation of 0.9, it closely follows the market\’s movements.",
  },
  {
    title: "Alpha",
    value: "1.8%",
    tooltip:
      "Measures whether your portfolio outperforms the market on a risk-adjusted basis. If the market returns 8%, but your portfolio returns 10% (with the same risk level), your alpha is +2%.",
  },
  {
    title: "Treynor Ratio",
    value: "1.25",
    tooltip:
      "Measures how much return you get for each unit of market risk (beta). A Treynor ratio of 0.5 means you earn 0.5% extra return for every 1 unit of market risk taken.",
  },
];

export const PORTFOLIO_ALLOCATIONS_MOCK = [
  { name: "Large Cap Blend", percentage: 12.5 },
  { name: "Small Cap Blend", percentage: 12.5 },
  { name: "International Stocks", percentage: 8.3 },
  { name: "Emerging Markets", percentage: 8.3 },
  { name: "Intermediate Bonds", percentage: 17 },
  { name: "International Bonds", percentage: 8.3 },
  { name: "Cash", percentage: 8.3 },
  { name: "Commodities", percentage: 16.6 },
  { name: "REITs", percentage: 8.3 },
];

export const PORTFOLIO_ASSETS_MOCK = [
  {
    name: "SPDR S&P 500 ETF (SPY)",
    ticker: "SPY",
    class: "Large-Cap Blend",
    allocation: 12.5,
    value: 50000,
    metrics: {
      marketPrice: 415.32,
      dailyChange: {
        value: 1.24,
        percentage: 0.3,
      },
      movingAverage: 412.56,
      rsi: 56.8,
      macd: 0.42,
      macdSignal: 0.35,
    },
  },
  {
    name: "iShares Russell 2000 ETF (IWM)",
    ticker: "IWM",
    class: "Small-Cap Blend",
    allocation: 8.0,
    value: 32000,
    metrics: {
      marketPrice: 190.75,
      dailyChange: {
        value: -0.58,
        percentage: -0.3,
      },
      movingAverage: 192.1,
      rsi: 49.2,
      macd: -0.25,
      macdSignal: -0.3,
    },
  },
  {
    name: "Vanguard FTSE All-World ex-US ETF (VEU)",
    ticker: "VEU",
    class: "International Equity",
    allocation: 10.0,
    value: 40000,
    metrics: {
      marketPrice: 54.89,
      dailyChange: {
        value: 0.12,
        percentage: 0.22,
      },
      movingAverage: 54.5,
      rsi: 53.5,
      macd: 0.15,
      macdSignal: 0.14,
    },
  },
  {
    name: "iShares MSCI Emerging Markets ETF (EEM)",
    ticker: "EEM",
    class: "Emerging Markets",
    allocation: 7.5,
    value: 30000,
    metrics: {
      marketPrice: 40.21,
      dailyChange: {
        value: -0.1,
        percentage: -0.25,
      },
      movingAverage: 40.5,
      rsi: 47.8,
      macd: -0.12,
      macdSignal: -0.15,
    },
  },
  {
    name: "iShares Core U.S. Aggregate Bond ETF (AGG)",
    ticker: "AGG",
    class: "Fixed Income",
    allocation: 15.0,
    value: 60000,
    metrics: {
      marketPrice: 100.85,
      dailyChange: {
        value: 0.05,
        percentage: 0.05,
      },
      movingAverage: 100.75,
      rsi: 51.0,
      macd: 0.1,
      macdSignal: 0.12,
    },
  },
  {
    name: "Vanguard Total International Bond ETF (BNDX)",
    ticker: "BNDX",
    class: "International Fixed Income",
    allocation: 10.0,
    value: 40000,
    metrics: {
      marketPrice: 51.32,
      dailyChange: {
        value: -0.03,
        percentage: -0.06,
      },
      movingAverage: 51.5,
      rsi: 48.5,
      macd: -0.08,
      macdSignal: -0.07,
    },
  },
  {
    name: "SPDR Bloomberg 1-3 Month T-Bill ETF (BIL)",
    ticker: "BIL",
    class: "Cash & Equivalents",
    allocation: 5.0,
    value: 20000,
    metrics: {
      marketPrice: 91.15,
      dailyChange: {
        value: 0.01,
        percentage: 0.01,
      },
      movingAverage: 91.1,
      rsi: 55.2,
      macd: 0.02,
      macdSignal: 0.01,
    },
  },
  {
    name: "Invesco DB Commodity Index Tracking Fund (DBC)",
    ticker: "DBC",
    class: "Commodities",
    allocation: 7.0,
    value: 28000,
    metrics: {
      marketPrice: 21.32,
      dailyChange: {
        value: 0.08,
        percentage: 0.37,
      },
      movingAverage: 21.25,
      rsi: 57.1,
      macd: 0.05,
      macdSignal: 0.04,
    },
  },
  {
    name: "Vanguard Real Estate ETF (VNQ)",
    ticker: "VNQ",
    class: "Real Estate",
    allocation: 10.0,
    value: 40000,
    metrics: {
      marketPrice: 80.75,
      dailyChange: {
        value: -0.25,
        percentage: -0.31,
      },
      movingAverage: 81.1,
      rsi: 45.0,
      macd: -0.1,
      macdSignal: -0.12,
    },
  },
];

export const PORTFOLIO_MOVERS = [
  { asset: "Apple Inc.", price: 200, change: -20, changePercent: -1 },
  { asset: "Microsoft Corp.", price: 160, change: 5, changePercent: 3 },
  { asset: "Amazon.com Inc.", price: 140, change: 10, changePercent: 7 },
  { asset: "Alphabet Inc.", price: 100, change: -5, changePercent: -4 },
  { asset: "Meta Platforms Inc.", price: 80, change: -3, changePercent: -2 },
];

export const PORTFOLIO_MAX_DRAWDOWN_DATA = [
  { date: "2023-01-01", value: 100 },
  { date: "2023-02-01", value: 120 },
  { date: "2023-03-01", value: 115 },
  { date: "2023-04-01", value: 125 },
  { date: "2023-05-01", value: 110 },
  { date: "2023-06-01", value: 130 },
  { date: "2023-07-01", value: 125 },
];

export const ASSETS_MOCK = [
  {
    icon: "/placeholder.svg",
    title: "Global Equity",
    ticker: "VT",
    description: "Vanguard Total World Stock ETF",
    price: 98.45,
    change: 1.23,
  },
  {
    icon: "/placeholder.svg",
    title: "US Equity",
    ticker: "VTSAX",
    description: "Vanguard Total Stock Market Index Fund",
    price: 105.67,
    change: -0.45,
  },
  {
    icon: "/placeholder.svg",
    title: "Real Estate",
    ticker: "VNQ",
    description: "Vanguard Real Estate Index Fund",
    price: 82.31,
    change: 0.78,
  },
  {
    icon: "/placeholder.svg",
    title: "International Equity",
    ticker: "VEA",
    description: "Vanguard FTSE Developed Markets ETF",
    price: 47.89,
    change: -0.32,
  },
  {
    icon: "/placeholder.svg",
    title: "Emerging Markets Equity",
    ticker: "VWO",
    description: "Vanguard FTSE Emerging Markets ETF",
    price: 41.23,
    change: 1.56,
  },
  {
    icon: "/placeholder.svg",
    title: "Clean Energy",
    ticker: "ICLN",
    description: "iShares Global Clean Energy ETF",
    price: 18.75,
    change: 2.14,
  },
];

export const FORUM_TOPICS = [
  { value: "general", label: "General" },
  { value: "personalFinance", label: "Personal Finance" },
  { value: "investment", label: "Investment" },
  { value: "retirement", label: "Retirement" },
  { value: "trends", label: "Trends" },
  { value: "technology", label: "Technology" },
];

export const AI_SUGGESTED_QUESTIONS = [
  {
    text: "What are the essential components included in most design systems?",
    onClick: () => console.log("Question 1 clicked"),
  },
  {
    text: "How do you ensure consistency in components across different platforms?",
    onClick: () => console.log("Question 2 clicked"),
  },
  {
    text: "What criteria are used to decide whether a new component should be added to a design system?",
    onClick: () => console.log("Question 3 clicked"),
  },
  {
    text: "How do you handle version control and updates for components in a design system?",
    onClick: () => console.log("Question 4 clicked"),
  },
];

export const SECTOR_EXPOSURE_RETURN_MOCK = [
  { sector: "Technology", returns: 15 },
  { sector: "Healthcare", returns: 12 },
  { sector: "Finance", returns: 10 },
  { sector: "Consumer Goods", returns: -8 },
  { sector: "Energy", returns: -6 },
  { sector: "Materials", returns: -4 },
];
