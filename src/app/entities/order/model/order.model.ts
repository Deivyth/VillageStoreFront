import { ProductLine } from "./producLine.model";

export class Order{

    private id: number | undefined;
    private userId: number;
    private state: string;
    private payment: string;
    private date?: Date;
    private productLine?: ProductLine[];

    constructor(
        id: number | undefined, 
        userId: number, 
        state: string, 
        payment: string,
        date?: Date,  
        productLine?: ProductLine[]
    ) {
        this.id = id
        this.userId = userId
        this.date = date
        this.state = state
        this.payment = payment
        this.productLine = productLine
    }

    public getId(): number | undefined{
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getUserId(): number {
        return this.userId;
    }

    public setUserId(userId: number): void {
        this.userId = userId;
    }

    public getState(): string {
        return this.state;
    }

    public setState(state: string): void {
        this.state = state;
    }

    public getPayment(): string {
        return this.payment;
    }

    public setPayment(payment: string): void {
        this.payment = payment;
    }

    public getDate(): Date | undefined{
        return this.date;
    }

    public setDate(date: Date): void {
        this.date = date;
    }

    public getProductLine(): ProductLine[] | undefined{
        return this.productLine;
    }

    public setProductLine(productLine: ProductLine[] ): void {
        this.productLine = productLine;
    }

}