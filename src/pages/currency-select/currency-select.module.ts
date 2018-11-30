import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrencySelectPage } from './currency-select';

import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    CurrencySelectPage,
  ],
  imports: [
    IonicPageModule.forChild(CurrencySelectPage),
    TranslateModule.forChild()
  ],
  exports : [
    CurrencySelectPage
  ]
})
export class CurrencySelectPageModule {}
