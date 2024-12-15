export const environment = {
  production: true,
  disableLogs: false,
  appName: 'firmadigital-app',
  baseUrl: '/firmadigital-app/',
  keycloak: {
    issuer: '',
    clientId: '',
    redirectUri: window.location.origin + '/index.html',
    silentRefreshRedirectUri: window.location.origin + '/assets/sso/silent-refresh.html',
    useSilentRefresh: true,
    scope: 'openid profile email',
    requireHttps: false,
    showDebugInformation: false,
    disableAtHashCheck: true,
    timeoutFactor: 0.9
  },
  endpoints: {
    logOut: {
      name: 'LogOut de aplicación',
      description: 'Cierra la sesión',
      path:  'arca/logout'
    },
    uf: {
      name: 'Valor uf',
      description: 'Obtiene el valor uf del día',
      path:  'uf/value'
    },
    express: {
      name: 'Bifurcador pago express',
      description: 'Indica si el cliente está parametrizado para pago express',
      path:  'express/splitter/{rut}'
    },
    catalog: {
      name: 'Parametría General',
      description: 'Obtiene los valores del catálogo',
      path:  'parametry/catalog_value/{catalog}'
    }
  }
};
