import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateTypePage } from './create-type';

import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    CreateTypePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateTypePage),
    TranslateModule.forChild()
  ],
  exports : [
    CreateTypePage
  ],
  entryComponents: [CreateTypePage]
})
export class CreateTypePageModule {}
