export class Cart {

    private productId?: number;
    private quantity?: number;
    private userId?: number;
    private productName?: string;
    private productPrice?: number;
    private productImage?: string;
    


  constructor(
    userId?: number, 
    productId?: number, 
    productName?: string, 
    productPrice?: number, 
    productImage?: string, 
    quantity?: number
) {
    this.userId = userId
    this.productId = productId
    this.productName = productName
    this.productPrice = productPrice
    this.productImage = productImage
    this.quantity = quantity
  }


    public getUserId(): number | undefined {
        return this.userId;
    }

    public setUserId(userId: number): void {
        this.userId = userId;
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

    public getQuantity?(): number {
        return this.quantity!;
    }

    public setQuantity?(quantity?: number): void {
        this.quantity = quantity;
    }

}