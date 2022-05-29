import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/entities/category/category.model';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { CategoryService } from 'src/app/entities/category/category.service';
import { MessageService } from 'primeng/api';
import { User } from '../../user/model/user.model';
import { Token } from '@angular/compiler';
import { TokenService } from '../../user/service/token.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  providers: [MessageService]
})
export class ProductFormComponent implements OnInit {

  mode: "NEW" | "UPDATE" = "NEW";
  textButton: "Crear" | "Modificar" = "Crear";
  productId?: number;
  product?: Product;
  selectedCategory?: Category;
  categories: Category[] = [];

  itemForm?: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

    this.buildForm();

    const entryParam: string = this.route.snapshot.paramMap.get("idProduct") ?? "new";

    if(entryParam !== "new"){
      this.productId = + this.route.snapshot.paramMap.get("idProduct")!;
      this.mode = "UPDATE";
      this.textButton = "Modificar";
      this.getProductById(this.productId!);
    }else{
      this.mode = "NEW";
      this.textButton = "Crear";
      this.initializeProduct();
    }
  }

  private buildForm(): void {
    this.itemForm = this.formBuilder.group({
      id: [{value: undefined, disabled: true}],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(2000)]],
      price: [0, [Validators.required, Validators.min(0)]],
      category: [undefined, [Validators.required]]
    })
  }

  private updateForm(product: Product): void{
    this.itemForm?.patchValue({
      id: product.getId(),
      name: product.getName(),
      price: product.getPrice(),
      description: product.getDescription(),
      image: product.getImage(),
      user: new User(product.getSupplierId()!, product.getSupplierName()!),
      category: new Category(product.getCategoryId()!,product.getCategoryName()!)
    })
  }

  private createFromForm() {
    //To Do
    return {
      ...this.product,
      id: this.itemForm?.get(['id'])!.value,
      name: this.itemForm?.get(['name'])!.value,
      price: this.itemForm?.get(['price'])!.value,
      description: this.itemForm?.get(['description'])!.value,
      image: this.product?.getImage(),
      supplierId: Number(this.tokenService.getId()),
      categoryId: this.itemForm?.get(['category'])!.value.id,
      categoryName: this.itemForm?.get(['category'])!.value.name
    }
  }

  getCategories(event: any): void {
    let categoriesSearch: string | undefined;

    if(event?.query) {
      categoriesSearch = event.query;
    }

    this.categoryService.getAllCategories(categoriesSearch).subscribe({
      next: (categoriesFilter) => { this.categories = categoriesFilter },
      error: (err) => { this.toast("error","Fallo con el servidor", err); }
    });
  }

  categorySelected(): void {
    this.product!.setCategoryId(this.selectedCategory?.id);
    this.product!.setCategoryName(this.selectedCategory?.name);
  }

  categoryUnselected(): void {
    this.product!.setCategoryId(undefined);
    this.product!.setCategoryName(undefined);
  }

  private getProductById(itemId: number) {
    this.productService.getProduct(itemId).subscribe({
      next: (Iproduct) => {
        this.product = new Product(
          Iproduct.id, 
          Iproduct.name, 
          Iproduct.price, 
          Iproduct.supplierId,
          Iproduct.categoryId, 
          Iproduct.supplierName,
          Iproduct.categoryName,
          Iproduct.description, 
          Iproduct.image);
        this.updateForm(this.product);
        this.selectedCategory = new Category(Iproduct.categoryId!, Iproduct.categoryName!)
      },
      error: (err) => {
        this.toast("error", "Fallo con el servidor", err);
      }
    });
  }

  saveProduct(){
    const itemToSave: any = this.createFromForm();
    if (this.mode === "NEW") {
      this.insertProduct(itemToSave);
    }

    if (this.mode === "UPDATE") {
      this.updateProduct(itemToSave);
    }
  }

  private insertProduct(product: Product) {
    this.productService.insertItem(product).subscribe({
      next: (productInsert) => {
        this.toast("success", "Operacion realizada con exito", "Producto creado");
      },
      error: (err) => {
        this.toast("error", "Fallo con el servidor", err);
      }
    })
  }

  private updateProduct(product: Product) {
    this.productService.updateItem(product).subscribe({
      next: (productUpdate) => {
        this.toast("success", "Operacion realizada con exito", "Producto actualizado");
      },
      error: (err) => {
        this.toast("error", "Fallo con el servidor", JSON.stringify(err));
      }
    })
  }

  private initializeProduct() {
    this.product = new Product(undefined,"",0);
  }

  includeImageInItem(event: any) {
    const inputFile = event.target as HTMLInputElement;
    const file: File | null = inputFile.files?.item(0) ?? null;

    this.readFileString(file!).then(
      (result) => {
        const imageType: string = this.getImageType(result);
        const imageBase64: string = this.getImageBase64(result);

        this.product!.setImage(imageBase64);
      },
      (error) => {

      }
    )
  }

  private readFileString(file: File) {
    return new Promise<String>(function(resolve, reject) {
      let reader: FileReader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        resolve(this.result as string)
      }
    })
  }

  private getImageType(imageString: String): string {
      const imageStringParts: string[] = imageString.split(',');
      if (imageStringParts.length == 2){
        return imageStringParts[0];
      } else {
        return "";
      }
  }

  private getImageBase64(imageString: String) {
    const imageStringParts: string[] = imageString.split(',');
    if (imageStringParts.length == 2){
      return imageStringParts[1];
    } else {
      return "";
    }
  }

  private toast(severity: string, summary: string, message: string): void {
    this.messageService.add({
      severity: severity, 
      summary: summary, 
      detail: message
    }); 
  }
}
