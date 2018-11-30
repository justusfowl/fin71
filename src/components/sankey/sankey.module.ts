import { NgModule } from '@angular/core';
import { 
    SankeyChartComponent
  } from './sankey.component';

import { IonicPageModule } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        SankeyChartComponent
       ],
       imports : [
        IonicPageModule.forChild(SankeyChartComponent),
        TranslateModule.forChild()
       ],
      exports: [
        SankeyChartComponent
      ]
})
export class SankeyChartModule {}