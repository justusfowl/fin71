import { Component, OnInit, SimpleChanges } from '@angular/core';

import { D3Service, D3 } from 'd3-ng2-service';
import { UtilService, ApiService } from '../../providers/services';
import { NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage({
  name : "AnalysisPage",
  segment: "analysis/:projectId"
})

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.html'
})
export class AnalysisPage implements OnInit {

  projectId : number; 

  donutConfig : any;  
  stackedConfig : any; 
  sankeyConfig : any;   

  donutData: any[] = []

  testData1: any[] = [
    {"time":"Mar 2017","type":"Halobacillus halophilus","sumTransactionsEur":"7.76","err":"0.08072307587277215"},
    {"time":"Mar 2017","type":"Bacillus subtilis","sumTransactionsEur":"2.634","err":"0.08072307587277217"},
    {"time":"Mar 2017","type":"Pseudomonas fluorescens","sumTransactionsEur":"464.5636","err":"0.08072307587277215"},
    {"time":"Mar 2017","type":"Pseudoalteromonas SM9913","sumTransactionsEur":"57.917","err":"0.08072307587277215"},
    {"time":"Mar 2017","type":"Escherichia coli","sumTransactionsEur":"932.4","err":"0.0807230758727722"}]

  testData2: any[] = [
      {"time":"Mar 2017","type":"Halobacillus halophilus","sumTransactionsEur":"251.76","err":"0.08072307587277215"},
      {"time":"Mar 2017","type":"Bacillus subtilis","sumTransactionsEur":"27.634","err":"0.08072307587277217"},
      {"time":"Mar 2017","type":"Pseudomonas fluorescens","sumTransactionsEur":"44.5636","err":"0.08072307587277215"},
      {"time":"Mar 2017","type":"Pseudoalteromonas SM9913","sumTransactionsEur":"5.917","err":"0.08072307587277215"},
      {"time":"Mar 2017","type":"Escherichia coli","sumTransactionsEur":"92.4","err":"0.0807230758727722"}]


    testDataStacked = 
    [
      {"time":"Mar 2017", "project" : "praxis", "type":"hilus","sumTransactionsEur":"251.76"},
      {"time":"Mar 2017", "project" : "praxis", "type":"Bacillus subtilis","sumTransactionsEur":"27.634"},
      {"time":"Mar 2017", "project" : "praxis", "type":"Pseudomonas fluorescens","sumTransactionsEur":"44.5636"},
      {"time":"Mar 2017", "project" : "praxis", "type":"Pseudoalteromonas SM9913","sumTransactionsEur":"5.917"},
      {"time":"Mar 2017", "project" : "praxis", "type":"Escherichia coli","sumTransactionsEur":"92.4"},
      
      {"time":"Apr 2017","project" : "praxis", "type":"hilus","sumTransactionsEur":"51.76"},
      {"time":"Apr 2017","project" : "praxis", "type":"Bacillus subtilis","sumTransactionsEur":"2.64"},
      {"time":"Apr 2017","project" : "praxis", "type":"Pseudomonas fluorescens","sumTransactionsEur":"44.56"},
      {"time":"Apr 2017","project" : "praxis", "type":"Pseudoalteromonas SM9913","sumTransactionsEur":"59.17"},
      {"time":"Apr 2017","project" : "praxis", "type":"Escherichia coli","sumTransactionsEur":"924"},
    ]

  sankeyData = []

  colors = [ "#121E5B",  "#B8D8D8", "#62BBC1", "#989aa2", "#4F6367", "#989aa2", "#f4f5f8"]

  private d3: D3;

  constructor(
    public params: NavParams,
    d3Service: D3Service, 
    public util: UtilService,
    private api: ApiService,
    private translate: TranslateService

  ) { 
    this.d3 = d3Service.getD3();
    
    let projectId = this.params.get('projectId');
    this.projectId = projectId;
  }



  ngOnInit() {

    this.api.getAnalysisTypes(this.projectId).then((res : any) =>{
      this.donutData = res;
    })

    this.api.getAnalysisSaldo(this.projectId).then((res : any) =>{
      this.sankeyData = res;
    })




    

    this.projectId = this.params.get('projectId');  
    console.log("the projectId is: " + this.projectId);

    let height = window.innerHeight;
    let width = window.innerWidth;

    let CC = this.d3.scaleLinear()
      .domain([1, 20])
      .range([<any>'#121E5B', <any>'#989aa2'])
      .interpolate(<any>this.d3.interpolateHcl);

    this.donutConfig = {
      width: width, 
      height: height*0.5, 
      transTime : 750, 
      cornerRadius: 2, 
      padAngle : 0.15, 
      variable: "sumTransactionAmtEur", 
      category : "typeTitle",
      colors: this.colors,
      formatter : this.util
    }


    this.stackedConfig  = {
      width: window.innerWidth, 
      height: height*0.4,
      variable : "type",
      measure: "sumTransactionsEur", 
      colors: this.colors,
      formatter : this.util,
      maxBarWidth : 80

    }

    this.sankeyConfig = {
      width: window.innerWidth, 
      height: window.innerHeight,
      colors: this.colors,
      formatter : this.util
    }

      console.log(CC);

  }

  ionViewDidEnter() {

  }

  checkIsLandscape(){

    if (window.innerWidth > window.innerHeight){
      return true; 
    }else{
      return false; 
    }

  }

  initColumnChart(){
    
  }


  ngOnChangs(changes : SimpleChanges){
    console.log(changes);
  }

  handleTypeSelected(event){
    console.log("Event selected" + event)
  }

  testDataChange(){
    this.donutData = this.testData1;
    console.log("data changed")
  }

  testDataChange2(){
    this.donutData = this.testData2;
    console.log("data changed")
  }


}
