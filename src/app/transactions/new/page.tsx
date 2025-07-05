"use client"
import TransactionForm from "@/components/TransactionForm";

// Define the form data structure
type FormData = {
  amount: string;
  date: string;
  description: string;
};

export default function NewTransaction() {
  const handleCreate = async (form: FormData) => {
    await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    window.location.href = "/";
  };

  return <TransactionForm onSubmit={handleCreate} />;
}
