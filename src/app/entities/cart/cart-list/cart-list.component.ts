import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Order } from '../../order/model/order.model';
import { ProductLine } from '../../order/model/producLine.model';
import { OrderService } from '../../order/service/order.service';
import { User } from '../../user/model/user.model';
import { TokenService } from '../../user/service/token.service';
import { Cart } from '../cart.model';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
  providers: [MessageService]
})
export class CartListComponent implements OnInit {

  cart: Cart[] = [];
  newOrder!: Order;
  totalPrice: number = 0;

  validated: boolean = false;

  cartForm?: FormGroup;
  
  constructor(
    private cartService : CartService,
    private orderService: OrderService,
    private tokenService: TokenService,
    private formBuilder : FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void{
    this.cartService.getCartProducts(Number(this.tokenService.getId())).subscribe({
      next: (cart) =>{ 
        if(cart.length > 0){
          this.validated = true;
          cart.forEach((item) => {
            let cart: Cart = new Cart(item.id,item.userId,item.productId,item.productName,item.productPrice,item.productImage,item.quantity);
            this.cart.push(cart);
            this.calculateTotalPrice(cart.getProductPrice()!, cart.getQuantity()!);
          })
        } else {
          this.validated = false;
        }
      },
      error: (err) => {}
    });
  }

  private calculateTotalPrice(price: number, quantity: number): void {
    let priceProduct: number = price * quantity;
    this.totalPrice += priceProduct;
  }

  createOrder(){
    let order: Order = new Order(undefined,Number(this.tokenService.getId()),"Recoger en tienda", "Fisico");
    
    this.orderService.addOrder(order).subscribe({
      next: (order) => {
          this.newOrder = new Order(order.id,order.userId,order.state,order.payment);
          this.addProductLine(this.newOrder);
      }
    });
  }

  private addProductLine(order: Order) {
    this.cart.forEach((product) => {
      let producLine: ProductLine = new ProductLine(order.getId()!,Number(product.getProductId()),product.getProductPrice()!,product.getQuantity()!);
      this.orderService.addProducLineToOrder(producLine).subscribe({
        next: () => { 
          this.deleteAllCart(Number(this.tokenService.getId()));
        }
      });
    });
  }

  private deleteAllCart(userId: number): void {
    this.cartService.deleteUserCart(userId).subscribe({
      next: () => {
        this.toast("success", "Operacion realizada con exito", "Compra exitosa");
        //TO DO
        window.location.reload();
      }
    });
  }

  private toast(severity: string, summary: string, message: string): void {
    this.messageService.add({
      severity: severity, 
      summary: summary, 
      detail: message
    }); 
  }

}
