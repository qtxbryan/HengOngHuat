"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Sample AI analysis responses
const aiResponses = {
  general: [
    "The current market environment is characterized by moderate volatility with inflation showing signs of stabilization. The Federal Reserve's recent policy decisions suggest a potential shift towards a more accommodative stance in the coming quarters.",
    "Key economic indicators point to resilient consumer spending despite higher interest rates. Corporate earnings have generally exceeded expectations, particularly in the technology and healthcare sectors.",
    "Global markets are navigating geopolitical tensions, with emerging markets showing mixed performance. Commodities have experienced price fluctuations due to supply chain disruptions and changing demand patterns.",
    "Bond yields have stabilized after a period of significant movement, potentially creating opportunities in fixed income. The yield curve structure suggests cautious optimism about economic growth prospects.",
  ],
  portfolio: {
    "1": [
      "Your Growth Portfolio is well-positioned to capitalize on current market trends with its significant allocation to technology and healthcare sectors.",
      "The portfolio's aggressive growth orientation aligns with your long-term investment horizon, though it may experience higher volatility in the near term.",
      "Consider evaluating your international exposure, which is currently below benchmark. Increasing allocation to emerging markets could provide diversification benefits.",
      "The cash position (10%) is slightly elevated for a growth portfolio. In the current environment, a strategic deployment of 3-5% into equities could enhance long-term returns.",
    ],
    "2": [
      "Your Retirement Fund demonstrates a balanced approach with appropriate diversification across asset classes.",
      "The 60/30/10 split between stocks, bonds, and real estate provides a solid foundation for long-term growth while managing volatility.",
      "Given your time horizon, the current bond allocation is appropriate, though you might consider increasing exposure to inflation-protected securities.",
      "The real estate component adds valuable diversification, but consider evaluating the specific REITs in your portfolio for interest rate sensitivity.",
    ],
    "3": [
      "Your Tech Investments portfolio shows strong concentration in the technology sector, which has driven impressive returns but also increases sector-specific risk.",
      "The 85% allocation to tech stocks represents significant sector concentration. Consider introducing selective diversification while maintaining your technology focus.",
      "The portfolio's volatility metrics indicate higher risk than broader market indices, which aligns with its specialized focus. Consider whether this risk level remains appropriate for your overall financial plan.",
      "The 15% cash position provides flexibility for opportunistic investments. In the current environment, consider deploying a portion into high-quality tech companies during market pullbacks.",
    ],
    "4": [
      "Your Dividend Income portfolio is well-structured for generating consistent income with its focus on dividend-paying stocks and REITs.",
      "The 75% allocation to dividend stocks provides a solid income foundation. The quality of these dividend payers appears strong based on dividend growth rates and payout ratios.",
      "The REIT exposure (15%) enhances income generation while adding real estate exposure. Monitor interest rate sensitivity in this portion of your portfolio.",
      "Consider evaluating the bond component for opportunities to enhance yield without significantly increasing duration risk in the current interest rate environment.",
    ],
  },
  sector: {
    "1": [
      "Technology (35%): The tech sector continues to show strength, particularly in AI, cloud computing, and cybersecurity. Your allocation is appropriately weighted towards software and semiconductor companies, which show promising growth trajectories.",
      "Healthcare (20%): Healthcare holdings are well-positioned with a mix of established pharmaceutical companies and innovative biotech firms. The sector offers defensive characteristics while maintaining growth potential.",
      "Financials (15%): Financial stocks may benefit from a stabilizing interest rate environment. Your portfolio's focus on diversified financial services companies rather than pure banking provides balanced exposure.",
      "Consumer Discretionary (12%): This sector faces mixed signals with resilient high-end consumers but pressure on mass-market segments. Consider evaluating individual holdings for strong balance sheets and pricing power.",
    ],
    "2": [
      "Financials (25%): Your significant allocation to financials is well-timed as the sector adapts to the changing interest rate environment. The portfolio's focus on insurance and diversified financial services provides stability.",
      "Technology (20%): The technology exposure is appropriately balanced between established dividend-paying tech companies and growth-oriented firms. Consider increasing exposure to cybersecurity and cloud infrastructure.",
      "Healthcare (18%): Healthcare holdings provide defensive characteristics appropriate for a retirement portfolio. The mix of pharmaceutical, medical device, and healthcare service providers offers balanced exposure.",
      "Utilities (15%): The substantial utilities allocation provides income stability and defensive characteristics. Monitor for interest rate sensitivity, though many of your holdings have inflation-adjustment mechanisms.",
    ],
    "3": [
      "Technology (65%): The concentrated technology exposure has driven strong performance but represents significant sector risk. Within this allocation, your portfolio shows good diversification across software, hardware, and semiconductor segments.",
      "Consumer Discretionary (15%): The consumer tech focus complements your core technology holdings. Consider evaluating these positions for their competitive positioning and margin sustainability.",
      "Healthcare (10%): The limited healthcare exposure is appropriately focused on innovative medical technology companies that complement your technology thesis.",
      "Financials (5%): The small allocation to fintech companies provides exposure to the intersection of technology and financial services, aligning well with your portfolio's overall technology focus.",
    ],
    "4": [
      "Financials (30%): Your significant allocation to financial services companies with strong dividend histories provides a solid income foundation. The focus on insurance and diversified financials rather than pure banking reduces interest rate sensitivity.",
      "Utilities (25%): The utilities allocation delivers consistent income with lower volatility. Your portfolio includes a good mix of electric, water, and renewable energy utilities, providing service diversification.",
      "Consumer Staples (15%): Consumer staples holdings provide defensive characteristics and reliable dividends. The focus on companies with strong brands and pricing power supports dividend sustainability.",
      "Healthcare (15%): Healthcare exposure is appropriately concentrated in established pharmaceutical companies with strong dividend histories and reasonable payout ratios.",
    ],
  },
};

// Function to simulate streaming text
const streamText = (
  text: string,
  callback: (text: string) => void,
  speed = 20
) => {
  let i = 0;
  const interval = setInterval(() => {
    i++;
    callback(text.substring(0, i));
    if (i >= text.length) {
      clearInterval(interval);
    }
  }, speed);

  return () => clearInterval(interval);
};

interface AnalysisCardProps {
  portfolioId: string;
  type: "general" | "portfolio" | "sector";
  title: string;
}

export default function AnalysisCard({
  portfolioId,
  type,
  title,
}: AnalysisCardProps) {
  const [state, setState] = useState<"initial" | "loading" | "content">(
    "initial"
  );
  const [content, setContent] = useState("");
  const clearStreamRef = useRef<() => void>();

  // Get the appropriate response based on type and portfolioId
  const getResponse = () => {
    if (type === "general") {
      return aiResponses.general.join("\n\n");
    } else if (type === "portfolio") {
      return (
        aiResponses.portfolio[
          portfolioId as keyof typeof aiResponses.portfolio
        ]?.join("\n\n") || ""
      );
    } else if (type === "sector") {
      return (
        aiResponses.sector[
          portfolioId as keyof typeof aiResponses.sector
        ]?.join("\n\n") || ""
      );
    }
    return "";
  };

  // Handle start analysis button click
  const handleStartAnalysis = () => {
    setState("loading");

    // Simulate API call delay
    setTimeout(() => {
      setState("content");
      const response = getResponse();

      // Start streaming the response
      clearStreamRef.current = streamText(response, (text) => {
        setContent(text);
      });
    }, 2000);
  };

  // Clean up streaming on unmount
  useEffect(() => {
    return () => {
      if (clearStreamRef.current) {
        clearStreamRef.current();
      }
    };
  }, []);

  // Get tooltip description based on analysis type
  const getTooltipDescription = () => {
    if (type === "general") {
      return "AI-generated analysis of current market conditions and trends";
    } else if (type === "portfolio") {
      return "AI-generated analysis specific to your portfolio composition and performance";
    } else if (type === "sector") {
      return "AI-generated analysis of the sectors in your portfolio";
    }
    return "";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="dashboard-card-stats h-full min-h-[400px]"
    >
      <div className="dashboard-card-content h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h2 className="dashboard-stat-label">{title}</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                    <Info className="h-4 w-4 text-dashboard-text-secondary" />
                    <span className="sr-only">{title} information</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-dashboard-card border-dashboard-card-border text-dashboard-text-primary">
                  <p>{getTooltipDescription()}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {state === "content" && (
            <div className="flex items-center">
              <Bot className="h-4 w-4 text-dashboard-accent-indigo mr-1" />
              <span className="text-xs text-dashboard-text-secondary">
                AI Generated
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 relative overflow-hidden rounded-md border border-dashboard-card-border">
          <AnimatePresence mode="wait">
            {state === "initial" && (
              <motion.div
                key="initial"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-6 backdrop-blur-sm bg-dashboard-card/50"
              >
                <p className="text-dashboard-text-secondary text-center mb-4">
                  Click the button below to generate an AI analysis of your
                  portfolio
                </p>
                <Button
                  onClick={handleStartAnalysis}
                  className="dashboard-button-gradient"
                >
                  Start Analysis
                </Button>
              </motion.div>
            )}

            {state === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-dashboard-card"
              >
                <div className="space-y-2 w-full max-w-md">
                  <Skeleton className="h-4 w-full bg-dashboard-card-border" />
                  <Skeleton className="h-4 w-[90%] bg-dashboard-card-border" />
                  <Skeleton className="h-4 w-[80%] bg-dashboard-card-border" />
                  <div className="py-2"></div>
                  <Skeleton className="h-4 w-full bg-dashboard-card-border" />
                  <Skeleton className="h-4 w-[85%] bg-dashboard-card-border" />
                  <div className="py-2"></div>
                  <Skeleton className="h-4 w-full bg-dashboard-card-border" />
                  <Skeleton className="h-4 w-[75%] bg-dashboard-card-border" />
                </div>
                <p className="text-dashboard-text-secondary text-center mt-4">
                  Analyzing portfolio data...
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className={`p-4 absolute inset-0 overflow-y-auto ${state !== "content" ? "invisible" : "visible"}`}
          >
            {content.split("\n\n").map((paragraph, index) => (
              <p
                key={index}
                className="text-sm text-dashboard-text-primary mb-4"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
