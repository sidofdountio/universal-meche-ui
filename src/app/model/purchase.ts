import { Product } from "./product";
import { Supplier } from "./supplier";

export interface Purchase {
    id?:number;
    price:number;
    salePrice:number;
    quantity:number;
    amount: number;
    purchaseAt: string | Date;
    supplier:Supplier;
    product:Product;
    month?:string;
    year?:string;

}