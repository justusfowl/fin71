import { NgModule } from '@angular/core';
import { 
    StackedColumnComponent
  } from './stacked-column.component';

import { IonicPageModule } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        StackedColumnComponent
       ],
       imports : [
        IonicPageModule.forChild(StackedColumnComponent)
       ],
      exports: [
        StackedColumnComponent
      ]
})
export class StackedColumnModule {}