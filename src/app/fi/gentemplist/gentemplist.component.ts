import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FiService } from '../fi.service';

@Component({
  selector: 'app-gentemplist',
  templateUrl: './gentemplist.component.html',
  styleUrls: ['./gentemplist.component.css']
})
export class GentemplistComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'add',];
  obj: any;
  tempList: any=[];
  tempname: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data,private dailog:MatDialog,private _dialogRef:MatDialogRef<GentemplistComponent>,private _service:FiService)
   { 
     this.obj = data
     console.log(this.obj)
   }

  ngOnInit() {
   this.getTemplist()
  }
  close(){
    this._dialogRef.close();
  }
  add(){
    this._dialogRef.close({event:this.tempname });
  }
  getTemplist(){
    this._service.GetgitempList(this.obj).subscribe((res)=>{
      console.log(res)
      this.tempList = res.result.templates
    })
  }
  AddTemp(name){
    console.log(name)
    this.tempname = name
    this.add()
  }
}
