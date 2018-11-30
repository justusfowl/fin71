import { Injectable } from '@angular/core';
import { environment as ENV } from '@app/env';
import { AppVersion } from '@ionic-native/app-version';
import { Platform } from 'ionic-angular';

@Injectable()
export class ConfigService {

  private environment : string;

  private hostURL : string;
  private hostPort : string;
  private apiVersion : string;
  private apiBase : string = "/api/v";
  private apiProtocol : string = 'https';

  auth0Config : any;

  public appVersionNo : string;


  constructor(
    platform: Platform,
    private appVersion: AppVersion
  ) { 
    this.environment = ENV.mode;
    this.hostURL = ENV.hostURL;
    this.hostPort = ENV.hostPort;
    this.apiVersion = ENV.apiVersion;

    this.auth0Config = ENV.auth0Config;

    platform.ready().then(() => {

        this.appVersion.getVersionNumber().then(data => {

            this.appVersionNo = data;

        });

    });


    console.log("Environment loaded: " + this.environment);
 
  }

  getEnvironment() : string {
    return this.environment;
  }

  getHostURL (): string {
      return this.hostURL;
  }

  getAPIv () : string {
      return this.apiVersion;
  }

  getAPI() : string {
      return this.apiBase + this.apiVersion;
  }

  getHostBase () : string {
      if (this.hostPort != "443"){
          return this.apiProtocol + "://" + this.hostURL + ":" + this.hostPort;
      
      }else{
          return this.apiProtocol + "://" + this.hostURL;
      }
      
  }

  getAPIBase () : string {
      if (this.hostPort != "443"){
          return this.apiProtocol + "://" + this.hostURL + ":" + this.hostPort + this.getAPI();
      }else{
          return this.apiProtocol + "://" + this.hostURL + this.getAPI();
      }
  }

  getAppVersion(){
    return this.appVersionNo;
}
}
