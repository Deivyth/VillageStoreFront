export interface IProduct{
    id: number;
    name: string;
    price: number;
    supplierId?: number;
    categoryId?: number;
    supplierName?: string;
    categoryName?: string;
    description?: string;
    image?: string;
}