import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from './product.interface';
import { Product } from './product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productURL = environment.productoURL;

  constructor(private http: HttpClient) { }

  getUserProducts(page: number, size: number, sort: string, filters?: string): Observable<IProduct[]> {
    let urlEndPoint: string = this.productURL+"?page=" + page + "&size=" + size + "&sort=" + sort;
    if(filters) {
      urlEndPoint = urlEndPoint + "&filter=" +filters;
    }
    return this.http.get<IProduct[]>(urlEndPoint);
  }

  getProduct(idProduct: number): Observable<IProduct>{
    return this.http.get<IProduct>(this.productURL+"/"+ idProduct);
  }

  insertItem(product: Product) {
    return this.http.post<Product>(this.productURL, product);
  }
  
  updateItem(product: Product) {
    return this.http.patch<Product>(this.productURL, product);
  }

  public deleteItem(productIdToDelete: number): Observable<any> {
    return this.http.delete<any>(this.productURL+"/"+ productIdToDelete);  
  }

}
