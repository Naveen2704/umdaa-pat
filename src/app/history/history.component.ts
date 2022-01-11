import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SymptomsService } from '../service/symptoms.service';
import { FormControl, FormGroupDirective } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { startWith, map, takeUntil, take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog,MatDialogRef } from '@angular/material';
import { SymptomsComponent } from '../symptoms/symptoms.component';
import { NotificationService } from '../shared/notification.service';
import { ConfirmDailogComponent } from '../confirm-dailog/confirm-dailog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientserviceService } from '../service/patientservice.service';
import { HopiComponent } from '../hopi/hopi.component';
import { VitalsComponent } from '../vitals/vitals.component';
import { ListService } from '../lists/list.service';
import { ConfirmdailogService } from '../shared/confirmdailog/confirmdailog.service';
import { UsersService } from '../services/users.service';
import Swal from 'sweetalert2'

import * as introJs from 'intro.js/intro.js';
export interface Food {
  value: string;
  viewValue: string;
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Fever', weight: 25, symbol: 'Days'},
 
];

const options = {
  title: 'CONFIRM.DOWNLOAD.JOB.TITLE',
  message: 'Are you sure to delete ?',
  confirmText: 'YES',
  cancelText: 'NO'
  
};

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit{
  introJS = introJs();
  show = false;
  @ViewChild(HopiComponent,{static: false}) private _child: 
  HopiComponent;
  @ViewChild(VitalsComponent,{static: false}) private child: 
  VitalsComponent;
  private unsubscribe$ = new BehaviorSubject<any>(null);
  options: any[]=[];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','Delete','Edit'];
 // dataSource = ELEMENT_DATA;
  SymptomsInfo: any[]=[];
  Symptom_Id: any;
  myForm: FormControl;
  span: FormControl;
  duration: FormControl;
  usersForm: any;
  data: any;
  SuggestSymptoms: any;
  suggitions: any;
  SymptomsList: any;
  list: any;
  isLoading = true;
  // search: any;
 // dataSource = this.service.getrefreshData$;
  dataSource:any=[]
  isSubmitted = false;
  obj_Sy: any;
  item: any;
  id: string;
  form_id: any;

  pastForm: FormGroup;
  pastSList: any=[];
  isSubmittedPast = false;
  allPastSList: any =[];
  hidePast:boolean=false;

  socialForm: FormGroup;
  socialSList: any=[];
  isSubmittedSocial = false;
  allSocialSList: any =[];
  hideSocial:boolean=false;

  personalForm: FormGroup;
  personalSList: any=[];
  isSubmittedPersonal = false;
  allPersonalSList: any =[];
  hidePersonal:boolean=false;

  treatmentForm: FormGroup;
  treatmentSList: any=[];
  isSubmittedTreatment = false;
  allTreatmentSList: any =[];
  hideTreatment:boolean=false;

  
  familyForm: FormGroup;
  familySList: any=[];
  isSubmittedFamily = false;
  allFamilySList: any =[];
  hideFamily:boolean=false;
  id1: string;
  status: any;
  disabled: boolean =false;


  constructor(private users: UsersService,private router: Router,private _service: PatientserviceService,private _dailog:ConfirmdailogService,
    private route: ActivatedRoute,private service:SymptomsService,private servicee:ListService,
    private formBuilder: FormBuilder,public dailog:MatDialog,private _notification:NotificationService) {
      this.pastForm = this.formBuilder.group({
        'pastName': null
      });
      this.socialForm = this.formBuilder.group({
        'socialName': null
      });
      this.personalForm = this.formBuilder.group({
        'personalName': null
      });
      this.treatmentForm = this.formBuilder.group({
        'treatmentName': null
      });
      this.familyForm = this.formBuilder.group({
        'familyName': null
      });
     }
  registerForm: FormGroup;
  // myForm: FormControl;
  filteredOptions: Observable<any[]>;
  foods: Food[] = [
    {value: 'Min', viewValue: 'Min'},
    {value: 'Hrs', viewValue: 'Hrs'},
    {value: 'Days', viewValue: 'Days'},
    {value: 'Months', viewValue: 'Months'},
    {value: 'Years', viewValue: 'Years'}
  ];
 
  ngOnInit() {

   
    // this._child.ngOnInit();
    this.route.params.subscribe(res => {
      this.id = this.route.snapshot.paramMap.get("id");
      this.id1 = this.route.snapshot.paramMap.get("id1");
      this.users.roleId(this.id1);
      console.log(this.id);
      console.log(this.id1);
    }); 
    this.pastSuggestions();
    this.pastAllSuggestions();
    this.socialSuggestions();
    this.socialAllSuggestions();
    this.personalSuggestions();
    this.personalAllSuggestions();
    this.treatmentSuggestions();
    this.treatmentAllSuggestions();
    this.familySuggestions();
    this.familyAllSuggestions();
    this.route.params.subscribe(params => {
      let productid = params['id'];
      console.log(productid);
     this._service.GetPatient(productid).subscribe(data =>{
      console.log(data.result['parameters'][0])
      this.obj_Sy = data.result['parameters'][0]
      this.status = data.result['parameters'][0].status
      if(this.status === 'closed'){
        this.disabled = true
      }
      this.getSymptomsList(this.obj_Sy);
      this.SetSymptoms(this.obj_Sy);
      
      this.service.GetSymptomsSuggestions(this.obj_Sy).subscribe(data => {
        console.log(data)
        this.suggitions = data.result.symptoms
        console.log(data.result.symptoms)
       
      })
     })
  });

    this.usersForm = this.formBuilder.group({
      form_id:null,
      Search: null,
      span:null,
      duration:null,
      // form_id:null
    })
    
    
    // this.myForm = new FormControl();
    this.span = new FormControl();
    this.duration = new FormControl();
    this.filteredOptions = this.usersForm.get('Search').valueChanges
     .pipe(
       startWith(''),
       map((value: any | null) => value ? this._filter(value):this.item
       
       )
     );
    console.log(this.filteredOptions)
  }
  help(){
    this.introJS.start();
    
  }
    
  onSubmitPast(form,past: FormGroupDirective)
  {
    this.isSubmittedPast = true;
    console.log(form,past);
    if (!this.pastForm.valid ) {
      return false;
    } else{
    this.servicee.savePastSuggestions(form,'Past History',this.id).subscribe((data)=>{
      console.log(data);
    this._notification.success("SuccessFully Saved")
      past.resetForm();
      this.pastSuggestions();
       this.isSubmittedPast = false;
    })
  }
  }

  onSubmitSocial(form,social: FormGroupDirective)
  {
    this.isSubmittedSocial = true;
    console.log(form,social);
    if (!this.socialForm.valid ) {
      return false;
    } else{
    this.servicee.saveSocialSuggestions(form,'Social History',this.id).subscribe((data)=>{
      console.log(data);
    this._notification.success("SuccessFully Saved")
      social.resetForm();
      this.socialSuggestions();
       this.isSubmittedSocial = false;
    })
  }
  }

  onSubmitPersonal(form,personal: FormGroupDirective)
  {
    this.isSubmittedPersonal = true;
    console.log(form,personal);
    if (!this.personalForm.valid ) {
      return false;
    } else{
    this.servicee.savePersonalSuggestions(form,'Personal History',this.id).subscribe((data)=>{
      console.log(data);
    this._notification.success("SuccessFully Saved")
      personal.resetForm();
      this.personalSuggestions();
       this.isSubmittedPersonal = false;
    })
  }
  }

  onSubmitTreatment(form,treatment: FormGroupDirective)
  {
    this.isSubmittedTreatment = true;
    console.log(form,treatment);
    if (!this.treatmentForm.valid ) {
      return false;
    } else{
    this.servicee.saveTreatmentSuggestions(form,'Treatment History',this.id).subscribe((data)=>{
      console.log(data);
    this._notification.success("SuccessFully Saved")
      treatment.resetForm();
      this.treatmentSuggestions();
       this.isSubmittedTreatment = false;
    })
  }
  }

  onSubmitFamily(form,family: FormGroupDirective)
  {
    this.isSubmittedFamily = true;
    console.log(form,family);
    if (!this.familyForm.valid ) {
      return false;
    } else{
    this.servicee.saveFamilySuggestions(form,'Family History',this.id).subscribe((data)=>{
      console.log(data);
    this._notification.success("SuccessFully Saved")
      family.resetForm();
      this.familySuggestions();
       this.isSubmittedFamily = false;
    })
  }
  }

  pastSuggestions()
  {
    
    this.servicee.getSuggestions(this.id,'Past History').subscribe((data)=>{
      console.log(data);
      console.log(data['result']['Suggestions']);
      this.pastSList = data['result']['Suggestions'];
      this.pastAllSuggestions();
    })
  }

  socialSuggestions()
  {
    
    this.servicee.getSuggestions(this.id,'Social History').subscribe((data)=>{
      console.log(data);
      console.log(data['result']['Suggestions']);
      this.socialSList = data['result']['Suggestions'];
      this.socialAllSuggestions();
    })
  }

  personalSuggestions()
  {
    
    this.servicee.getSuggestions(this.id,'Personal History').subscribe((data)=>{
      console.log(data);
      console.log(data['result']['Suggestions']);
      this.personalSList = data['result']['Suggestions'];
      this.personalAllSuggestions();
    })
  }

  treatmentSuggestions()
  {
    
    this.servicee.getSuggestions(this.id,'Treatment History').subscribe((data)=>{
      console.log(data);
      console.log(data['result']['Suggestions']);
      this.treatmentSList = data['result']['Suggestions'];
      this.treatmentAllSuggestions();
    })
  }

  familySuggestions()
  {
    
    this.servicee.getSuggestions(this.id,'Family History').subscribe((data)=>{
      console.log(data);
      console.log(data['result']['Suggestions']);
      this.familySList = data['result']['Suggestions'];
      this.familyAllSuggestions();
    })
  }

  
  sendPastSuggestion(name)
  {
    console.log(name);
    this.pastForm.get('pastName').setValue(name)
  }

  sendSocialSuggestion(name)
  {
    console.log(name);
    this.socialForm.get('socialName').setValue(name)
  }


  sendPersonalSuggestion(name)
  {
    console.log(name);
    this.personalForm.get('personalName').setValue(name)
  }

  sendTreatmentSuggestion(name)
  {
    console.log(name);
    this.treatmentForm.get('treatmentName').setValue(name)
  }

  sendFamilySuggestion(name)
  {
    console.log(name);
    this.familyForm.get('familyName').setValue(name)
  }



  pastAllSuggestions()
  {
    this.servicee.getAllSuggestionsList(this.id,'Past History').subscribe((data)=>{

      console.log(data);
      console.log(data['result']['Suggestions']);
      this.allPastSList = data['result']['Suggestions'];
      if(this.allPastSList !='')
      {
        this.hidePast=true;
      }
      else{
        this.hidePast=false;
      }
    })
  }

  socialAllSuggestions()
  {
    this.servicee.getAllSuggestionsList(this.id,'Social History').subscribe((data)=>{

      console.log(data);
      console.log(data['result']['Suggestions']);
      this.allSocialSList = data['result']['Suggestions'];
      if(this.allSocialSList !='')
      {
        this.hideSocial=true;
      }
      else{
        this.hideSocial=false;
      }
    })
  }

  personalAllSuggestions()
  {
    this.servicee.getAllSuggestionsList(this.id,'Personal History').subscribe((data)=>{

      console.log(data);
      console.log(data['result']['Suggestions']);
      this.allPersonalSList = data['result']['Suggestions'];
      if(this.allPersonalSList !='')
      {
        this.hidePersonal=true;
      }
      else{
        this.hidePersonal=false;
      }
    })
  }

  treatmentAllSuggestions()
  {
    this.servicee.getAllSuggestionsList(this.id,'Treatment History').subscribe((data)=>{

      console.log(data);
      console.log(data['result']['Suggestions']);
      this.allTreatmentSList = data['result']['Suggestions'];
      if(this.allTreatmentSList !='')
      {
        this.hideTreatment=true;
      }
      else{
        this.hideTreatment=false;
      }
    })
  }

  familyAllSuggestions()
  {
    this.servicee.getAllSuggestionsList(this.id,'Family History').subscribe((data)=>{

      console.log(data);
      console.log(data['result']['Suggestions']);
      this.allFamilySList = data['result']['Suggestions'];
      if(this.allFamilySList !='')
      {
        this.hideFamily=true;
      }
      else{
        this.hideFamily=false;
      }
    })
  }

  deletePastSuggestions(id,form_type)
  {
    this._dailog.open(options).afterClosed().subscribe(res=>{
      if(res){
    this.servicee.deleteSuggestions(id,form_type).subscribe((data)=>{
      console.log(data);
  this._notification.error("Deleted")
      this.pastAllSuggestions();
      this.pastSuggestions();
      // console.log(data['result']['Suggestions']);
      // this.allGpeSList = data['result']['Suggestions'];
    })
  }
  });
  }

  deleteSocialSuggestions(id,form_type)
  {
    this._dailog.open(options).afterClosed().subscribe(res=>{
      if(res){
    this.servicee.deleteSuggestions(id,form_type).subscribe((data)=>{
      console.log(data);
  this._notification.error("Deleted")
      this.socialAllSuggestions();
      this.socialSuggestions();
      // console.log(data['result']['Suggestions']);
      // this.allGpeSList = data['result']['Suggestions'];
    })
  }
  });
  }

  deletePersonalSuggestions(id,form_type)
  {
    this._dailog.open(options).afterClosed().subscribe(res=>{
      if(res){
    this.servicee.deleteSuggestions(id,form_type).subscribe((data)=>{
      console.log(data);
  this._notification.error("Deleted")
      this.personalAllSuggestions();
      this.personalSuggestions();
      // console.log(data['result']['Suggestions']);
      // this.allGpeSList = data['result']['Suggestions'];
    })
  }
  });
  }

  deleteTreatmentSuggestions(id,form_type)
  {
    this._dailog.open(options).afterClosed().subscribe(res=>{
      if(res){
    this.servicee.deleteSuggestions(id,form_type).subscribe((data)=>{
      console.log(data);
      
    //  Swal.fire('','Deleted','error')
      this.treatmentAllSuggestions();
      this.treatmentSuggestions();
      // console.log(data['result']['Suggestions']);
      // this.allGpeSList = data['result']['Suggestions'];
    })
  }
  });
  }

  deleteFamilySuggestions(id,form_type)
  {
    this._dailog.open(options).afterClosed().subscribe(res=>{
      if(res){
    this.servicee.deleteSuggestions(id,form_type).subscribe((data)=>{
      console.log(data);
  this._notification.error("Deleted")
      this.familyAllSuggestions();
      this.familySuggestions();
      // console.log(data['result']['Suggestions']);
      // this.allGpeSList = data['result']['Suggestions'];
    })
  }
  });
  }


 
  private _filter(value: any=[]): any[] {
    // console.log(value)
    const filterValue = value.toLowerCase();
    return this.options.filter(option => {
      
      return option.synonym.toLowerCase().includes(value.toLowerCase())});

  }
 getSymptomsList(obj){
  this.service.GetSymptomsList(this.obj_Sy).subscribe(data => {
    this.isLoading = false;
    this.dataSource = data.result.presenting_symptoms_list
    //console.log(data.result.presenting_symptoms_list)
    console.log(this.dataSource)
    this._child.ngOnInit();
   
  })
}

getId(a,b)
{
 console.log(a,b);
 this.form_id = b;
 this.usersForm.get('form_id').setValue(b);
}
 

 SetSymptoms(obj){
   this.service.GetSymptoms(this.obj_Sy).subscribe(data => {
    // console.log(data.result.symptoms);
     this.options = data.result.symptoms;
     console.log(this.options);
    
   })
 }

 openSymptom(){

   const dialogRef = this.dailog.open(SymptomsComponent, {
      panelClass: ['Symptom_dailog'],
      //data:this.obj_Sy
      
  });
 }

 selected(event: any=[]) {
  this.SuggestSymptoms = event
   console.log(this.SuggestSymptoms.symptom,this.SuggestSymptoms.form_id)
   this.usersForm.get('Search').setValue(this.SuggestSymptoms.symptom)
   this.usersForm.get('form_id').setValue(this.SuggestSymptoms.form_id)
 }

 PostSymptoms(data,formDirective: FormGroupDirective)
 {
  console.log(data);
  this.isSubmitted = true;
  if (!this.usersForm.valid ) {
    return false;
  } else{
    this.service.PostSymptoms(data,this.obj_Sy).subscribe(data => {
      console.log(data);
      if(data['code'] == '200'){
        this._notification.success('Symptoms added successfully');
        // Swal.fire('','Symptoms added successfully','success')
        this.getSymptomsList(this.obj_Sy)
        this._child.ngOnInit();
        // this.usersForm.reset();
      formDirective.resetForm();
      }
      else{
        this._notification.warning('Symptoms Already Exsists');
        // Swal.fire('','Deleted','error')
      }
      
     })
  }


 }

 openDialog(msg){

    return this.dailog.open(ConfirmDailogComponent,
      {
       
        disableClose:true,
        panelClass: ['Symptom_dailog'],
        data:{
          message:msg,
        }
        }
      );
 
}
 delete(id){
 // console.log(id);
  this.openDialog('Are you sure to delete this symptom ?').afterClosed().subscribe(res=>{
    //console.log(res)
    if(res){
      this.service.DeleteSymptoms(id).subscribe(data => {
        console.log(data);
        if(data['code'] == '200'){
          this._notification.success('Symptoms Deleted successfully');
          // Swal.fire('','Symptoms Deleted successfully','success')
          this.getSymptomsList(this.obj_Sy)
          this._child.ngOnInit();
          this.ngOnInit();
        // this.usersForm.reset();
       // formDirective.resetForm();
        }
        else{
          // Swal.fire('','Something wrong ','error')
          this._notification.warning('Something wrong ');
        }
        
       })
    }
  })

 }
 updateModal(id,form_id,name,span,type){

  return this.dailog.open(SymptomsComponent,
    {
     
      disableClose:true,
      panelClass:['Symptom_dailog'],
      data:{
        id:id,
        form_id:form_id,
        symptom_name:name,
        symptom_span:span,
        symptom_type:type,
        package:this.obj_Sy
      }
  
      }
    );

}
 updateSymptom(id,form_id,symptom_name,symptom_span,symptom_type){
   console.log()
   this.updateModal(id,form_id,symptom_name,symptom_span,symptom_type).afterClosed().subscribe(res=>{
     console.log(res)
     if(res){
      this.getSymptomsList(this.obj_Sy)
     }
    
   })
 }

 send()
 {
   this._child.ngOnInit();
 }


//  checkData()
//  {
//   this.child.showDrugAllery();
//  }

}
