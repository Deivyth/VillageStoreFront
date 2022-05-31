import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from '../../cart/cart.model';
import { CartService } from '../../cart/cart.service';
import { TokenService } from '../../user/service/token.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  private userId: number = Number(this.tokenService.getId());
  idProduct: number | any;
  product?: Product;
  cart? : Cart;

  cartForm?: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private tokenService: TokenService,
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

  private createFromForm() {
    //To Do
    return {
      ...this.cart,
      userId: this.tokenService.getId(),
      productId: this.product?.getId(),
      quantity: this.cartForm?.get(['quantity'])!.value
    }
  }

  //To Do
  buy(){
    if(this.tokenService.getToken()) {
      const itemToSave: any = this.createFromForm();
      this.cartService.addProductToCart(itemToSave).subscribe({
        next: ( cart ) => {},
        error: ( err ) => {}
  
      });
      this.router.navigate(['usuario/carrito']);
    }else{
      this.router.navigate(['entrar']);
    }
    
  }

  addToCart(){
    if(this.tokenService.getToken()) {
      const itemToSave: any = this.createFromForm(); 
      this.cartService.addProductToCart(itemToSave!).subscribe({
        next: ( cart ) => {
          
        },
        error: ( err ) => {}
  
      });
    }else{
      this.router.navigate(['entrar']);
    }
  }

}
