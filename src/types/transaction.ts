export interface Transaction {
  _id?: string;
  amount: number;
  description: string;
  date: string; // ISO string
  category:string
}
