"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Define the shape of each chart bar
type ChartData = {
  month: string;// x-axis
  total: number;//y-axis
};

// Define the shape of each transaction from the API
type Transaction = {
  amount: number; // y-axis ()
  date: string;// x-axis
};

export default function MonthlyBarChart() {
  // state for handling the total amount in particular month in array
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // HTTP GET request to your backend API to fetch all transactions from MongoDB. 
      const res = await fetch("/api/transactions");
      // converts the response body into a JavaScript object (an array of transactions).
      const txs: Transaction[] = await res.json();

      // declares an empty object named monthlyTotals with a specific structure Record :
      const monthlyTotals: Record<string, number> = {};

      txs.forEach(({ amount, date }) => {
        const month = new Date(date).toLocaleString("default", {
          month: "short",
          year: "numeric",
        });

        monthlyTotals[month] = (monthlyTotals[month] || 0) + amount;
      });

      const chartData: ChartData[] = Object.entries(monthlyTotals).map(
        ([month, total]) => ({
          month,
          total,
        })
      );

      setData(chartData);
    };

    fetchData();
  }, []);

  return (
    
    <div className="flex flex-col items-center space-y-6 mt-10">
      <h2 className="text-2xl font-bold mt-4 p-3">Monthly Expense Chart</h2>

      <div className="w-full max-w-3xl">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

  );
}
