import { ProductLine } from "./producLine.model";

export interface IOrder{
    id: number | undefined;
    userId: number;
    state: string;
    payment: string;
    date?: Date;
    productLine?: ProductLine[];
}