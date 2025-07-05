// public route
import { connectDB } from "@/lib/db";
import { Transaction } from "@/lib/models";

// this will be get all transactions
export async function GET(){
    await connectDB();
    // mongo query to exess all txs of DB in sorted manner;
    const txs=await Transaction.find().sort({date:-1});
    return Response.json(txs);
}

export async function POST(req:Request){
    await connectDB();
    const body= await req.json();
    const txs=await Transaction.create(body);
    return Response.json(txs);
}