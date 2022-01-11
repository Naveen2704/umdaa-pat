import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormControl, FormGroupDirective } from '@angular/forms';
import { FiService } from '../fi.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-invedittemp',
  templateUrl: './invedittemp.component.html',
  styleUrls: ['./invedittemp.component.css']
})
export class InvedittempComponent implements OnInit {
  ArrayListTemp: any;
  TemplateinvForm: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data,private _dialogRef:MatDialogRef<InvedittempComponent>,private _fb:FormBuilder,private _service :FiService,private _notification:NotificationService) { 
    console.log(data)
    this.ArrayListTemp = data;

  }

  ngOnInit() {
    this.TemplateinvForm= this._fb.group({
      tempinvname:new FormControl(''),
      tempinv_id:new FormControl('')
    })
  }
  close(){
    this._dialogRef.close();
  }
  EditTemp(data,formDirective: FormGroupDirective){
    console.log(data)
    this._service.EditInvTemp(data).subscribe((res) => {
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
