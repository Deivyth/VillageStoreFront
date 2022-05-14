import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { registerLocaleData } from '@angular/common';

import localeEs from "@angular/common/locales/es";

registerLocaleData(localeEs), "es-ES";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product?: Product;

  constructor() { }

  ngOnInit(): void {
  }

}
