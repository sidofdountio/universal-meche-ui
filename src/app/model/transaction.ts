import { TransactionType } from "./enume/transaction-type";

export interface Transaction {
    id: string| any;
    amount: number;
    parties?: string[];
    timestamp: Date | string;
    type: TransactionType;
}
