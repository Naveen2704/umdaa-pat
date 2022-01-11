import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-lab',
  templateUrl: './edit-lab.component.html',
  styleUrls: ['./edit-lab.component.css']
})
export class EditLabComponent implements OnInit {

  list=['Haemoglobin',
    'PCV',
    'MCV','MCH','MCHC','Total RBC Count','Platelet Count','Total WBC Count','Neutrophils',
    'Lymphocytes','Monocytes','Eosinophils','Basophils',
    'RBC Morphology','WBC Morphology','Plateletes Morphology'];
  investigation_name: any;
  constructor( public dialogRef: MatDialogRef<EditLabComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,@Inject(MAT_DIALOG_DATA) public result) { }

  ngOnInit() {
    console.log(this.result.name);
    this.investigation_name = this.result.name;
  }

  close()
  {
    this.dialogRef.close();
  }
  

}
