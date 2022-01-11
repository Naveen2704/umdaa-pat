import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormControl, FormGroupDirective } from '@angular/forms';
import { FiService } from '../fi.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-invtemp',
  templateUrl: './invtemp.component.html',
  styleUrls: ['./invtemp.component.css']
})
export class InvtempComponent implements OnInit {
  TemplateFormInv: any;
  InvListTemp: any;
  temp_obj: any;
  urlCheck: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data,private _dialogRef:MatDialogRef<InvtempComponent>,private _fb:FormBuilder,private _service :FiService,private _notification:NotificationService) 
  {

    console.log(data)
    this.InvListTemp = data.InvListArray
    this.temp_obj = data.package
    console.log(this.temp_obj)
    console.log(this.InvListTemp);
   }

  close(){
    this._dialogRef.close();
  }
  ngOnInit() {
    this.TemplateFormInv= this._fb.group({
      tempname:new FormControl('')
    })
  }
  saveTemp(value,formDirective:FormGroupDirective){
    console.log(value);
    console.log(this.InvListTemp,this.temp_obj);
    console.log(localStorage.getItem('latestUrl'));
    localStorage.getItem('latestUrl').includes("version2");
    if(localStorage.getItem('latestUrl').includes("version2") === true)
    {
      formDirective.resetForm();
      this._service.saveinvtempp(value,this.InvListTemp,this.temp_obj).subscribe(result =>{
        console.log(result);
        if(result['code'] == '200'){
          this._notification.success('Template Added Successfully')
          this.close();
        }
        else{
          this._notification.success('Template Name already exists')
        }
      })
    }else{

    formDirective.resetForm();
    this._service.saveinvtemp(value,this.InvListTemp,this.temp_obj).subscribe(result =>{
      console.log(result);
      if(result['code'] == '200'){
        this._notification.success('Template Added Successfully')
        this.close();
      }
      else{
        this._notification.success('Template Name already exists')
      }
    })
          
  }
  }
}
