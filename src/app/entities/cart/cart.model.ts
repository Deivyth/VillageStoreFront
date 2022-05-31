export class Cart {

    private id: number;
    private productId?: number;
    private quantity?: number;
    private supplierId?: number;
    private productName?: string;
    private productPrice?: number;
    private productImage?: string;
    
    constructor(
        id: number,
        userId?: number, 
        productId?: number, 
        productName?: string, 
        productPrice?: number, 
        productImage?: string, 
        quantity?: number
    ) {
        this.id = id
        this.supplierId = userId
        this.productId = productId
        this.productName = productName
        this.productPrice = productPrice
        this.productImage = productImage
        this.quantity = quantity
    }

    public getId(): number  {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getUserId(): number | undefined {
        return this.supplierId;
    }

    public setUserId(userId: number): void {
        this.supplierId = userId;
    }

    public getProductId(): number | undefined {
        return this.productId;
    }

    public setProductId(productId: number): void {
        this.productId = productId;
    }

    public getProductName(): string | undefined {
        return this.productName;
    }

    public setProductName(productName: string): void {
        this.productName = productName;
    }

    public getProductPrice(): number | undefined {
        return this.productPrice;
    }

    public setProductPrice(productPrice: number): void {
        this.productPrice = productPrice;
    }

    public getProductImage(): string | undefined {
        return this.productImage;
    }

    public setProductImage(productImage: string): void {
        this.productImage = productImage;
    }

    public getQuantity(): number | undefined{
        return this.quantity;
    }

    public setQuantity(quantity?: number | undefined): void {
        this.quantity = quantity;
    }

}