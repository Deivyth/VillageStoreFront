import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cart } from '../cart.model';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  cart: Cart[] = [];
  totalPrice: number = 0;

  cartForm?: FormGroup;
  
  constructor(
    private cartService : CartService,
    private formBuilder : FormBuilder
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void{
    this.cartService.getCartProducts(1).subscribe({
      next: (cart) =>{ 
        cart.forEach((item) => {
          let cart: Cart = new Cart(item.userId,item.productId,item.productName,item.productPrice,item.productImage,item.quantity);
          this.cart.push(cart);
          this.calculateTotalPrice(cart.getProductPrice()!, cart.getQuantity()!);
        })
      },
      error: (err) => {}
    });
  }

  private calculateTotalPrice(price: number, quantity: number): void {
    let priceProduct: number = price * quantity;
    this.totalPrice += priceProduct;
  }


}
