
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TypesPage } from './types';

import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    TypesPage,
  ],
  imports: [
    IonicPageModule.forChild(TypesPage),
    TranslateModule.forChild()
  ],
})
export class HomePageModule {}
