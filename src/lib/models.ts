import mongoose, { Schema } from "mongoose";

const TransactionSchema = new Schema({
  amount: { type: Number, required: true },
  description: String,
  date: { type: Date, required: true },
   category: {
    type: String,
    enum: ["Food", "Transport", "Entertainment", "Utilities", "Shopping", "Other"],
    default: "Other",
  },
});

export const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
