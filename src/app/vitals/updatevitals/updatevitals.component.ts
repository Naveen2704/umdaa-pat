
// import { Component, OnInit , Inject} from '@angular/core';
// import {MatDialog,MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
// // import { VitalsmodalService } from '../service/vitalsmodal.service';
// import { FormBuilder, FormGroup, FormArray, AbstractControl, FormControl, FormGroupDirective } from '@angular/forms';
// import { MatDatepickerInputEvent, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
// import { empty } from 'rxjs';

// import { NotificationService } from '../../shared/notification.service';

// import { VitlasService } from 'src/app/addvitals/vitlas.service';
// import { OpendobComponent } from 'src/app/opendob/opendob.component';
// import { ClosedobComponent } from 'src/app/closedob/closedob.component';
// import { tap } from 'rxjs/operators';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];











// @Component({
//   selector: 'app-updatevitals',
//   templateUrl: './updatevitals.component.html',
//   styleUrls: ['./updatevitals.component.css']
// })
// export class UpdatevitalsComponent implements OnInit {

//   projects = [
//     { name: 'Project 1', number1: '1', number2: '2', number3: '3' },
//     { name: 'Project 2', number1: '1', number2: '2', number3: '3' },
//     { name: 'Project 3', number1: '1', number2: '2', number3: '3' },
//     { name: 'Project 4', number1: '1', number2: '2', number3: '3' },
//     { name: 'Project 5', number1: '1', number2: '2', number3: '3' },
//     { name: 'Project 6', number1: '1', number2: '2', number3: '3' },
//     { name: 'Project 7', number1: '1', number2: '2', number3: '3' }
//   ];

//   displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
//   dataSource = ELEMENT_DATA;


//   bmiForm: any;
//   bsaForm: any;
//   userForm: FormGroup;
//   prcolor:any;
//   rrcolor:any;
//   tempcolor:any;
//   sao2color:any;
//   bplcolor:any;
//   bphcolor:any;
//   heightcolor:any;
//   weightcolor:any;
//   whcolor: any;
//   pulse:number;
//   sao2:number;
//   bpl: number;
//   temp:number;
//   bph: number;
//   rr: number;
//   height: number;
//   weight: number;
//   wh: number;
//   selectedValue:string;
//   phaseform:FormGroup;
//   vitalsdata:any=[];
//   addNew: FormArray;
//   hide: boolean = false;
//   immune_hide: boolean = false;
//   SelctedDate: any;
//   sDate: any;
//   EDD: any;
//   system_date: Date;
//   Dt: any;
//   conMDate: any;
//   conFullDate: any;
//   todayDate: any;
//   diffTime: any;
//   diffDays: number;
//   weeks: number;
//   days: number;
//   pod: string;
//   emonth: any;
//   minDate: Date;
//   maxDate: Date;
//   cal_form: FormGroup;

//   getDate: Date;
//   DataDate: string;
//   DataEdd: any;
//   Datapod: any;
//   calArray: any;
//   addcalItems: FormArray;

//   minFromDate= new Date(2019 , 1 , 1);
//   maxToDate = new Date();
//   Condition: string;
//   Conditionn: string;
//   height_in_metres: number;
//   bmi: number;
//   bsa_formula: number;
//   bsa_result: number;
//   pulseData: number;
//   dob_form: FormGroup;
//   immune_tabel: boolean = false;
//   checkvalue: boolean;
//   imu_list: any=[];
//   datePick:any;
//   dob:any;
//   vitalsSignsdata: any;
//   updateVitals: any;
//   vitals: any;
//   name: any;
//   value: any;
//   PRname: any;
//   PRvalue: any;
//   BPvalue: any;
//   BPname: any;
//   constructor(private notification : NotificationService, private _dailogRef:MatDialogRef<UpdatevitalsComponent>,private _service:VitlasService,private fb: FormBuilder, private matDialog: MatDialog,public dialog: MatDialogRef<UpdatevitalsComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { this.userForm = this.fb.group({
//     name: [],
    
//   })}
//   ngOnInit() {
//     // this.getImunlist()


//     // this._service.getRefreshData$.subscribe(data =>{
//     //   console.log(data)
//     //   // this.imu_list = data.result.immunazation_list
//     //   // console.log(this.imu_list)
//     // })
//  this.getvitals()

//     this.cal_form = new FormGroup({
//       datePick: new FormControl(''),
//       EDD: new FormControl(''),
//       pod: new FormControl(''),
//     })
//     this.dob_form = new FormGroup({
//       dob: new FormControl(new Date())
//     })
//     this.phaseform = new FormGroup(
//       {
//         pulse: new FormControl(),
//         bp1: new FormControl(),
//         bp2: new FormControl(),
//         rr: new FormControl(),
//         temp: new FormControl(),
//         sao2: new FormControl(),
//         height: new FormControl(),
//         weight: new FormControl(),
//         bmi: new FormControl(),
//         bsa: new FormControl(),
//         wh: new FormControl(),
//         default1: new FormControl(),
//         default2: new FormControl(),
//         drugallergy: new FormControl(),
//         details: this.fb.group({
//           Array: this.fb.array([])
//         }),
//         addRow: this.fb.group({
//           Array: this.fb.array([])
//         }),
//         cal:this.fb.array([
//           // this.Createuop()
//        ])
       
//     });
    
//   }

  

//   checkValid() {
//     if(this.phaseform.get('pulse').valid || this.phaseform.get('rr').valid || this.phaseform.get('weight').valid || this.phaseform.get('bp1').valid|| this.phaseform.get('bp2').valid
//     || this.phaseform.get('height').valid  || this.phaseform.get('drugallergy').valid || this.phaseform.get('sao2').valid || this.phaseform.get('temp').valid)  
//     {
//       return false;
//     } else {
//       return true;
//     }
//   }

//   getuops(){
//     return (<FormArray>this.phaseform.get('cal')).controls
//    }

//   AddCalculator()
//   {
     
//      return this.hide = true;
  
     
//   }
//   addimmune(){
   
//     return this.immune_hide = true;
//   }

//   cal_submit(data,formDirective:FormGroupDirective)
//   {
//     this.hide = false;
//   // console.log(data)
//    var date = new Date(data.datePick);
//    var mm = date.getMonth();
//    var year = date.getFullYear();
//    var days = date.getDay();

//    this.DataDate = (days + "/" +  mm + "/" + year)
//    this.DataEdd =  data.EDD;
//    this.Datapod = data.pod;
//     //this.hide=true;
//     this.addcalItems = (this.phaseform.get('cal') as FormArray)
//     this.addcalItems.push(this.fb.group({
//       LMP: new FormControl(),
//       EDD: new FormControl(),
//       POD:new FormControl()
//     }))
//  //  console.log(this.DataDate )
//     formDirective.resetForm()
//   }
//   cal_close(){
//     this.hide = false;
//   }
//   imu_close(){
//     this.immune_hide = false;
//   }
//   addEvent(type: any, event: MatDatepickerInputEvent<Date>) {
//    // console.log(event.value)
//   //  this.minDate = new Date(new Date().getFullYear(), 0);
//   //   this.maxDate = new Date(new Date().getFullYear()-1, 11);
//    this.todayDate = new Date()
//     this.SelctedDate = event.value
//    // console.log(new Date(this.SelctedDate))
//     this.conMDate = new Date(this.SelctedDate.setMonth(this.SelctedDate.getMonth()+9))
//     this.conFullDate = new Date(this.conMDate.setDate(this.conMDate.getDate()+7))
//     this.emonth = this.conFullDate.getMonth()+1
//     this.EDD = this.conFullDate.getDate()+"/"+this.emonth+"/"+this.conFullDate.getFullYear()
//     this.diffTime = Math.abs(new Date(this.conFullDate).getTime() - new Date(this.todayDate).getTime());
//     this.diffDays = Math.ceil(this.diffTime / (1000 * 60 * 60 * 24)); 
//     this.weeks = Math.floor(this.diffDays/7)
//     this.days = Math.floor(this.diffDays%7)
//     this.pod = this.weeks+" Week(s) "+this.days+" Day(s)"

//   }
//   AddDob(type: any, event: MatDatepickerInputEvent<Date>) {
//     console.log(event.value)
  
 
//    }
//    submit_dob(data,formDirective:FormGroupDirective){
//     console.log(new Date(data.dob))
//     this.immune_tabel = true

//     this._service.getImuCal(data).subscribe((data)=>{
//       console.log(data.result.immunazation_list)
//       this.imu_list = data.result.immunazation_list
//       console.log(this.imu_list)
//     });
//     this.getImunlist();
//    }
//    getImunlist() {
//    this._service.updatedcal().subscribe((data) =>{
//        console.log(data)
//         this.imu_list = data.result.immunazation_list
//         console.log(this.imu_list)
//      })
//    }
//   submit(data,formDirective:FormGroupDirective){
//     Object.keys(data).forEach((key) => (data[key] == null) && delete data[key]);
//     this._service.saveData(data).subscribe(
//       (res)=>{
//         // this.vitalsdata = data['result'].patient_vitals_insert;
//         console.log(res)
//         if(res['code']=='200'){
//           formDirective.resetForm()
//           this.notification.success('Vitals inserted Successfully')
//           this.close();
          
//         }
//         else{
//           this.notification.error('Vitals inserted Failed')
//         }
        
//       });
//   }
//   close() {
//     this._dailogRef.close();
   
//   }

//         //pr
//   valuepr() {
//     // console.log(e);
//     if (this.pulse > 100 || this.pulse < 60 ) {
//     this.prcolor = 'red';
//     this.Condition = 'Abnormal'
//     }
//     // else if(e.value == '' ){
//     //   this.Condition = ''
//     // }
//     // else if(!this.pulse){
//     //   this.Condition = ''
//     // }
//     else {
//     this.prcolor = 'black';
//     this.Condition = 'Normal'
//     }       
// }
//       // bpl
// valuebpl(e) {
//   if (this.bpl > 140 || this.bpl < 120) {
//    // console.log(this.bpl);
//   this.bplcolor = 'red';
//   this.Condition = 'Abnormal'
//   }
//   else {
//   this.bplcolor = 'black';
//   this.Condition = 'Normal'
//   }       
// }
//       // bph
// valuebph(e) {
//   if (this.bph > 99 || this.bph < 80) {
//     ///console.log(this.bph);
//   this.bphcolor = 'red';
//   this.Condition = 'Abnormal'
//   }
//   else {
//   this.bphcolor = 'black';
//   this.Condition = 'Normal'
//   }       
// }
//         // respiratory rate
// valuerr(e) {
//   if (this.rr > 22 || this.rr < 12) {
//    // console.log(this.rr);
//   this.rrcolor = 'red';
//   this.Condition = 'Abnormal'
//   }
//   else {
//   this.rrcolor = 'black';
//   this.Condition = 'Normal'
//   }    
// }
//         // temperature
// valuetemp(e) {
//   if (this.temp > 99 || this.temp < 97) {
//    // console.log(this.temp);
//   this.tempcolor = 'red';
//   this.Condition = 'Abnormal'
//   }
//   else {
//   this.tempcolor = 'black';
//   this.Condition = 'Normal'
//   }    
// }
//         // sao2
// valuesao2(e) {
//   if (this.sao2 > 100 || this.sao2 < 95) {
//   ///  console.log(this.sao2);
//   this.sao2color = 'red';
//   this.Condition = 'Abnormal'
//   }
//   else {
//   this.sao2color = 'black';
//   this.Condition = 'Normal'
//   }    
// }
//         // height
//  valueheight(e) {
//   if (this.height > 213 || this.height < 152) {
//   //  console.log(this.height);
//   this.heightcolor = 'red';
//   this.Condition = 'Abnormal'
//   }
//   else {
//   this.heightcolor = 'black';
//   this.Condition = 'Normal'
//   }    
// }
//         // weight
// valueweight(e) {
//   if (this.weight > 113 || this.weight < 45) {
//    // console.log(this.weight);
//   this.weightcolor = 'red';
//   this.Condition = 'Abnormal'
//   }
//   else {
//   this.weightcolor = 'black';
//   this.Condition = 'Normal'
//   } 
//     this. height_in_metres = (this.height*0.01)*(this.height*0.01);
//     this.bmi = Math.round(this.weight/this.height_in_metres);   

//     this.phaseform.get('bmi').setValue(this.bmi || null);

//      this.bsa_formula= Math.round(this.weight*this.height/3600);
//       //console.log(result)
//       this.bsa_result = Math.round(Math.sqrt(this.weight*this.height/3600));
//       this.phaseform.get('bsa').setValue(this.bsa_result || null);
// } 

//   valuewh(e) {
//     if (this.wh > 0.9 || this.wh < 0) {
//       //console.log(this.wh);
//     this.whcolor = 'red';
//     this.Condition = 'Abnormal'
//     }
//     else {
//     this.whcolor = 'black';
//     this.Condition = 'Normal'
//     }    
//   }
//   private selectedLink: string="New";        
// setradio(e: string): void {
//     this.selectedLink = e;  
// }  
// isSelected(name: string): boolean {  
//     if (!this.selectedLink) { 
//        return false;  
//     }    
//     return (this.selectedLink === name); 
//   }


//   addPhase() {
//     return this.fb.group({
//       phaseType: [''],
//       phaseValue: ['']
//     });
//   }

//   addMorePhase() {
//     this.phaseArray.push(this.addPhase());
//   }
//   remove(rowIndex:number) {
//       this.phaseArray.removeAt(rowIndex)
//     }
 
//     remove_cal(rowIndex:number){
//       this.addcalItems.removeAt(rowIndex)
//     }
//   onChange(val, index: number) {
//     if (val === 'EMS') {
//       (<FormGroup>this.phaseArray.at(index))
//         .addControl('phaseValue1', this.fb.control([]));
//     } else {
//       (<FormGroup>this.phaseArray.at(index))
//         .removeControl('phaseValue1');
//     }
//   }

//   hasPhaseValue1At(index) {
//     return (<FormGroup>this.phaseArray.at(index)).get('phaseValue1') ? true : false;
//   }

//   get phaseArray() {
//     const control = <FormArray>(<FormGroup>this.phaseform.get('addRow')).get('Array');
//     return control;
//   }

//   openCheck(e: HTMLInputElement,id,due_on)
//   {
//     console.log(e,id);
//     this.checkvalue = e.checked

//     if(this.checkvalue == true){
//       this.opendob(id,due_on);
//     }
//     // else if(this.checkvalue == false){
//     //   this.closedob()
//     // }
//     else{
//       this.deleteGiven(id)
//     }
//    // this.deleteGiven(id);
//   }

//   opendob(id,due_on): void{
//     const dialogRef = this.matDialog.open(OpendobComponent,{
     
//       disableClose:true,
//       data:{
//         id:id,
//         due_on:due_on
//       }
  
//       });
//       dialogRef.afterClosed().subscribe(result => {
//         console.log('The dialog was closed');
//        // console.log(this._service.getRefreshData())
//         //this.getImunlist()
//         this.getImunlist()
//       });

//   }
 
//   closedob(){
//     return this.matDialog.open(ClosedobComponent,{
     
//     });
//     // dialogRef.afterClosed().subscribe(result => {
//     //   console.log('The dialog was closed');
//     //  // console.log(this._service.getRefreshData())
//     //   //this.getImunlist()
//     //   this.getImunlist()
//     // });
//   }

//   // deleteGiven(id){
//   //   console.log(id)
//   //   this.closedob().afterClosed().subscribe(res=>{
//   //     console.log(res)
//   //     if(res == true){
//   //       console.log("phani");
//   //       this._service.delGivenDate(id).subscribe((res)=>{
//   //         console.log(res); 
//   //         console.log(res.message);//
//   //         this.getImunlist()
          
//   //       });
//   //     }
//   //   })
//   // }
//   // setGiven(formDirective:FormGroupDirective){
//   //   this.service.delGivenDate(this.result).subscribe((res)=>{
//   //     console.log(res); //
//   //     this.givenon_close()
      
//   //   })
//   // }
//   // getvitals(){


//   //   this._service.getData().subscribe((data)=>{
  
//   //     console.log(data)
    
//   //     if(data['code'] == '200'){
    
//   //       this.vitalsSignsdata = data.result.vitals;
//   //       console.log(this.vitalsSignsdata )
//   //       console.log(this.vitalsSignsdata.slice(-1)[0].vital_signs[0].value)
//   //       // this.vitals_status =data.result.vitals.vital_signs.status
//   //       // console.log( this.vitalsSignsdata[0].vital_sign_recording_date_time)
//   //       this.updateVitals = this.vitalsSignsdata.slice(-1)[0].vital_signs;
//   //       console.log(this.updateVitals);

//   //      for(var i=0;i<this.updateVitals.length;i++)
//   //         {
//   //           if(this.updateVitals[i].vital_sign_name == "PR"){
//   //             this.updateVitals.pipe(tap(data => this.phaseform.patchValue(this.updateVitals[i].value))) 
//   //           }
//   //           if(this.updateVitals[i].vital_sign_name == "DBP"){
//   //             return this.phaseform.get('bp1').patchValue(this.updateVitals[i].value)
//   //           }
//   //           }        // console.log(this.updateVitals[0].vital_sign_name,this.updateVitals[0].value);
//   //       // this.name = this.updateVitals[0].vital_sign_name;
//   //       // this.value = this.updateVitals[0].value;
//   //       // console.log(this.updateVitals.length)
//   //       // for(var i=0;i<this.updateVitals.length;i++)
//   //       // {
//   //       //   if(this.updateVitals[i].vital_sign_name == "PR")
//   //       //   {
//   //       //     this.PRvalue = this.updateVitals[i].value;
//   //       //   }
       
//   //       //   else
//   //       //   {
//   //       //     this.PRvalue = '';
//   //       //   }

//   //       //   if(this.updateVitals[i].vital_sign_name == "RR")
//   //       //   {
//   //       //     this.BPvalue = this.updateVitals[i].value;
//   //       //   }
//   //       //   else
//   //       //   {
            
//   //       //     this.BPvalue = '';
//   //       //   }
//   //       //   //  this.value = this.updateVitals[i].value;
//   //       //   // this.name = [{name:"PR",value:1},{name:"BP",value:1},{"RR":12},{"TEMP":125},{"SAO2":456},{"HEIGHT":175},{"WEIGHT":66},{"BMI":45},{"BSA":458},{"WH":22}]
//   //       // }
//   //     }
//   //   });
//   // }

// }