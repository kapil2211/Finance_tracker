"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import TransactionForm from "@/components/TransactionForm";
import { Transaction } from "@/types/transaction";

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editTx, setEditTx] = useState<Transaction | null>(null);
  const [open, setOpen] = useState(false);

  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDelete = async (id: string) => {
    await fetch("/api/transactions", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    setTransactions((prev) => prev.filter((tx) => tx._id !== id));
  };

  const handleEditClick = (tx: Transaction) => {
    setEditTx(tx);
    setOpen(true);
  };

  const handleEditSave = async (updated: Transaction) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx._id === updated._id ? updated : tx))
    );
    setOpen(false);
    setEditTx(null);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      <h2 className="text-xl font-bold mb-4">Transactions</h2>

      {transactions.length === 0 ? (
        <p className="text-center text-gray-500">No transactions yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Amount (₹)</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx._id} className="border-b">
                  <td className="p-2 border">{tx.description}</td>
                  <td className="p-2 border text-green-600 font-medium">
                    {tx.amount}
                  </td>
                  <td className="p-2 border">
                    {new Date(tx.date).toLocaleDateString()}
                  </td>
                  <td className="p-2 border space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditClick(tx)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(tx._id!)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Single shared dialog outside table */}
      <Dialog open={open} onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) setEditTx(null);
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
          </DialogHeader>

          {editTx && (
            <TransactionForm
              initialData={editTx}
              onEdit={handleEditSave}
              onAdd={() => {}}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
