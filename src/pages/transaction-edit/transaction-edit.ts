import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService, ApiService, UtilService } from '../../providers/services';
import { Transaction } from '../../models/transaction';
import { TranslateService } from '@ngx-translate/core';

import { IonicPage } from 'ionic-angular';

@IonicPage({
  name : "TransactionEditPage"
})

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.html'
})
export class TransactionEditPage implements OnInit {

  resAmount = 0; 

  selectedCurrency : any = { 
    "currId" : 1,
    "val" : "EUR", 
    "symbol" : "€"
  };

  transactionItemForm: FormGroup;
  itemOwner : Boolean = false;

  types = [];
  projects = [];
  currencies = [];

  constructor(
    private viewCtrl : ViewController,
    private formBuilder: FormBuilder,
    private params: NavParams,
    private auth: AuthService, 
    public translate : TranslateService,
    private api: ApiService,
    public util: UtilService
  ) { 

    

  }

  ngOnInit() {

    let transactionItem = this.params.get('transaction') as Transaction;

    if (transactionItem.transactionCreatorUserId == this.auth.userId){
      this.itemOwner = true; 
    }

    this.resAmount = transactionItem.transactionAmt;

    

    this.transactionItemForm = this.formBuilder.group({
      'transactionCreatorUserId' : [transactionItem.transactionCreatorUserId, Validators.required],
      'transactionPayerUserId' : [transactionItem.transactionPayerUserId, Validators.required],
      'transactionId' : [transactionItem.transactionId, Validators.required],
      'transactionTitle' : [transactionItem.transactionTitle, Validators.required],
      'transactionAmt' : [transactionItem.transactionAmt, Validators.required],
      'transactionCur' : [transactionItem.transactionCur, Validators.required],
      'transactionAmtOrig' : [transactionItem.transactionAmtOrig, Validators.required],
      'transactionCurOrig' : [transactionItem.transactionCurOrig, Validators.required],
      'transactionCreatedAt' : [transactionItem.transactionCreatedAt, Validators.required],
      'typeId' : [transactionItem.typeId, Validators.required],
      'projectId' : [transactionItem.projectId, Validators.required]
    });

    this.transactionItemForm.get('transactionAmtOrig').valueChanges.subscribe(val => {

      let curOrig = this.transactionItemForm.get("transactionCurOrig").value;
      

      console.log("I need to convert currency for: " + val + " for currency: " + curOrig + " into EUR!")  
      
      this.api.convertAmount(val, curOrig).then((res: any) => {
          this.resAmount = res.targetAmount;
          this.transactionItemForm.patchValue({"transactionAmt" : res.targetAmount});
      }).catch(err => {
        this.api.handleAPIError(err);
      });

        
    });

    this.transactionItemForm.get('transactionCurOrig').valueChanges.subscribe(curOrig => {

      let val = this.transactionItemForm.get("transactionAmtOrig").value;

      console.log("I need to convert currency for: " + val + " for currency: " + curOrig + " into EUR!")  
      
      this.api.convertAmount(val, curOrig).then((res: any) => {
          this.resAmount = res.targetAmount;
          this.transactionItemForm.patchValue({"transactionAmt" : res.targetAmount});

      }).catch(err => {
        this.api.handleAPIError(err);
      });
        
    });

    this.getTypes();
    this.getProjects();
    this.getCurrencies();
  }

  getCurrencies(){
    this.api.getCurrencies().then((currencies : any[]) => {
      this.currencies = currencies; 
      let origCurrency = this.transactionItemForm.get("transactionCurOrig").value;
       
      //this.selectedCurrency = this.currencies[currencyIndex];
    })
  }

  getProjects(){
    this.api.getProjects().subscribe(
      (data: any) => {

        try{
            this.projects = data;

        }
        catch(err){

        } 

      },
      error => {
        this.api.handleAPIError(error);
      }
    )
  }

  getTypes(){
    this.api.getTypes().subscribe(
      (data: any) => {

        try{
            this.types = data;

        }
        catch(err){

        } 

      },
      error => {
        this.api.handleAPIError(error);
      }
    )
  }

  closeModal(){
    this.viewCtrl.dismiss(); 

  }
  
  saveTransaction(){

    this.viewCtrl.dismiss(this.transactionItemForm.value);
    
  }

}
