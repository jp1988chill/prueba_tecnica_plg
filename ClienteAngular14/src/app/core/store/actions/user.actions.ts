import {createAction, props} from '@ngrx/store';
import {SsoUserState} from '../states/user.state';

export const LOGOUT = createAction('[Auth] Logout');
export const LOGOUT_CONFIRMATION = createAction('[Auth] Logout Confirmation');

export const IDLE_TIMEOUT = createAction('[User] Idle Timeout');
export const REGISTER_SSO_USER = createAction('[User] Register', props<{ newUser: SsoUserState }>());
