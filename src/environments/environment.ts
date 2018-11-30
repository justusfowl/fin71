export const environment = {
  production: true,
  mode: 'Production',
  hostURL : "fin71.de",
  hostPort : "443",
  apiVersion : "01",

  auth0Config: {
    // Needed for Auth0 (capitalization: ID):
    clientID: 'FeRpi11chOAU46lir9nd1MTR5BnAVWw5',
    // Needed for Auth0Cordova (capitalization: Id):
    clientId: 'FeRpi11chOAU46lir9nd1MTR5BnAVWw5',
    domain: 'fin71.eu.auth0.com',
    packageIdentifier: 'de.fin71.mobile',// config.xml widget ID, e.g., com.auth0.ionic
    scope: "openid profile email offline_access",
    responseType : "access_token token id_token",
    audience: 'https://fin71.eu.auth0.com/api/v2/'
  }
};
