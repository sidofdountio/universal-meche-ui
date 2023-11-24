import { Custormer } from "./custorme";
import { SaleStatus } from "./enume/sale-status";
import { Product } from "./product";

export interface Sale {
    product:Product;
    customer:Custormer;
    quantity:number;
    amount:number;
    price:number;
    createAt:string| Date | number;
    saleStatus:SaleStatus;
}
