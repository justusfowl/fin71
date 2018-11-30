import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../auth/auth.service';
import { ConfigService } from '../config/config.service';

import { Transaction } from '../../models/transaction';
import { Type } from '../../models/type';
import { Project } from '../../models/project';

@Injectable()
export class ApiService {

  private url: string;

  constructor(
    public http: HttpClient, 
    public config: ConfigService, 
    private auth: AuthService
  ) { 
    this.url = this.config.getAPIBase();
  }

  saveTransaction(t : Transaction){
    return new Promise((resolve, reject) => {

      this.http.post(this.url + "/projects/" + t.projectId + "/transaction", t).subscribe(
        (data : any) => {
          resolve(data)
        },
        error => {
          reject(error);
        }
      )
    });

  }

  getTransactions(projectId?){

    let endPoint; 

    if (projectId){
      endPoint = this.url + "/transactions/" +  projectId
    }else{
      endPoint = this.url + "/transactions"
    }
  
    return this.http.get(endPoint);

  }

  getProjects(queryParams? : HttpParams){

    if (!queryParams){
      queryParams = new HttpParams();
    }

    let userId = this.auth.userId; 
  
    return this.http.get(this.url + "/projects", {params: queryParams});
  }

  saveProject(project: Project){
    
    return new Promise((resolve, reject) => {

      this.http.post(this.url + "/projects", project).subscribe(
        (data : any) => {
  
          resolve(data)
  
        },
        error => {
          reject(error);
        }
      )
    });
  }

  getTypes(){

    let userId = this.auth.userId; 
  
    return this.http.get(this.url + "/types");

  }

  upsertType(t : Type){
    return this.http.post(this.url + "/types", t)
  }

  removeType(t: Type){
    return this.http.delete(this.url + "/types/" + t.typeId)
  }

  

  getUserSearch(userSearch : string){
  
    return this.http.get(this.url + "/users/search?userSearch=" + userSearch);

  }

  convertAmount(origAmount, origCurrency: string){

    let queryParams = new HttpParams().set("origAmount",origAmount).set("origCurrency",origCurrency)
    
    return new Promise((resolve, reject) => {
      try{
        this.http.get(this.url + "/convert", {params: queryParams}).subscribe(
          (data : any) => {
    
            resolve(data)
    
          },
          error => {
            reject(error);
          }
        )
      }catch(err){
        reject(new Error("Error in getting convertAmount"));
      }
      
  });
  }

  getAnalysisTypes(projectId : number){

    let testData1 = [
      {"time":"Mar 2017","type":"Halobacillus halophilus","sumTransactionsEur":"7.76","err":"0.08072307587277215"},
      {"time":"Mar 2017","type":"Bacillus subtilis","sumTransactionsEur":"2.634","err":"0.08072307587277217"},
      {"time":"Mar 2017","type":"Pseudomonas fluorescens","sumTransactionsEur":"464.5636","err":"0.08072307587277215"},
      {"time":"Mar 2017","type":"Pseudoalteromonas SM9913","sumTransactionsEur":"57.917","err":"0.08072307587277215"},
      {"time":"Mar 2017","type":"Escherichia coli","sumTransactionsEur":"932.4","err":"0.0807230758727722"}]


    return new Promise((resolve, reject) => {
        try{
          this.http.get(this.url + "/projects/" + projectId + "/analysis/typeTotals").subscribe(
            (data : any) => {
      
              resolve(data)
      
            },
            error => {
              reject(error);
            }
          )
          
        }catch(err){
          reject(new Error("Error in getting currencies"));
        }
        
    });
  }

  getAnalysisSaldo(projectId : number){


    let sankeyData = [
      {"source":"Uli","target":"Becci","value":"41.457"},
      {"source":"Uli","target":"Tim","value":"5.254"},
      {"source":"Lara","target":"Tim","value":"10"},
      {"source":"Tim","target":"Ina","value":"5"}
      ]


    return new Promise((resolve, reject) => {
        try{

          this.http.get(this.url + "/projects/" + projectId + "/analysis/saldo").subscribe(
            (data : any) => {
      
              resolve(data)
      
            },
            error => {
              reject(error);
            }
          )
          
        }catch(err){
          reject(err);
        }
        
    });
  }

  getCurrencies(){

    // TODO: Put this into the database with IDs to get conversion right

    let curr = [
      { 
        "currId" : 1,
        "val" : "EUR", 
        "symbol" : "€"
      },
      {
        "currId" : 2,
        "val" : "USD", 
        "symbol" : "US$"
      },
      {
        "currId" : 3,
        "val" : "AUD", 
        "symbol" : "AU$"
      },
      {
        "currId" : 4,
        "val" : "GBP", 
        "symbol" : "£"
      },
      {
        "currId" : 5,
        "val" : "CHF", 
        "symbol" : "CHF"
      },
      {
        "currId" : 6,
        "val" : "CLP", 
        "symbol" : "CL$"
      }
    ]

    return new Promise((resolve, reject) => {
        try{
          resolve(curr)
        }catch(err){
          reject(new Error("Error in getting currencies"));
        }
        
    });
  }

  handleAPIError(error){

    console.log("Error in API call")
    console.log(JSON.stringify(error));

    let errorCode = error.status;

    switch (errorCode) {
        case 401:
          console.log("Unauthorized");
            break;
    }
  }


}
