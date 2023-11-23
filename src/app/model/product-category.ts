import { CategoryType } from "./category-type";

export interface ProductCategory {
    id?:number;
    name:string;
    categoryType:CategoryType;
}
