import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../providers/services';
import { NavParams, ViewController, NavController } from 'ionic-angular';

import { IonicPage } from 'ionic-angular';

@IonicPage({
  name : "CurrencySelectPage"
})

@Component({
  selector: 'app-currency-select',
  templateUrl: './currency-select.html',
})
export class CurrencySelectPage implements OnInit {

  public leave : boolean = false;

  public currencies = [];
  public selectedCurrency : any;

  constructor(
    public navCtrl: NavController,
    private api: ApiService, 
    private params: NavParams, 
    private viewCtrl : ViewController
  ) {

    let passedCurr = this.params.get('currentCurrency'); 
    console.log("Current"  + JSON.stringify(passedCurr)); 
    this.selectedCurrency = passedCurr; 

   }

  ngOnInit() {
    this.api.getCurrencies().then((currencies : any[]) => {
      this.currencies = currencies; 
    })
  }

  selectCurrency(currency){
    console.log(currency);
    this.selectedCurrency = currency; 
    this.leave = true;
    this.viewCtrl.dismiss(this.selectedCurrency);
  }

  checkIfIsSelected(c){
    if (c.val == this.selectedCurrency.val){
      return true; 
    }else{
      return false;
    }
  }

  closeModal(){
    this.leave = true;
    this.viewCtrl.dismiss();
  }



}
