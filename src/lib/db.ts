import mongoose from "mongoose"

const MONGO_URI=process.env.MONGODB_URI as string;

if(!MONGO_URI){
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

export const connectDB= async ():Promise<void>=>{
    if(mongoose.connections[0].readyState>=1)return;

    try{
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected");
    }
    catch(error){
         console.log("MongoDB Connection Error",error);
         throw error;
    }
    
}