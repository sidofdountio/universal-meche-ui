import { Custormer } from "./custorme";
import { SaleStatus } from "./enume/sale-status";
import { Product } from "./product";
import { Transaction } from "./transaction";

export interface Sale {
    id:number | any;
    product:Product;
    customer?:Custormer;
    quantity:number | any;
    amount:number | any;
    price:number | any;
    createAt:string| Date | number;
    status:SaleStatus;
    trasaction:Transaction;
    day:number;
    month:string | any;
    year:string | any;
    paymentType?:string;
}
