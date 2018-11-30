import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateProjectPage } from './create-project';

import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    CreateProjectPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateProjectPage),
    TranslateModule.forChild()
  ],
  exports : [
    CreateProjectPage
  ],
  entryComponents: [CreateProjectPage]
})
export class CreateTypePageModule {}
