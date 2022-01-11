import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { FiService } from '../fi.service';
import { TemplateComponent } from '../template/template.component';
import { EditTempComponent } from '../edit-temp/edit-temp.component';

export interface PeriodicElement {
  name: string;
  position: number;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen'},
  {position: 2, name: 'Helium'}
];


@Component({
  selector: 'app-templatelist',
  templateUrl: './templatelist.component.html',
  styleUrls: ['./templatelist.component.css']
})
export class TemplatelistComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'add','Edit', 'Delete'];
  dataSource = ELEMENT_DATA;
  tempList: any=[];
  addtempArray: any=[];
  drugData: any;
  s_obj: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data,private dailog:MatDialog,private _dialogRef:MatDialogRef<TemplatelistComponent>,private _service:FiService) {
    this.s_obj = data.package;
    console.log(this.s_obj)
   }


  ngOnInit() {
    this.getTemplateList(this.s_obj);
  }
  
  close(){
    this._dialogRef.close({event:'close'});
  }p

  getTemplateList(s_obj){
    this._service.getTempList(this.s_obj).subscribe((res)=>{
      console.log(res)
      this.tempList = res.result.template_list
      console.log(this.tempList)
    })
  }

  AddTemp(id)
  {
    console.log(id);
    console.log(this.tempList);

    var getData = this.tempList.filter((x)=>x.prescription_template_id === id);
    console.log(getData)
    console.log(getData[0].prescriptions)
    this.addtempArray = getData[0].prescriptions
    this._service.AddTemp(this.addtempArray,this.s_obj).subscribe((result)=>{
      console.log(result)
      if(result['code']=='200'){
        this._dialogRef.close({event:'add'});
      }
    })
  }
  Editmodel(id,name){
    return this.dailog.open(EditTempComponent,{
      disableClose:true,
      panelClass:['Template-dailog'],
      data:{
        id:id,
        name:name,
      }
    })
  }
  
  EditTemp(id,name){
  this.Editmodel(id,name).afterClosed().subscribe(res=>{
    this.getTemplateList(this.s_obj);
  });
  }
  deleteTemp(id){
    this._service.delTemp(id).subscribe((res)=>{
      console.log(res)
      if(res['code']=='200'){
        this.getTemplateList(this.s_obj);
      }
    })
  }
}
