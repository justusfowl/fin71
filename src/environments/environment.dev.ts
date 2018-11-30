// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  mode: 'Development',
  hostURL : "fin71.local",
  hostPort : "9999",
  apiVersion : "01",

  auth0Config: {
    // Needed for Auth0 (capitalization: ID):
    clientID: 'FeRpi11chOAU46lir9nd1MTR5BnAVWw5',
    // Needed for Auth0Cordova (capitalization: Id):
    clientId: 'FeRpi11chOAU46lir9nd1MTR5BnAVWw5',
    domain: 'fin71.eu.auth0.com',
    packageIdentifier: 'de.fin71.mobile',// config.xml widget ID, e.g., com.auth0.ionic
    scope: "openid profile email offline_access", 
    responseType : "token id_token",
    audience: 'https://fin71.eu.auth0.com/api/v2/'
  }

};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
