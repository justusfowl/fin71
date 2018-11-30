import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, PathLocationStrategy, APP_BASE_HREF } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MyApp } from './app.component';

import { 
  ConfigService,
  ApiService, 
  AuthService, 
  UtilService } from '../providers/services';
import { AuthIntercept } from '../providers/api/authintercept';

import { D3Service } from 'd3-ng2-service';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { AppVersion } from '@ionic-native/app-version';

import { TagInputModule } from 'ngx-chips';

import { Config } from 'ionic-angular';
import { ModalScaleUpEnterTransition } from '../transitions/scale-up-enter.transition';
import { ModalScaleUpLeaveTransition } from '../transitions/scale-up-leave.transition';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
 

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    TagInputModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [

    StatusBar,
    SplashScreen,
    { provide: HTTP_INTERCEPTORS, useClass : AuthIntercept, multi: true},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigService,
    ApiService, 
    AuthService, 
    UtilService,
    D3Service,
    AppVersion
  ]
})

export class AppModule {
  constructor(public config: Config) {
      this.setCustomTransitions();
  }

  private setCustomTransitions() {
      this.config.setTransition('modal-scale-up-leave', ModalScaleUpLeaveTransition);
      this.config.setTransition('modal-scale-up-enter', ModalScaleUpEnterTransition);
  }
}
