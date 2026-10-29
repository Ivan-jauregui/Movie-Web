import { Category } from "./category";
import { PublicationImages } from "./publication-images";


export interface Publication{
    id?:string;
    title:string;
    images?: PublicationImages[]; 
    description:string;
    price:number;
    status:string;
    publicationId:number;
    category:Category;
    type:string;
    createdAt:Date;
}