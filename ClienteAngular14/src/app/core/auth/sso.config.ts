import {AuthConfig} from 'angular-oauth2-oidc';
import {environment} from '../../../environments/environment';

export const ssoConfig: AuthConfig = {
    issuer: environment.keycloak.issuer,
    redirectUri: environment.keycloak.redirectUri,
    clientId: environment.keycloak.clientId,
    scope: environment.keycloak.scope,
    silentRefreshRedirectUri: environment.keycloak.silentRefreshRedirectUri,
    timeoutFactor: environment.keycloak.timeoutFactor,
    useSilentRefresh: environment.keycloak.useSilentRefresh,
    requireHttps: environment.keycloak.requireHttps,
    showDebugInformation: environment.keycloak.showDebugInformation,
    disableAtHashCheck: environment.keycloak.disableAtHashCheck
};

