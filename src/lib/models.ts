import mongoose, { Schema } from "mongoose";

const TransactionSchema = new Schema({
  amount: { type: Number, required: true },
  description: String,
  date: { type: Date, required: true },
});

export const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
