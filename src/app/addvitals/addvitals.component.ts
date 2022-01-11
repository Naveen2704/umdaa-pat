import { Component, OnInit , Inject, ViewChild} from '@angular/core';
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';

import { FormBuilder, FormGroup, FormArray, AbstractControl, FormControl, FormGroupDirective, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatDatepickerInputEvent, DateAdapter, MAT_DATE_FORMATS, MatRadioChange } from '@angular/material';

import { VitlasService } from './vitlas.service';
import { NotificationService } from '../shared/notification.service';
import { OpendobComponent } from '../opendob/opendob.component';
import { ClosedobComponent } from '../closedob/closedob.component';
import {  MY_DATE_FORMATS, MyDateAdapter,  } from '../format-datepicker';
import { ActivatedRoute } from '@angular/router';
import { PatientserviceService } from '../service/patientservice.service';
import { VitalsComponent } from '../vitals/vitals.component';
import { HopiComponent } from '../hopi/hopi.component';
import Swal from 'sweetalert2'

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];










@Component({
  selector: 'app-addvitals',
  templateUrl: './addvitals.component.html',
  styleUrls: ['./addvitals.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MyDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
],
})
export class AddvitalsComponent implements OnInit {
  // @ViewChild(HopiComponent,{static: false}) private _child: 
  // HopiComponent;
  // @ViewChild(VitalsComponent,{static: false}) private _child:  VitalsComponent; 
  projects = [
    { name: 'Project 1', number1: '1', number2: '2', number3: '3' },
    { name: 'Project 2', number1: '1', number2: '2', number3: '3' },
    { name: 'Project 3', number1: '1', number2: '2', number3: '3' },
    { name: 'Project 4', number1: '1', number2: '2', number3: '3' },
    { name: 'Project 5', number1: '1', number2: '2', number3: '3' },
    { name: 'Project 6', number1: '1', number2: '2', number3: '3' },
    { name: 'Project 7', number1: '1', number2: '2', number3: '3' }
  ];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;


  bmiForm: any;
  bsaForm: any;
  userForm: FormGroup;
  prcolor:any;
  rrcolor:any;
  tempcolor:any;
  sao2color:any;
  bplcolor:any;
  bphcolor:any;
  heightcolor:any;
  weightcolor:any;
  whcolor: any;
  pulse:number;
  sao2:number;
  bpl: number;
  temp:number;
  bph: number;
  rr: number;
  height: number;
  weight: number;
  wh: number;
  selectedValue:string;
  phaseform:FormGroup;
  vitalsdata:any=[];
  addNew: FormArray;
  hide: boolean = false;
  immune_hide: boolean = false;
  SelctedDate: any;
  sDate: any;
  EDD: any;
  system_date: Date;
  Dt: any;
  conMDate: any;
  conFullDate: any;
  todayDate: any;
  diffTime: any;
  diffDays: number;
  weeks: number;
  days: number;
  pod: string;
  emonth: any;
  minDate: Date;
  maxDate: Date;
  cal_form: FormGroup;

  getDate: Date;
  DataDate: string;
  DataEdd: any;
  Datapod: any;
  calArray: any;
  addcalItems: FormArray;

  minFromDate= new Date(2019 , 1 , 1);
  maxToDate = new Date();
  Condition: string;
  Conditionn: string;
  height_in_metres: number;
  bmi: number;
  bsa_formula: number;
  bsa_result: number;
  pulseData: number;
  dob_form: FormGroup;
  immune_tabel: boolean = false;
  checkvalue: boolean;
  imu_list: any=[];
  datePick:any;
  dob:any;
  obj: any;
  month: any;
  isSubmitted = false;
  selectedLink: any; 
  isselectedLink: boolean;
  status: any;
  disabled:boolean = false;
  diffpogdays: number;
  department_id: any;
  constructor(private dateAdapter: DateAdapter<Date>,@Inject(MAT_DIALOG_DATA) public result,private service: PatientserviceService,private route: ActivatedRoute,private notification : NotificationService,private _dailogRef:MatDialogRef<AddvitalsComponent>,private _service:VitlasService,private fb: FormBuilder, private matDialog: MatDialog,public dialog: MatDialogRef<AddvitalsComponent>,@Inject(MAT_DIALOG_DATA) public data: any) 
  { 

    this.dateAdapter.setLocale('en-GB');
    this.userForm = this.fb.group({

      
  })

  console.log(result.status)
  this.status = result.status
  if(this.status ==='closed'){
    this.disabled = true
  }
}
  ngOnInit() {
    let productid = this.route.snapshot.paramMap.get('id');
    console.log(productid)
    console.log((localStorage.getItem('patientInfo')));
    console.log(JSON.parse(localStorage.getItem('patientInfo')));
    var department = JSON.parse(localStorage.getItem('patientInfo'));
    this.department_id = department.department;
    console.log(this.department_id);
    console.log(department);
    this.route.params.subscribe(params => {

      let productid = params['id'];
   
     console.log(productid)
     this.service.GetPatient(productid).subscribe(data =>{
       console.log(data)
       console.log(data.result['parameters'][0])
       this.obj = data.result['parameters'][0]
     })
})

    this.cal_form = new FormGroup({
      datePick: new FormControl(''),
      EDD: new FormControl(''),
      pod: new FormControl(''),
    })
    this.dob_form = new FormGroup({
      dob: new FormControl(new Date())
    })
    this.phaseform = this.fb.group(
      {
        pulse: new FormControl(''),
        bp1: new FormControl(),
        bp2: new FormControl(),
        rr: new FormControl(),
        temp: new FormControl(),
        sao2: new FormControl(),
        height: new FormControl(),
        weight: new FormControl(),
        bmi: new FormControl(),
        bsa: new FormControl(),
        wh: new FormControl(),
        Allergy: new FormControl('',Validators.required),
        // Allergy: new FormControl(''),
        default1: new FormControl(),
        default2: new FormControl(),
        drugallergy: new FormControl(''),
        addRow: this.fb.group({
          Array: this.fb.array([])
        }),
        cal:this.fb.array([
          // this.Createuop()
       ])
       
    });

  
    
  }

  private atLeastOneValidator = () => {
    return (controlGroup) => {
        let controls = controlGroup.controls;
        if ( controls ) {
            let theOne = Object.keys(controls).find(key=> controls[key].value !== undefined);
            if ( !theOne ) {
                return {
                    atLeastOneRequired : {
                        text : 'At least one should be selected'
                    }
                }
            }
        }
        return null;
    };
};
openHelp(){
  Swal.fire('','Enter at least one vital,<br> BMI & BSA Are automatically calculated <br>  Abnormal vitals are seen in red <br> Drug allergy is madatory <br> Click on calculator icon for EDD,Immunization Schedule')
}
  get gender() {
    return this.phaseform.get('Allergy');
}


  checkValid() {
    if(this.phaseform.get('pulse').valid || this.phaseform.get('rr').valid || this.phaseform.get('weight').valid || this.phaseform.get('bp1').valid|| this.phaseform.get('bp2').valid
    || this.phaseform.get('height').valid   || this.phaseform.get('sao2').valid || this.phaseform.get('temp').valid || this.phaseform.get('drugallergy').valid)  
    {
      return false;
    } 
   else{
      return true;
    }
  }

  getuops(){
    return (<FormArray>this.phaseform.get('cal')).controls
   }
   radio(event: MatRadioChange){
     console.log(event)
   }
  AddCalculator()
  {
     
     return this.hide = true;
  
     
  }
  addimmune(){
   
    return this.immune_hide = true;
  }

  cal_submit(data,formDirective:FormGroupDirective)
  {
    this.hide = false;
   console.log(data.datePick)
   //var date = new Date(this.datePick);
   //console.log(date)
   this.month = this.datePick.getMonth()+1;
  

   this.DataDate = (this.datePick.getDate()<= 10 ? '0' : '')+this.datePick.getDate()+"/"+(this.month<= 10 ? '0' : '')+this.month+"/"+this.datePick.getFullYear();
   console.log(this.DataDate)
   this.DataEdd =  data.EDD;
   this.Datapod = data.pod;
    //this.hide=true;
    this.addcalItems = (this.phaseform.get('cal') as FormArray)
    this.addcalItems.push(this.fb.group({
      LMP: new FormControl(),
      EDD: new FormControl(),
      POD:new FormControl()
    }))
 //  console.log(this.DataDate )
    formDirective.resetForm()
  }
  cal_close(){
    this.hide = false;
  }
  imu_close(){
    this.immune_hide = false;
  }
  
  addEvent(type: any, event: MatDatepickerInputEvent<Date>) {
   // console.log(event.value)
  //  this.minDate = new Date(new Date().getFullYear(), 0);
  //   this.maxDate = new Date(new Date().getFullYear()-1, 11);
   this.todayDate = new Date()
    this.SelctedDate = event.value
    console.log(new Date(this.SelctedDate))
    this.datePick = new Date(this.SelctedDate)
    this.conMDate = new Date(this.SelctedDate.setMonth(this.SelctedDate.getMonth()+9))
    this.conFullDate = new Date(this.conMDate.setDate(this.conMDate.getDate()+7))
    this.emonth = this.conFullDate.getMonth()+1
    this.EDD = (this.conFullDate.getDate()<= 9 ? '0' : '')+this.conFullDate.getDate()+"/"+(this.emonth<= 9 ? '0' : '')+this.emonth+"/"+this.conFullDate.getFullYear();
    console.log(this.EDD)
    this.diffTime = Math.abs(this.todayDate.getTime() - this.datePick.getTime());
    this.diffDays = Math.ceil(this.diffTime / (1000 * 60 * 60 * 24)); 
     this.diffpogdays  =   Math.round((this.todayDate -  this.datePick ) / (7 * 24 * 60 * 60 * 1000))
    console.log(this.diffpogdays)
    console.log()
    this.weeks = Math.floor(this.diffDays/7)
    this.days = Math.floor(this.diffDays%7)
    this.pod = this.weeks+" Week(s) "+this.days+" Day(s)"

  }
  AddDob(type: any, event: MatDatepickerInputEvent<Date>) {
    console.log(event.value)
  
 
   }
   submit_dob(data,formDirective:FormGroupDirective){
    console.log(new Date(data.dob))
    this.immune_tabel = true

    this._service.getImuCal(data,this.result).subscribe((data)=>{
      console.log(data.result.immunazation_list)
      this.imu_list = data.result.immunazation_list
      console.log(this.imu_list)
    });
    this.getImunlist();
   }
   getImunlist() {
   this._service.updatedcal(this.result).subscribe((data) =>{
       console.log(data)
        this.imu_list = data.result.immunazation_list
        console.log(this.imu_list)
     })
   }
  submit(data,formDirective:FormGroupDirective){
    console.log(data)
    console.log(this.phaseform.get('Allergy').value)
    // if(this.phaseform.get('Allergy').value === 'No'){
    //  var drugData = this.phaseform.get('drugallergy').setValue('No')
    // }
    // if(this.phaseform.get('Allergy').value === 'yes'){
    //   var drugData = this.phaseform.get('drugallergy').setValue(data.drugallergy)
    // }
// console.log(this.phaseform.get('pulse').value);
    // this.phaseform.setValidators(this.atLeastOneValidator())


    this.isSubmitted = true;
    if (!this.phaseform.valid) {
      return false;
    }
    // if(this.phaseform.get('drugallergy').value == ''){
    //   alert("Please Add Drugs");
    // }
    // else{
      if(this.phaseform.get('pulse').value == undefined && this.phaseform.get('rr').value == undefined &&
      this.phaseform.get('weight').value == undefined && this.phaseform.get('bp1').value== undefined && 
      this.phaseform.get('bp2').value== undefined
    && this.phaseform.get('height').value == undefined  &&
      this.phaseform.get('sao2').value == undefined&& this.phaseform.get('temp').value== undefined && this.phaseform.get('wh').value== undefined )
    // if(this.phaseform.get('pulse').value == undefined && this.phaseform.get('rr').value == undefined  )
     {
        alert("Please Enter atleast one field to insert a vital record");
     } 
     else{
      Object.keys(data).forEach((key) => (data[key] == null) && delete data[key]);
      this._service.saveData(data,this.result).subscribe(
        (res)=>{
          // this._child.ngOnInit();
          // this.vitalsdata = data['result'].patient_vitals_insert;
          console.log(res)
          if(res['code']=='200'){
       
            formDirective.resetForm()
            this.notification.success('Vitals Inserted Successfully')
            // Swal.fire('','Vitals Added Successfully','success')
        
            this.close();
            
          }
          else{
            this.notification.error('Vitals Inserted Failed');
            // Swal.fire('','Vitals Inserted Failed','error')
          }
          
        });
     }
    
    // }
    
  }
  close() {
    this._dailogRef.close();
   
  }

        //pr
  valuepr(e) {
    // console.log(e);
    if (this.pulse > 100 || this.pulse < 60 ) {
    this.prcolor = 'red';
    this.Condition = 'Abnormal'
    }
    // else if(e.value == '' ){
    //   this.Condition = ''
    // }
    // else if(!this.pulse){
    //   this.Condition = ''
    // }
    else {
    this.prcolor = 'black';
    this.Condition = 'Normal'
    }       
}
      // bpl
valuebpl(e) {
  if (this.bpl > 99 || this.bpl < 80) {
   // console.log(this.bpl);
  this.bplcolor = 'red';
  this.Condition = 'Abnormal'
  }
  else {
  this.bplcolor = 'black';
  this.Condition = 'Normal'
  }       
}
      // bph
valuebph(e) {
  
  if (this.bph > 140 || this.bph < 120 ) {
    ///console.log(this.bph);
  this.bphcolor = 'red';
  this.Condition = 'Abnormal'
  }
  else {
  this.bphcolor = 'black';
  this.Condition = 'Normal'
  }       
}
        // respiratory rate
valuerr(e) {
  if (this.rr > 22 || this.rr < 12) {
   // console.log(this.rr);
  this.rrcolor = 'red';
  this.Condition = 'Abnormal'
  }
  else {
  this.rrcolor = 'black';
  this.Condition = 'Normal'
  }    
}
        // temperature
valuetemp(e) {
  if (this.temp > 99 || this.temp < 97) {
   // console.log(this.temp);
  this.tempcolor = 'red';
  this.Condition = 'Abnormal'
  }
  else {
  this.tempcolor = 'black';
  this.Condition = 'Normal'
  }    
}
        // sao2
valuesao2(e) {
  if (this.sao2 > 100 || this.sao2 < 95) {
  ///  console.log(this.sao2);
  this.sao2color = 'red';
  this.Condition = 'Abnormal'
  }
  else {
  this.sao2color = 'black';
  this.Condition = 'Normal'
  }    
}
        // height
 valueheight(e) {
  if (this.height > 213 || this.height < 152) {
  //  console.log(this.height);
  this.heightcolor = 'red';
  this.Condition = 'Abnormal'
  }
  else {
  this.heightcolor = 'black';
  this.Condition = 'Normal'
  }    
}
        // weight
valueweight(e) {
  if (this.weight > 113 || this.weight < 45) {
   // console.log(this.weight);
  this.weightcolor = 'red';
  this.Condition = 'Abnormal'
  }
  else {
  this.weightcolor = 'black';
  this.Condition = 'Normal'
  } 
    this. height_in_metres = (this.height*0.01)*(this.height*0.01);
    this.bmi = Math.round(this.weight/this.height_in_metres);   

    this.phaseform.get('bmi').setValue(this.bmi || null);

     this.bsa_formula= Math.round(this.weight*this.height/3600);
      //console.log(result)
      this.bsa_result = Math.round(Math.sqrt(this.weight*this.height/3600));
      this.phaseform.get('bsa').setValue(this.bsa_result || null);
} 

  valuewh(e) {
    if (this.wh > 0.9 || this.wh < 0) {
      //console.log(this.wh);
    this.whcolor = 'red';
    this.Condition = 'Abnormal'
    }
    else {
    this.whcolor = 'black';
    this.Condition = 'Normal'
    }    
  }
         
setradio(e: string): void {
    this.selectedLink = e; 

    console.log(this.selectedLink) 
    if(this.selectedLink == 'New'){
      this.phaseform.get('Allergy').setValue("yes");
      this.isselectedLink = true
      console.log(this.phaseform.get('Allergy').value)
    }
    if( this.selectedLink == 'Renewal'){
      this.isselectedLink = false
      this.phaseform.get('Allergy').setValue("No");
        this.phaseform.get('drugallergy').clearValidators();
        this.phaseform.get('drugallergy').updateValueAndValidity();
        console.log(this.phaseform.get('Allergy').value)
    }
}  
isSelected(name: string): boolean {  
    if (!this.selectedLink) { 
       return false;  
    }    
    return (this.selectedLink === name); 
  }


  addPhase() {
    return this.fb.group({
      phaseType: [''],
      phaseValue: ['']
    });
  }

  addMorePhase() {
    this.phaseArray.push(this.addPhase());
  }
  remove(rowIndex:number) {
      this.phaseArray.removeAt(rowIndex)
    }
 
    remove_cal(rowIndex:number){
      this.addcalItems.removeAt(rowIndex)
    }
  onChange(val, index: number) {
    if (val === 'EMS') {
      (<FormGroup>this.phaseArray.at(index))
        .addControl('phaseValue1', this.fb.control([]));
    } else {
      (<FormGroup>this.phaseArray.at(index))
        .removeControl('phaseValue1');
    }
  }

  hasPhaseValue1At(index) {
    return (<FormGroup>this.phaseArray.at(index)).get('phaseValue1') ? true : false;
  }

  get phaseArray() {
    const control = <FormArray>(<FormGroup>this.phaseform.get('addRow')).get('Array');
    return control;
  }

  openCheck(e: HTMLInputElement,id,due_on)
  {
    console.log(e,id);
    this.checkvalue = e.checked

    if(this.checkvalue == true){
      this.opendob(id,due_on);
    }
    // else if(this.checkvalue == false){
    //   this.closedob()
    // }
    else{
      this.deleteGiven(id)
    }
   // this.deleteGiven(id);
  }

  opendob(id,due_on): void{
    const dialogRef = this.matDialog.open(OpendobComponent,{
     
      disableClose:true,
      data:{
        id:id,
        due_on:due_on,
        package:this.result
      }
  
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
       // console.log(this._service.getRefreshData())
        //this.getImunlist()
        this.getImunlist()
      });

  }
 
  closedob(){
    return this.matDialog.open(ClosedobComponent,{
     
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //  // console.log(this._service.getRefreshData())
    //   //this.getImunlist()
    //   this.getImunlist()
    // });
  }

  deleteGiven(id){
    console.log(id)
    this.closedob().afterClosed().subscribe(res=>{
      console.log(res)
      if(res == true){
      
        this._service.delGivenDate(id,this.result).subscribe((res)=>{
          console.log(res); 
          console.log(res.message);//
          this.getImunlist()
          
        });
      }
    })
  }
  // setGiven(formDirective:FormGroupDirective){
  //   this.service.delGivenDate(this.result).subscribe((res)=>{
  //     console.log(res); //
  //     this.givenon_close()
      
  //   })
  // }

}