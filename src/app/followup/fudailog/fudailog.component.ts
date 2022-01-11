import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { FuService } from '../fu.service';

@Component({
  selector: 'app-fudailog',
  templateUrl: './fudailog.component.html',
  styleUrls: ['./fudailog.component.css']
})
export class FudailogComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name'];
  displayedColumns_in :string[] = ['position', 'name'];
  displayedColumns_pr: string[] = ['position', 'name', 'weight', 'symbol','qty'];
  cd: any=[];
  in: any=[];
  pr: any=[];
  nextfudate: any;
  plan: any;
  obj: any;
  appointment_id: any;
  roleid: any;
  constructor(private fuservice:FuService,@Inject(MAT_DIALOG_DATA) public data,private _dialogRef:MatDialogRef<FudailogComponent>,private router: Router) 
  {
    this.obj = data.package;
    console.log(this.obj.appointment_id)
    this.appointment_id = this.obj.appointment_id
    this.roleid = data.id
   }

  ngOnInit() {
    this.getfidata()
  }
  close(){
    this._dialogRef.close();
  }
  openRoute(){
    this.router.navigate(['/Fi/'+this.appointment_id+'/'+this.roleid]);
    this.close();
  }

  getfidata(){
    this.fuservice.getfidata(this.obj).subscribe((response)=>{
      console.log(response)
      this.cd = response.result.clinicaldiagnosis;
      this.in = response.result.investigation;
      this.pr = response.result.prescription
      this.nextfudate = response.result.follow_up_date
      this.plan = response.result.plan
    })
  }
}
