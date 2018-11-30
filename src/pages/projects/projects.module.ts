
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectsPage } from './projects';

import { TranslateModule } from '@ngx-translate/core';

import { TagInputModule } from 'ngx-chips';


@NgModule({
  declarations: [
    ProjectsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectsPage),
    TranslateModule.forChild(),
    TagInputModule
  ],
})
export class HomePageModule {}
