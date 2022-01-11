import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { FuService } from '../fu.service';

@Component({
  selector: 'app-fudata',
  templateUrl: './fudata.component.html',
  styleUrls: ['./fudata.component.css']
})
export class FudataComponent implements OnInit {
  fuForm: any;
  obj: any=[];
  visit_info: any;
  popUpData: any;
  paramDetailsForm: FormGroup;
  clinicalParams: any=[];
  clinicalname: any;
  labParams: any;
  labForm: FormGroup;
  Compliance: any;
  comDetails: any=[];
  labClinicDetails: any=[];
  date: any;
  clinicParamDetails: any=[];
  labParamDetails: any=[];

  constructor(private fuservice:FuService,@Inject(MAT_DIALOG_DATA) public data,private _dialogRef:MatDialogRef<FudataComponent>,private _fb:FormBuilder) 
  { 
    this.obj = data.package;
    this.visit_info = data.visit;


    console.log(this.visit_info)
    this.popUpData = this.visit_info[this.visit_info.length-1];
    this.clinicalParams = this.popUpData['Clinical_params']?this.popUpData['Clinical_params']:'No Data';
    console.log(this.clinicalParams)
    this.labParams = this.popUpData['Lab_parameters']?this.popUpData['Lab_parameters']:'No Data';
    console.log(this.labParams)
    this.Compliance = this.popUpData['Compliance']
    console.log(this.Compliance )
    console.log( this.popUpData.date);
    this.date = this.popUpData.date
  }

  ngOnInit() {
 
    this.createform(); 
    //this.labform()
  
  }


  createform()    
  {  
       if(this.clinicalParams.length != undefined && this.labParams.length != undefined)
       {
        console.log(this.clinicalParams);
        let arr=[];  
        if(this.clinicalParams != 'No Data') 
        {
          for(let i=0;i< this.clinicalParams.length;i++)    
          {       
            arr.push(this.BuildFormDynamic(this.clinicalParams [i]))    
               
          }  
        } 
      
     
        let arra=[]; 
        if(this.labParams != 'No Data') 
        {  
        for(let j=0;j< this.labParams.length;j++)    
        {       
          arra.push(this.BuildFormDynamic(this.labParams[j]))    
             
        }  
      }
   
        let array=[];    
        for(let k=0;k< this.Compliance.length;k++)    
        {       
          array.push(this.BuildFormDynamic(this.Compliance[k]))    
             
        } 
          this.paramDetailsForm =  this._fb.group({    
            ClassDetails:this._fb.array(arr),
            LabDetails:this._fb.array(arra), 
            ComplinceDetails:this._fb.array(array)  
          }) 
         }
     
  }  

  BuildFormDynamic(product):FormGroup{    
    console.log(product.param);
    return this._fb.group({    
           param:[product.param],    
          param_id:[product.param_id],    
          value:[product.value]
     })    
   }    

  close(){
    this._dialogRef.close();
  }


  SaveData()    
  {    
     console.log(this.paramDetailsForm.value);
    console.log(this.paramDetailsForm.value.ClassDetails);
    console.log(this.paramDetailsForm.value.LabDetails);
    console.log(this.paramDetailsForm.value.ComplinceDetails);

    this.comDetails = this.paramDetailsForm.value.ComplinceDetails;
    for(var a=0;a<this.paramDetailsForm.value.ClassDetails.length;a++)
    {
      if(this.paramDetailsForm.value.ClassDetails[a].value != '')
      {
        this.clinicParamDetails = this.paramDetailsForm.value.ClassDetails;
        console.log( this.clinicParamDetails);
      }
    }
    for(var b=0;b<this.paramDetailsForm.value.LabDetails.length;b++)
    {
      if(this.paramDetailsForm.value.LabDetails[b].value != '')
      {
        this.labParamDetails = this.paramDetailsForm.value.LabDetails;
        console.log( this.labParamDetails);
      }
    }
 
      this.labClinicDetails =  this.clinicParamDetails.concat(this.labParamDetails);

      this.fuservice.getaddpopupdata(this.date,this.comDetails,this.labClinicDetails,this.obj).subscribe((res)=>{
      console.log(res);
      if(res['code'] == '200'){
       // this.fuForm.reset();
        this.close()
      }
    })

      
  }

}
