export interface ICart{
    userId: number;
    productId: number;
    productName: string;
    productPrice: number;
    productImage: string;
    quantity?: number;
}