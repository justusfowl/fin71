import { Component, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  name : "CreateProjectPage"
})

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.html'
})
export class CreateProjectPage implements OnInit {

  projectTitle  = ""; 

  constructor(
    public viewCtrl: ViewController
  ) { }

  ngOnInit() {
  }

  closeAndSave(){
    
    this.viewCtrl.dismiss(this.projectTitle)

  }

  eventHandler(code){
  
    if (code == 13){
      this.closeAndSave(); 
    }
  }



}
