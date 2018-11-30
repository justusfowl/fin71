import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { D3Service, D3, Selection } from 'd3-ng2-service';

declare var createColumnChart : any; 

@Component({
  selector: 'chart-stacked-column',
  templateUrl: './stacked-column.component.html'
})
export class StackedColumnComponent implements OnInit {

  @Input() chartConfig : any;
  
  @Input() data : any = [];


  private d3: D3;

  constructor(
    d3Service: D3Service, 
  ) { 
    this.d3 = d3Service.getD3();
  }

  ngOnInit() {

    const chart = createColumnChart(this.d3.select('#stackedColumn'),  this.chartConfig, this.data);

    var parsedDataObj = chart.parseData(this.data);
    var data = parsedDataObj.data; 
    let valueKeys = parsedDataObj.valueKeys;

    chart.updateChart(data[Object.keys(data)[0]])

  }

}
