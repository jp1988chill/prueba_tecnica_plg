import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {HomeComponent} from './home.component';
import {RouterModule} from '@angular/router';
import {ModalsModule} from '../modals/modals.module';
import {HomeRoutingModule} from './home-routing.module';
import {CookieService} from 'ngx-cookie-service';

@NgModule({
  declarations: [HomeComponent],
  exports: [HomeComponent],
    imports: [
        HomeRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule,
        ModalsModule
    ],
  providers: [
    DatePipe,
    CookieService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class HomeModule {
}
