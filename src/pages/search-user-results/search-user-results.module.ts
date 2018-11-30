
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchUserResultsPage } from './search-user-results';

import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    SearchUserResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchUserResultsPage),
    TranslateModule.forChild()
  ],
  entryComponents : [SearchUserResultsPage]
})
export class HomePageModule {}
