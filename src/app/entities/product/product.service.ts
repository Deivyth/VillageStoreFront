import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from './product.interface';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]>{
    const urlEndPoint: string = "http://localhost:8080/api/products";
    return this.http.get<IProduct[]>(urlEndPoint)
  }

  getUserProducts(page: number, size: number, sort: string, filters?: string): Observable<IProduct[]> {
    let urlEndPoint: string = "http://localhost:8080/api/products?page=" + page + "&size=" + size + "&sort=" + sort;
    if(filters) {
      urlEndPoint = urlEndPoint + "&filter=" +filters;
    }
    return this.http.get<IProduct[]>(urlEndPoint);
  }

  getProduct(idProduct: number): Observable<IProduct>{
    const urlEndPoint: string = "http://localhost:8080/api/products/"+ idProduct;
    return this.http.get<IProduct>(urlEndPoint);
  }

  insertItem(product: Product) {
    const urlEndPoint: string = "http://localhost:8080/api/products/";
    return this.http.post<Product>(urlEndPoint, product);
  }
  updateItem(product: Product) {
    const urlEndPoint: string = "http://localhost:8080/api/products/";
    return this.http.patch<Product>(urlEndPoint, product);
  }

  public deleteItem(productIdToDelete: number): Observable<any> {
    let urlEndpoint: string = "http://localhost:8080/api/products/" + productIdToDelete;
    return this.http.delete<any>(urlEndpoint);  
  }

}
