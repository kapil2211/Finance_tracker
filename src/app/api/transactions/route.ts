// public route
import { connectDB } from "@/lib/db";
import { Transaction } from "@/lib/models";
import { ObjectId } from "mongodb";

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
export async function PUT(req: Request) {
     await connectDB();
  const { _id, ...updateData } = await req.json();
  await Transaction.updateOne({ _id: new ObjectId(_id) }, { $set: updateData });
  return Response.json({ status: 'updated' });
}

export async function DELETE(req: Request) {
     await connectDB();
  const { id } = await req.json();
  await Transaction.deleteOne({ _id: new ObjectId(id) });
  return Response.json({ status: 'deleted' });
}
