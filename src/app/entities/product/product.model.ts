export class Product{

    private id: number | undefined;
    private name: string | undefined;
    private price: number;
    private supplierId?: number | undefined;
    private categoryId?: number;
    private supplierName?: string;
    private categoryName?: string;
    private description?: string;
    private image?: string;

    constructor(
        id: number | undefined, 
        name: string, 
        price: number, 
        supplierId?: number, 
        categoryId?: number, 
        supplierName?: string, 
        categoryName?: string, 
        description?: string, 
        image?: string
    ) {
        this.id = id
        this.name = name
        this.price = price
        this.supplierId = supplierId
        this.categoryId = categoryId
        this.supplierName = supplierName
        this.categoryName = categoryName
        this.description = description
        this.image = image
    }

    public getId(): number | undefined{
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getName(): string | undefined{
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number): void {
        this.price = price;
    }

    public getSupplierId(): number | undefined {
        return this.supplierId;
    }

    public setSupplierId(supplierId: number | undefined): void {
        this.supplierId = supplierId;
    }

    public getCategoryId(): number | undefined {
        return this.categoryId;
    }

    public setCategoryId(categoryId: number | undefined): void {
        this.categoryId = categoryId;
    }

    public getSupplierName(): string | undefined {
        return this.supplierName;
    }

    public setSupplierName(supplierName: string): void {
        this.supplierName = supplierName;
    }

    public getCategoryName(): string | undefined {
        return this.categoryName;
    }

    public setCategoryName(categoryName: string | undefined): void {
        this.categoryName = categoryName;
    }

    public getDescription(): string | undefined {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getImage(): string | undefined {
        return this.image;
    }

    public setImage(image: string): void {
        this.image = image;
    }

    
}