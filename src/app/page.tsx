'use client'
import { useState,useEffect } from "react";
import MonthlyBarChart from "@/components/MonthlyBarChart";
import DashBoardCard from "@/components/DashBoardCard";
import { Transaction } from "@/types/transaction";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      setTransactions(data);
    };

    fetchData();
  }, []);

  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  const categoryMap: Record<string, number> = {};
  transactions.forEach((tx) => {
    categoryMap[tx.category] = (categoryMap[tx.category] || 0) + tx.amount;
  });

  const topCategory = Object.entries(categoryMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)[0] || { name: "-", value: 0 };


  return (
    <div className="p-6 space-y-6">
      <DashBoardCard
        total={total}
        topCategory={topCategory}
        transactions={transactions}
      />
      <MonthlyBarChart />

    </div>
  );
}
