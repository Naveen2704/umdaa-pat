import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddvitalsComponent } from '../addvitals/addvitals.component';
import { VitlasService } from '../addvitals/vitlas.service';
import { SpinnerService } from '../shared/spinner.service';
// import { UpdatevitalsComponent } from './updatevitals/updatevitals.component';
import { ActivatedRoute } from '@angular/router';
import { PatientserviceService } from '../service/patientservice.service';
import { UsersService } from '../services/users.service';
import {DocScannerConfig} from 'ngx-document-scanner'

@Component({
  selector: 'app-vitals',
  templateUrl: './vitals.component.html',
  styleUrls: ['./vitals.component.css']
})
export class VitalsComponent implements OnInit {
  isLoading = false;
  vitals: any=[];
  vitalsSignsdata: any=[];
  showSpinner: boolean;
  config: DocScannerConfig = {  
    editorBackgroundColor: '#fafafa', 
    buttonThemeColor: 'primary',  
    cropToolColor: '#ff4081',  
    cropToolShape: 'circle',
    exportImageIcon: 'cloud_download'  
};
  public icons = [
    {  name:"PR" , url:"././assets/images/pulse.png"},
    {  name:"DBP", url:"././assets/images/hypertension.png"},
    {  name:"SBP", url:"././assets/images/hypertension.png"},
    {  name:"RR", url:"././assets/images/RR.png"},
    {  name:"Temp", url:"././assets/images/temp.png"},
    {  name:"SaO2", url:"././assets/images/oxygen.png"},
    {  name:"Height", url:"././assets/images/height.png"},
    {  name:"Weight", url:"././assets/images/weight-scale.png"},
    // {  name:"BMI", url:"././assets/images/bmi.png"},
    {  name:"BP", url:"././assets/images/hypertension.png"},


];
  drug: any=[];
  vitals_status: any;
  VitalsPrint: any;
  sub: any;
  obj: any;
  time: string;

  constructor(private users: UsersService,private service: PatientserviceService,private patientservice:PatientserviceService,private route: ActivatedRoute,
    private _dialog:MatDialog,public _service:VitlasService,private spinnerService:SpinnerService)  { 
// 
  }
  ngOnInit() {
  
    this.route.params.subscribe(params => {

       let productid = params['id'];
     // let productid = this.route.snapshot.paramMap.get('id');
      console.log(productid)

      let roleId= params['id1'];
      this.users.roleId(roleId);
      this.users.appID(productid)

      this.service.Getdetails(productid).subscribe(data =>{
        console.log(data)
      })
      this.service.GetPatient(productid).subscribe(data =>{
        console.log(data.result['parameters'][0])
        localStorage.setItem('getInfo',JSON.stringify(data.result['parameters'][0]));
        console.log(data.result['parameters'][0].ip)
        localStorage.setItem('ip',data.result['parameters'][0].ip)
        this.obj = data.result['parameters'][0]
        this.getvitals(this.obj);
        //this.getPrint(this.obj)
      })
})
  }

  openVitals(){
 
    const dialogRef = this._dialog.open(AddvitalsComponent,{
     panelClass:['Vitals_css'],
     disableClose:true,
     data:this.obj
     
   });
   dialogRef.afterClosed().subscribe(result => {
    ///console.log('The dialog was closed');

    this.getvitals(this.obj);
  });
  }
  // updatevitals(){
  //   const dialogRef = this._dialog.open(UpdatevitalsComponent,{
  //     panelClass:['Vitals_css'],
  //     disableClose:true,
      
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     ///console.log('The dialog was closed');
  //    // this.getvitals(this.obj);
  //   });
  // }
  async wait(ms: number): Promise<void> {
    return new Promise<void>( resolve => setTimeout( resolve, ms) );
  }
  getvitals(obj){
    console.log(this.obj)
    this.spinnerService.show();
    this.isLoading = true;
    // this.hide = true;
    this._service.getData(this.obj).subscribe((data)=>{
  
      console.log(data)
    
      if(data['code'] == '200'){
        this.wait(2000).then( () => this.isLoading = false );
        this.drug = data.result
        this.vitalsSignsdata = data.result.vitals;
        console.log(this.vitalsSignsdata)
        this.vitalsSignsdata.sort(function(a, b) {
          var keyA = a.position,
            keyB = b.position;
          // Compare the 2 dates
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        });
        console.log(this.vitalsSignsdata )
    
        // var today = new Date();
        // console.log(today);
        // console.log(this.vitalsSignsdata[0].vital_sign_recording_date_time);
        // this.time = this.formatAMPM(this.vitalsSignsdata[0].vital_sign_recording_date_time);
        
        // var time = today.getHours() + ":" + today.getMinutes() ;
        // console.log(time);
        //console.log(this.vitalsSignsdata.slice(-1)[0].vital_signs[0].value)
        // this.vitals_status =data.result.vitals.vital_signs.status
        // console.log( this.vitalsSignsdata[0].vital_sign_recording_date_time)
      }
      else{
        this.wait(2000).then( () => this.isLoading = false );
      }
    });
  }

  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  

  // getPrint(obj){
  //   this._service.getPrintPath(this.obj).subscribe((data)=>{
  //     // console.log(data.result.pdf_path)
  //     this.VitalsPrint = data.result.pdf_path
  //   })

  // }
  getPrint(){
    this._service.getPrintPath(this.obj).subscribe((data)=>{
      // console.log(data.result.pdf_path)
      this.VitalsPrint = data.result.pdf_path
      let url = data.result.pdf_path
       window.open(url,'_blank',"width=500,height=500")
    })

  }

  // showDrugAllery()
  // {
  //   this.hide =true;
  // }

}
