import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, DateAdapter, MAT_DATE_FORMATS, MAT_DIALOG_DATA } from '@angular/material';
import { MyDateAdapter, MY_DATE_FORMATS } from 'src/app/format-datepicker';
import { FormGroup, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ReportsService } from '../reports.service';
import { HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';




interface Type {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-addreports',
  templateUrl: './addreports.component.html',
  styleUrls: ['./addreports.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MyDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
],
})

export class AddreportsComponent implements OnInit {
  selectedValue: string;
  Reportsform:FormGroup;
  // fileToUpload:File =null;
  fileToUpload =[];
  imageUrl: any=[];
  maxToDate = new Date();
  minFromDate = new Date()
  imagesList: FileList;
  filelenght: any;
  reportdate:Date;
  reporttype:string;
  reportdesc:string = "";

  isSubmitted = false;
  filename: any;

  @ViewChild("fileInput", {static: false}) fileInput: ElementRef;
  files  = [];  
  progress = { loaded : 0 , total : 0 };
  inProgress: boolean = false;
  status: any;
  disabled: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public result,private _dailogRef:MatDialogRef<AddreportsComponent>,private _service:ReportsService)
   {
     this.status = result.status
     if(this.status == 'closed'){
       this.disabled = true;
     }
    }
  public myImgUrl : string ="assets/icons/default.jpg";
  urls = [];
  onSelectFile(event) {
    console.log(event.target.files);
    if (!this.validateFile(event.target.files[0].name)) {
      console.log('Selected file format is not supported');
      alert('Selected file format is not supported')
      return false;
    }
    this.fileToUpload = event.target.files
    this.filename = event.target.files[0].name
    console.log(this.filename )
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event:any) => {
                  console.log(event.target.result);
                   this.urls.push(event.target.result); 
                   
                }

                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'jpg' ) {
        return true;
    }
    if (ext.toLowerCase() == 'png' ) {
      return true;
    }
    if (ext.toLowerCase() == 'pdf' ) {
      return true;
    }
    if (ext.toLowerCase() == 'doc' ) {
      return true;
    }
    if (ext.toLowerCase() == 'docx' ) {
      return true;
    }
    else {
        return false;
    }
}
  DocTypes: Type[] = [
    {value: "DOCTOR'S NOTE", viewValue: "DOCTOR'S NOTE"},
    {value: 'DISCHARGE SUMMARY', viewValue: 'DISCHARGE SUMMARY'},
    {value: 'RADIOLOGY', viewValue: 'RADIOLOGY'},
    {value: 'LAB REPORTS', viewValue: 'LAB REPORTS'},
    {value: 'CLINICAL IMAGES', viewValue: 'CLINICAL IMAGES'},
    {value: 'OTHERS', viewValue: 'OTHERS'}
  ];


  ngOnInit() {
    this.Reportsform = new FormGroup({
      reportdate:new FormControl(''),
      reporttype:new FormControl(''),
      reportdesc:new FormControl(''),
      file_i:new FormControl('')

    })
  }
  close() {
    this._dailogRef.close();
  }


  submit(data){
   console.log(data)
   this.inProgress = true;
   console.log(new Date(data.reportdate))
   var today = data.reportdate
  //  console.log(this.fileToUpload)
  var dd = today.getDate(); 
  var mm = today.getMonth() + 1; 

  var yyyy = today.getFullYear(); 
  if (dd < 10) { 
      dd = '0' + dd; 
  } 
  if (mm < 10) { 
      mm = '0' + mm; 
  } 
  var date = dd + '/' + mm + '/' + yyyy; 
  console.log(date)
    this.isSubmitted = true;
    if (!this.Reportsform.valid ) {
      return false;
    } 
     else {
      this._service.ReportsPost(data,date,this.fileToUpload,this.result).subscribe((res)=>{
        console.log(res);
        if(res['code']=='200'){
          this.inProgress = false;
          this.close();
        }
  
      })
    }
  
  }


 


}
