import { ProductCategory } from "./product-category";

export interface Product {
    id:any;
    name:string;
    price:number ;
    salePrice:number;
    code:string;
    color: string;
    length:number ;
    description:string;
    productCategory:ProductCategory;
    volume?:string;
}
