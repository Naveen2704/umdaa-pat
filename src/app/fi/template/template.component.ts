import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormControl, FormGroupDirective, FormGroup } from '@angular/forms';
import { FiService } from '../fi.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  TemplateForm:FormGroup;
  ArrayListTemp: any;
  temp_obj: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data,private _dialogRef:MatDialogRef<TemplateComponent>,private _fb:FormBuilder,private _service :FiService,private _notification:NotificationService) { 
    console.log(data)
    this.ArrayListTemp = data.drugListArray
    this.temp_obj = data.package
    console.log(this.temp_obj)
  }
  close(){
    this._dialogRef.close();
  }
  ngOnInit() {
    this.TemplateForm= this._fb.group({
      tempname:new FormControl('')
    })
  }

  saveTemp(value,formDirective:FormGroupDirective){
    formDirective.resetForm();
    console.log(localStorage.getItem('latestUrl'));
    localStorage.getItem('latestUrl').includes("version2");
    if(localStorage.getItem('latestUrl').includes("version2") === true)
    {
      this._service.saveTempp(value,this.ArrayListTemp,this.temp_obj).subscribe(result =>{
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
    this._service.saveTemp(value,this.ArrayListTemp,this.temp_obj).subscribe(result =>{
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
