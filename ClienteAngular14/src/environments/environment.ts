export const environment = {
  production: false,
  disableLogs: false,
  appName: 'login',
  baseUrl: 'https://localhost:44344/action/',
  keycloak: {
    issuer: '',
    clientId: '',
    redirectUri: window.location.origin + '/index.html',
    silentRefreshRedirectUri: window.location.origin + '/assets/sso/silent-refresh.html',
    useSilentRefresh: true,
    scope: '',
    requireHttps: false,
    showDebugInformation: false,
    disableAtHashCheck: true,
    timeoutFactor: 0.9
  },
  endpoints: {
    ObtenerClientes: {
      name: 'ObtenerClientes',
      description: 'Obtiene clientes',
      path: 'ObtenerClientes',
      suscriptionKey:'application/json'
    }
  }
};
