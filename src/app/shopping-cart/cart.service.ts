import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../product/product.interface';
import { Product } from '../product/product.model';
import { ProductService } from '../product/product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  productIds: number[] = [];

  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) { }

  addProductId(productId: number): void{
    this.productIds.push(productId);
  }

  getProducts(): Product[] {
    let products: Product[] = [];
    this.productIds.forEach((id) => {
      this.productService.getProduct(id).subscribe({
        next: (IProduct) => { 
          let product = new Product(IProduct.id, IProduct.supplier, IProduct.category, IProduct.name, IProduct.price, IProduct.description, IProduct.image);
          products.push(product);
        },
        error: (err) => ""
      });
    });

    return products;
  }

  addProductToCart(product: Product){
    const urlEndPoint: string = "http://localhost:3001/user/carrito";
    return this.http.put<Product>(urlEndPoint, product);
  }

  getCartProducts(){
    const urlEndPoint: string = "http://localhost:3001/user/carrito";
    return this.http.get<IProduct>(urlEndPoint);
  }

}
