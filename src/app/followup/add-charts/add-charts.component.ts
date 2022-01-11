import { Component, OnInit, Inject } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartPoint } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-charts',
  templateUrl: './add-charts.component.html',
  styleUrls: ['./add-charts.component.css']
})
export class AddChartsComponent implements OnInit {
  DateList: any=[];
  public lineChartLabels: Label=[];
  Prlist: any=[];
  public lineChartData: ChartDataSets[] = [
    
  ]
  bmi: any;
  bsa: any;
  Rr: any;
  sao2: any;
  wh: any;
  bp: any;
  temp: any;
  sbp: any;
  dbp: any;
  constructor(@Inject(MAT_DIALOG_DATA) public result,private _dailogRef:MatDialogRef<AddChartsComponent>) 
  { 
    console.log(result)
   this.lineChartLabels = result.dateList
  
    console.log(this.lineChartLabels)
    this.Prlist = result.prList;
    this.bmi =  result.BMI;
    this.bsa = result.BSA;
    this.Rr = result.RR;
    this.sao2 = result.SaO2;
    this.temp = result.Temp;
    this.wh = result.whRatioList;
    this.sbp = result.SBP
    this.dbp = result.DBP
   
    this.lineChartData.push(
      { data: this.Prlist, label:'PR' },
      { data: this.bmi, label:'BMI' },
      { data: this.bsa, label:'BSA' },
      { data: this.Rr, label:'RR' },
      { data: this.sao2 , label:'SaO2' },
      { data: this.temp , label:'Temp' },
      { data: this.wh, label:'WH' },
      { data: this.sbp, label:'SBP' },
      { data: this.dbp, label:'DBP' }
      );
    console.log(this.Prlist)
  }

  ngOnInit() {
    
  }
  close(){
    this._dailogRef.close();
  }

 // lineChartLabels: Label[] = this.DateList;

  lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
}
