import {Injectable} from '@angular/core';
import {NullValidationHandler, OAuthService} from 'angular-oauth2-oidc';
import {filter} from 'rxjs/operators';
import {ssoConfig} from './sso.config';
import {SSO_EVENT_SILENT_REFRESH_ERROR, SSO_EVENT_TOKEN_ERROR, SSO_EVENT_TOKEN_RECEIVED} from './sso-constants';
import {AppStore} from '../store/store';
import {Store} from '@ngrx/store';
import {SsoUser} from './sso.user';
import {LOGOUT, REGISTER_SSO_USER} from '../store/actions/user.actions';

@Injectable()
export class SSOService {

  private _accessToken: any;
  private _idToken: any;
  private _ssoUser: any;


  get ssoUser(): SsoUser {
    return this._ssoUser;
  }

  get accessToken(): void {
    return this._accessToken;
  }

  get idToken(): void {
    return this._idToken;
  }

  constructor(private readonly oauthService: OAuthService, private readonly appStore$: Store<AppStore>) {
  }

  async initAuth(): Promise<any> {
    return new Promise<void>(async (resolveFn, rejectFn) => {

      this.oauthService.configure(ssoConfig);
      this.oauthService.setStorage(localStorage);
      this.oauthService.tokenValidationHandler = new NullValidationHandler();

      this.oauthService.events
        .pipe(filter((e: any) => {
          return e.type === SSO_EVENT_TOKEN_RECEIVED;
        }))
        .subscribe(() => this.handleNewToken());

      this.oauthService.events
        .pipe(filter((e: any) => e.type === SSO_EVENT_TOKEN_ERROR || e.type === SSO_EVENT_SILENT_REFRESH_ERROR))
        .subscribe(() => this.appStore$.dispatch(LOGOUT()));

      const isLoggedIn = await this.oauthService.loadDiscoveryDocumentAndLogin();

      if (isLoggedIn) {
        this._ssoUser = await this.oauthService.loadUserProfile();
        const newUser: any = {userId: this.ssoUser.preferred_username, userName: this.ssoUser.name};
        this.appStore$.dispatch(REGISTER_SSO_USER({newUser}));
        this.oauthService.setupAutomaticSilentRefresh();
        resolveFn();
      } else {
        this.oauthService.initImplicitFlow();
        rejectFn();
      }

    });
  }

  private handleNewToken(): void {
    this._accessToken = this.oauthService.getAccessToken();
    this._idToken = this.oauthService.getIdToken();
  }

  public getAccessToken() {
    return this.oauthService.getAccessToken();
  }

}
