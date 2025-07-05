"use client"
import { useState,useEffect } from "react"
import Link from "next/link"
import { Button } from "./ui/button"

// Define a type for transacction object
type Transaction={
    _id:string;
    amount:string;
    date:string;
    description:string;
}

export default function TransactionList(){
    const [txs , setTxs]=useState<Transaction[]>([]);

    const fetchTxs=async()=>{
        const res=await fetch("api/transactions");
        const data=await res.json();
        setTxs(data);
    }

    const deleteTx=async(id:string)=>{
        await fetch(`api/transactions/${id}`,{method:"DELETE"});
        fetchTxs();// refresh list 
    }

    useEffect(()=>{
        fetchTxs()
    },[]);

    return (
<div className="mt-6 p-4">
  <h2 className="text-xl font-semibold mb-4">Transaction List</h2>

  <div className="overflow-x-auto">
    <table className="min-w-full border text-sm text-left">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 border">Amount (₹)</th>
          <th className="px-4 py-2 border">Date</th>
          <th className="px-4 py-2 border">Description</th>
          <th className="px-4 py-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {txs.map((tx) => (
          <tr key={tx._id} className="border-t hover:bg-gray-50">
            <td className="px-4 py-2 border">₹{tx.amount}</td>
            <td className="px-4 py-2 border">{new Date(tx.date).toDateString()}</td>
            <td className="px-4 py-2 border">{tx.description}</td>
            <td className="px-4 py-2 border flex gap-2">
              <Link href={`/transactions/${tx._id}`}>
                <Button variant="outline">Edit</Button>
              </Link>
              <Button
                variant="destructive"
                onClick={() => deleteTx(tx._id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    )
}