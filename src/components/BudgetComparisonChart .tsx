"use client";

import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

type Budget = {
  category: string;
  month: string; // "Jul 2025"
  amount: number;
};

type Transaction = {
  amount: number;
  date: string;
  category: string;
};

type BudgetComparison = {
  category: string;
  budget: number;
  spent: number;
};

export default function BudgetComparisonChart() {
  const [data, setData] = useState<BudgetComparison[]>([]);
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  const fetchData = async () => {
    const txRes = await fetch("/api/transactions");
    const txs: Transaction[] = await txRes.json();

    const budgetRes = await fetch("/api/budgets");
    const budgets: Budget[] = await budgetRes.json();

    const monthsSet = new Set<string>();
    [...txs, ...budgets].forEach((item) => {
      let rawDate = "";
      if ("date" in item) {
        rawDate = item.date;
      } else {
        // assume it's a budget
        rawDate = new Date().toISOString(); // fallback ISO date
        try {
          rawDate = new Date(item.month + " 01").toISOString(); // Convert "Jul 2025" → valid Date
        } catch { }
      }

      const month = new Date(rawDate).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

      monthsSet.add(month);
    });


    const sortedMonths = Array.from(monthsSet).sort((a, b) =>
      new Date(a).getTime() - new Date(b).getTime()
    );

    setAvailableMonths(sortedMonths);

    const defaultMonth = selectedMonth || sortedMonths[sortedMonths.length - 1];
    setSelectedMonth(defaultMonth);

    updateChartData(txs, budgets, defaultMonth);
  };

  const updateChartData = (
    txs: Transaction[],
    budgets: Budget[],
    month: string
  ) => {
    const spentPerCategory: Record<string, number> = {};

    txs.forEach((tx) => {
      const txMonth = new Date(tx.date).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

      if (txMonth === month) {
        const cat = tx.category || "Other";
        spentPerCategory[cat] = (spentPerCategory[cat] || 0) + tx.amount;
      }
    });

    const comparison: BudgetComparison[] = budgets
      .filter((b) => b.month === month)
      .map((b) => ({
        category: b.category,
        budget: b.amount,
        spent: spentPerCategory[b.category] || 0,
      }));

    setData(comparison);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const loadForMonth = async () => {
      const txRes = await fetch("/api/transactions");
      const txs: Transaction[] = await txRes.json();
      const budgetRes = await fetch("/api/budgets");
      const budgets: Budget[] = await budgetRes.json();
      updateChartData(txs, budgets, selectedMonth);
    };

    if (selectedMonth) loadForMonth();
  }, [selectedMonth]);

  return (
    <div className="mt-10 w-full max-w-4xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Budget vs Actual</h2>

      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="border p-2 rounded-md"
      >
        {availableMonths.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>

      {data.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">
          No data for selected month
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="budget" fill="#8884d8" name="Budget" />
            <Bar dataKey="spent" fill="#82ca9d" name="Spent" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
