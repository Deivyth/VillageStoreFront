import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/product/product.interface';
import { Product } from 'src/app/product/product.model';
import { ProductService } from 'src/app/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  userId?: number;
  title: string = "";
  products: IProduct[] = [];

  page: number = 0;
  size: number = 25;
  sort: string = "name,asc";

  first: boolean = false;
  last: boolean = false;
  totalPages: number = 0;
  totalElements: number = 0;

  nameFilter?: string;
  priceFilter?: number;

  itemIdToDelete?: number;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get("categoryId")) {
      this.userId = +this.route.snapshot.paramMap.get("categoryId")!;
      this.title = "Artículos de la categoría " + this.userId;
    }
  else {
      this.title = "Lista de artículos";
  }

  this.getAllItems();
  }

  public nextPage():void {
    this.page = this.page + 1;
    this.getAllItems();
  }

  public previousPage():void {
    this.page = this.page - 1;
    this.getAllItems();
  }

  public searchByFilters():void {
    this.getAllItems();
  }

  public prepareItemToDelete(itemId: number): void {
    this.itemIdToDelete = itemId;
  }

  public deleteItem(): void {
    if (this.itemIdToDelete){
      this.productService.deleteItem(this.itemIdToDelete).subscribe({
        next: (data) => {
          this.getAllItems();
        },
        error: (err) => {this.handleError(err)} 
      })
    }
  }

  private buildFilters():string|undefined {
    const filters: string[] = [];
    
    //To do
    filters.push("supplier.id:EQUAL:" + 1);

    if(this.nameFilter) {
      filters.push("name:MATCH:" + this.nameFilter);
    }

    if (this.priceFilter) {
      filters.push("price:LESS_THAN_EQUAL:" + this.priceFilter);
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

  private getAllItems(): void {

    const filters:string | undefined = this.buildFilters();

    this.productService.getUserProducts(this.page, this.size, this.sort, filters).subscribe({
      next: (data: any) => {
        this.products = data.content; 
        this.first = data.first;
        this.last = data.last;
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
      },
      error: (err) => {this.handleError(err);}
    })
  }


  private handleError(error: any) {
    // lo que queramos
  }

}
