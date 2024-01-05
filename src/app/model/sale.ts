import { Custormer } from "./custorme";
import { SaleStatus } from "./enume/sale-status";
import { Product } from "./product";
import { Transaction } from "./transaction";

export interface Sale {
    id:number | any;
  
    quantity:number ;
    amount:number;
    price:number;
    createAt:string;
    status:SaleStatus;
    trasaction:Transaction;
    day:number;
    month:string | any;
    year:string | any;
    paymentType?:string;
    product:Product;
    customer?:Custormer;
}
