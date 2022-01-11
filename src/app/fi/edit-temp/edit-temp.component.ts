import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective } from '@angular/forms';
import { FiService } from '../fi.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-edit-temp',
  templateUrl: './edit-temp.component.html',
  styleUrls: ['./edit-temp.component.css']
})
export class EditTempComponent implements OnInit {

  TemplateForm:FormGroup;
  ArrayListTemp: any;


  constructor(@Inject(MAT_DIALOG_DATA) public data,private _dialogRef:MatDialogRef<EditTempComponent>,private _fb:FormBuilder,private _service :FiService,private _notification:NotificationService) { 
    console.log(data)
    this.ArrayListTemp = data;

  }
  close(){
    this._dialogRef.close();
  }
  ngOnInit() {
    this.TemplateForm= this._fb.group({
      tempname:new FormControl(''),
      temp_id:new FormControl('')
    })
  }
  EditTemp(data,formDirective: FormGroupDirective){
    console.log(data)
    this._service.EditTemp(data).subscribe((res) => {
      console.log(res)
      if(res['code'] == '200'){
        this._notification.success('Template Updated successfully');
        this.close();
      }
      else{
        this._notification.error('Template Updated failed')
      }
     
    })
  }
}
