
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransactionEditPage } from './transaction-edit';

import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    TransactionEditPage,
  ],
  imports: [
    IonicPageModule.forChild(TransactionEditPage),
    TranslateModule.forChild()
  ],
  entryComponents : [TransactionEditPage]
})
export class HomePageModule {}
