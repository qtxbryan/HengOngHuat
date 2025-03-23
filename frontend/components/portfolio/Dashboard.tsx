"use client";

import { useState } from "react";
import PortfolioSummary from "./PortfolioSummary";
import Header from "@/components/Header";
import TimeseriesChart from "../TimeseriesChart";
import PortfolioTable from "./PortfolioTable";

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState("1Y");

  return (
    <div className="flex-1 transition-all duration-300 ease-in-out md:ml-[280px]">
      <Header
        topic="Welcome back, Alex"
        description="Here's what's happening with your investments today"
      />
      <main className="p-4 md:p-6">
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <PortfolioSummary />
            <div className="md:col-span-2 dashboard-card-stats">
              <TimeseriesChart
                timeframe={timeframe}
                setTimeframe={setTimeframe}
              />
            </div>
          </div>

          <PortfolioTable />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
