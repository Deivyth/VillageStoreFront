import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../../user/service/token.service';
import { IOrder } from '../model/order.interface';
import { Order } from '../model/order.model';
import { ProductLine } from '../model/producLine.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getOrdersByUser(): Observable<IOrder[]> {
    const urlEndPoint: string = "http://localhost:8080/api/users/"+ this.tokenService.getId() +"/orders";
    return this.http.get<IOrder[]>(urlEndPoint);
  };

  getOrderById(orderId: number): Observable<IOrder> {
    const urlEndPoint: string = "http://localhost:8080/api/users/orders/"+orderId;
    return this.http.get<IOrder>(urlEndPoint);
  };

  addOrder(order: Order){
    const urlEndPoint: string = "http://localhost:8080/api/users/orders";
    return this.http.post<IOrder>(urlEndPoint, order);
  };

  addProducLineToOrder(productLine: ProductLine) {
    const urlEndPoint: string = "http://localhost:8080/api/users/orders/product-line";
    return this.http.post<ProductLine>(urlEndPoint, productLine);
  };

}
