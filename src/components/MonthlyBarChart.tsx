"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Define the shape of each chart bar
type ChartData = {
  month: string;
  total: number;
};

// Define the shape of each transaction from the API
type Transaction = {
  amount: number;
  date: string;
  category: string;
};

// Color palette for pie chart
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F", "#FFBB28"];

export default function MonthlyBarChart() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [monthlyData, setMonthlyData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/transactions");
      const txs: Transaction[] = await res.json();
      setTransactions(txs);

      // Group by month
      const monthlyTotals: Record<string, number> = {};
      txs.forEach(({ amount, date }) => {
        const month = new Date(date).toLocaleString("default", {
          month: "short",
          year: "numeric",
        });

        monthlyTotals[month] = (monthlyTotals[month] || 0) + amount;
      });

      const chartData: ChartData[] = Object.entries(monthlyTotals).map(
        ([month, total]) => ({ month, total })
      );

      setMonthlyData(chartData);
    };

    fetchData();
  }, []);

  // Category-wise Pie Chart Data
  const categoryData = useMemo(() => {
    const result: { name: string; value: number }[] = [];

    transactions.forEach((tx) => {
      const cat = tx.category || "Other";
      const existing = result.find((r) => r.name === cat);
      if (existing) {
        existing.value += tx.amount;
      } else {
        result.push({ name: cat, value: tx.amount });
      }
    });

    return result;
  }, [transactions]);

  return (
    <div className="flex flex-col items-center space-y-6 mt-10">
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-bold mt-4 p-3">Monthly Expense Chart</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h2 className="text-2xl font-bold mt-4 mb-2 text-center">Category Breakdown</h2>
        <PieChart width={500} height={500}>
          <Pie
            dataKey="value"
            isAnimationActive
            data={categoryData}
            cx="50%"
            cy="50%"
            outerRadius={150}
            label
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}
