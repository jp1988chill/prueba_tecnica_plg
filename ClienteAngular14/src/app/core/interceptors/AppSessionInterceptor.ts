import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SSOService} from '../auth/sso.service';

@Injectable()
export class AppSessionInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const oauthAccessToken = this.oauthService.getAccessToken();
    if (oauthAccessToken && request.url.indexOf('/firmadigital-app') !== -1) {
      return next.handle(request.clone({
        withCredentials: true,
        setHeaders: {
          Token: oauthAccessToken
        }
      }));
    }
    return next.handle(request);
  }

  constructor(private oauthService: SSOService) {
  }
}

