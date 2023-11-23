import { Product } from "./product";
import { Supplier } from "./supplier";

export interface Purchase {
    id?:number;
    price:number;
    quantity:any;
    amount: number;
    purchaseAt: string | Date;
    supplier:Supplier;
    product:Product;
}