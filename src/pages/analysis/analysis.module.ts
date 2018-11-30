import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnalysisPage } from './analysis';

import { TranslateModule } from '@ngx-translate/core';

import { DonutChartModule } from "../../components/donut-chart/donut.module";
import { StackedColumnModule } from "../../components/stacked-column/stacked-column.module";
import { SankeyChartModule } from "../../components/sankey/sankey.module";

@NgModule({
  declarations: [
    AnalysisPage,
  ],
  imports: [
    IonicPageModule.forChild(AnalysisPage),
    TranslateModule.forChild(),
    DonutChartModule,
    StackedColumnModule,
    SankeyChartModule
  ],
})
export class AnalysisPageModule {}
