import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { FuService } from './fu.service';
import { MatSelectChange, MatOption, MatDialog } from '@angular/material';
import { FudailogComponent } from './fudailog/fudailog.component';
import { FudataComponent } from './fudata/fudata.component';
import { PatientserviceService } from '../service/patientservice.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';
import { AddChartsComponent } from './add-charts/add-charts.component';
import * as introJs from 'intro.js/intro.js';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
interface obj {
  template_id: string;
  template_name: string;
  department_id:string;
  is_checked:number;

}

@Component({
  selector: 'app-followup',
  templateUrl: './followup.component.html',
  styleUrls: ['./followup.component.css']
})

export class FollowupComponent implements OnInit {
  introJS = introJs();
  toppings = new FormControl();
  toppingList: any=[]
  templatename:string;
  templateList: any[];
  FuForm: FormGroup;
  template_id: any;
  templateList_ids:string;
  temprows: any=[];
  tempcolmns: any=[];
  latestcolumn: number;
  fi_Obj: any;
  visitinfo: any=[];
  popUpData: any=[];
  temp_id: any=[];
  temp_ids: any;
  arrayList: any=[];
  checkedList: any=[];
  isChecked: any;
  
  
  selectedObjects : obj[];
  roleid: any;
  rowData: any;
  columnTitle: any=[];
  BMI: any=[];
  BSA: any=[];
  PR: any=[];
  RR: any=[];
  SaO2: any=[];
  whRatioList: any=[];
  BP: any=[];
  Temp: any=[];
  names: any;
  unique: unknown[];
  SBP: any=[];
  DBP: any=[];
  disabled: boolean = false;
  
  //temprowdata: any=[];


  constructor(private _dialog:MatDialog,private users: UsersService,private route: ActivatedRoute,private service: PatientserviceService,private dailog: MatDialog,private fuservice:FuService ,private _fb :FormBuilder) { }

  ngOnInit() {

    this.FuForm = this._fb.group({
      templatename: new FormControl(''),
    });
    this.route.params.subscribe(params => {

      let productid = params['id'];
     this.service.GetPatient(productid).subscribe(data =>{
      //console.log(data)
      this.roleid = params['id1'];
      let roleId = params['id1'];
      this.users.roleId(roleId);


      this.fi_Obj = data.result['parameters'][0];
      if(data.result['parameters'][0].status == 'closed'){
        this.disabled = true;
      }
      this.getList(this.fi_Obj);
     })
  });
   
  }
  help(){
    this.introJS.start();
    
  }
  getList(fi_obj) {
    
    this.fuservice.Getfutemplates(this.fi_Obj).subscribe((data)=>{
     console.log(data.result);
      // console.log(data.result.template_list);
      for(var i=0;i<data.result.template_list.length;i++)
      {
          if(data.result.template_list[i].is_checked == '1')
          {
              this.checkedList.push(data.result.template_list[i]);
              console.log(this.checkedList);
              // console.log(data.result.template_list);
             this.isChecked = this.checkedList
            
             //console.log (this.isChecked);
          }
      this.comparer(data.result.template_list,this.checkedList)
      }
          
       this.toppingList = data.result.template_list;
      this.tempcolmns = data['result']['follow_up_columns']
     this.temprows = data['result']['follow_up_rows'];
     
     //console.log(this.temprows.length);
     console.log(this.temprows)
     if(this.temprows != null && this.temprows.length>0){

      for(var k=0;k<=this.temprows.length-1;k++)
      {
        for(var a=0;a<=this.temprows[k].row_data.length-1;a++)
        {
            if(this.temprows[k].row_data[a].title == "Visit Date"){
            for(var j=1; j<=this.temprows[k].row_data.length-1; j++){
              console.log(this.temprows[k].row_data[j].title)
              // if (this.temprows[k].row_data[j].title.indexOf(this.temprows[k].row_data[j].title) == -1) {
            // var filterMainSection= this.columnTitle.filter((x)=>x.id === this.temprows[k].row_data[j].title);
            // console.log(filterMainSection);
            // if(filterMainSection == '')
            // {
              this.columnTitle.push(this.temprows[k].row_data[j].title);
              console.log(this.columnTitle);
              this.unique = [...new Set( this.columnTitle)];
              console.log(this.unique); 
          
              // console.log(this.columnTitle);
              // this.names  =  this.columnTitle
              // let x = ( this.columnTitle) =>  this.columnTitle .filter((v,i) => this.columnTitle.indexOf(v) === i)
              // this.columnTitle.push(x)
              // let x = (this.temprows[k].row_data[j].title) => this.temprows[k].row_data[j].title.filter((v,i) => this.temprows[k].row_data[j].title.indexOf(v) === i)
              // this.columnTitle.push(x)
              // console.log(this.columnTitle);
              }
            // }
        }

        if(this.temprows[k].row_data[a].title == "BMI"){
          for(var j=1; j<=this.temprows[k].row_data.length-1; j++){
            this.BMI.push(this.temprows[k].row_data[j].title)
            console.log(this.BMI);
          }
      }
      if(this.temprows[k].row_data[a].title == "BSA"){
        for(var j=1; j<=this.temprows[k].row_data.length-1; j++){
          this.BSA.push(this.temprows[k].row_data[j].title)
          console.log(this.BSA);
        }
    }
    if(this.temprows[k].row_data[a].title == "PR"){
      for(var j=1; j<=this.temprows[k].row_data.length-1; j++){
        this.PR.push(this.temprows[k].row_data[j].title)
        console.log(this.PR);
      }
  }
  if(this.temprows[k].row_data[a].title == "RR"){
    for(var j=1; j<=this.temprows[k].row_data.length-1; j++){
      this.RR.push(this.temprows[k].row_data[j].title)
      console.log(this.RR);
    }
  }
    if(this.temprows[k].row_data[a].title == "SaO2"){
      for(var j=1; j<=this.temprows[k].row_data.length-1; j++){
        this.SaO2.push(this.temprows[k].row_data[j].title)
        console.log(this.SaO2);
      }
}
if(this.temprows[k].row_data[a].title == "Temp"){
  for(var j=1; j<=this.temprows[k].row_data.length-1; j++){
    this.Temp.push(this.temprows[k].row_data[j].title)
    console.log(this.Temp);
  }
}

    
if(this.temprows[k].row_data[a].title == "WH Ratio"){
  for(var j=1; j<=this.temprows[k].row_data.length-1; j++){
    this.whRatioList.push(this.temprows[k].row_data[j].title)
    console.log(this.whRatioList);
  }
}
    
if(this.temprows[k].row_data[a].title == "BP"){
  
  for(var j=1; j<=this.temprows[k].row_data.length-1; j++){
    console.log(this.temprows[k].row_data[j].title)
    console.log(this.temprows[k].row_data[j].title.split('/'))
    this.SBP.push(this.temprows[k].row_data[j].title.split('/')[0])
    this.DBP.push(this.temprows[k].row_data[j].title.split('/')[1])
    console.log(this.BP);
  }
}


      
      // var  columnName = this.temprows[0].row_data[0].title;
      // console.log(columnName);
      // console.log(this.temprows[0].row_data.length);
      // for(var i=1;i<=this.temprows[0].row_data.length-1;i++)
      // {
      //   console.log(this.temprows[0].row_data[i]);
      //     this.columnTitle.push(this.temprows[0].row_data[i].title);
      //     console.log(this.columnTitle);
      // }

      //  let DateList =[]
      //  for(var k=0;k<this.temprows.length-1;k++){
      //    this.rowData = this.temprows[k].row_data;
      //    console.log(this.rowData);
      //   //  if(this.rowData != null && this.rowData.length>0){
      //   //   console.log(this.rowData[0].title)
      //   //   if(this.rowData[0].title == "Visit Date"){
      //   //     console.log(this.rowData.length)
      //   //     for(let j=1; j<this.rowData.length; j++){
      //   //       DateList.push(this.rowData[j].title)
      //   //       console.log( DateList.push(this.rowData[j].title))
      //   //     }
      //   //   }
      //   // }
      //  }
    }
    }
      
      //  console.log(DateList)
     }
     this.latestcolumn = this.temprows[0].row_data.length-1
     this.visitinfo = data['result']['visits_info'];
     this.temp_id = data['result']['added_templete_ids']
    //  this.popUpData = this.visitinfo[res['result']['visits_info'].length-1];
    })
  
    
  }
  openCharts(){
    this._dialog.open(AddChartsComponent,{
      panelClass:['Vitals_css'],
      data:{
        dateList:this.unique,
        prList:this.PR,
        BMI: this.BMI,
        BSA: this.BSA,
        RR: this.RR,
        SaO2:this.SaO2,
        Temp:this.Temp,
        whRatioList:this.whRatioList,
        SBP:this.SBP,
        DBP:this.DBP
      }
      
    });
  }
  comparer(o1,o2): boolean {
    console.log(o1)
    console.log(o2)
    // if possible compare by object's name, and not by reference.
    return o1 && o2 ? o1 == o2.template_id : o2 ==o2 ;
  }
 Fusubmit(data){
 // console.log(data)
  const elements = data.templatename
 // console.log(elements)
  var str = elements.join(',')
  console.log(str)
  this.templateList_ids = '"'+str+'"'
//  console.log(this.templateList_ids)
  this.getfudata(str)
  
  // for(let i = 0; i < this.temp_id.length;i++){
  //   this.temp_ids = this.temp_id[i].template_id
  //   console.log(this.temp_ids)
  // }
  // if(str == this.temp_ids){
  //   this.getList(this.fi_Obj)
  // }else{
  //   this.getfudata(str)
  // }
  
 }

 getfudata(id){

  this.fuservice.Getfutemplates(this.fi_Obj).subscribe((data)=>{
    console.log(data); 
   //  console.log(data.result.template_list);

  

   this.fuservice.Getfudata(this.fi_Obj,id).subscribe((res)=>
   {
  console.log(res)
  //   console.log(res['result']['follow_up_rows']);
     this.tempcolmns = res['result']['follow_up_columns']
     this.temprows = res['result']['follow_up_rows'];
     if(this.temprows != null && this.temprows.length>0){

      for(var k=0;k<=this.temprows.length-1;k++)
      {
        for(var a=0;a<=this.temprows[k].row_data.length-1;a++)
        {
            if(this.temprows[k].row_data[a].title == "Visit Date"){
            // for(var j=1; j<=this.temprows[k].row_data.length-1; j++){
            //   var filterrr = this.columnTitle.filter((item)=>item[0]  === this.temprows[k].row_data[j].title);
            //   if(filterrr == '')
            //   {
            //   this.columnTitle.push(this.temprows[k].row_data[j].title)
            //   console.log(this.columnTitle);
            //   }
            // }
        }

//         if(this.temprows[k].row_data[a].title == "BMI"){
//           for(var j=1; j<=this.temprows[k].row_data.length-1; j++){
//             this.BMI.push(this.temprows[k].row_data[j].title)
//             console.log(this.BMI);
//           }
//       }
//       if(this.temprows[k].row_data[a].title == "BSA"){
//         for(var j=1; j<=this.temprows[k].row_data.length-1; j++){
//           this.BSA.push(this.temprows[k].row_data[j].title)
//           console.log(this.BSA);
//         }
//     }
//     if(this.temprows[k].row_data[a].title == "PR"){
//       for(var j=1; j<=this.temprows[k].row_data.length-1; j++){
//         this.PR.push(this.temprows[k].row_data[j].title)
//         console.log(this.PR);
//       }
//   }
//   if(this.temprows[k].row_data[a].title == "RR"){
//     for(var j=1; j<=this.temprows[k].row_data.length-1; j++){
//       this.RR.push(this.temprows[k].row_data[j].title)
//       console.log(this.RR);
//     }
//   }
//     if(this.temprows[k].row_data[a].title == "SaO2"){
//       for(var j=1; j<=this.temprows[k].row_data.length-1; j++){
//         this.SaO2.push(this.temprows[k].row_data[j].title)
//         console.log(this.SaO2);
//       }
// }
// if(this.temprows[k].row_data[a].title == "Temp"){
//   for(var j=1; j<=this.temprows[k].row_data.length-1; j++){
//     this.Temp.push(this.temprows[k].row_data[j].title)
//     console.log(this.Temp);
//   }
// }

    
// if(this.temprows[k].row_data[a].title == "WH Ratio"){
//   for(var j=1; j<=this.temprows[k].row_data.length-1; j++){
//     this.whRatioList.push(this.temprows[k].row_data[j].title)
//     console.log(this.whRatioList);
//   }
// }
    
// if(this.temprows[k].row_data[a].title == "BP"){
//   for(var j=1; j<=this.temprows[k].row_data.length-1; j++){
//     this.BP.push(this.temprows[k].row_data[j].title)
//     console.log(this.BP);
//   }
// }


      
      // var  columnName = this.temprows[0].row_data[0].title;
      // console.log(columnName);
      // console.log(this.temprows[0].row_data.length);
      // for(var i=1;i<=this.temprows[0].row_data.length-1;i++)
      // {
      //   console.log(this.temprows[0].row_data[i]);
      //     this.columnTitle.push(this.temprows[0].row_data[i].title);
      //     console.log(this.columnTitle);
      // }

      //  let DateList =[]
      //  for(var k=0;k<this.temprows.length-1;k++){
      //    this.rowData = this.temprows[k].row_data;
      //    console.log(this.rowData);
      //   //  if(this.rowData != null && this.rowData.length>0){
      //   //   console.log(this.rowData[0].title)
      //   //   if(this.rowData[0].title == "Visit Date"){
      //   //     console.log(this.rowData.length)
      //   //     for(let j=1; j<this.rowData.length; j++){
      //   //       DateList.push(this.rowData[j].title)
      //   //       console.log( DateList.push(this.rowData[j].title))
      //   //     }
      //   //   }
      //   // }
      //  }
    }
    }
      
      //  console.log(DateList)
     }
     this.visitinfo = res['result']['visits_info'];
     this.popUpData = this.visitinfo[res['result']['visits_info'].length-1];
    //  console.log(this.popUpData);
    //  console.log(this.temprows[0].row_data.length-1)
     this.latestcolumn = this.temprows[0].row_data.length-1;
     
    //console.log(this.temp_id)
  })
 })
 }
 openFi(id){
   if(id == this.latestcolumn){
    return this.dailog.open(FudailogComponent,
      {
       
        disableClose:true,
        panelClass:['fu-dailog'],
        data:{
          package:this.fi_Obj,
          id:this.roleid
    
        }
      }
      );
   }
 
 }
 openemptyrow(id){
   console.log(this.visitinfo)
  if(id == this.latestcolumn){
    return this.dailog.open(FudataComponent,
      {
       
        disableClose:true,
        panelClass:['fu-dailog'],
        data:{
          package:this.fi_Obj,
          visit:this.visitinfo
        }
      }).afterClosed().subscribe((res)=>{
         this.getList(this.fi_Obj)
      });
   }
 }
}
