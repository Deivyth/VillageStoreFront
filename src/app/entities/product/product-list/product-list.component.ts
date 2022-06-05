import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product.interface';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  userId?: number;
  title: string = "";

  page: number = 0;
  size: number = 20;
  sort: string = "name,asc";

  first: boolean = false;
  last: boolean = false;
  totalPages: number = 0;
  totalElements: number = 0;

  category?: string;
  priceFilter?: number;
  categoryId?: number | null;

  itemIdToDelete?: number;

  constructor(
    private productService:ProductService,
    
  ) { 

    productService.styleEmitted.subscribe(style => {
      if(style != this.categoryId) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit(): void {
    this.getAllItems();
    this.getCategoryId();
  }

  getCategoryId() {
    this.categoryId = this.productService.getActualStyleId();
  }

  public nextPage():void {
    this.page = this.page + 1;
    this.getAllItems();
  }

  public previousPage():void {
    this.page = this.page - 1;
    this.getAllItems();
  }

  private getAllItems(): void {

    const filters:string | undefined = this.buildFilters();

    this.products = [];
    this.productService.getUserProducts(this.page, this.size, this.sort, filters).subscribe({
      next: (data: any) => {
        data.content.forEach((IProduct : IProduct)=> {
          let product = new Product(IProduct.id, 
            IProduct.name, 
            IProduct.price,
            IProduct.supplierId, 
            IProduct.categoryId,
            IProduct.supplierName,
            IProduct.categoryName, 
            IProduct.description, 
            IProduct.image);
          this.products.push(product);
        })
        this.first = data.first;
        this.last = data.last;
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
      },
      error: (err) => {
        this.handleError(err);
      }
    })
  }

  private buildFilters():string|undefined {
    const filters: string[] = [];

    if(this.categoryId) {
      filters.push("category.id:EQUAL:" + this.categoryId);
    }

    if (filters.length >0) {

      let globalFilters: string = "";
      for (let filter of filters) {
        globalFilters = globalFilters + filter + ",";
      }
      globalFilters = globalFilters.substring(0, globalFilters.length-1);
      return globalFilters;

    } else {
      return undefined;
    }
  }

  private handleError(error: any) {
    // lo que queramos
  }

}
