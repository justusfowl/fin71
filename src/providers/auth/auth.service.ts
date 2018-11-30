import { Injectable, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ConfigService } from '../config/config.service';
import { User } from '../../models/user';

// Import AUTH_CONFIG, Auth0Cordova, and auth0.js
import Auth0Cordova from '@auth0/cordova';
import * as auth0 from 'auth0-js';


@Injectable()
export class AuthService {

  public userId :  string = "";
  public userName : string = "testAvatar"; 
  public userAvatarPath : string = "https://cdn1.iconfinder.com/data/icons/avatars-55/100/avatar_profile_user_music_headphones_shirt_cool-512.png"; 

  isAuth: boolean = false;
  Auth0: any;
  Client: any;
  
  accessToken: string;
  user: any;
  loggedIn: boolean;
  loading = true;

  constructor(
    private cfg : ConfigService,
    public zone: NgZone,
    private storage: Storage
  ) { 

    let configObj = {
      clientID: this.cfg.clientID,
      clientId: this.cfg.clientId,
      domain: this.cfg.domain,
      packageIdentifier: this.cfg.packageIdentifier,
    }; 

    this.Auth0 = new auth0.WebAuth(configObj);
    this.Client = new Auth0Cordova(configObj);

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

  getMyUser(){
    return new User({
      userName : this.userName, 
      userId : this.userId, 
      userAvatarPath : this.userAvatarPath
    })
  }

  login() {
    this.loading = true;
    const options = {
      scope: 'openid profile offline_access'
    };
    // Authorize login request with Auth0: open login page and get auth results
    this.Client.authorize(options, (err, authResult) => {
      if (err) {
        throw err;
      }

      window.localStorage.setItem('accessToken', JSON.stringify(authResult));

      // Set Access Token
      
      this.accessToken = authResult.accessToken;
      // Set Access Token expiration
      const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

      // Set logged in
      this.loading = false;
      this.loggedIn = true;
      // Fetch user's profile info

      this.Auth0.client.userInfo(this.accessToken, (err, profile) => {
        if (err) {
          console.log(JSON.stringify(err));
          throw err;
        }
        window.localStorage.setItem('id_token', JSON.stringify(profile));

      });
    });
  }

  logout(){
    this.isAuth = false;
    this.loading = false;
      this.loggedIn = false;
    window.localStorage.clear();
    return true; 
  }


}
