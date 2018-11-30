import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Type } from '../../models/type';
import { AuthService } from '../../providers/services';

import { IonicPage } from 'ionic-angular';

@IonicPage({
  name : "CreateTypePage"
})

@Component({
  selector: 'app-create-type',
  templateUrl: './create-type.html'
})
export class CreateTypePage implements OnInit {

  public leave : boolean = false;

  typeItemForm: FormGroup;

  icons = [
    {
      "icon" : "home"
    },
    {
      "icon" : "american-football"
    },
    {
      "icon" : "plane"
    },
    {
      "icon" : "at"
    },
    {
      "icon" : "cafe"
    },
    {
      "icon" : "beer"
    },
    {
      "icon" : "cart"
    },
    {
      "icon" : "bus"
    },
    {
      "icon" : "contacts"
    },
    {
      "icon" : "hammer"
    },
    {
      "icon" : "heart"
    },
    {
      "icon" : "images"
    },
    {
      "icon" : "pizza"
    }
    ]

  constructor(
    private viewCtrl : ViewController,
    private formBuilder: FormBuilder,
    private params: NavParams,
    private auth: AuthService
  ) { 
    let typeItem = this.params.get('typeItem') as Type;

    if (typeItem){
      this.typeItemForm = this.formBuilder.group({
        'typeId' : typeItem.typeId,
        'typeTitle' : [typeItem.typeTitle, Validators.required],
        'typeIcon' : [typeItem.typeIcon, Validators.required],
        'userId' : [this.auth.userId, Validators.required]
      });
    }else{
      this.typeItemForm = this.formBuilder.group({
        'typeId' : null,
        'typeTitle' : ["", Validators.required],
        'typeIcon' : [this.icons[0].icon, Validators.required],
        'userId' : [this.auth.userId, Validators.required]
      });
    }


  }

  ngOnInit() {
    
  }


  selectIcon(icon){
    this.typeItemForm.patchValue({"typeIcon" : icon.icon})
  }


  closeModal(){

    if (this.typeItemForm.valid){
      this.leave = true;
      this.viewCtrl.dismiss(this.typeItemForm.value);
    }
    
  }

}
