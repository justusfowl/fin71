import { Component, ViewChild, OnInit, ApplicationRef, ChangeDetectorRef} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiService, UtilService, AuthService } from '../../providers/services';
import { ModalController } from 'ionic-angular';

import { CurrencySelectPage } from '../currency-select/currency-select';

import { Transaction } from '../../models/transaction';
import { Project } from '../../models/project';
import { Type } from '../../models/type';

import { IonicPage } from 'ionic-angular';
import { User } from 'models/user';

@IonicPage({
  name : "HomePage", 
  segment: "home"
})

@Component({
  selector: 'page-home',
  templateUrl: './home.html'
})

export class HomePage implements OnInit{

  public projects = [];
  public selectedProjectIndex = 0;
  public selectedProject : any = {};

  public types = []; 
  public selectedTypeIndex = 0; 
  public selectedType : Type;

  public expenseTitle : string = ""; 

  public selectedCurrency : any = {
    "currId" : 1,
    "val" : "EUR", 
    "symbol" : "€"
  };

  // amount is in cents
  public amount = "0";

  public contribClicked : boolean = false; 

  public contributors = [
    {
      "userId" : "1",
    "userName" : "harald", 
    "userAvatarPath" : "https://www.gstatic.com/webp/gallery/2.jpg"
    },
    {
      "userId" : "2",
      "userName" : "teasd", 
      "userAvatarPath" : "https://www.gstatic.com/webp/gallery/3.jpg"
    },
    {
      "userId" : "3",
      "userName" : "123123", 
      "userAvatarPath" : "https://www.gstatic.com/webp/gallery/4.jpg"
    }
  ]; 

  public selectedContributors = [];
  public selectedPayer : any;

  public successTransaction : boolean = false;


  constructor(
    public util : UtilService,
    public translate : TranslateService, 
    private api: ApiService, 
    private auth : AuthService,
    public modalCtrl: ModalController,
    private appRef : ApplicationRef, 
    private chDec : ChangeDetectorRef
  ){

  }

  ngOnInit(){
    this.getProjects();
    this.getTypes();
  }

  onProjectChange(event){
    this.selectedContributors.length =0; 
    this.selectedContributors.push(this.selectedProject.contributors[0])
  }

  openCurrencySelect(){

    let addModal = this.modalCtrl.create('CurrencySelectPage', 
      {
        "currentCurrency" : this.selectedCurrency
      }, 
      {
      enableBackdropDismiss: false,
        enterAnimation: 'modal-scale-up-enter',
        leaveAnimation: 'modal-scale-up-leave'
      }
    );

    addModal.onDidDismiss(res => {
      if (res){
        this.selectedCurrency = res; 
      }
    })

    addModal.present();
    
  }

  getPayer(){
    if (!this.selectedPayer){
      this.selectedPayer = this.auth.getMyUser();
    }
    
    if (this.selectedPayer.userId == this.auth.userId){
      return this.translate.instant("PAYER_ME") + " " + this.translate.instant("PAYER_FOR_ME"); 
    }else{
      return "@" + this.selectedPayer.userName + " " + this.translate.instant("PAYER_FOR"); 
    }
  }

  selectType(index: number){
    this.selectedTypeIndex = index; 
    this.selectedType = this.types[index];
  }

  focus($event){
    this.contribClicked = true; 
  }

  focusout($event){
    this.contribClicked = false; 
  }

  checkIfContribSelected(contrib : User){
    let userIndex = this.selectedContributors.findIndex(x => x.userId == contrib.userId); 
    if (userIndex != -1){
      return true
    }else{
      return false
    }
  }

  addContributor(contrib : User){
    
    let userIndex = this.selectedContributors.findIndex(x => x.userId == contrib.userId); 
    if (userIndex == -1){
      this.selectedContributors.push(contrib);
    } 

    this.contribClicked = true;
  }

  removeContributor(contrib: User){
    let userIndex = this.selectedContributors.findIndex(x => x.userId == contrib.userId); 
    this.selectedContributors.splice(userIndex, 1)
  }

  swipe(event) {
    console.log(event)
  }


  addProject(){
    console.log("I am here to create a modal for a new project")
  }

  handleDigitPressend(digit){

    if (digit == "<<"){
      if (this.amount.length == 1){
        this.amount = "0";
      }else{
        this.amount = this.amount.substring(0,this.amount.length-1);
      }
      return;
    }

    if (this.amount.indexOf(".") != -1){
      this.amount = this.amount.replace(".", "");
    }

    this.amount += digit;

  }


  checkAmount(){

    let amount = this.util.formatMoneyFromCentString(this.amount); 

    if (parseFloat(amount) > 0){

      return true; 
    }
    else{
      return false;
    }


  }

  resetAmount(){

    this.successTransaction = true;

    setTimeout(function(){
      this.successTransaction = false;
    }, 1000)

    this.amount = "0";
    this.expenseTitle = ""; 
  }

  addTransaction(){

    let amount = this.util.formatMoneyFromCentString(this.amount); 
    this.successTransaction = false;

    if (this.checkAmount()){

      let transaction = new Transaction({
        userId : this.auth.userId, 
        projectId : this.selectedProject.projectId,
        typeId : this.selectedType.typeId,
        transactionCurOrig : this.selectedCurrency.val, 
        transactionTitle : this.expenseTitle, 
        transactionAmtOrig : amount
      })

      this.api.saveTransaction(transaction).then(res => {
        this.resetAmount();
      }).catch(err =>{
        this.api.handleAPIError(err);
      })

    }
  }

  setDefaultProject(){
    console.log("set default project")
    this.selectedProject = this.projects[0];
    this.selectedContributors.push(this.selectedProject.contributors[0])
  }

  getProjects(){
    this.api.getProjects().subscribe(
      (data : any) => {

        try{
            this.projects = data;

            if (data.length > 0){

              this.setDefaultProject();
              
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

  getTypes(){
    this.api.getTypes().subscribe(
      (data : any) => {

        try{
            this.types = data;
            if (data.length > 0){
              this.selectedType = new Type(data[0]);
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

}
