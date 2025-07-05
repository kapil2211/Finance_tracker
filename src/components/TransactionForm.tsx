"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Type for a transaction form input
interface TransactionFormData {
  amount: string;
  date: string;
  description: string;
}

// Props for the form component
interface TransactionFormProps {
  onSubmit: (formData: TransactionFormData) => void;
  defaultValues?: Partial<TransactionFormData>;
}

export default function TransactionForm({
  onSubmit,
  defaultValues = {},
}: TransactionFormProps) {
  const [form, setForm] = useState<TransactionFormData>({
    amount: defaultValues.amount || "",
    date: defaultValues.date?.slice(0, 10) || "",
    description: defaultValues.description || "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.amount || !form.date) {
      alert("Amount and Date required");
      return;
    }
    onSubmit(form);
  };

  return (
   <div className="flex justify-center items-center min-h-screen bg-gray-50">
  <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold mb-6 text-center">Add Transaction</h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium mb-1">
          Amount (₹)
        </label>
        <Input
          id="amount"
          name="amount"
          type="number"
          placeholder="Enter amount"
          value={form.amount}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium mb-1">
          Date
        </label>
        <Input
          id="date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <Input
          id="description"
          name="description"
          placeholder="Enter description"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  </div>
</div>


  );
}
