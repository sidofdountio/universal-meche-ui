import { TransactionType } from "./enume/transaction-type";

export interface Transaction {
    id: string;
    amount: number;
    parties?: string[];
    timestamp: Date;
    type: TransactionType;
}
