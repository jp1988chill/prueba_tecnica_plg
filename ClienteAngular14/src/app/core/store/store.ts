import {RouterReducerState} from '@ngrx/router-store';
import {RouterStateUrl} from './router/custom-serializer';
import {SsoUserState} from './states/user.state';

export interface AppStore {
    ssoUser: SsoUserState;
    router: RouterReducerState<RouterStateUrl>;
}
