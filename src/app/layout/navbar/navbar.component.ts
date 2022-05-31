import { Component, OnInit } from '@angular/core';
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

  cart: Cart[] = [];

  page: number = 0;
  size: number = 20;
  sort: string = "name,asc";

  nameFilter?: string;
  categories: Category[] = [];

  constructor(
    private cartService: CartService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    if(this.tokenService.isLogged()) {
      this.getProducts();
    }
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

  handleDropdown(event: any): void {
    let categoriesSearch: string | undefined;

    if(event?.query) {
      categoriesSearch = event.query;
    }

    this.categoryService.getAllCategories(categoriesSearch).subscribe({
      next: (categoriesFilter) => { this.categories = categoriesFilter },
      error: (err) => {  }
    });
  }

  private buildFilters():string|undefined {
    const filters: string[] = [];

    if(this.nameFilter) {
      filters.push("name:MATCH:" + this.nameFilter);
    }


    if (filters.length >0) {

      let globalFilters: string = "";
      for (let filter of filters) {
        globalFilters = globalFilters + filter + ",";
      }
      globalFilters = globalFilters.substring(0, globalFilters.length-1);
      return globalFilters;

    } else {
      return undefined;
    }
  }

  isLogged(): boolean {
    return this.tokenService.isLogged();
  }

}
