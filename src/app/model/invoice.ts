import { Sale } from "./sale";

export interface Invoice {
    id:number;
    sale:Sale;
    invoiceNumber:string;
    

}
