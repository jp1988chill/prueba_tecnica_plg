import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number): any {
    if (value !== null && value !== undefined) {
      const currencySign = '$';
      const decimalLength = 0;
      const chunkDelimiter = '.';
      const decimalDelimiter = '';
      const chunkLength = 3;
      const result =
        '\\d(?=(\\d{' +
        chunkLength +
        '})+' +
        (decimalLength > 0 ? '\\D' : '$') +
        ')';
      const num = value.toString();
      return (
        currencySign +
        (decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(
          new RegExp(result, 'g'),
          '$&' + chunkDelimiter
        )
      );
    } else {
      return value;
    }
  }
}
