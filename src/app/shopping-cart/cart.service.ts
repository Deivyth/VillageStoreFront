import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../product/product.interface';
import { Product } from '../product/product.model';
import { ProductService } from '../product/product.service';
import { ICart } from './cart.interface';
import { Cart } from './cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient
  ) { }

  getCartProducts(userId: number) {
    const urlEndPoint: string = "http://localhost:8080/api/users/"+ userId +"/cart";
    return this.http.get<ICart[]>(urlEndPoint);
  }

  addProductToCart(userId: number, cart: Cart) {
    const urlEndPoint: string = "http://localhost:8080/api/users/"+ userId +"/cart";
    return this.http.put<Cart>(urlEndPoint, cart);
  }

  updateProductToCart(userId: number, cart: Cart) {
    const urlEndPoint: string = "http://localhost:8080/api/users/"+ userId +"/cart";
    return this.http.patch<Cart>(urlEndPoint, cart);
  }

}
