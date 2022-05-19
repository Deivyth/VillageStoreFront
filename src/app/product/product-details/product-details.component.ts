import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/shopping-cart/cart.model';
import { CartService } from 'src/app/shopping-cart/cart.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  idProduct: number | any;
  product?: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getIdProduct();
    this.getProduct(this.idProduct);
  }

  private getIdProduct(): void{
    this.idProduct = Number(this.route.snapshot.paramMap.get("idProduct")) ?? undefined;
  }

  private getProduct(idProduct: number): void{
    this.productService.getProduct(idProduct).subscribe({
      next: (IProduct) => { this.product = new Product(IProduct.id, IProduct.name, IProduct.price,IProduct.supplierId, IProduct.categoryId,IProduct.supplierName,IProduct.categoryName, IProduct.description, IProduct.image); },
      error: (err) => {}
    });
  }

  buy(){
    let cart: Cart = new Cart(this.product?.getId(),3)
    this.cartService.addProductToCart(1,cart!);
    this.router.navigate(['usuario/carrito']);
  }

  addToCart(){
    let cart: Cart = new Cart(this.product?.getId(),3)
    this.cartService.addProductToCart(1,cart!);
  }

}
