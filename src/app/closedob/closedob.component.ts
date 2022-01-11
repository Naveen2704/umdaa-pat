import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { VitlasService } from '../addvitals/vitlas.service';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-closedob',
  templateUrl: './closedob.component.html',
  styleUrls: ['./closedob.component.css']
})
export class ClosedobComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public result,public dialogRef: MatDialogRef<ClosedobComponent>,private service:VitlasService) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  givenon_close(){
    this.dialogRef.close();
  }
 
}
