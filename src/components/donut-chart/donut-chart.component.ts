import { Component, OnInit, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { D3Service, D3, Selection } from 'd3-ng2-service';
import { UtilService } from '../../providers/services';
import { TranslateService } from '@ngx-translate/core';

//var donutChart = require('../../../assets/js/donut.js');
declare var donutChart : any; 

@Component({
  selector: 'chart-donut',
  templateUrl: './donut-chart.component.html'
})
export class DonutChartComponent implements OnInit, OnChanges {

  @Input() donutConfig : any;

  @Input() data : any = [];

  @Output() typeSelected = new EventEmitter();

  donut : any; 

  private d3: D3;
  
  constructor(
    d3Service: D3Service, 
    public util: UtilService,
    private translate: TranslateService
  ) {
    this.d3 = d3Service.getD3();
  }

  ngOnInit() {

    let config = this.donutConfig; 

    config["handleTypeClicked"] = this.handleTypeClicked.bind(this); 
    config["translate"] = this.translate;

    this.donut = donutChart(config) as any;

    //this.donut = 
    this.d3.select('#donutChart').call(this.donut);

  }

  ngOnChanges(changes : SimpleChanges) {

    console.log(changes);

    this.data = changes.data.currentValue;

    if (this.donut){
      this.donut.data(this.data);
    }
    
    
  }


  handleTypeClicked(d){
    this.typeSelected.emit(d);
  }

}
