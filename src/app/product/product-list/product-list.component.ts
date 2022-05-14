import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(private serviceProduct:ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void{
    this.serviceProduct.getProducts().subscribe({
      next: (productRest) => { 
        productRest.forEach((IProduct)=> {
          let product = new Product(IProduct.id, IProduct.supplier, IProduct.category, IProduct.name, IProduct.price, IProduct.description, IProduct.image);
          this.products.push(product);
        })
      },
      error: (err) => {}
    })
  }

}
