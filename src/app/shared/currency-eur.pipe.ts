import { Pipe, PipeTransform } from '@angular/core';
import { formatCurrency, getCurrencySymbol } from '@angular/common';

@Pipe({
  name: 'currencyEUR'
})
export class CurrencyEURPipe implements PipeTransform {

  transform(
    value: number,
    currencyCode: string = 'EUR',
    locale: string = 'es-ES',
  ): string | null {
    return formatCurrency(
      value,
      locale,
      getCurrencySymbol(currencyCode, 'wide'),
      currencyCode,
    );
  }

}
