import { redirect } from "next/navigation";
import TransactionForm from "@/components/TransactionForm";

interface EditTransactionProps {
  params: { id: string };
}

type FormData = {
  amount: string;
  date: string;
  description: string;
};

export default async function EditTransaction({ params }: EditTransactionProps) {
  const res = await fetch(`http://127.0.0.1:3000/api/transactions/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch transaction");
  }

  const data: FormData = await res.json();

  // ✅ Handle submission on the client inside the form itself
  return (
    <TransactionForm
      defaultValues={data}
      onSubmit={async (form: FormData) => {
        "use server"; // Optional - for server actions if you later refactor

        await fetch(`http://127.0.0.1:3000/api/transactions/${params.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        redirect("/"); // ✅ Server-safe redirect
      }}
    />
  );
}
