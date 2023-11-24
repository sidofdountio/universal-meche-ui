import { Sale } from "./sale";

export interface Invoice {
    invoiceId:string;
    sale:Sale;
    invoiceNumber:string;
}
