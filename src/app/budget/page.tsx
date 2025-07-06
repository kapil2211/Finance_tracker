"use client";
import BudgetComparisonChart from "@/components/BudgetComparisonChart ";
import BudgetForm from "@/components/BudgetForm";
import SpendingInsights from "@/components/SpendingInsights";




import React from 'react'

const page = () => {
  const handleSubmit=async(budget:unknown)=>{
    await fetch("/api/budgets",{
      method:"POST",
       body: JSON.stringify(budget),
    });
  };
  return (
   <div className="p-6 space-y-8 mt-5">
      <BudgetForm onSubmit={handleSubmit} />

      <BudgetComparisonChart />
      <SpendingInsights />
    </div>
  )
}

export default page
