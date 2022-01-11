import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormGroupDirective, Validators, FormArray } from '@angular/forms';
import { FiService } from '../fi.service';
import { MatListOption, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { NotificationService } from 'src/app/shared/notification.service';
import { ConfirmdailogService } from 'src/app/shared/confirmdailog/confirmdailog.service';
import { EditprescribeComponent } from '../editprescribe/editprescribe.component';
import { TemplateComponent } from '../template/template.component';
import { TemplatelistComponent } from '../templatelist/templatelist.component';
import { PatientserviceService } from 'src/app/service/patientservice.service';
import { ActivatedRoute } from '@angular/router';
import { PrescribemobileComponent } from '../prescribemobile/prescribemobile.component';
import { SummaryService } from 'src/app/summary/summary.service';
import { DOCUMENT } from '@angular/common';
import * as introJs from 'intro.js/intro.js';




export interface Mode {
  value: string;
  viewValue: string;
}
export interface Time {
  value: string;
  viewValue: string;
}
export interface Type {
  value: string;
  viewValue: string;
}

interface Food {
  value: string;
  viewValue: string;
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  qty:number;
}

const options = {
  title: 'CONFIRM.DOWNLOAD.JOB.TITLE',
  message: 'Are you sure to delete ?',
  cancelText: 'NO',
  confirmText: 'YES'
};

@Component({
  selector: 'app-prescribe',
  templateUrl: './prescribe.component.html',
  styleUrls: ['./prescribe.component.css']
})
export class PrescribeComponent implements OnInit {
  introJS = introJs();
  show = false;
  fit:any;
 @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  // @ViewChild(MatPaginator, {static: true}) 
  // set paginator(value: MatPaginator) {
  //   this.drugData.paginator = value;
  // }
  DrugForm: FormGroup;
  drugname: any=[];
  isLoading: boolean;
  results: any=[];

  displayedColumns: string[] = ['position', 'name', 'Prescription','Actions'];
   modeselect = 'Oral';
   typeselect = 'Tablet';
    types: Type[] = [
    {value: 'Form', viewValue: 'Form'},
    {value: 'mL', viewValue: 'mL'},
    {value: 'Drops', viewValue: 'Drops'},
    {value: 'Tea spoons', viewValue: 'Tea spoons'},
    {value: 'Tablet', viewValue: 'Tablet'},
    {value: 'Capsule', viewValue: 'Capsule'},{value: 'Scoops', viewValue: 'Scoops'},
    {value: 'Respules', viewValue: 'Respules'},

    {value: 'Sachets', viewValue: 'Sachets'},
    {value: 'Puffs', viewValue: 'Puffs'},{value: 'Patch', viewValue: 'Patch'},
    {value: 'Enema', viewValue: 'Enema'},

    {value: 'Suppository', viewValue: 'Suppository'},
    {value: 'Pint', viewValue: 'Pint'},{value: 'Bottle', viewValue: 'Bottle'},
    {value: 'Injection', viewValue: 'Injection'},{value: 'Application', viewValue: 'Application'},
    {value: 'Others', viewValue: 'Others'}
  ];
  modes: Mode[] = [
    {value: 'Minute', viewValue: 'Minute'},
    {value: 'Hour', viewValue: 'Hour'},
    {value: 'Day', viewValue: 'Day'},
    {value: 'Week', viewValue: 'Week'},
    {value: 'Fortnight', viewValue: 'Fortnight'},
    {value: 'Month', viewValue: 'Month'},
    {value: 'Year', viewValue: 'Year'},
    {value: '--', viewValue: '--'},
  ];
  times: Time[] = [
    {value: 'SOS', viewValue: 'SOS'},
    {value: 'STAT', viewValue: 'STAT'},
    {value: 'HS', viewValue: 'HS'},
    {value: '1', viewValue: '1 TIME'},
    {value: '2', viewValue: '2 TIMES'},{value: '3', viewValue: '3 TIMES'},{value: '4', viewValue: '4 TIMES'},{value: '5', viewValue: '5 TIMES'},{value: '6', viewValue: '6 TIMES'},{value: '7', viewValue: '7 TIMES'},{value: '8', viewValue: '8 TIMES'},{value: '9', viewValue: '9 TIMES'},{value: '10', viewValue: '10 TIMES'},{value: '11', viewValue: '11 TIMES'},{value: '12', viewValue: '12 TIMES'},{value: '13', viewValue: '13 TIMES'},{value: '14', viewValue: '14 TIMES'},{value: '15 ', viewValue: '15 TIMES'},{value: '16', viewValue: '16 TIMES'},{value: '17', viewValue: '17 TIMES'},{value: '18', viewValue: '18 TIMES'},{value: '19', viewValue: '19 TIMES'},
    {value: '20', viewValue: '20 TIMES'}, {value: '21', viewValue: '21 TIMES'}, {value: '22', viewValue: '22 TIMES'}, {value: '23', viewValue: '23 TIMES'}, {value: '24', viewValue: '24 TIMES'},
 
    
  ];
  foods: Food[] = [
    {value: 'Oral', viewValue: 'Oral'},
    {value: 'IV (Intra-venous)', viewValue: 'IV (Intra-venous)'},
    {value: 'IM (Intra-muscular)', viewValue: 'IM (Intra-muscular)'},
    {value: 'Local Application', viewValue: 'Local Application'},
    {value: 'Subcutaneous', viewValue: 'Subcutaneous'},
    {value: 'Transdermal', viewValue: 'Transdermal'}, {value: 'Inhalation', viewValue: 'Inhalation'},
    {value: 'Sublingual', viewValue: 'Sublingual'},
    {value: 'Buccal delivery', viewValue: 'Buccal delivery'}, {value: 'Nasal', viewValue: 'Nasal'},
    {value: 'Vaginal delivery"', viewValue: 'Vaginal delivery"'},
    {value: 'Rectal delivery', viewValue: 'Rectal delivery'},

    {value: 'Intralesional', viewValue: 'Intralesional'},
    {value: 'Intrathecal', viewValue: 'Intrathecal'}, {value: 'Epidural', viewValue: 'Epidural'},
    {value: 'Implantaion', viewValue: 'Implantaion'},{value: 'Ocular', viewValue: 'Ocular'}, {value: 'Nebulization', viewValue: 'Nebulization'},
    {value: 'Others', viewValue: 'Others'},
  ];
  drug_id: any;
  isprescribed: boolean;
  isChecked: boolean;
  changedvalue: any;
  checked: any;
  drugData: any=[];
  dataSource:  any;
  isCheckedd: boolean;
  isCheckeddd: boolean;
  drugsuggitions: any;
  suggestDrug: any;
  s_drugId: any;
  checkboxvalue: any;
  drugListArray: any;
  Diet_check: any;
  plan_check: any;
  followupdate: any;
  DietForm: FormGroup;
  PlanForm: FormGroup;
  followForm: FormGroup;
  fi_Obj: any;
  app_id: any;
  latestDaySchedule: any;
  Note:any = '';
  drugobj: any;
  showScroll: boolean;
  disabled:boolean = false;
  FdForm: FormGroup;
  value: any;
  sunday: any;
  followingDate: any;
  day: string;
  avalibleqty: number;
  avlQty: any;
  freqvalue: any;
  freqvaluee: string;
  Day: string;
  allergyShow: boolean = false;
  Drug_allergy: string='';
  cheked: boolean = false;
  checkedData: boolean = false;
  constructor(@Inject(DOCUMENT) private document: Document,private _service:SummaryService,private service: PatientserviceService,private route: ActivatedRoute,private dailog: MatDialog,public _fb :FormBuilder,private _searchService:FiService,private _notification:NotificationService,private _dailog:ConfirmdailogService) 
  {
    
   }

  ngOnInit() {
    
    this.DrugForm = this._fb.group({
      drugField:new FormControl('',Validators.required),
      Drug_id:new FormControl(''),
      Mode:new FormControl(''),
      type:new FormControl(''),
      M:new FormControl(null),
      A:new FormControl(null),
      N:new FormControl(null),

      time:new FormControl(''),
      Frequency:new FormControl(''),
      radio:new FormControl('',),
      Qty:new FormControl('1',Validators.required),
      Duration:new FormControl('',Validators.required),
      Note:new FormControl(''),
      drugAllergy:new FormControl(''),
      allergy:new FormControl('')
      // followupdate:new FormControl(Date)
      
    })
    this.DietForm = this._fb.group({
      dietfeild:new FormControl('')
    })
    this.PlanForm = this._fb.group({
      Planfeild:new FormControl('')
    })
    // this.followForm = this._fb.group({
    //   followupdate:new FormControl('')
    // })

    this.FdForm = this._fb.group({
      followupdate:new FormControl('',Validators.required)
    })
      this.route.params.subscribe(params => {
        let productid = params['id'];
        this.service.GetPatient(productid).subscribe(data =>{
          console.log(data.result['parameters'][0].status)
          if(data.result['parameters'][0].status === 'closed'){
            this.disabled = true;
            this.DrugForm.get('drugField').disable();
          }else{
            this.DrugForm.get('drugField').enable();
          }
          this.fi_Obj = data.result['parameters'][0];
          this.getdruginfo(this.fi_Obj);
          this.getdrugSuggestions(this.fi_Obj);
    
        })
    });
    


   
    
  }
  help(){
    this.introJS.start();
    
  }
  date(e){
    console.log(e)
    this.value = e
    const date = new Date();
    const newDate = this.addDays(date, parseInt(e));
    console.log(newDate.getDay())
    this.sunday = newDate.getDay()
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

   this.sunday = newDate.getDay()
   this.Day = days[this.sunday] 
    this.followingDate = newDate
  }
  addDays(date, days) {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
  }
  FDsubmit(data,formDirective: FormGroupDirective){
    console.log(data)
    if (!this.FdForm.valid ) {
      return false;
    }else{
      this._searchService.getfolllowupfd(this.fi_Obj,data).subscribe((res)=>{
        console.log(res)
        if(res['code']=='200'){
          formDirective.resetForm()
          this._notification.success('Next followup date added');
          let id = this.fi_Obj.appointment_id
          this._service.getshortsummary(id).subscribe((res) => {
           //console.log(res.result.pdf_name)
           let url = res.result.pdf_name
          window.open(url,'_blank',"width=500,height=500")
         })
      }
      })
    }
 
  }
  clearForm(formDirective) {

    formDirective.resetForm();
    // this.DrugForm.reset();
    // this.DrugForm.get('drugField').clearValidators();
    // this.DrugForm.get('drugField').updateValueAndValidity();
  
    // this.DrugForm.get('M').updateValueAndValidity();
    // this.DrugForm.get('M').clearValidators();
    // this.DrugForm.get('A').updateValueAndValidity();
    // this.DrugForm.get('A').clearValidators();
    // this.DrugForm.get('N').updateValueAndValidity();
    // this.DrugForm.get('N').clearValidators();
    // this.DrugForm.get('Drug_id').updateValueAndValidity();
    // this.DrugForm.get('Drug_id').clearValidators();
    // this.DrugForm.get('time').updateValueAndValidity();
    // this.DrugForm.get('time').clearValidators();
    // this.DrugForm.get('Frequency').updateValueAndValidity();
    // this.DrugForm.get('Frequency').clearValidators();
    // this.DrugForm.get('radio').updateValueAndValidity();
    // this.DrugForm.get('radio').clearValidators();
    // this.DrugForm.get('Qty').clearValidators();
    // this.DrugForm.get('Qty').updateValueAndValidity();
    // this.DrugForm.get('Duration').clearValidators();
    // this.DrugForm.get('Duration').updateValueAndValidity();
    // this.DrugForm.get('Note').updateValueAndValidity();
    // this.DrugForm.get('Note').clearValidators();
    // this.DrugForm.get('Mode').clearValidators();
    // this.DrugForm.get('Mode').updateValueAndValidity();
    // this.DrugForm.get('type').clearValidators();
    // this.DrugForm.get('type').updateValueAndValidity();
    this.DrugForm.get('Mode').setValue('Oral');
    this.DrugForm.get('type').setValue('Tablet');
    this.DrugForm.get('Qty').setValue('1');
  }
  drugsearch(drugs: string){
    if(drugs.length>=3){
      this.isLoading = true;
      //  this.drugobj = this._searchService.Drugsearch(drugs,this.fi_Obj);
      //  this.results =  this.drugobj.result['medicine_object']['drugs']
      // console.log(this.results)
      this._searchService.Drugsearch(drugs,this.fi_Obj).subscribe((data=>{
        this.results = data.result['medicine_object']['drugs']
        //console.log(this.results)
        //console.log(this.results.result['medicine_object']['drugs'])
      }));
      
    }
    if(drugs.length ==0){
      this._searchService.Drugsearch(drugs,this.fi_Obj).subscribe((data=>{
        this.results = data.result['medicine_object']['drugs']
        // console.log(this.results)
        // console.log(this.results.result['medicine_object']['drugs'])
      }));
      
     // this.results = this._searchService.search(drugs)
      this.isLoading = false
    }
  }
  setradio(e){
    console.log(e)
    if(e == 'yes'){ 
      this.allergyShow = true
      this.DrugForm.get('allergy').setValue('Yes')
    }else{
      this.allergyShow = false
      this.DrugForm.get('allergy').setValue('No')
    }
  }
  check(event){

    console.log(event.checked);
    this.checkboxvalue = event.checked;
    console.log(this.checkboxvalue)
    if(this.isChecked == true){
      this.DrugForm.get('M').setValue('M');
      this.DrugForm.get('time').patchValue('');
      this.DrugForm.get('Frequency').patchValue('');
    }
     if(this.isCheckedd == true){
      this.DrugForm.get('A').setValue('A');
      this.DrugForm.get('time').patchValue('');
      this.DrugForm.get('Frequency').patchValue('');
    }
    if (this.isCheckeddd == true){
      this.DrugForm.get('N').setValue('N');
      this.DrugForm.get('time').patchValue('');
      this.DrugForm.get('Frequency').patchValue('');
    }
     if(this.isChecked == false ){
      this.DrugForm.get('M').setValue(null);
     
    }
    if(this.isCheckedd == false ){
      this.DrugForm.get('A').setValue(null);
     
    }
    if(this.isCheckeddd == false ){
      this.DrugForm.get('N').setValue(null);
     
    }
    else{

    }
    //  if(this.isChecked == false ){
    //   this.DrugForm.get('M').setValue('');
     
    // }
   
    // if(this.isCheckeddd == false ){
    //   this.DrugForm.get('N').setValue('');
     
    // }
    // if(this.isChecked == true || this.isCheckedd == true || this.isCheckeddd == true){
    //   this.DrugForm.get('time').patchValue('');
    //   this.DrugForm.get('Frequency').patchValue('');
    // }else{
    
    // }
 
   
    
  }
  druginfo(item){
    console.log(item.available_quantity)
    this.avlQty = item.available_quantity
   console.log(item.trade_name,item.drug_id)
   this.drug_id = item.drug_id
   this.s_drugId = item.drug_id;
   console.log(this.s_drugId)
  }
 Prescribe(data,formDirective: FormGroupDirective,){
   console.log(data)
  this.isprescribed= true;
  if (!this.DrugForm.valid ) {
    return false;
  }else{
    console.log(data)
    if(data.M != '' && data.A != '' && data.N != ''){
      if(data.M == 'M' && data.A == 'A' && data.N == 'N')
      {this.day = data.M+","+data.A+","+data.N}
      else if(data.M == 'M' && data.N == 'N'){this.day = data.M+","+data.N}
      else if(data.A == 'A' && data.N == 'N'){this.day = data.A+","+data.N}
      else if(data.M == 'M' && data.A == 'A'){this.day = data.M+","+data.A}
      else if(data.M == 'M' ){ this.day = data.M}
      else if(data.A == 'A' ){ this.day = data.A}
      else if(data.N == 'N' ){ this.day = data.N}
      else{}   
      console.log(this.day)
      console.log(this.day.split(','))
      console.log((this.day.split(',')).length)
     
      this.avalibleqty = data.Qty*data.Duration*(this.day.split(',')).length;
      console.log(this.avalibleqty);
      if(this.avlQty < this.avalibleqty ){
          alert('Not available in Pharmacy.Available Qty is ' + this.avlQty );
      }
        this._searchService.addPrescription_check(data,this.fi_Obj,this.day).subscribe(res=>{
        console.log(res)
        if(res['code']=='200'){
          this._notification.success('Prescribe Added successfully');
          this.getdruginfo(this.fi_Obj);
         // formDirective.reset();
          this.clearForm(formDirective)
          
        }else{
          this._notification.error('Prescribe Added fail');
        }
      })
      
     
    
    }
    
    else{
      // console.log(data.Qty*data.Duration*data.time)
      //  if(this.avlQty < data.Qty*data.Duration*data.time){
      //   alert('Not available in Pharmacy.Available Qty is ' + this.avlQty )
      // }
      this._searchService.addPrescription_select(data,this.fi_Obj).subscribe(res=>{
        console.log(res)
        if(res['code']=='200'){
          this._notification.success('Prescribe Added successfully');
          this.getdruginfo(this.fi_Obj);
          //formDirective.resetForm();
          this. clearForm(formDirective)
          
        }else{
          this._notification.error('Prescribe Added fail');
        }
      } )
    }
   
    
  
  }
  
}
selectionChange(option: MatListOption) {
  console.log(option.value);
  this.changedvalue = option.value
  if(this.changedvalue!=''){
    this.isChecked = false;
    this.isCheckedd = false;
    this.isCheckeddd = false;

  }
}
selectionChanges(option: MatListOption){
  this.freqvalue = option.value
  if(option.value == 'Minute' || option.value == 'Hour')
  {
    this.freqvaluee ='Day'
  }else
  {this.freqvaluee = this.freqvalue}
  if(this.freqvalue!=''){
    this.isChecked = false;
    this.isCheckedd = false;
    this.isCheckeddd = false;

  }
}
getdruginfo(fi_Obj){
  console.log(fi_Obj);
  this._searchService.get_latestdruglist(this.fi_Obj).subscribe((drug)=>{
    console.log(drug)
    this.Drug_allergy = drug.result.drug_allergy;
    console.log(this.Drug_allergy);
    console.log(drug.result.prescription);

    if(this.Drug_allergy != '')
    {
      this.allergyShow=true;
      this.cheked = true;
      this.DrugForm.get('allergy').setValue('Yes')
      this.DrugForm.get('drugAllergy').setValue(this.Drug_allergy);
    }else
    {
      this.checkedData = false;
      this.allergyShow=false;
    }

    // if(this.Drug_allergy != ''){ 
    //   this.allergyShow = true;
    //   this.cheked = true;
    //   // this.Drug_allergy = drug.result.drug_allergy;
    //   this.DrugForm.get('drugAllergy').setValue(this.Drug_allergy);
    //   // this.allergyShow = false
    //   // this.cheked = false
    //   // // this.Drug_allergy = drug.result.drug_allergy;
    //   // this.DrugForm.get('drugAllergy').setValue(this.Drug_allergy);
    //   // // this.DrugForm.get('allergy').setValue('yes');
    // }
    // else{
    //   this.allergyShow = true;
    //   this.cheked = true;
    //   // this.Drug_allergy = drug.result.drug_allergy;
    //   this.DrugForm.get('drugAllergy').setValue(this.Drug_allergy);
    // }
    // else if(this.Drug_allergy == 'No')
    // {  
    //   this.allergyShow = false;
    //   this.cheked = false;
    //   // this.Drug_allergy = '';
    //    this.DrugForm.get('drugAllergy').setValue('');
    // }else
    // {

    // }
    this.drugData = drug.result.prescription;
    this.dataSource = new MatTableDataSource(drug.result.prescription);

    // this.schedule = this.drugData
    this.dataSource.paginator = this.paginator;
    console.log(this.drugData )
    // for(var i=0;i<this.drugData.length;i++)
    // {
    //   console.log(this.drugData[i].day_schedule);
    //   console.log(this.drugData[i].day_schedule.split(","));
    //   console.log(this.drugData[i].day_schedule.split(",")[0]);
    //   // this.morning = this.drugData[i].day_schedule.split(",")[0]== 'M';
    //   if(this.drugData[i].day_schedule.split(",")[0]== 'M' )
    //   {
    //     this.latestDaySchedule = 'M';
    //   }
 
    //   // for(var j=0;j<this.drugData[i].day_schedule.split(",").length;j++)
    //   // {
    //   //   // console.log(this.drugData[i].day_schedule.split(",")[j]);
    //   //   // if(this.latestDaySchedule.push(this.drugData[i].day_schedule.split(",")[j]) == 'M'
    //   //   // && this.latestDaySchedule.push(this.drugData[i].day_schedule.split(",")[j]) == 'A'
    //   //   // && this.latestDaySchedule.push(this.drugData[i].day_schedule.split(",")[j]) == 'N')
    //   //   // {
    //   //   //   this.latestDaySchedule.push(this.drugData[i].day_schedule.split(",")[j]);
    //   //   // }
    //   //   // else if(this.latestDaySchedule.push(this.drugData[i].day_schedule.split(",")[j]) == 'A')
    //   //   // {
    //   //   //   this.latestDaySchedule.push(this.drugData[i].day_schedule.split(",")[j]);
    //   //   // }
    //   //   // else if(this.latestDaySchedule.push(this.drugData[i].day_schedule.split(",")[j]) == 'N')
    //   //   // {
    //   //   //   this.latestDaySchedule.push(this.drugData[i].day_schedule.split(",")[j]);
    //   //   // }
    //   //   // else{

    //   //   // }
        
    //   //   // if(this.drugData[i].day_schedule.split(",")[j] != null &&
    //   //   // this.drugData[i].day_schedule.split(",")[j] != false)
    //   //   // {
    //   //   //   this.latestDaySchedule = this.drugData[i].day_schedule.split(",")[j];
    //   //   //   console.log(this.latestDaySchedule);
    //   //   // }
       
    //   // }
    // }
  });
}
deletePre(id){
  // console.log(id);
   this._dailog.open(options).afterClosed().subscribe(res=>{
     //console.log(res)
     if(res){
       this._searchService.DeletePrescription(id).subscribe(data => {
         console.log(data);
         if(data['code'] == '200'){
           this._notification.success('Prescription Deleted successfully');
           this.getdruginfo(this.fi_Obj);
         // this.usersForm.reset();
        // formDirective.resetForm();
         }
         else{
           this._notification.error('Prescription Deletion failed');
         }
         
        })
     }
   })
 
}
updatePre(drug_id,patient_prescription_drug_id,patient_prescription_id,medicin_name,dosage_unit,day_schedule,mode,drug_dose,dose_course,day_dosage,dosage_frequency,preffered_intake,remarks){
   this.updatePreModel(drug_id,patient_prescription_drug_id,patient_prescription_id,medicin_name,dosage_unit,day_schedule,mode,drug_dose,dose_course,day_dosage,dosage_frequency,preffered_intake,remarks)
   .afterClosed().subscribe((res)=>{

      this.getdruginfo(this.fi_Obj);
      //console.log(this.getdruginfo(this.fi_Obj))
    
  })
}
updatePreModel(drug_id,patient_prescription_drug_id,patient_prescription_id,medicin_name,dosage_unit,day_schedule,mode,drug_dose,dose_course,day_dosage,dosage_frequency,preffered_intake,remarks){

  return this.dailog.open(EditprescribeComponent,
    {
     
      disableClose:true,
      panelClass:['editprescribe-dailog'],
      data:{
        drug_id:drug_id,
        medicin_name:medicin_name,
        patient_prescription_drug_id:patient_prescription_drug_id,
        patient_prescription_id:patient_prescription_id,
        dosage_unit:dosage_unit,
        mode:mode,
        drug_dose:drug_dose,
        dose_course:dose_course,
        day_dosage:day_dosage,
        dosage_frequency:dosage_frequency,
        remarks:remarks,
        preffered_intake:preffered_intake,
        day_schedule:day_schedule,
        package:this.fi_Obj
      }
  
      }
    );

}

getdrugSuggestions(fi_Obj){
  this._searchService.getdrugSuggestions(this.fi_Obj).subscribe((res)=>{
   console.log(res.result.drugs);
    this.drugsuggitions = res.result.drugs;
  })
}

selectedDrug(event: any=[],drug_id){
  console.log(event)
  console.log(drug_id)
  this.s_drugId = drug_id;
  this.suggestDrug = event;
  this.DrugForm.get('drugField').setValue(this.suggestDrug);
}
templateModel(drugListArray){
  return this.dailog.open(TemplateComponent,
    {
     
      disableClose:true,
      panelClass:['editprescribe-dailog'],
      data:{
        drugListArray:drugListArray,
        package:this.fi_Obj
  
      }
    }
    );
}
AddTemp(drugList){
  console.log(drugList);
  this.drugListArray = drugList.filteredData
  this.templateModel(this.drugListArray)
}
submitprint(){
 //console.log()
 let id = this.fi_Obj.appointment_id
  this._service.getshortsummary(id).subscribe((res) => {
   //console.log(res.result.pdf_name)
   let url = res.result.pdf_name
  window.open(url,'_blank',"width=500,height=500")
 })
 }
templatelistmodel(){
  return this.dailog.open(TemplatelistComponent,{
    disableClose:true,
    panelClass:['Template-dailog'],
    data:{
      package:this.fi_Obj
    }
  })
}
selectTemp(){
 this.templatelistmodel().afterClosed().subscribe((res)=>{
  this.getdruginfo(this.fi_Obj);
 })
}
setValue_d(e){
this.Diet_check = e.checked;
}
setValue_p(e){
  this.plan_check = e.checked;
  }
  setValue_f(e){
    this.followupdate = e.checked;
    }


}
