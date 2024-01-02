import { SaleStatus } from "./enume/sale-status";
import { Product } from "./product";
import { Supplier } from "./supplier";
import { Transaction } from "./transaction";

export interface Purchase {
    id:number |  any;
    price:number;
    salePrice:number;
    quantity:number;
    amount: number;
    purchaseAt: string | Date;
    status?:SaleStatus;
    supplier?:Supplier;
    product?:Product;
    month?:any;
    year?:any;
    day?:number;
    transaction?:Transaction;

}