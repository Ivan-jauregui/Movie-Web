import { Category } from "../../Category/models/category";

export interface Publication{
    id?:number;
    title:string;
    img:string;
    description:string;
    price:number;
    category:Category;
    createdAt:Date;
}