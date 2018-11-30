import { NgModule } from '@angular/core';
import { 
    DonutChartComponent
  } from './donut-chart.component';

import { IonicPageModule } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        DonutChartComponent
       ],
       imports : [
        IonicPageModule.forChild(DonutChartComponent)
       ],
      exports: [
        DonutChartComponent
      ]
})
export class DonutChartModule {}