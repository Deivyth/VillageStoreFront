import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/shopping-cart/cart.model';
import { CartService } from 'src/app/shopping-cart/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  cart: Cart[] = [];
  usuario: boolean = true;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getProducts();
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


}
