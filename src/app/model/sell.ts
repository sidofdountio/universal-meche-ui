import { Custorme } from "./custorme";
import { Invoice } from "./invoice";
import { Payment } from "./payment";

export interface Sell {
    invoice:Invoice;
    customer:Custorme;
    payment:Payment;
    createAt:string| Date;

}
