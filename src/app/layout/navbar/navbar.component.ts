import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/entities/cart/cart.model';
import { CartService } from 'src/app/entities/cart/cart.service';
import { TokenService } from 'src/app/entities/user/service/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  cart: Cart[] = [];
  isLogged: boolean = false;

  constructor(
    private cartService: CartService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.getProducts();

    if(this.tokenService.getToken()) {
      this.tokenService.isLogged = true;
    }else{
      this.tokenService.isLogged = false
    }
  }

  getProducts(): void{
    this.cartService.getCartProducts(1).subscribe({
      next: (cart) =>{ 
        cart.forEach((item) => {
          let cart: Cart = new Cart(item.userId,item.productId,item.productName,item.productPrice,item.productImage,item.quantity);
          this.cart.push(cart);
        })
      },
      error: (err) => {}
    });
  }

  getIsloged() {
    return this.tokenService.isLogged;
  }

}
