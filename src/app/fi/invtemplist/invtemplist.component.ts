import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { FiService } from '../fi.service';
import { InvedittempComponent } from '../invedittemp/invedittemp.component';

@Component({
  selector: 'app-invtemplist',
  templateUrl: './invtemplist.component.html',
  styleUrls: ['./invtemplist.component.css']
})
export class InvtemplistComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'add','Edit', 'Delete'];
  inv_obj: any;
  tempList: any=[];
  invArray: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data,private dailog:MatDialog,private _dialogRef:MatDialogRef<InvtemplistComponent>,private _service:FiService) {
    this.inv_obj = data.package;
    console.log(this.inv_obj)
   }


  ngOnInit() {
    this.getTemplateList()
  }
  close(){
    this._dialogRef.close({event:'close'});
  }

  getTemplateList(){
    this._service.getInvTempList(this.inv_obj).subscribe((res)=>{
      console.log(res)
      this.tempList = res.result.template_list
      console.log(this.tempList)
    })
  }
  AddTemp(id)
  {
    console.log(id);
    console.log(this.tempList);

    var getData = this.tempList.filter((x)=>x.investigation_template_id === id);
    console.log(getData)
     console.log(getData[0].investigation)
     this.invArray = getData[0].investigation
    this._service.AddTempinv(this.invArray,this.inv_obj).subscribe((result)=>{
      console.log(result)
      if(result['code']=='200'){
        this._dialogRef.close({event:'add'});
      }
      if(result['code']=='201'){
        alert(result.message)
      }
    })
  }
  EditTemp(id,name){
    this.Editmodel(id,name).afterClosed().subscribe(res=>{
      this.getTemplateList();
    });
  }
  Editmodel(id,name){
    return this.dailog.open(InvedittempComponent,{
      disableClose:true,
      panelClass:['Template-dailog'],
      data:{
        id:id,
        name:name,
      }
    })
  }
  deleteTemp(id){
    console.log(id);
    this._service.delinvTemp(id).subscribe((res)=>{
      console.log(res)
      if(res['code']=='200'){
        this.getTemplateList();
      }
    })
  }
}
