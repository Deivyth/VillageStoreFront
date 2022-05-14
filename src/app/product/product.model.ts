export class Product{

    private id: number;
    private supplier: number;
    private category: number;
    private name: string;
    private price: number;
    private description: string;
    private image: string;

    constructor(
        id: number, 
        supplier: number, 
        category: number, 
        name: string, 
        price: number, 
        description: string, 
        image: string
    ) {
        this.id = id
        this.supplier = supplier
        this.category = category
        this.name = name
        this.price = price
        this.description = description
        this.image = image
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getSupplier(): number {
        return this.supplier;
    }

    public setSupplier(supplier: number): void {
        this.supplier = supplier;
    }

    public getCategory(): number {
        return this.category;
    }

    public setCategory(category: number): void {
        this.category = category;
    }

    public getName(): string {
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

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getImage(): string {
        return this.image;
    }

    public setImage(image: string): void {
        this.image = image;
    }
}