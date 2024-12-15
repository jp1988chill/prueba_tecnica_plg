import {ActionReducerMap, createReducer, on} from '@ngrx/store';
import {routerReducer} from '@ngrx/router-store';
import {SsoUserState} from '../states/user.state';
import {REGISTER_SSO_USER} from '../actions/user.actions';
import {AppStore} from '../store';

const userInitState = {
    userId: '',
    userName: ''
};

export const USER_REDUCER: ActionReducerMap<AppStore> = {
    router: routerReducer,
    ssoUser: createReducer<SsoUserState>(
        userInitState,
        on(REGISTER_SSO_USER, (state: any, action: any) => {
            return {
                ...state,
                userId: action.newUser.userId,
                userName: action.newUser.userName
            };
        }),
    ),
};

