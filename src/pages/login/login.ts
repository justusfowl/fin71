import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, MenuController } from 'ionic-angular';
import { AuthService } from '../../providers/services';

import { FirstRunPage } from '../pages';
import { TranslateService } from '@ngx-translate/core';



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private loginErrorString: string;

  account : { userId: string, password: string } = {
    userId: '',
    password: ''
  };

  constructor(
    public navCtrl: NavController, 
    public translate : TranslateService,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public auth: AuthService, 
    private menu: MenuController) {

      this.translate.get('LOGIN_ERROR').subscribe((value) => {
        this.loginErrorString = value;
      })
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewWillEnter(){

    this.menu.swipeEnable(false);

    if (this.auth.getAuthStatus()){
      this.navCtrl.setRoot(FirstRunPage);
    }

  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
   }

  // Attempt to login in through our User service
  doLogin() {

    this.auth.login(this.account.userId, this.account.password).then(
      (data) => {
       
        this.navCtrl.setRoot(FirstRunPage);
      },
      error => {

        this.addInvalidPasswordStyle();

        let toast = this.toastCtrl.create({
          message: this.loginErrorString,
          duration: 1000,
          position: 'top'
        });
        toast.present();
      }
    )


  }

  
  addInvalidPasswordStyle(){
   console.log("SET INVALID");
  }


  disableInvalidPasswordStyle(){
    console.log("SET IS VALID");
  }



}
