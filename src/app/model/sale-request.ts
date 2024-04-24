import { Custormer } from "./custorme";
import { Product } from "./product";

export interface  SaleRequest{
    quantity:any;
    price:any;
    custormeType:any;
    product:Product;
    customer:Custormer;

}