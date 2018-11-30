import { Injectable, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ConfigService } from '../config/config.service';
import { User } from '../../models/user';
import { environment as ENV } from '@app/env';

// Import AUTH_CONFIG, Auth0Cordova, and auth0.js
import Auth0Cordova from '@auth0/cordova';
import * as auth0 from 'auth0-js';
import { ApiService } from '../api/api.service';


@Injectable()
export class AuthService {



  public userId :  string = "";
  public userName : string = "testAvatar"; 
  public userAvatarPath : string ; 

  isAuth: boolean = false;
  Auth0: any;
  Client: any;

  private id_token : string = "";
  accessToken: string;
  user: any;
  loggedIn: boolean;
  loading = true;

  private expiresAt : number = 0;

  
  public auth0Config : any;

  constructor(
    private cfg : ConfigService,
    public zone: NgZone,
    private storage: Storage,
    private api: ApiService
  ) { 

    this.auth0Config = this.cfg.auth0Config;

    this.Auth0 = new auth0.WebAuth({
      clientID: ENV.auth0Config.clientID,
      domain: ENV.auth0Config.domain
    });

    

    // demo: 
    this.userId = "1";

    /*
    this.storage.get('profile').then(user => this.user = user);
    this.storage.get('access_token').then(token => this.accessToken = token);
    this.storage.get('expires_at').then(exp => {
      this.loggedIn = Date.now() < JSON.parse(exp);
      this.loading = false;
    });
    */

   this.loading = false;

  }

  
public login(username: string, password: string) {

    let self = this;

    return new Promise<any>((resolve, reject) => {
    
        this.Auth0.client.login({
            client_id: this.auth0Config.clientID,
            username: username,
            email: username,
            password: password,
            audience : this.auth0Config.audience,
            realm: 'Username-Password-Authentication',
            scope: this.auth0Config.scope
        }, (err, authResult) => {
            if (err){
                console.error(err);
                this.api.handleAPIError(err);
                reject(err)
                return;
            }else{
                console.log("authenticated");
                //console.log(authResult);
                self.handleAuthSuccess(authResult, resolve, reject);
            }
        })
    });
  }

handleAuthSuccess(authResult, resolve, reject){
    
    this.Auth0.client.userInfo(authResult.accessToken, (error, user) => {
        if (error){
            console.log(JSON.stringify(error));
            this.api.handleAPIError(error);
            reject(error);
        }else{
            
            authResult["id_token"] = authResult.idToken;
            authResult["userId"] = user["https://app.fin71.de/fin71_id"];

            this.handleLoginSuccess(authResult)

            this.api.getUserProfileBase(authResult["userId"]).subscribe(
                (data : any) => {

                  authResult["userName"] = data.userName;
                  authResult["userAvatarPath"] = data.userAvatarPath;

                  resolve(this.handleProfileSuccess(authResult));

                },
                error => {
                  this.api.handleAPIError(error);
                }
              );
              

              resolve(true);
        }
    });


}


logout(){
    this.isAuth = false;
    window.localStorage.clear();
    return true; // this.store.clear();
}

handleProfileSuccess(data){
    this.userName = data.userName;
    this.userAvatarPath = data.userAvatarPath;

    window.localStorage.setItem('userName', data.userName);
    window.localStorage.setItem('avatar', data.userAvatarPath);

    return;
}

setExpiresAt(expiresIn){
    let expiresAt = parseInt(JSON.stringify((expiresIn * 1000) + new Date().getTime()));

    this.expiresAt = expiresAt;

    window.localStorage.setItem('expiresAt', expiresAt.toString());

}

handleLoginSuccess(data){

    this.userId = data.userId; 
    
    this.id_token = data.id_token;
    this.accessToken = data.accessToken;

    this.setExpiresAt(data.expiresIn);
    
    window.localStorage.setItem('userId', data.userId);
    
    window.localStorage.setItem('accessToken', data.accessToken);
    window.localStorage.setItem('id_token', data.id_token);
    window.localStorage.setItem('refreshToken', data.refreshToken);

    this.isAuth = true;
    
    return;
    
}

signUp(account){

    return new Promise<any>((resolve, reject) => {
    
        this.Auth0.signup({
            client_id: this.auth0Config.clientID,
            username : account.userName,
            email: account.userId,
            password: account.password,
            connection: 'Username-Password-Authentication'
        }, (err, result) => {
            if (err){
                console.error(err);
                this.api.handleAPIError(err);
                reject(err)
                return;
            }else{
                console.log("signed up");
                resolve(result);
            }
        })
    });
}

setAvatarBaseStr (avatarBase){
    this.userAvatarPath = avatarBase;
    window.localStorage.setItem('avatar', avatarBase);
}

getAuthStatus(){
    let now = new Date().getTime();
    let expiresAt = parseInt(window.localStorage.getItem('expiresAt'));
    
    this.expiresAt = expiresAt;

    if (this.expiresAt > now ){
        this.isAuth = true;
    }else{
        this.isAuth = false;
    }

    return this.isAuth;
}

getMyUser(){ 
  return {
    userName : "harald", 
    userId : "1"
  }
}

/*

checkRefreshToken(){

    this.unAuthCounter++;

    if (!this.isRefreshingToken){

        let nowWithPuffer = (new Date().getTime()) + 1000 * 60 * 60;
        let expiresAt = parseInt(window.localStorage.getItem('expiresAt'));

        if (expiresAt < nowWithPuffer ){

            this.isRefreshingToken = true;
            this.refreshToken();
            return true;

        }else{
            console.log("already alright");
            return false;
        }

    }else{
        console.log("is refreshing");
        return false;
    }

}



refreshToken(){
    let requestBody = {
        "grant_type" : "refresh_token", 
        "client_id" : this.auth0Config.clientId, 
        "refresh_token" : this.getRefreshToken()
    };


    this.api.refreshToken(this.auth0Config.domain, requestBody ).subscribe( (resp : any) => {
        console.log("successfully refreshed token");

        this.setExpiresAt(resp.expires_in);
        window.localStorage.setItem('accessToken', resp.accessToken);
        window.localStorage.setItem('id_token', resp.id_token);

        this.isRefreshingToken = false;

        this.unAuthCounter = 0;
    }, 
    error => {
        this.isRefreshingToken = false;
        this.api.handleAPIError(error);
    })
}

*/

validateAuth (navCtrl){
    if (!this.getAuthStatus()){
        navCtrl.setRoot('LoginPage');
    }
    
}



getRefreshToken(){
    return window.localStorage.getItem('refreshToken');
}

getUsername (){
    return window.localStorage.getItem('userName');
    // return this.userName; 
}

getUserId (){
    return window.localStorage.getItem('userId');
    // return this.userId;
}

getToken () : string {
    return window.localStorage.getItem('id_token');
    // return this.token;
}


getUserAvatarPath () : string {
    return window.localStorage.getItem('avatar') || "";
}

checkProfile(item : any, profile){

    try{

    
        if (profile == 'owner'){

            if (item.getUserId() == this.getUserId()){
                return true;
            } else{
                return false;
            }

        }

    }catch(err){
        console.log(err);
    }

}



}
