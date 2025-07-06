"use client";

import { useEffect, useState } from "react";
import { Transaction } from "@/types/transaction";

type Insight = {
  label: string;
  value: string | number;
};

export default function SpendingInsights() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  const formatMonth = (dateStr: string) =>
    new Date(dateStr).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/transactions");
      const txs: Transaction[] = await res.json();
      setTransactions(txs);

      const monthsSet = new Set<string>();
      txs.forEach((tx) => {
        monthsSet.add(formatMonth(tx.date));
      });

      const sortedMonths = Array.from(monthsSet).sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime()
      );

      setAvailableMonths(sortedMonths);
      setSelectedMonth((prev) => prev || sortedMonths[sortedMonths.length - 1]); // Default to latest
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedMonth) return;

    const monthTx = transactions.filter((tx) => {
      return formatMonth(tx.date) === selectedMonth;
    });

    const total = monthTx.reduce((sum, tx) => sum + tx.amount, 0);

    const days = new Set(
      monthTx.map((tx) => new Date(tx.date).toDateString())
    );

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonthIndex = new Date(`${selectedMonth} 1`).getMonth();
    const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();

    const categorySpend: Record<string, number> = {};
    monthTx.forEach((tx) => {
      const cat = tx.category || "Other";
      categorySpend[cat] = (categorySpend[cat] || 0) + tx.amount;
    });

    const topCategory = Object.entries(categorySpend).sort(
      (a, b) => b[1] - a[1]
    )[0];

    setInsights([
      { label: "Total Spent", value: `₹${total.toFixed(2)}` },
      { label: "Average Daily Spend", value: days.size ? `₹${(total / days.size).toFixed(2)}` : "N/A" },
      {
        label: "Top Category",
        value: topCategory
          ? `${topCategory[0]} (₹${topCategory[1].toFixed(0)})`
          : "N/A",
      },
      { label: "No Spend Days", value: daysInMonth - days.size },
      { label: "Transactions", value: monthTx.length },
    ]);
  }, [selectedMonth, transactions]);

  return (
    <div className="mt-6 w-full max-w-4xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Spending Insights</h2>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border px-3 py-1 rounded-md"
        >
          {availableMonths.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {insights.map((insight) => (
          <div
            key={insight.label}
            className="border rounded-lg shadow-md p-4 bg-white"
          >
            <p className="text-sm text-gray-500">{insight.label}</p>
            <p className="text-xl font-semibold">{insight.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
