import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../product/product.interface';
import { ProductService } from '../../product/product.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

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
    private productService: ProductService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.getAllItems();
  }

  private getAllItems(): void {

    const filters: string | undefined = this.buildFilters();

    this.productService.getUserProducts(this.page, this.size, this.sort, filters).subscribe({
      next: (data: any) => {
        this.products = data.content;
        this.first = data.first;
        this.last = data.last;
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
      },
      error: (err) => { this.handleError(err); }
    })
  }

  public nextPage(): void {
    this.page = this.page + 1;
    this.getAllItems();
  }

  public previousPage(): void {
    this.page = this.page - 1;
    this.getAllItems();
  }

  public searchByFilters(): void {
    this.getAllItems();
  }

  public prepareItemToDelete(itemId: number): void {
    this.itemIdToDelete = itemId;
  }

  public deleteItem(): void {
    if (this.itemIdToDelete) {
      this.productService.deleteItem(this.itemIdToDelete).subscribe({
        next: (data) => {
          this.getAllItems();
        },
        error: (err) => { this.handleError(err) }
      })
    }
  }

  private buildFilters(): string | undefined {
    const filters: string[] = [];

    filters.push("supplier.id:EQUAL:" + this.tokenService.getId());

    if (this.nameFilter) {
      filters.push("name:MATCH:" + this.nameFilter);
    }

    if (this.priceFilter) {
      filters.push("price:LESS_THAN_EQUAL:" + this.priceFilter);
    }

    if (filters.length > 0) {

      let globalFilters: string = "";
      for (let filter of filters) {
        globalFilters = globalFilters + filter + ",";
      }
      globalFilters = globalFilters.substring(0, globalFilters.length - 1);
      return globalFilters;

    } else {
      return undefined;
    }
  }

  private handleError(error: any) {
    // lo que queramos
  }

}
