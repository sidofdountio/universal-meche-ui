import { SaleStatus } from "./enume/sale-status";
import { Sale } from "./sale";

export interface Invoice {
    subTotal?: any;
    tax ?: string | number;
    id:number;
    sale:Sale;
    invoiceNumber:string;
    status:SaleStatus;
    total: number;
    createAt: Date | string;
    month?:string;
    day?:string;
    hour?:string;
}
