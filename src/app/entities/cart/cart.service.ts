import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICart } from './cart.interface';
import { Cart } from './cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  sizeCart: number = 0;

  constructor(
    private http: HttpClient
  ) { }

  getCartProducts(userId: Number) {
    const urlEndPoint: string = "http://localhost:8080/api/users/"+ userId +"/cart";
    return this.http.get<ICart[]>(urlEndPoint);
  }

  addProductToCart(cart: Cart) {
    const urlEndPoint: string = "http://localhost:8080/api/users/cart";
    this.sizeCart ++;
    return this.http.put<Cart>(urlEndPoint, cart);
  }

  updateProductToCart( cart: Cart) {
    const urlEndPoint: string = "http://localhost:8080/api/users/cart";
    return this.http.patch<Cart>(urlEndPoint, cart);
  }

  deleteProductCart(cartId: number){
    const urlEndPoint: string = "http://localhost:8080/api/users/cart/" + cartId;
    this.sizeCart --;
    return this.http.delete<Cart>(urlEndPoint);
  };

}
