export interface ICart{
    id: number;
    userId: number;
    productId: number;
    productName: string;
    productPrice: number;
    productImage: string;
    quantity?: number;
}