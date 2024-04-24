import { Product } from "./product";
import { Supplier } from "./supplier";

export interface PurchaseRequest{
    price:any;
    salePrice:any;
    quantity:any;
    supplier:Supplier;
    product:Product;
}