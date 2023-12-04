import { Pipe, PipeTransform } from "@angular/core";
import { CurrencyPipe } from '@angular/common';
@Pipe({ name: 'CustomCurrency' })
export class CustomPipe implements PipeTransform {
  transform(
    value: any,
    currencyCode: string = 'XAF',
    display: 'code' | 'symbol' | 'symbol-narrow' | string | boolean = 'symbol',
    digitsInfo: string = '1.2-2',
    locale: string = 'en-US'
  ): string | null {
    const currencyPipe = new CurrencyPipe(locale);
    return currencyPipe.transform(value, currencyCode, display, digitsInfo);
  }
}