import {Injectable} from '@angular/core';

import {fromEvent, merge, timer} from 'rxjs';
import {map, switchMapTo, tap} from 'rxjs/operators';

import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserActions} from '../actions';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable()
export class UserEffects {

  clicks$ = fromEvent(document, 'click');
  keys$ = fromEvent(document, 'keydown');
  mouse$ = fromEvent(document, 'mousemove');

  idle$ = createEffect(() =>
    merge(this.clicks$, this.keys$, this.mouse$).pipe(
      switchMapTo(timer(10 * 60 * 1000)),
      map(() => UserActions.IDLE_TIMEOUT())
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.LOGOUT_CONFIRMATION, UserActions.LOGOUT, UserActions.IDLE_TIMEOUT),
        tap(() => {
          this.oauthService.logOut();
        })
      ),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private oauthService: OAuthService
  ) {
  }

}



