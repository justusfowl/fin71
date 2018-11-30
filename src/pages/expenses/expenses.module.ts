import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpensesPage } from './expenses';

import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ExpensesPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpensesPage),
    TranslateModule.forChild()
  ],
})
export class ExpensesPageModule {}
