"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Transaction } from "@/types/transaction";

interface Props {
  onAdd: (tx: Omit<Transaction, "_id">) => void;
  onEdit?: (tx: Transaction) => void;
  initialData?: Transaction | null;
}

export default function TransactionForm({ onAdd, onEdit, initialData }: Props) {
  const isEdit = !!initialData;

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (initialData) {
      setAmount(initialData.amount.toString());
      setDescription(initialData.description);
      setDate(initialData.date.slice(0, 10)); // ISO format yyyy-mm-dd
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !description || !date) return;

    const payload = {
      amount: parseFloat(amount),
      description,
      date,
    };

    if (isEdit && initialData?._id) {
      const res = await fetch("/api/transactions", {
        method: "PUT",
        body: JSON.stringify({ _id: initialData._id, ...payload }),
      });
      const updated = await res.json();
      onEdit?.(updated);
    } else {
      onAdd(payload);
    }

    // Reset form only for Add
    if (!isEdit) {
      setAmount("");
      setDescription("");
      setDate("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border rounded-md p-4">
      <h2 className="text-lg font-semibold">
        {isEdit ? "Edit Transaction" : "Add Transaction"}
      </h2>

      <Input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <Button type="submit" className="w-full">
        {isEdit ? "Update" : "Add"}
      </Button>
    </form>
  );
}
