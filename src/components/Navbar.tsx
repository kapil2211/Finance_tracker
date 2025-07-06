"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // You can install Lucide icons or use any SVG

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-indigo-600">
          💸 ExpenseTracker
        </Link>

        {/* Hamburger icon for mobile */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex space-x-6">
          <Link href="/">Dashboard</Link>
          <Link href="/transactions/new">Add Transaction</Link>
          <Link href="/transactions/">Transaction List</Link>
          <Link href="/budget">Budget</Link>
        </div>
      </div>

      {/* Mobile nav menu */}
      {isOpen && (
        <div className="flex flex-col mt-4 space-y-2 md:hidden">
          <Link href="/" onClick={() => setIsOpen(false)}>Dashboard</Link>
          <Link href="/transactions/new" onClick={() => setIsOpen(false)}>Add Transaction</Link>
          <Link href="/transactions/" onClick={() => setIsOpen(false)}>Transaction List</Link>
          <Link href="/budget" onClick={() => setIsOpen(false)}>Budget</Link>
        </div>
      )}
    </nav>
  );
}
