import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { ProfileEditService } from '../shared/profile-edit.service';
import { PatientserviceService } from '../service/patientservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';

export interface Title {
  value: string;
  viewValue: string;
}
export interface Gender {
  value: string;
  viewValue: string;
}
export interface age {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})


export class DialogBodyComponent implements OnInit {
  public myImgUrl : string ="assets/icons/default.jpg";
  patientDetails: any=[];
  selectedFiles:FileList;
  file: File;
  fileHolder: File | null;
  fileToUpload: File = null;
  imageUrl : string;
  isSubmitted = false;
  imageUrls: any;
  
  constructor(@Inject(MAT_DIALOG_DATA) public result,
  private service:PatientserviceService,
  private matDialog: MatDialog,
  public dialogRef: MatDialogRef<DialogBodyComponent>,@Inject(MAT_DIALOG_DATA) public data: any, public notification:NotificationService)
   { 
    this.fileHolder = null;
    console.log(result)
   }
   
  form = new FormGroup({
    $key:new FormControl(null),
    title:new FormControl(''),
    first_name:new FormControl('',[Validators.required]),
    last_name:new FormControl(''),
    age:new FormControl(''),
    gender:new FormControl(''),
    mobile:new FormControl('', Validators.compose([Validators.required,Validators.minLength(10), Validators.maxLength(10),Validators.pattern('[6-9]\\d{9}')],)),
    // email:new FormControl('',[Validators.required,Validators.email]),
    email:new FormControl(''),
    location:new FormControl(''),
    file_i:new FormControl('')
  })

    titles: Title[] = [
      {value: 'Mr', viewValue: 'Mr'},
      {value: 'Mrs', viewValue: 'Mrs'},
      {value: 'MISS', viewValue: 'MISS'},
      {value: 'MASTER', viewValue: 'MASTER'},
      {value: 'BABY', viewValue: 'BABY'},
    
    ];

    genders:Gender[] =[
      {value: 'Male', viewValue: 'Male'},
      {value: 'Female', viewValue: 'Female'},
      {value: 'Others', viewValue: 'Others'},
    ]
  
  // genders:Gender[] =[
  //   {value: 'MALE', viewValue: 'Male'},
  //   {value: 'FEMALE', viewValue: 'Female'},
  //   {value: 'OTHERS', viewValue: 'Others'},
  // ]
  ages:age[]=[{value:'1',viewValue:'1'}]
  
   

  ngOnInit() {
   this.getPatientInfo(this.result);
   this.getAges()

  }

  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();

    }
}
 
  close() {
    this.dialogRef.close();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getPatientInfo(result){
    this.service.GetDetails_PE(this.result).subscribe(data =>{
      console.log(data.result);
      this.patientDetails = data.result
      const input =  this.patientDetails.photo;
       const [name, street, unit, city, state, zip,image] = input.split('/');
       this.imageUrls = image;
        
    })
  }

  onFileSelect(files: FileList) {
    this.fileToUpload = files.item(0);
    var reader = new FileReader();
    reader.onload = (event:any) =>{
      this.imageUrl = event.target.result;
      console.log(this.imageUrl)
    }
    reader.readAsDataURL(this.fileToUpload)
}

getAges()
{
  var j = 1;
  for(var i = 0;i<=99;i++)
  {
    // this.ages.push({value:j,viewValue:j})
    this.ages[i]= {value:j.toString(),viewValue:j.toString()};
    // this.ages[i]['value'] = j.toString()
    // this.ages[i]['viewValue'] = j.toString()
    j++;     
  }

}

// get(){
//   this.service.GetDetails().subscribe(data =>{
//     console.log(data);
//   })
// }
  submit(data){
    console.log(data)
    console.log(this.fileToUpload)

    this.isSubmitted = true;
    if (!this.form.valid ) {
      return false;
    }
  else{
    this.service.updateDetails(data,this.fileToUpload,this.result).subscribe(res =>{
      console.log(res)
      if(res['code']=='200'){
        this.notification.success('Profile Updated Successfully');
       // this.get()
        this.close();
        this.service.patientInfo = res
      //  this.getPatientInfo();
      }else{
        this.notification.error('Profile Updated Failed')
      }
    })
    }
  
  }
}
