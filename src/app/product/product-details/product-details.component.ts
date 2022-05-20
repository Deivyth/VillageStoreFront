import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/shopping-cart/cart.model';
import { CartService } from 'src/app/shopping-cart/cart.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  idProduct: number | any;
  product?: Product;
  cart? : Cart;

  cartForm?: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getIdProduct();
    this.getProduct(this.idProduct);
    this.buildForm();
  }

  private getIdProduct(): void{
    this.idProduct = Number(this.route.snapshot.paramMap.get("idProduct")) ?? undefined;
  }

  private getProduct(idProduct: number): void{
    this.productService.getProduct(idProduct).subscribe({
      next: (IProduct) => { this.product = new Product(IProduct.id, IProduct.name, IProduct.price,IProduct.supplierId, IProduct.categoryId,IProduct.supplierName,IProduct.categoryName, IProduct.description, IProduct.image); },
      error: (err) => {}
    });
  }

  private buildForm(): void {
    this.cartForm = this.formBuilder.group({
      quantity: [0, [Validators.required, Validators.min(0)]]
    })
  }

  private updateForm(cart: Cart): void{
    this.cartForm?.patchValue({
      productId: this.product?.getId(),
      supplierId: cart.getUserId(),
      quantity: cart.getQuantity()
      
    })
  }

  private createFromForm() {
    //To Do
    return {
      ...this.cart,
      productId: this.product?.getId(),
      quantity: this.cartForm?.get(['quantity'])!.value
    }
  }

  //To Do
  buy(){
    const itemToSave: any = this.createFromForm();
    console.log(itemToSave);
    this.cartService.addProductToCart(1,itemToSave).subscribe({
      next: ( cart ) => {},
      error: ( err ) => {}

    });
    this.router.navigate(['usuario/carrito']);
  }

  addToCart(){
    const itemToSave: any = this.createFromForm();
    console.log(itemToSave);
    this.cartService.addProductToCart(1,itemToSave!).subscribe({
      next: ( cart ) => {
        
      },
      error: ( err ) => {}

    });
  }

}
