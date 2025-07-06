import { connectDB } from "@/lib/db";
import { Budget } from "@/lib/budgetmodel";

// GET: Fetch all budgets
export async function GET() {
  await connectDB();
  const allbudgets = await Budget.find();
  return Response.json(allbudgets);
}

// POST: Create or update (upsert) a budget
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const { category, month, amount } = body;

  const budget = await Budget.findOneAndUpdate(
    { category, month },
    { $set: { amount } },
    { new: true, upsert: true }
  );

  return Response.json(budget);
}
