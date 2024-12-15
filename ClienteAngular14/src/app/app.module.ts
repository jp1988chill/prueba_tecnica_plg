import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {AppComponent} from './app.component';
import {routes} from './app.routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpErrorInterceptor} from './core/interceptors/HttpErrorInterceptor';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {NavigationActionTiming, StoreRouterConnectingModule} from '@ngrx/router-store';
import {metaReducers, ROOT_REDUCERS} from './core/store/reducers';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {environment, environment as env} from '../environments/environment';
import {UserEffects} from './core/store/effects';
import {HomeModule} from './modules/home/home.module';
import {MatDialogModule} from '@angular/material/dialog';
import {AppSessionInterceptor} from './core/interceptors/AppSessionInterceptor';
import {SSOService} from './core/auth/sso.service';
import {registerLocaleData} from '@angular/common';
import localeES from '@angular/common/locales/es';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {OAuthModule} from 'angular-oauth2-oidc';
import {HttpModule} from './core/services/http/http.module';
import {HttpService} from './core/services/http/http.service';
import {LoggerService} from './core/services/logger/logger.service';
import {CustomSerializer} from './core/store/router/custom-serializer';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {USER_REDUCER} from './core/store/reducers/user.reducers';
import { HeaderComponent } from './shared/components/header/header.component';
import { SharedModule } from './shared/shared.module';
import {EnrolamientoModule} from './modules/enrolamiento/enrolamiento.module';
//import {CookieService} from 'ngx-cookie-service';


registerLocaleData(localeES, 'es');

export function initializerKeycloak(authConfigService: SSOService): any {
  return () => authConfigService.initAuth();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes, {useHash: true, scrollPositionRestoration: 'enabled'}),
    BrowserAnimationsModule,
    BrowserModule,
    HomeModule,
   // EnrolamientoModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    SharedModule,
    OAuthModule.forRoot(),
    HttpModule.forRoot({environment}),
    LoggerModule.forRoot({level: NgxLoggerLevel.TRACE, disableConsoleLogging: environment.disableLogs}),
    StoreModule.forRoot({
      ...ROOT_REDUCERS,
      ...USER_REDUCER
    }, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
      navigationActionTiming: NavigationActionTiming.PostActivation,
    }),
    StoreDevtoolsModule.instrument({
      name: env.appName,
      logOnly: !env.production,
    }),
    EffectsModule.forRoot([UserEffects]),
    EnrolamientoModule
  ],
  providers: [
    LoggerService,
    HttpService,
    //CookieService,
    SSOService,
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    // {provide: APP_INITIALIZER, useFactory: initializerKeycloak, multi: true, deps: [SSOService]},
    // {provide: HTTP_INTERCEPTORS, useClass: AppSessionInterceptor, multi: true},
    // {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  exports: [

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule {
}
