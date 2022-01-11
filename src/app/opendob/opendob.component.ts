import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VitlasService } from '../addvitals/vitlas.service';
import { FormGroupDirective, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-opendob',
  templateUrl: './opendob.component.html',
  styleUrls: ['./opendob.component.css']
})
export class OpendobComponent implements OnInit {
  Givenon_form: FormGroup;
  givendate: any;
  maxToDate = new Date();
  SetDob: any;
  constructor(  @Inject(MAT_DIALOG_DATA) public result,public dialogRef: MatDialogRef<OpendobComponent>,private service:VitlasService) { }

  ngOnInit() {
    this.Givenon_form = new FormGroup({
      SetDob: new FormControl('')
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  givenon_close(){
    this.dialogRef.close();
  }
  setGiven(data,formDirective:FormGroupDirective){
   console.log(this.result)
     console.log(data.SetDob)
     this.givendate = data.SetDob
    this.service.setGivenDate(data,this.result).subscribe((res)=>{
      console.log(res); //
      this.givenon_close()
      
    })
  }


}
