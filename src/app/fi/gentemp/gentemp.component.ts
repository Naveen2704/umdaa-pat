import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from 'src/app/shared/notification.service';
import { FiService } from '../fi.service';

@Component({
  selector: 'app-gentemp',
  templateUrl: './gentemp.component.html',
  styleUrls: ['./gentemp.component.css']
})
export class GentempComponent implements OnInit {
  TemplateForm: FormGroup;
  gi: any;
  obj: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data,private _dialogRef:MatDialogRef<GentempComponent>,private _fb:FormBuilder,private _service :FiService,private _notification:NotificationService) 
  { 
    this.gi = data.giname
    this.obj = data.obj
    console.log(this.gi, this.obj)
  }

  close(){
    this._dialogRef.close();
  }
  ngOnInit() {
    this.TemplateForm= this._fb.group({
      tempname:new FormControl('')
    })
  }
  saveTemp(data){
    console.log(data)
    this._service.Gitempsave(data,this.gi,this.obj).subscribe((res)=>{
      console.log(res)
      if(res['code'] == 200){
        this._notification.success(res.result);
        this. close()
      }
    })
  }
}
