export class ProductLine {
    
     orderId: number;
     productId: number;
     price: number;
     quantity: number;
     productName?: string;
     productImage?: string;

    constructor(
        orderId: number, 
        productId: number,
        price: number, 
        quantity: number,
        productName?: string,
        productImage?: string,

    ) {
        this.orderId = orderId
        this.productId = productId
        this.price = price
        this.quantity = quantity
        this.productName = productName
        this.productImage = productImage

    }

    public getOrderId(): number {
        return this.orderId;
    }

    public setOrderId(orderId: number): void {
        this.orderId = orderId;
    }

    public getProductId(): number {
        return this.productId;
    }

    public setProductId(productId: number): void {
        this.productId = productId;
    }

    public getProductName(): string | undefined{
        return this.productName;
    }

    public setProductName(productName: string): void {
        this.productName = productName;
    }

    public getProductImage(): string | undefined{
        return this.productImage;
    }

    public setProductImage(productImage: string): void {
        this.productImage = productImage;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number): void {
        this.price = price;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public setQuantity(quantity: number): void {
        this.quantity = quantity;
    }

}