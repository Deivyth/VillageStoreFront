import { Component, OnInit } from '@angular/core';
import { IOrder } from '../model/order.interface';
import { Order } from '../model/order.model';
import { ProductLine } from '../model/producLine.model';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orders: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  private getOrders(): void {
    this.orderService.getOrdersByUser().subscribe({
      next: (orderRest: IOrder[]) => {
        orderRest.forEach((orderRest) =>{
          let order = new Order(orderRest.id, orderRest.userId, orderRest.state, orderRest.payment, orderRest.date, orderRest.productLine);
          this.orders.push(order);
        })
      },
      error: (err) =>{}
    })
  }

}
