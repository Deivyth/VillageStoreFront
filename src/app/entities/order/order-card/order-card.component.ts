import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../model/order.model';
import { ProductLine } from '../model/producLine.model';


@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
  providers:[DatePipe]
})
export class OrderCardComponent implements OnInit {

  @Input() order!: Order;

  constructor(
    private datePipe: DatePipe,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  getHeader(): string {

    return "Realizado: " + this.datePipe.transform(this.order.getDate(),"dd-MM-yyyy") + " | " + this.order.getProductLine()?.length + " articulo(s)" 

  }

  calculateTotalPrice(): number {
    let totalPrice: number = 0;

    this.order.getProductLine()?.forEach((productLine) =>{
      let price = productLine.getPrice() * productLine.getQuantity();
      totalPrice! =+ price;
    })

    return totalPrice;
  }

  savePDF(): void{
    this.route.navigate(['usuario', 'pedidos',this.order.getId()]);
  }

}
