import {NgModule} from '@angular/core';
import {CurrencyFormatPipe} from './currency/currency-format.pipe';

const PIPES = [
  CurrencyFormatPipe
];

@NgModule({
  declarations: [
    ...PIPES,
  ],
  exports: [
    ...PIPES
  ]
})
export class PipesModule {
}
