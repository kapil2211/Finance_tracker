"use client";

import TransactionForm from "@/components/TransactionForm";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleAdd = async (newTx: {
    amount: number;
    description: string;
    date: string;
    category:string;
  }) => {
    const res = await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify(newTx),
    });

    if (res.ok) {
      const created = await res.json();
      console.log("Transaction added:", created);
      // Redirect to the list page or show a success toast
      router.push("/"); // ← Redirect to home or /transactions
    } else {
      console.error("Failed to add transaction");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <TransactionForm onAdd={handleAdd} />
    </div>
  );
}
