import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]>{
    const urlEndPoint: string = "http://localhost:8080/api/products";
    return this.http.get<IProduct[]>(urlEndPoint)
  }

  getProduct(idProduct: number): Observable<IProduct>{
    const urlEndPoint: string = "http://localhost:8080/api/products/"+idProduct;
    return this.http.get<IProduct>(urlEndPoint);
  }

}
