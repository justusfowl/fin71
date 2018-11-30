import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../providers/services';
import { ModalController } from 'ionic-angular';
import { CreateTypePage } from '../create-type/create-type';
import { Type }  from '../../models/type';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  name : "TypesPage",
  segment: "types"
})

@Component({
  selector: 'app-types',
  templateUrl: './types.html'
})
export class TypesPage implements OnInit {

  public types = [];

  constructor(
    private api: ApiService,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.getTypes();
  }

  getTypes(refresher?){
    this.api.getTypes().subscribe(
      (data: any) => {

        try{
            this.types = data;

            if (refresher){
              refresher.complete();
            }

        }
        catch(err){

        } 

      },
      error => {
        this.api.handleAPIError(error);
      }
    )
  }

  editType(typeItem: Type, index: number){

    let editModal = this.modalCtrl.create("CreateTypePage", 
      {
        "typeItem" : typeItem
      },      
        {
        cssClass : "type-modal",
        enableBackdropDismiss: false,
        enterAnimation: 'modal-scale-up-enter',
        leaveAnimation: 'modal-scale-up-leave'
      }
    )

    editModal.onDidDismiss(res => {
      if (res){
        typeItem = res;
        this.upsertType(typeItem);
      }
    })

    editModal.present(); 
  }

  createType(){

    let addModal = this.modalCtrl.create("CreateTypePage", 
    {},      
      {
        cssClass : "type-modal",
        enableBackdropDismiss: false,
        enterAnimation: 'modal-scale-up-enter',
        leaveAnimation: 'modal-scale-up-leave'
      }
    )

    addModal.onDidDismiss(res => {
      if (res){
        let typeItem = res;
        this.upsertType(typeItem);
      }
    })

     addModal.present(); 
  }

  upsertType(t: Type, srcIndex?){
    this.api.upsertType(t).subscribe(
      (data: any) => {
        try{
          if (srcIndex){
            this.types[srcIndex] = t;
          }else{
            this.getTypes();
          }
        }
        catch(err){
          console.log("Error + " + err);
        } 

      },
      error => {
        this.api.handleAPIError(error);
      }
    )
  }

  removeItem(evt, t: Type, srcIndex?){
    event.preventDefault();

    this.api.removeType(t).subscribe(
      () => {
        try{
          this.types.splice(srcIndex, 1)
        }
        catch(err){
          console.log("Error + " + err);
        } 

      },
      error => {
        this.api.handleAPIError(error);
      }
    )
  }



}
