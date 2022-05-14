import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product/product.model';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  products: Product[] = [];
  
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.products = this.cartService.getProducts();
  }

}
