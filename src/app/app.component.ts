import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../providers/services';

import { FirstRunPage } from '../pages/pages';

// Import Auth0Cordova
import Auth0Cordova from '@auth0/cordova';

declare var donutChart:any;
declare var createColumnChart:any;
declare var sankeyChart:any;


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = FirstRunPage;
  activePage : any; 

  pages: Array<{title: string, component: any}>;

  constructor(
    private translate: TranslateService,
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public auth: AuthService) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'MENU_HOME', component: "HomePage" },
      { title: 'MENU_EXPENSE', component: "ExpensesPage" },
      { title: 'MENU_PROJECT', component: "ProjectsPage" },
      { title: 'MENU_CATEGORY', component: "TypesPage" },
      { title: 'MENU_LOGIN', component: "LoginPage" },
      { title: 'MENU_SETTINGS', component: "SettingsPage" },
    ];

    this.initTranslate();

    this.activePage = this.pages[0].component;

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Redirect back to app after authenticating
      (window as any).handleOpenURL = (url: string) => {
        window.setTimeout(function () {
        Auth0Cordova.onRedirectUri(url);
        }, 200);
      }

    });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en');
    }

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.activePage = page.component;
    this.nav.setRoot(page.component);
    //this.nav.push(page.component);
  }

  logOut(){
    console.log("Log out")
  }
}
