"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo / Title */}
      <Link href="/" className="text-xl font-bold text-indigo-600">
        💸 ExpenseTracker
      </Link>

      {/* Navigation Links */}
      <div className="space-x-4">
        <Link href="/">
          <Button variant="ghost">Dashboard</Button>
        </Link>
        <Link href="/transactions/new">
          <Button>Add Transaction</Button>
        </Link>
          <Link href="/transactions/">
          <Button>Transaction List</Button>
        </Link>
      </div>
    </nav>
  );
}
