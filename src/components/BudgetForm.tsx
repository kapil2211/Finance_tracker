"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

// Example categories
const categories = ["Food", "Transport", "Entertainment", "Utilities", "Shopping", "Other"];

// Generate months for dropdown (current ± 6 months)
const getMonthOptions = () => {
  const now = new Date();
  const options: string[] = [];

  for (let i = -6; i <= 6; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() + i);
    const label = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    options.push(label);
  }

  return options;
};

export default function BudgetForm({ onSubmit }: { onSubmit: (b: unknown) => void }) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !amount || !month) return;
    onSubmit({ category, amount: parseFloat(amount), month });

    // Reset form
    setCategory("");
    setAmount("");
    setMonth("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md">
      <h2 className="text-lg font-semibold">Set Monthly Budget</h2>

      {/* Category Selector */}
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Month Selector */}
      <Select value={month} onValueChange={setMonth}>
        <SelectTrigger><SelectValue placeholder="Select Month" /></SelectTrigger>
        <SelectContent>
          {getMonthOptions().map((m) => (
            <SelectItem key={m} value={m}>{m}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Amount Input */}
      <Input
        type="number"
        placeholder="Budget Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <Button type="submit" className="w-full">Set Budget</Button>
    </form>
  );
}
