import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../service/order.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../model/order.model';
import { IOrder } from '../model/order.interface';
import { ProductLine } from '../model/producLine.model';

import jsPDF from 'jspdf';
import * as _html2canvas from 'html2canvas';
const html2canvas: any = _html2canvas;

@Component({
  selector: 'app-order-pdf',
  templateUrl: './order-pdf.component.html',
  styleUrls: ['./order-pdf.component.scss']
})
export class OrderPdfComponent implements OnInit {

  @ViewChild('htmlData') htmlData!: ElementRef;

  order!: Order;
  orderId!: number;
  productLines: ProductLine [] = [];
  totalPrice: number = 0;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getOrderId();
    this.getOrder();
  }
  
  private getOrderId(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get("idOrder")) ?? undefined;
  }

  private getOrder(): void {
    this.orderService.getOrderById(this.orderId).subscribe({
      next: (orderRest: IOrder) => {
        this.order = new Order(orderRest.id,orderRest.userId, orderRest.state, orderRest.payment, orderRest.date, orderRest.productLine);
        orderRest.productLine!.forEach((product) => {
          let priceTotalProduct = product.quantity * product.price;
          this.totalPrice += priceTotalProduct;
        })
        this.productLines = orderRest.productLine!;
      }
    });
  }

  getIVA(): number {
    return this.totalPrice * 21 / 100;
  }

  getBase(){
    return  this.totalPrice - this.getIVA();
  }

  savePDF(): void {

    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA as any).then( (canvas: any) => {
      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png');
      let pdfData = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdfData.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdfData.save('Village Store Factura'+ this.orderId +'.pdf');
  });
  }

}
