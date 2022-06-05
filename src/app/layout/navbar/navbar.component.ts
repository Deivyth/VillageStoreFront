import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Cart } from 'src/app/entities/cart/cart.model';
import { CartService } from 'src/app/entities/cart/cart.service';
import { Category } from 'src/app/entities/category/category.model';
import { CategoryService } from 'src/app/entities/category/category.service';
import { ProductService } from 'src/app/entities/product/product.service';
import { TokenService } from 'src/app/entities/user/service/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() categoryId:Subject<number> = new Subject<number>();
  cart: Cart[] = [];

  page: number = 0;
  size: number = 20;
  sort: string = "name,asc";

  nameFilter?: string;
  categories: Category[] = [];

  myGroup!: FormGroup;

  constructor(
    private cartService: CartService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    if(this.tokenService.isLogged()) {
      this.getProducts();
    }

    this.myGroup = new FormGroup({
      category: new FormControl()
    })
  }

  getProducts(): void{
    this.cartService.getCartProducts(Number(this.tokenService.getId())).subscribe({
      next: (cart) =>{ 
        cart.forEach((item) => {
          let cart: Cart = new Cart(item.id,item.userId,item.productId,item.productName,item.productPrice,item.productImage,item.quantity);
          this.cart.push(cart);
        })
        this.cartService.sizeCart = cart.length;
      },
      error: (err) => {}
    });
  }

  getSizeCart(): number {
    return this.cartService.sizeCart;
  }

  getCategories(event: any): void {
    let categoriesSearch: string | undefined;

    if(event?.query) {
      categoriesSearch = event.query;
    }

    this.categoryService.getAllCategories(categoriesSearch).subscribe({
      next: (categoriesFilter) => { this.categories = categoriesFilter },
      error: (err) => {  }
    });
  }

  categorySelected():void{
    if(this.myGroup.get(["category"])!.value){
      this.productService.emitStyle(this.myGroup.get(["category"])!.value.id);
    }  
  }

  isLogged(): boolean {
    return this.tokenService.isLogged();
  }

}
