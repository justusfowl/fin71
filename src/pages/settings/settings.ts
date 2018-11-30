import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AuthService, ConfigService } from '../../providers/services';
import { AppVersion } from '@ionic-native/app-version';

@IonicPage({
  name : "SettingsPage",
  segment: "settings"
})

@Component({
  selector: 'app-settings',
  templateUrl: './settings.html',
})
export class SettingsPage implements OnInit {

  public now : any = new Date().getTime();
  public displayDevDetails : boolean = true;

  constructor(
    public auth: AuthService, 
    public config: ConfigService,
  ) { }

  ngOnInit() {
  }

}
