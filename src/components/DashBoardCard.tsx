import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Transaction } from "@/types/transaction";

type Props = {
  total: number;
  topCategory: { name: string; value: number };
  transactions: Transaction[];
};

const DashBoardCard = ({ total, topCategory, transactions }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <Card className=" rounded-xl shadow-lg border border-gray-200 transition-transform hover:scale-[1.02] hover:shadow-xl">
        <CardContent className="py-6">
          <p className="text-sm text-muted-foreground text-indigo-100">Total Expenses</p>
          <p className="text-3xl font-bold text-primary mt-2">₹ {total}</p>
        </CardContent>
      </Card>

      <Card className="rounded-xl shadow-lg border border-gray-200 transition-transform hover:scale-[1.02] hover:shadow-xl">
        <CardContent className="py-6">
          <p className="text-sm text-muted-foreground">Top Category</p>
          <p className="text-lg font-medium mt-2">
            {topCategory.name} <span className="text-primary font-semibold">(₹ {topCategory.value})</span>
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-xl shadow-lg border border-gray-200 transition-transform hover:scale-[1.02] hover:shadow-xl">
        <CardContent className="py-6">
          <p className="text-sm text-muted-foreground">Recent Transactions</p>
          <ul className="text-sm mt-2 space-y-1">
            {transactions.slice(0, 3).map((tx) => (
              <li key={tx._id}>
                <span className="font-medium text-foreground">{tx.description}</span>{" "}
                - ₹{tx.amount}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashBoardCard;
