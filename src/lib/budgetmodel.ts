import mongoose, { Schema } from "mongoose";

const BudgetSchema= new Schema({
    month:String,
    amount:Number,
    category:String
});

export const Budget= mongoose.models.Budget|| mongoose.model("Budget",BudgetSchema);

