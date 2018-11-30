import { Component, OnInit, ViewChildren } from '@angular/core';
import { ApiService, UtilService, AuthService } from '../../providers/services';
import { Transaction } from '../../models/transaction';

import { Slides, ModalController, NavController } from 'ionic-angular';
import { Project } from '../../models/project';
import { HttpParams } from '@angular/common/http';
import { TransactionEditPage } from '../transaction-edit/transaction-edit';

import { IonicPage } from 'ionic-angular';

@IonicPage({
  name : "ExpensesPage",
  segment : "expenses"
})

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.html'
})

export class ExpensesPage implements OnInit {

  @ViewChildren('headerSlides') headerSlides : Slides;

  transactions = [];
  projects = [];
  activeProjectIndex = 0; 

  isLoadingTransactions : Boolean = false;

  swipeOptions = {
    effect: "coverflow", 
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false
    },
  }

  constructor(
    public navCtrl: NavController,
    private api : ApiService,
    public util: UtilService,
    private auth: AuthService, 
    private modalCtrl : ModalController
  ) { }

  ngOnInit() {

    this.getProjects();
    this.getTransactions();
    
  }

  slideChanged(slides: Slides){
    
    this.activeProjectIndex = slides.getActiveIndex(); 
    if (this.activeProjectIndex <= this.projects.length-1){
      let projectId = this.projects[this.activeProjectIndex].projectId; 
      if (projectId){
        this.getTransactions(projectId);
      }else{
        this.getTransactions();
      }
    }

    
  }

   editExpenseItem(exp: Transaction){

      let addModal =  this.modalCtrl.create('TransactionEditPage', { "transaction" : exp},
      {
        cssClass : "transaction-edit-modal",
        enableBackdropDismiss: true
      })
  
      addModal.onDidDismiss(res => {
        if (res){

          this.api.saveTransaction(res).then(response => {

            let projectId = this.projects[this.activeProjectIndex].projectId; 
            this.getTransactions(projectId);

          }).catch(err =>{
            this.api.handleAPIError(err);
          });

        }
      })
  
      addModal.present(); 


  }

  getProjects(){
    const params = new HttpParams().set('aggregates', "true");

    this.api.getProjects(params).subscribe( 
      (data : any) => {

        try{
            this.projects.length = 0; 

            let total = new Project({
                projectTitle : "All",
                sumTransactionsEur : 0
            });
 
            
            data.forEach(element => {

              let project = new Project(element)

              this.projects.push(project);

              total.sumTransactionsEur += parseFloat(project.sumTransactionsEur.toString());
            
          });

          this.projects.unshift(total);
        
        }
        catch(err){
          console.log(err);
        } 

      },
      error => {
        this.api.handleAPIError(error);
      }
    )
  }

  getTransactions(projectId?){

    this.isLoadingTransactions = true;

    this.api.getTransactions(projectId)
    .subscribe(
      (data : any) => {

        try{
            this.transactions.length = 0; 
            
            data.forEach(element => {

              let t = new Transaction(element)

              this.transactions.push(t);
            
          });

          this.isLoadingTransactions = false;
        
        }
        catch(err){
          console.log(err);
        } 

      },
      error => {
        this.api.handleAPIError(error);
      }
    )
  }

  goToProjectAnalysis(project : Project){

    this.navCtrl.push('AnalysisPage', {
      projectId : project.projectId
    });

  }

}
