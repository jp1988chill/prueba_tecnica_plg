import {ModuleWithProviders, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HttpConfig} from './http.config';
import {HttpService} from './http.service';

@NgModule({
  imports: [
    HttpClientModule,
  ],

})
export class HttpModule {

  static forRoot(httpConfig: HttpConfig): ModuleWithProviders<HttpModule> {
    return {
      ngModule: HttpModule,
      providers: [
        {provide: HttpConfig, useValue: httpConfig},
        HttpService
      ],
    };
  }
}
