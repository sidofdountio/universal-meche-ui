import { ProductCategory } from "./product-category";

export interface Product {
    id?:number;
    name:string;
    price:number ;
    code:string;
    color: string;
    length?:number ;
    description:string;
    productCategory:ProductCategory;
}
