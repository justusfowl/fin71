import { Component, OnInit, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { D3Service, D3, Selection } from 'd3-ng2-service';
import { UtilService } from '../../providers/services';
import { TranslateService } from '@ngx-translate/core';

//var donutChart = require('../../../assets/js/donut.js');
declare var sankeyChart : any; 

@Component({
  selector: 'sankey-chart',
  templateUrl: './sankey.component.html'
})
export class SankeyChartComponent implements OnInit, OnChanges {

  @Input() sankeyConfig : any;

  @Input() data : any = [];

  @Output() typeSelected = new EventEmitter();

  chart : any; 

  private d3: any;
  

  constructor(
    d3Service: D3Service, 
    public util: UtilService,
    private translate : TranslateService
  ) {
    this.d3 = d3Service.getD3();
  }

  ngOnInit() {

    if (this.data.length > 0){
        this.drawSankey();
    }

  }

  ngOnChanges(changes : SimpleChanges) {
    
    console.log(changes);

    this.data = changes.data.currentValue;

    this.drawSankey();
    

  }



  drawSankey(){

    var config = this.sankeyConfig || {}; 

    var self = this;
    var units = "€";

    var margin = {top: 50, right: 10, bottom: 50, left: 10},
        width = (config.width || window.innerWidth) - margin.left - margin.right,
        height = (config.height || window.innerHeight) - margin.top - margin.bottom;

    var formatNumber = self.d3.format(",.2f"),    // zero decimal places
        format = function(d) { return formatNumber(d) + " " + units; }

    var colors = config.colors || self.d3.schemeCategory10;

    var color = self.d3.scaleOrdinal(colors);

    var container = self.d3.select("#sankeyChart").select("svg");

    container.remove(); 

    // append the svg canvas to the page
    var svg = self.d3.select("#sankeyChart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", 
            "translate(" + margin.left + "," + margin.top + ")");

    // Set the sankey diagram properties
    var sankey = sankeyChart()
        .nodeWidth(36)
        .nodePadding(10)
        .size([width, height]);

    var path = sankey.link();

    //set up graph in same style as original example but empty
    var graph = {"nodes" : [], "links" : []};

    this.data.forEach(function (d) {


        let sourceIndex = graph.nodes.findIndex(x => x.name == d.source);
        let targetIndex = graph.nodes.findIndex(x => x.name == d.target); 

        if (sourceIndex == -1 ){
            graph.nodes.push({ "name": d.source });
        }

        if (targetIndex == -1){
            graph.nodes.push({ "name": d.target });
        }

        graph.links.push({ "source": d.source,
                         "target": d.target,
                         "value": +d.value });
        
        
    });


    var nodeMap = {};
    graph.nodes.forEach(function(x) { nodeMap[x.name] = x; });

    graph.links = graph.links.map(function(x) {
      return {
        source: nodeMap[x.source],
        target: nodeMap[x.target],
        value: x.value
      };
    });

    var rectPos = {
        "payerX": null, 
        "receiverX" : null
    }

    sankey
        .nodes(graph.nodes)
        .links(graph.links)
        .layout(32);

    var link = svg.selectAll(".link")
        .data(graph.links)
        .enter()
        .append("g")
        .attr("class", "link");

    link.append("path")
        .attr("fill", "none")
        .attr("stroke", "#989aa266")
        .style("stroke-width", function(d) { return Math.max(1, d.dy); })
        .attr("d", path);
        
    link.append("text")
        .attr("font-family", "Arial, Helvetica, sans-serif")
        .attr("fill", "Black")
        .style("font", "normal 16px Arial")
        .attr("transform", function(d:any) {

            let y, x;

            y = (((d.sy+d.source.y)+(d.ty + d.target.y))/2)+(d.dy/2);

            x = (d.target.x-d.source.dx)/2;

            let xOld = ((d.source.x + d.target.x)/2);
            let yOld = ((d.dy/1.9)+d.sy+(d.source.y)); 
        
            var u = "translate(" + xOld + "," + y + ")";
                    
            return u;
                
        })   
        //.attr("dy", ".35em")
        .attr("text-anchor", "left")
        .text(function(d) {
            return format(d.value);
        });

    // add in the nodes
    var node = svg.append("g").selectAll(".node")
        .data(graph.nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d:any) { 

            if (rectPos.payerX == null){
                rectPos.payerX = d.x;
            }else{
                if (rectPos.payerX != d.x){
                    rectPos.receiverX = d.x;
                }
            }

            return "translate(" + d.x + "," + d.y + ")"; });

    // add the rectangles for the nodes
    node.append("rect")
        .attr("height", function(d:any) { return d.dy; })
        .attr("width", sankey.nodeWidth())
        .style("fill", function(d:any) { 
            return d.color = color(d.name.replace(/ .*/, "")); })
        .style("stroke", <any>function(d:any) { 
            return self.d3.rgb(d.color).darker(2); })
        .append("title")
        .text(function(d:any) { 
            return d.name + "\n" + format(d.value); });

    // add in the title for the nodes
    node.append("text")
        .attr("x", -6)
        .attr("y", function(d:any) { return d.dy / 2; })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("transform", null)
        .text(function(d:any) { return d.name; })
        .filter(function(d:any) { return d.x < width / 2; })
        .attr("x", 6 + sankey.nodeWidth())
        .attr("text-anchor", "start");
    
    if (graph.nodes.length > 0){

        svg.append("g")
        .attr("class","legend")
        .attr("transform","translate("+ (width/2 ) + "," + (height+20) + ")")
        .style("font-size","12px")
        .append("text")
        .attr("text-anchor", "middle")
        .text(this.translate.instant("PAYER_DESC") +  " → " + this.translate.instant("RECEIVER_DESC"));
    }
    
  }


}
