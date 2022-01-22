import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatListOption, MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { empty } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { FiService } from '../fi/fi.service';
import { GentempComponent } from '../fi/gentemp/gentemp.component';
import { GentemplistComponent } from '../fi/gentemplist/gentemplist.component';
import { InvtempComponent } from '../fi/invtemp/invtemp.component';
import { InvtemplistComponent } from '../fi/invtemplist/invtemplist.component';
import { TemplateComponent } from '../fi/template/template.component';
import { TemplatelistComponent } from '../fi/templatelist/templatelist.component';
import { PatientserviceService } from '../service/patientservice.service';
import { SummaryService } from '../summary/summary.service';
import { VersiontwoService } from './versiontwo.service';
interface Food {
  value: string;
  viewValue: string;
}
interface liq{
  value: string;
  viewValue: string;
}
interface inject{
  value: string;
  viewValue: string;
}
interface MODE{
  value: string;
  viewValue: string;
}
interface infu{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-versiontwo',
  templateUrl: './versiontwo.component.html',
  styleUrls: ['./versiontwo.component.css']
})
export class VersiontwoComponent implements OnInit {
  showfasak=true;
  showkasak=false;
  hideGeneral:boolean = false;
  itemss=['1','2','3','4'];
  hideInput:boolean = false;
  showFrequency:boolean = true;
  hideFrequency:boolean = false;
  frequencyEdited:any='';
  showInput:boolean = true;
  MySchemaFrom: FormGroup;
  dropdownSettings = {};
  @ViewChild("firstNameField",{static:false}) firstNameField;
  dropdownList = [];
  lists: Array<any> = [];
  v_form: any;
  cdValue:any;
  clinincalnotes: FormGroup;
  history: FormGroup;
  CdForm: FormGroup;
  items: any;
  InForm: FormGroup;
  options: any;
  results: any;
  fi_Obj: any;
  DrugForm: FormGroup;
  vitals: any;
  clinicalnotes: any= [];
  historynotes: any;
  cd: any;
  inv: any;
  pr: any;
  genaralIns: FormGroup;
  plan: FormGroup;
  fdate: FormGroup;
  genaralIn: any;
  planInfo: any;
  follwupdate: any;
  showVitalIcons:boolean =false;
  // name = 'Angular ' + VERSION.major;
  userDetails : any[] = [
    {value: '3', viewValue: '1-1-1'},
    {value: '2', viewValue: '1-0-1'},
    {value: '1', viewValue: '0-0-1'}
  ];
  currentUser:any; 
  selctedUser : any[];
  // itemsss = [{value: '3', viewValue: 'Asdasda sdsa sad'},
  // {value: '2', viewValue: 'Asdasda sdsa sad'},
  // {value: '1', viewValue: '0-0-1'}];
  itemsss = [];
  foods: Food[] = [
    {value: '3', viewValue: '1-1-1'},
    {value: '2', viewValue: '1-0-1'},
    {value: '1', viewValue: '0-0-1'}
  ];
  liquids: liq[] = [
    {value: '0', viewValue: "&#x2713;-&#x2713;-&#x2713;"},
    {value: '0', viewValue: '0-0-&#x2713;'},
    {value: '0', viewValue: '&#x2713;-0-&#x2713;'}
  ];
  // injections: inject[] = [
  //   {value: '0', viewValue: "IV"},
  //   {value: '0', viewValue: 'IM'},
  //   {value: '0', viewValue: 'SUBCUTANEOUS'}
  // ];
  injections: inject[] = [
    {value: '24', viewValue: "24 HRS"},
    {value: '12', viewValue: "12 HRS"},
    {value: '8', viewValue: '8 HRS'},
    {value: '6', viewValue: '6 HRS'},
    {value: '4', viewValue: '4 HRS'},
    {value: '2', viewValue: '2 HRS'}
  ];
  modes :MODE[]=[
  
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

  ]
  modeselect = 'Oral';
  frequency: any;
  qty: number;
  clinicalArray: any = [];
  clinicalNotesArray: any = [];
  historyArray: any = [];
  cdArray: any =[];
  invArray: any =[];
  prArray: any =[];
  vitalsArray: any =[];
  genaralInArray: any = [];
  planArray: any = [];
  formulation_t: boolean = true;
  injection: boolean;
  liquid: boolean = false;
  infusion: boolean;
  medformulation: any;
  emailForm: any;
  mainForm: FormGroup;
  ocrarray: any;
  s_drugId: any;
  drug_formulation: any;
  appointment_id: any;
  AfterClick:boolean = true;
  BeforeClick:boolean = false;
  getlatestinv: any=[];
  hide: boolean = true;
  show:boolean = false;
  Drug_allergy: any;
  allergyShow: boolean;
  cheked: boolean;
  checkedData: boolean;
  drugData: any;
  dataSource: any;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  drugListArray: any;
  value: any;
  sunday: number;
  Day: string;
  followingDate: Date;
  pulse: number;
  prcolor: string;
  Condition: string;
  bph: number;
  bphcolor: string;
  bpl: number;
  bplcolor: string;
  rr: number;
  rrcolor: string;
  temp: number;
  tempcolor: string;
  sao2: number;
  sao2color: string;
  height: number;
  heightcolor: string;
  weight: number;
  weightcolor: string;
  height_in_metres: number;
  bsa_formula: number;
  bmi: any;
  bsa_result: number;
  wh: number;
  whcolor: string;
  genvalue: any;
  giname: any;
  frequencyin: any;
  disablebtn: boolean = true;
  disablebtn1: boolean  = true;
  disablebtn2: boolean  = true;
  disablebtn3: boolean  = true;
  disablebtn7: boolean = true;
  disablebtn6: boolean = true;
  disablebtn5: boolean = true;
  disablebtn4: boolean = true;
  disablebtn8: boolean = true;
  finalFrequency: number;
  allergy: any;
  res: string='add';
  clinicalNotesIndex: any;
  addClinicalNotes = true;
  hideClinicalNotes = false;
  showhistory =  true;
  hidehistory = false;
  ress: string;
  historyIndex: any;
  cdIndex: any=-1;
  invModel: any;
  planIndex: any;
  hidePlan:boolean = false;
  showPlan:boolean = true;
  resss: string;
  selectedFre: any;
  invIndex: any =-1;
  editedPrescription: any =-1;
  hideVitals: boolean = true;
  prCondition: string;
  prcolorr: string;
  followupdays: any;
  cditems: any;
  ppitems: any;
  optionsRemarks: any;
  disablebtn11: boolean = true;
  fudate: any;
  showPlanN: boolean = false;
  showComments: boolean = false
  comments: string = '';
  printBtnText: string = "Print";
  constructor(private sort:SummaryService,private dailog: MatDialog,private ocrService:VersiontwoService, private fb:FormBuilder, private _searchService:FiService,private service: PatientserviceService,private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.v_form = this.fb.group({
      PR:new FormControl(''),
      SBP:new FormControl(''),
      DBP:new FormControl(''),
      RR:new FormControl(''),
      Temp:new FormControl(''),
      SaO2:new FormControl(''),
      Height:new FormControl(''),
      Weight:new FormControl(''),
      BMI:new FormControl(''),
      BSA:new FormControl(''),
      WH:new FormControl(''),
      allergy:new FormControl(''),
    })
    this.clinincalnotes = this.fb.group({
      clnotes:new FormControl('')
    })
    this.history = this.fb.group({
      history_notes:new FormControl('')
    })
    this.CdForm = this.fb.group({
      queryField:new FormControl(''),
      // cd_id : new FormControl(''),
      // cd_code:new FormControl('')
    });
    this.InForm =  this.fb.group({
      queryinvField:new FormControl(''),
      // Inv_id:new FormControl('')
    })
    this.genaralIns =  this.fb.group({
      gen:new FormControl(''),
      // Inv_id:new FormControl('')
    })
    this.plan =  this.fb.group({
      plan_notes:new FormControl(''),
      // Inv_id:new FormControl('')
    })
    this.fdate =  this.fb.group({
      date:new FormControl(''),
      // Inv_id:new FormControl('')
    })
    this.route.params.subscribe(params => {
      let productid = params['id'];
      this.appointment_id = params['id'];
      console.log( this.appointment_id)
      this.getPreviousData()
      this.service.GetPatient(productid).subscribe(data =>{
        console.log(data.result['parameters'][0].status)
        if(data.result['parameters'][0].status === 'closed'){
          // this.disabled = true;
          // this.DrugForm.get('drugField').disable();
        }else{
          // this.DrugForm.get('drugField').enable();
        }
        this.fi_Obj = data.result['parameters'][0];
        console.log(this.fi_Obj);
        // this.getdruginfo(this.fi_Obj);
        // this.getdrugSuggestions(this.fi_Obj);
  
      })
  });
  this.DrugForm = this.fb.group({
    drugField:new FormControl(''),
    drug_id:new FormControl(''),
    drug_formulation:new FormControl(''),
    mode:new FormControl(''),
    frquency:new FormControl(''),
    food:new FormControl(''),
    days:new FormControl(''),
    qty:new FormControl(''),
    remark:new FormControl(''),
  })
  this.mainForm = this.fb.group({
    // vitals: this.fb.array([])
    vitals:new FormControl(''),
    clnotes: new FormControl(''),
    pastnotes: new FormControl(''),
    cd:new FormControl(''),
    investigations : new FormControl(''),
    prescription :  new FormControl(''),
    gi: new FormControl(''),
    plan: new FormControl(''),
    followupdate: new FormControl('')
  });
  }
   capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  saveNotesValues(value) {
    console.log(value)
    this.ocrService.saveNotes(this.appointment_id, value).subscribe((res: any) => {
      console.log(res)
      if(res.code === "200") {
        console.log(res.result)
        this.disablebtn = true
        this.clinicalNotesArray.push({"notes": res.result.note_details, "id": res.result.patient_notes_line_item_id})
        console.log(this.clinicalNotesArray)
        this.clinincalnotes.get('clnotes').reset();
      } 
    });
  }

  saveData(value, type, id = '') {
    this.ocrService.saveData(this.appointment_id, value, type).subscribe((res: any) => {
      console.log(res)
      if(res.code === "200") {
        console.log(res)
        if(type == "past") {
          this.history.get('history_notes').setValue('');
          this.historyArray.push({"notes": res.result.section_text, "id": res.result.patient_form_line_item_id})
          this.disablebtn1 = true;
        }
        if(type == "cd") {
          this.cdArray.push({"notes": res.result.disease_name, "id": res.result.patient_cd_line_item_id})
          this.CdForm.get('queryField').setValue('');
          this.disablebtn2 = true;
        }
        if(type == "inv") {
          this.invArray.push({"notes": res.result.investigation_name, "id": res.result.patient_investigation_line_item_id})
          this.InForm.get('queryinvField').setValue('');
          this.disablebtn4 = true;
        }
      }
    });
  }

  saveDrugs() {
    console.log(this.DrugForm.value)
    this.ocrService.saveDrug(this.appointment_id, this.DrugForm.value).subscribe((res: any) => {
      console.log(res)
      if(res.code == '200') {
        console.log(res)
        this.prArray.push(res.result.prescription)
        this.DrugForm.reset()
      }
    })
  }

  toggleCommentBox() {
    if(this.showComments == true) {
      this.showComments = false
    }
    else {
      this.showComments = true
    }
  }

  getPreviousData() {
    console.log(this.appointment_id)
    this.ocrService.loadPreviousData(this.appointment_id).subscribe((res: any) => {
      console.log(res)
      if(res.code == "200") {
        console.log(res.result.inv)
        if(res.result.vitals != undefined) {
          this.vitals = res.result.vitals
        }
        if(res.result.notes != undefined) {
          this.clinicalNotesArray = res.result.notes
        }
        if(res.result.history != undefined) {
          this.historyArray = res.result.history
        }
        if(res.result.cd != undefined) {
          this.cdArray = res.result.cd
        }
        if(res.result.inv != undefined) {
          this.invArray = res.result.inv
        }
        if(res.result.gen != undefined) {
          this.giname = res.result.gen
        }
        if(res.result.plan != undefined) {
          this.planInfo = res.result.plan
        }
        if(res.result.comments != undefined) {
          this.comments = res.result.comments
        }
        if(res.result.fu != undefined) {
          this.fudate = res.result.fu
        }
        if(res.result.drugs != undefined) {
          this.prArray = res.result.drugs
        }
      }
    })
  }

  saveVitals() {
    console.log(this.v_form.value)
    this.ocrService.saveVitals(this.v_form.value, this.appointment_id).subscribe((res: any) => {
      if(res.code == "200") {
        this.vitals = res.result.vitals;
        this.showVitalIcons = true;
        console.log(this.vitals)
      }
      this.v_form.reset();
    })
  }

  saveGenPlanFu(gen = '', plan = '', fu = '', cmnts = '') {
    this.ocrService.addGenPlanFu(this.appointment_id, gen, plan, fu, cmnts).subscribe((res: any) => {
      if(res.code == "200") {
        console.log(res)
        if(gen != "") {
          this.genaralIns.reset();
          this.giname = res.result.gen
          this.disablebtn6 = true;
        }
        if(plan != "") {
          this.plan.reset();
          this.planInfo = res.result.plan
          this.showPlanN = true
          console.log(this.planInfo)
          this.disablebtn7 = true;
        }
        if(fu != "") {
          this.fdate.reset();
          this.fudate = res.result.followupdate;
          this.disablebtn11 = true;
        }
        if(cmnts != "") {
          this.comments = res.result.comments;
          this.showComments = false
        }
        console.log(res.result)
      }      
    })
  }

  delGPF(type) {
    this.ocrService.delGenPlanFu(this.appointment_id, type).subscribe((res: any) => {
      if(res.code == "200") {
        if(type == "gen") {
          this.giname = ""
        }
        else if(type == "plan") {
          this.planInfo = ""
        }
        else if(type == "fu") {
          this.fudate = ""
        }
      }
    })
  }

  deleteNow(i, delete_id, type) {
    var a = confirm("Are you sure ?")
    if(a == true) {
      this.ocrService.deleteData(delete_id, type).subscribe((res: any) => {
        if(res.code === "200") {
          if(type == "notes") {
            this.clinicalNotesArray[i] = ""
            this.clinicalNotesArray = this.clinicalNotesArray.filter((a) => a)
          }
          if(type == "past") {
            this.historyArray[i] = ""
            this.historyArray = this.historyArray.filter((a) => a)
          }
          if(type == "cld") {
            this.cdArray[i] = ""
            this.cdArray = this.cdArray.filter((a) => a)
          }
          if(type == "inv") {
            this.invArray[i] = ""
            this.invArray = this.invArray.filter((a) => a)
          }
          if(type == "drugs") {
            this.prArray[i] = ""
            this.prArray = this.prArray.filter((a) => a)
          }
        }
      })
    }
  }

  date(e){
    console.log(e)
    this.value = e;
    this.followupdays = e;
    const date = new Date();
    const newDate = this.addDays(date, parseInt(e));
    console.log(newDate.getDay())
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    this.sunday = newDate.getDay()
    this.Day = days[this.sunday] 
    console.log(this.Day) 
    this.followingDate = newDate
  }
  addDays(date, days) {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
  }

        //pr
        valuepr(e) {
          console.log(e);
          if (this.pulse > 100 || this.pulse < 60 ) {
          this.prcolor = 'red';
          this.prCondition = 'Abnormal'
          }
          // else if(e.value == '' ){
          //   this.Condition = ''
          // }
          // else if(!this.pulse){
          //   this.Condition = ''
          // }
          else {
          this.prcolor = 'black';
          this.prcolorr = 'black';
          this.prCondition = 'Normal'
          }       
      }
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
      
          this.v_form.get('BMI').setValue(this.bmi || '');
      
          this.bsa_formula= Math.round(this.weight*this.height/3600);
            //console.log(result)
            this.bsa_result = Math.round(Math.sqrt(this.weight*this.height/3600));
            this.v_form.get('BSA').setValue(this.bsa_result || '');
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
  onSubmit(){
this.hideVitals = true;
 this.showVitalIcons = true;
   console.log(this.v_form.value);
   this.vitals = this.v_form.value
  //  this.vitals = this.vitalsArray.push(this.v_form.value)
  this.mainForm.get('vitals').setValue(this.v_form.value);
  //  return  this.vitals = this.v_form.value
  //  localStorage.setItem('vitals',JSON.stringify(this.v_form.value));
  console.log(this.emailForm)
  console.log(  this.vitalsArray)
   this.v_form.reset()
    

  }
  genadd(){ 
    // return this.genaralIn = this.genaralIns.value
    this.giname = this.genaralIns.value.gen
    console.log( this.giname)
    this.genvalue = this.genaralIns.value
    console.log(this.genvalue )
    this.genaralIn = this.genaralInArray.push(this.genaralIns.value);
    this.mainForm.get('gi').setValue(this.genvalue.gen);
    this.hideGeneral= true;
    this.genaralIns.reset();
    this.disablebtn6= true;
  }
  planadd(){
    // return this.planInfo = this.plan.value
    this.planInfo  = this.planArray.push(this.plan.value);
    this.mainForm.get('plan').setValue(this.plan.value);
    this.plan.reset();
    this.disablebtn7= true;
  }
  dateadd(){
     this.follwupdate = this.fdate.value;
     console.log( this.follwupdate)
     this.mainForm.get('followupdate').setValue(this.follwupdate);
  }
  focusOnFirstName(){
    this.firstNameField.nativeElement.focus();
  }
  onItemSelect(item) {
    // do something with selected item
    console.log(item)
   
   this.lists.push(item);
   console.log(this.lists)
  }

  onKey(e){
    
    console.log(e.target.value)
  let val = e.target.value[0].toUpperCase() + e.target.value.slice(1);
  // if(e.target.value > 3){
    this.items = this._searchService.search(val);
  // }
  this.clinincalnotes.get('clnotes').setValue(val);
console.log(val)
// this.items = this._searchService.search(val);
// this.cditems =  [{value: '3', viewValue: 'Asdasda sdsa sad'},
// {value: '2', viewValue: 'Asdasda sdsa'},
// {value: '1', viewValue: '0-0-1'}];
console.log(this.items);
 if(e.target.value.length > 0){
 this.disablebtn = false
 } 
 else{
  this.disablebtn = true
 }
}

onKey1(e){
  console.log(e.target.value.length)
  let val = e.target.value[0].toUpperCase() + e.target.value.slice(1);
// this.items = this._searchService.search(val);
// if(e.target.value > 5){
//   this.items = this._searchService.search(val);
// }
this.history.get('history_notes').setValue(val);
if(e.target.value.length > 0){
this.disablebtn1 = false
} 
else{
this.disablebtn1 = true
}
}
onKey2(e){
  console.log(e.target.value.length)
  let val = e.target.value[0].toUpperCase() + e.target.value.slice(1);
   console.log(val);
   this.CdForm.get('queryField').setValue(val);
if(e.target.value.length > 0){
this.disablebtn2 = false
} 
else{
this.disablebtn2 = true
}
}
onKey3(e){
  
  console.log(e.target.value.length);
 let val = e.target.value[0].toUpperCase() + e.target.value.slice(1);

 this.DrugForm.get('remark').setValue(val);
// if(e.target.value.length > 0){
// this.disablebtn3 = false
// } 
// else{
// this.disablebtn3 = true
// }
}
onKey4(e){
  let val = e.target.value[0].toUpperCase() + e.target.value.slice(1);
  console.log(val);
  // this.CdForm.get('queryField').setValue(val);
  // let val = e.target.value[0].toUpperCase() + e.target.value.slice(1);

  this.InForm.get('queryinvField').setValue(val);
  console.log(e.target.value.length)
if(e.target.value.length > 0){
this.disablebtn4 = false
} 
else{
this.disablebtn4 = true
}
}

remarkKey(e){
  // let val = e.target.value[0].toUpperCase() + e.target.value.slice(1);

  // this.InForm.get('queryinvField').setValue(val);
  console.log(e.target.value.length)
if(e.target.value.length > 0){
this.disablebtn5 = false
} 
else{
this.disablebtn5 = true
}
}

onKey5(e){
   let val = e.target.value[0].toUpperCase() + e.target.value.slice(1);
  console.log(val);
  console.log(e.target.value.length);
  this.DrugForm.get('drugField').setValue(val);
  // this.InForm.get('queryinvField').setValue(val);
if(e.target.value.length > 0){
this.disablebtn5 = false
} 
else{
this.disablebtn5 = true
}
}
onKey6(e){
  let val = e.target.value[0].toUpperCase() + e.target.value.slice(1);

  this.genaralIns.get('gen').setValue(val);
  console.log(e.target.value.length);
 
if(e.target.value.length > 0){
this.disablebtn6 = false
} 
else{
this.disablebtn6 = true
}
}
onKey7(e){
  console.log(e.target.value.length)
  let val = e.target.value[0].toUpperCase() + e.target.value.slice(1);

  this.plan.get('plan_notes').setValue(val);
  if(e.target.value.length > 0){
  this.disablebtn7 = false
  } 
  else{
  this.disablebtn7 = true
  }
}


onKey8(e){
  console.log(e.target.value.length)
  let val = e.target.value[0].toUpperCase() + e.target.value.slice(1);

  if(e.target.value.length > 0){
  this.disablebtn11 = false
  } 
  else{
  this.disablebtn11 = true
  }
}

  addClinincNotes(a,index){
    console.log(a);
    console.log(index);
    console.log(this.clinincalnotes.value)
    // if(a == 'add'){
    console.log(this.clinincalnotes.value)
    // this.clinicalArray = new Array()
    var b = this.clinincalnotes.value
    this.clinicalnotes = this.clinicalArray.push(b)
    this.mainForm.get('clnotes').setValue(this.clinicalArray)
     this.clinincalnotes.get('clnotes').reset();
     this.disablebtn = true
    // }else{
    //   console.log(this.clinicalArray);
    //   console.log(this.clinicalArray[index]);
    //   this.clinicalArray[index].clnotes = this.clinincalnotes.value.clnotes;
    //   this.clinincalnotes.get('clnotes').reset();
    // }
  }
  editClinincNotes(a,index){

    console.log(a);
    console.log(index);
    console.log(this.clinincalnotes.value)
    console.log(this.clinincalnotes.value)
      console.log(this.clinicalArray);
      console.log(this.clinicalArray[index]);
      this.clinicalArray[index].clnotes = this.clinincalnotes.value.clnotes;
      this.clinincalnotes.get('clnotes').reset();
      this.disablebtn = true;
      this.addClinicalNotes = true;
      this.hideClinicalNotes = false;
  }
  edithistory(a,index){
    console.log(a);
    console.log(index);
    // console.log(this.history.value.history_notes);
    // console.log(this.historyArray)
    // console.log(this.historynotes);
    // console.log(this.historyArray.history_notes)
    // console.log(this.historyArray);
    // console.log(this.historyArray[index]);
    this.historyArray[index].history_notes = this.history.value.history_notes;
    this.history.get('history_notes').reset();
    this.disablebtn1 = true;
    this.showhistory = true;
    this.hidehistory = false;
  }
  editplanadd(a,index)
  {
    // console.log(this.planArray)
    // console.log(this.planArray[index].plan_notes);
    // console.log(this.plan.value.plan_notes);
    // this.planInfo  = this.planArray.push(a);
    this.planArray[index].plan_notes = this.plan.value.plan_notes;
    // this.mainForm.get('plan').setValue(this.plan.value);
    this.plan.reset();
    this.disablebtn7 = true;
    this.showPlan = true;
    this.hidePlan = false;
  }
  addhistory(){
     console.log(this.history.value)
    //  return this.historynotes = this.history.value
    this.historynotes  = this.historyArray.push(this.history.value);
    this.mainForm.get('pastnotes').setValue(this.historyArray);
    this.history.get('history_notes').reset();
    this.disablebtn1 = true;
  }
  cdsearch(){
    console.log(this.CdForm);
    console.log(this.CdForm.value)
    console.log(typeof(this.CdForm.value.queryField));
    var type = typeof(this.CdForm.value.queryField)
    console.log(this.cdIndex);
    if(this.cdIndex == -1)
    {
      var pushVal
      if(type == "object"){
          pushVal = this.CdForm.value
      }
      else if(type == "string"){
          var newAr = {"queryField": {"disease_name": this.CdForm.value.queryField, "clinical_diagnosis_id": "0", "code": ""}}
          pushVal = newAr
      }
      this.cd = this.cdArray.push(pushVal)
      console.log(this.cdArray)
      this.mainForm.get('cd').setValue(this.cdArray);
    // return   this.cd = this.CdForm.value
    this.CdForm.get('queryField').setValue('');
    this.disablebtn2 = true;
    }
    else{
      console.log(this.cdArray)
      console.log(this.CdForm.value);
      console.log(this.CdForm.value.queryField);
      console.log(this.CdForm.value.queryField.disease_name);
      if(this.CdForm.value.queryField.disease_name == undefined){
        this.cdArray[this.cdIndex].queryField.disease_name = this.CdForm.value.queryField;
      }else{
        this.cdArray[this.cdIndex].queryField.disease_name = this.CdForm.value.queryField.disease_name;
        this.cdArray[this.cdIndex].queryField.clinical_diagnosis_id = this.CdForm.value.queryField.clinical_diagnosis_id;
        this.cdArray[this.cdIndex].queryField.code = this.CdForm.value.queryField.code;
      }

      // this.cdArray[this.cdIndex].queryField.clinical_diagnosis_id = this.CdForm.value.queryField.clinical_diagnosis_id;
      // this.cdArray[this.cdIndex].queryField.code = this.CdForm.value.queryField.code;
      this.cdIndex = -1;
      this.CdForm.get('queryField').setValue('');
      this.disablebtn2 = true;
    }
    //  this.CdForm.get('queryField').setvalue('')
  }
  invadd(value){
    console.log(value)
   //  return this.inv = value
   console.log(typeof(value.queryinvField));
   var type = typeof(value.queryinvField);
   if(this.invIndex == -1)
   {
   var pushVal
   if(type == "object"){
       pushVal = value
   }
   else if(type == "string"){
     // queryinvField: {investigation_id: '1227', item_code: 'UMD1227', investigation: 'Myeloperoxidase (MPO)'}
       var newAr = {"queryinvField": {"investigation_id": '0', "item_code": "0", "investigation": value.queryinvField}}
       pushVal = newAr
   }
    this.inv = this.invArray.push(pushVal);
    console.log(this.invArray);
    this.mainForm.get('investigations').setValue(this.invArray);
    this.InForm.get('queryinvField').setValue('');
    this.disablebtn4 =true;
  }else{
    console.log(this.invArray)
    console.log(this.InForm.value);
    console.log(this.InForm.value.queryinvField);
    console.log(this.InForm.value.queryinvField.investigation);
    if(this.InForm.value.queryinvField.investigation == undefined){
      this.invArray[this.invIndex].queryinvField.investigation = this.InForm.value.queryinvField;
    }else{
      this.invArray[this.invIndex].queryinvField.investigation = this.InForm.value.queryinvField.investigation;
      this.invArray[this.invIndex].queryinvField.investigation_id = this.InForm.value.queryinvField.investigation_id;
      this.invArray[this.invIndex].queryinvField.item_code = this.InForm.value.queryinvField.item_code;
    }
    this.invIndex = -1;
    this.InForm.get('queryinvField').setValue('');
    this.disablebtn4 =true;
  }
  }
  search (term: string) {
    console.log(term);
    if(term.length >= 3 ){
    this.items = this._searchService.search(term);
    console.log(this.items);
   // this.getlatestCd(this.fi_Obj);
    }
    // if(term.length == 0){
    //   this.items = this._searchService.search(term)
    //   this.isLoading = false
    //   console.log(this.items);
    // }
    
  }
  searchh(term: string) {
    console.log(term);
    if(term.length >= 3 ){
      this.cditems = this._searchService.searchh(term,this.appointment_id);
      console.log(this.cditems);
     // this.getlatestCd(this.fi_Obj);
      }
  }
  searchhh(term: string) {
    console.log(term);
    if(term.length >= 3 ){
      this.ppitems = this._searchService.searchhh(term,this.appointment_id);
      console.log(this.ppitems);
     // this.getlatestCd(this.fi_Obj);
      }
  }
  checkValue(value: any) {
    // here you can get your id or whatever you want
    console.log(value);
    return value.disease_name;
  }
  invsearch (query: string) {
    console.log(query);

     if(query.length>=3){
      // this.isLoading = true
      //  this.options = this._searchService.searchInve(query)
      this._searchService.searchInve(query).subscribe((res) => {
        console.log(res);
        this.options=res;
        // console.log(res['result'])
        // console.log(res['result'].investigations);
        // this.options = res['result'].investigations;
      })
       console.log(this.options);
      //  this. getlatesinv(this.fi_Obj)
      //  this.isLoading = false;
     }
      if(query.length ==0 ){
       this.options = this._searchService.searchInve(query);
       console.log(this.options);
      //  this.isLoading = false
     }else{

     }
     
   }

   searchRemarks(query: string) {
    console.log(query);

     if(query.length>=3){
      // this.isLoading = true
      //  this.options = this._searchService.searchInve(query)
      this._searchService.searchRemarks(query,this.appointment_id).subscribe((res) => {
        console.log(res);
        this.optionsRemarks=res;
        // console.log(res['result'])
        // console.log(res['result'].investigations);
        // this.options = res['result'].investigations;
      })
       console.log(this.optionsRemarks);
      //  this. getlatesinv(this.fi_Obj)
      //  this.isLoading = false;
     }
      if(query.length ==0 ){
       this.optionsRemarks = this._searchService.searchRemarks(query,this.appointment_id);
       console.log(this.optionsRemarks);
      //  this.isLoading = false
     }else{

     }
     
   }
   handleSelected(invValue)
   {
     console.log(invValue);
     this.inv = this.invArray.push({"queryinvField": invValue});
     console.log(this.invArray);
     this.InForm.get('queryinvField').setValue('');
     this.disablebtn4 =true;
    //  this.mainForm.get('investigations').setValue(this.invArray);
   }
   handleSelectedRemark(invValue)
   {
     console.log(invValue);
     this.DrugForm.get('remark').setValue(invValue.remarks);
    //  this.inv = this.invArray.push({"queryinvField": invValue});
    //  console.log(this.invArray);
    //  this.InForm.get('queryinvField').setValue('');
     this.disablebtn3 =true;
    //  this.mainForm.get('investigations').setValue(this.invArray);
   }
   handlecdSelected(cdValue)
   {
     console.log(cdValue);
     this.cd = this.cdArray.push( {"queryField":cdValue})
     console.log(this.cdArray)
     this.CdForm.get('queryField').setValue('');
     this.disablebtn2 = true;
    //  this.mainForm.get('investigations').setValue(this.invArray);
   }

   handlecnSelected(cdValue)
   {
     console.log(cdValue);
     console.log(cdValue.note_details);
     this.clinicalnotes = this.clinicalArray.push({clnotes:cdValue.note_details})
     this.mainForm.get('clnotes').setValue('')
      this.clinincalnotes.get('clnotes').reset();
      this.disablebtn = true
   }
   handlecppSelected(cdValue)
   {
     console.log(cdValue);
     console.log(cdValue.section_text);
     this.historynotes  = this.historyArray.push({history_notes:cdValue.section_text});
     this.mainForm.get('pastnotes').setValue('');
     this.history.get('history_notes').reset();
     this.disablebtn1 = true;
    //  this.clinicalnotes = this.clinicalArray.push({clnotes:cdValue.note_details})
    //  this.mainForm.get('clnotes').setValue('')
    //   this.clinincalnotes.get('clnotes').reset();
    //   this.disablebtn = true
   }
   checkinv(value: any){
    // alert(value);
    console.log(value);
    return value.investigation;
   }
   drugsearch(drugs: string){
     console.log(drugs)
    if(drugs.length>=3){
      // this.isLoading = true;
      //  this.drugobj = this._searchService.Drugsearch(drugs,this.fi_Obj);
      //  this.results =  this.drugobj.result['medicine_object']['drugs']
      // console.log(this.results)
      this._searchService.Drugsearch(drugs,this.fi_Obj).subscribe((data=>{
        this.results = data.result['medicine_object']['drugs']
        console.log(this.results)
        this.medformulation = this.results[0].formulation
        //console.log(this.results.result['medicine_object']['drugs'])
        
        // if(this.results[0].formulation == "Tablet" || this.results[0].formulation == "Sachet" || this.results[0].formulation == "Capsule" || this.results[0].formulation == "Kit" || this.results[0].formulation == "Strips"  ){
          // this.formulation_t = true
        // }
        // else {
          // this.formulation_t = false
        // }
      }));
      
    }
    if(drugs.length ==0){
      this._searchService.Drugsearch(drugs,this.fi_Obj).subscribe((data=>{
        this.results = data.result['medicine_object']['drugs']
        // console.log(this.results)
        // console.log(this.results.result['medicine_object']['drugs'])
      }));
      
     // this.results = this._searchService.search(drugs)
      // this.isLoading = false
    }
  }

  priscribe(){
    console.log(this.DrugForm.value)
    console.log(this.editedPrescription);
    if(this.editedPrescription == -1)
    {
      this.showfasak=false;
      this.showkasak=true;
      this.pr  = this.prArray.push(this.DrugForm.value)
      this.mainForm.get('prescription').setValue(this.prArray);
      this.DrugForm.get('drugField').setValue('');
      this.DrugForm.reset();
      this.disablebtn5 = true;
    }else{
      this.showfasak=true;
      this.showkasak=false;
      console.log(this.prArray);
      console.log(this.DrugForm.value);
      this.prArray[this.editedPrescription] = this.DrugForm.value;
      this.editedPrescription = -1;
      this.DrugForm.reset();
      this.disablebtn5 = true;
    }
 
  }

  changeValue(e){
    console.log(e)
    console.log(e.value);
    return this.frequency = e.value;
  }
  changeValueIn(e){
    console.log(e)
  return this.frequency = 24/e.value
    console.log(24/this.frequencyin)
  }

  // onSearchChange(searchValue: string): void {  
  //   console.log(searchValue);
  //   this.DrugForm.get('frquency').setValue(searchValue);
  // }

  selected(item){
    console.log(item.target.value);
    // this.DrugForm.get('frquency').setValue(item.target.value);
    var myarray = item.target.value.split('-');
    var sum =0;
    for(var i = 0; i < myarray.length; i++)
    {
      console.log(myarray[i]);
      sum+= parseFloat(myarray[i]);
    }
    console.log(Math.round(sum));
    this.frequency = Math.round(sum);
    this.DrugForm.get('frquency').setValue({value:Math.round(sum),viewValue:item.target.value});
    // this.
    // console.log('selected items : ',item)
  }


  ondayschange(e){
    console.log(this.frequency);
    console.log(e)
    this.qty  = e*this.frequency;
  }

  sendit(data){
    console.log("Value",data)
 }

 onMouseEnter($event) {
  console.log('onMouseEnter');
 }

 onMouseLeave($event) {
  console.log('onMouseLeave');
}

open(event) {
  // alert('Open');
  this.showInput = false;
  this.hideInput = true;
}

  druginfo(drugObj){
    console.log(drugObj)
    this.disablebtn5 = false;
    this.s_drugId = drugObj.drug_id;
    this.drug_formulation = drugObj.formulation;
    const formulation = ["Tablet", "Sachet", "Capsule", "Kit","Strips"];

    const liquid = [ "Syrup", "Suspension", "Others", "Cream", "Liquid", "Soap", "Wipe", "Tape", 'Powder', "Drops", "Patch", "Claris", "Spray", "Needle", "Gel", "Suppositary", "Soft Gel", "Ointment", "Pessary", "Syrin", "Granules", "Oil", "Lotion", "Shampoo", "Solution", "Mouthwash", "Redimix", "Paste", "Expectorant", "Vaccine", "Spacer", "Suppository", "Pack", "Foam", "Inhaler", "Toothpaste", "Facewash", "Serum", "Wipes", "Pouch", "Liniment", "Condom", "Tube", "Diskette", "Respules", "Anaesthetic", "Emulsion", "Balm", "Paint", "Cartridge", "Bandage", "drug", "Plaster", "cobadex", "tik tik", ]
    const formulation_i =  ["Injection", "Infusion",];
    if(formulation.includes(drugObj.formulation) == true){
      this.formulation_t = true;
      this.liquid = false;
      this.injection = false; 
      this.modeselect = "Oral"
    }
     if(drugObj.formulation == "Injection" || drugObj.formulation == "Infusion" ){
      this.formulation_t = false;
      this.liquid = false;
      this.injection = true 
      this.modeselect = "IV (Intra-venous)"
    }
    //  if(drugObj.formulation == "Infusion"){
    //   this.formulation_t = false;
    //   this.liquid = false;
    //   this.injection = false ;
    //    this.infusion = true;
    // }
    if(liquid.includes(drugObj.formulation) == true){
      this.formulation_t = false
      this.injection = false 

      this.liquid = true;
      this.injection = false ;
      this.infusion = false;
      this.modeselect = "Oral"
    }
  }



  printOcr(){
   this.ocrarray = this.mainForm.value
   console.log( JSON.stringify(this.mainForm.value))

    this.ocrService.addOcr(this.followupdays,this.mainForm.value,this.appointment_id).subscribe((data)=>{
      console.log(data)
    })  
  }
  getPrint(){
    this.printBtnText = "Printing Data"
    this.AfterClick = false;
    this.BeforeClick = true;
    this.sort.getshortsummarys(this.appointment_id).subscribe((res)=>{
      console.log(res)
      let url = res.result.pdf_name
      // console.log(url)
      window.open(url,'_blank',"width=500,height=500");
      this.AfterClick = true;
      this.BeforeClick = false;
       window.location.reload();
      // this.ngOnInit();
    })
    // console.log(this.mainForm.value);
    // console.log(this.appointment_id);
    // this.AfterClick = false;
    // this.BeforeClick = true;
    // this.ocrService.addOcr(this.followupdays,this.mainForm.value,this.appointment_id).subscribe((data)=>{
    //   console.log(data)
    //   if(data['code']== 200){
        
    //   }     
    // },err => {
    //   console.log(err);

    //   if(err.status==500){
    //     alert ('Something wrong please try again');
    //     this.AfterClick = false;
    //     this.BeforeClick = true;
    //     // this.ngOnInit();
    //     window.location.reload();
    //   }
      
    // }
    
    // ) 
   
  }


  selectinvTemp(){
    this.templatelistmodel().afterClosed().subscribe((res)=>{
      console.log(res)
      this.getPreviousData()
      if(res.event != 'close'){
        this.getlatesinv(this.fi_Obj);
      }
    })
   }

   templatelistmodel(){
    return this.dailog.open(InvtemplistComponent,{
      disableClose:true,
      panelClass:['Template-dailog'],
      data:{
        package:this.fi_Obj
      }
    })
  }

  getlatesinv(fi_Obj){
    // alert("closed");
    this._searchService.get_latestinv(this.fi_Obj).subscribe((result)=>{
      console.log(result)
    // this.invInfo = result.result;
      this.getlatestinv = result.result.investigations_list;
      console.log(this.getlatestinv)
      const newArrayOfObj = this.getlatestinv.map(({
        investigation_name: investigation,
        ...rest
      }) => ({
        investigation,
        ...rest
      }));
      
      for(var i=0;i<=newArrayOfObj.length-1;i++)
      {
        console.log(newArrayOfObj.length)
        console.log(newArrayOfObj[i])
        this.inv = this.invArray.push({queryinvField:newArrayOfObj[i]});
        console.log(this.invArray)
        console.log(this.inv);
        // this.inv = this.invArray.push(newArrayOfObj);
        this.mainForm.get('investigations').setValue(this.inv);
      }

    })
  }

  saveTemp(invlist){
    console.log(invlist)
    // const newArrayOfObj = invlist.map(({
    //   investigation_name: investigation,
    //   ...rest
    // }) => ({
    //   investigation,
    //   ...rest
    // }));
    // console.log(newArrayOfObj);
    this.templateModel(invlist)
  }

  templateModel(invlist){
    console.log(invlist)
    return this.dailog.open(InvtempComponent,
      {
       
        disableClose:true,
        panelClass:['editprescribe-dailog'],
        data:{
          InvListArray:invlist,
          package:this.fi_Obj
    
        }
      }
      );
  }

  templatelistmodell(){
    console.log(this.fi_Obj);
    return this.dailog.open(TemplatelistComponent,{
      disableClose:true,
      panelClass:['Template-dailog'],
      data:{
        package:this.fi_Obj
      }
    })
  }
  selectTemp(){
   this.templatelistmodell().afterClosed().subscribe((res)=>{
     if(res.event != 'close'){
      this.getdruginfo(this.fi_Obj);
     }
    
   })
  }

   getdruginfo(fi_Obj){
    console.log(fi_Obj);
    this._searchService.get_latestdruglist(this.fi_Obj).subscribe((drug)=>{
      console.log(drug)
      this.Drug_allergy = drug.result.drug_allergy;
      console.log(this.Drug_allergy);
  
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
      this.drugData = drug.result.prescription;
      this.dataSource = new MatTableDataSource(drug.result.prescription);
      this.dataSource.paginator = this.paginator;
      console.log(this.drugData )

      const newArrayOfObj = this.drugData.map(({
        medicine_name: drugField,
        dose_course: days,
        dosage_unit: drug_formulation,
        preffered_intake:food,
        quantity:qty,
        remarks:remark,
      ...rest
    }) => ({
      drugField,
      days,
      drug_formulation,
      food,
      qty,
      remark,
      ...rest
    }));
    console.log(newArrayOfObj);
    for(var i=0;i<=newArrayOfObj.length-1;i++)
    {
      console.log(newArrayOfObj.length)
      console.log(newArrayOfObj[i])
      this.pr  = this.prArray.push(newArrayOfObj[i])
      console.log(this.prArray)
      this.mainForm.get('prescription').setValue(this.pr);
    }
    // this.pr  = this.prArray.push(newArrayOfObj)
    // this.mainForm.get('prescription').setValue(this.prArray);
    });
  }

  AddTemp(drugList){
    console.log(this.prArray);
    console.log(drugList);
    this.drugListArray = drugList.filteredData;
    this.templateModell(drugList)
    console.log(this.drugListArray);
  }

  templateModell(drugListArray){
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
  savetemp(value){
    console.log( this.genvalue )
    if(value.gifeild == ''){
      alert("Please add Genral Instruction")
    }
   else{
    this.dailog.open(GentempComponent,{
      panelClass:['editprescribe-dailog'],
      data:{
        giname:this.genvalue.gen,
        obj:this.fi_Obj
      }
    })
   }
  
  }
  template(){
    const dialogRef =this.dailog.open(GentemplistComponent,{
      panelClass:['Template-dailog'],
      data:this.fi_Obj
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.hideGeneral= true;
      this.giname = result.event
      this.genvalue = result.event
      this.mainForm.get('gi').setValue(result.event);
    });
  }

  editVitals(vitals)
  {
    console.log(vitals);
    console.log(vitals.PR);
    this.pulse = vitals.PR;
    this.bph = vitals.SBP;
    this.bpl = vitals.DBP;
    this.rr = vitals.RR;
    this.temp = vitals.Temp;
    this.sao2 = vitals.SaO2;
    this.height = vitals.Height;
    this.weight = vitals.Weight;
    this.bmi = vitals.BMI;
    this.wh = vitals.WH;
    this.allergy = vitals.allergy;
  }

  editClinicalNotes(value,index)
  {
    // if(this.clinincalnotes.value.clnotes > 0){
    //   this.disablebtn = true
    //   } 
    //   else{
    //    this.disablebtn = false
    //   }
    console.log(value,index);
    console.log(this.clinicalArray);
    this.clinicalNotesIndex = index;
    // console.log(this.clinicalArray.splice(index,1));
    this.disablebtn = false
    this.hideClinicalNotes = true;
    this.addClinicalNotes = false;
    this.clinincalnotes.get('clnotes').setValue(value);
    // this.clnotes = a;
  }

  deleteClinicalNotes(a,index)
  {
    // this.disablebtn = true;
    console.log(this.clinicalArray);
    console.log(a,index)
    this.clinicalArray.splice(index,1)
  }
  edithistoryNotes(a,index)
  {
    console.log(a,index);
    console.log(this.historyArray);
    this.historyIndex = index;
    this.disablebtn1 = false;
    // console.log(this.clinicalArray.splice(index,1));
    this.hidehistory = true;
    this.showhistory = false;
    this.history.get('history_notes').setValue(a);
    // this.clinincalnotes.get('clnotes').setValue(a);
    // this.clnotes = a;
  }
  deleteHistoryNotes(a,index)
  {
    // this.disablebtn1 = true;
    console.log(this.historyArray);
    console.log(a,index)
    this.historyArray.splice(index,1)
  }
  deletecd(a,index)
  {
    // this.disablebtn2 = true;
    console.log(a);
    console.log(index);
    console.log(this.cdArray);
    this.cdArray.splice(index,1)
  }
  deleteInv(a,index)
  {
    // this.disablebtn4 = true;
    console.log(a);
    console.log(index);
    console.log(this.invArray);
    this.invArray.splice(index,1)
  }
  deletedrug(a,index)
  {
    // this.disablebtn5 = true;
    console.log(a);
    console.log(index);
    console.log(this.prArray);
    this.prArray.splice(index,1)
  }
  deleteVitals(vitals)
  {
    this.hideVitals = false;
    this.showVitalIcons = false;
    console.log(this.vitals);
    this.ocrService.deleteVitals(this.appointment_id).subscribe((res: any) => {
      if(res.code === "200") {
        this.vitals.PR='';
        this.vitals.SBP ='';
        this.vitals.DBP ='';
        this.vitals.RR='';
        this.vitals.Temp='';
        this.vitals.SaO2='';
        this.vitals.Height='';
        this.vitals.Weight='';
        this.vitals.BMI='';
        this.vitals.WH='';
        this.vitals.allergy='';    
      }
    })
    
  }

  deletege(giname)
  {
    this.giname = '';
    this.hideGeneral = false;
  }
  deletePlan(a,index)
  {
    console.log(this.planArray);
    console.log(a,index)
    this.planArray.splice(index,1)
  }
   editCD(all,a,index){
     console.log(all);
     console.log(all.queryField.disease_name);
     console.log(all.queryField.clinical_diagnosis_id);
     console.log(all.queryField.code);
    console.log(a);
    console.log(index);
    this.disablebtn2 = false;
    this.cdIndex = index;
    this.CdForm.patchValue({"queryField": {"disease_name": all.queryField.disease_name, "clinical_diagnosis_id": all.queryField.clinical_diagnosis_id, "code": all.queryField.code}});
   }

   editINV(all,a,index)
   {
     console.log(all);
    console.log(a);
    console.log(index);
    this.disablebtn4 =  false;
    this.invIndex = index;
    console.log(this.invIndex);
    this.InForm.patchValue({"queryinvField": {"investigation_id": all.queryinvField.investigation_id, "item_code": all.queryinvField.item_code, "investigation": all.queryinvField.investigation}});

    // this.checkinv(a);
    // this.options = a;
    // this.InForm.get('queryinvField').setValue(a);
    // this.invModel = a;
    // this.CdForm.get('queryField').setValue(a);
   }

   editGI(a)
   {
    console.log(a);
    this.disablebtn6 = false;
    this.genaralIns.get('gen').setValue(a);
   }

   editPlan(a) {
     this.plan.get('plan_notes').setValue(a)
   }


  //  editPLAN(a,i)
  //  {
  //    this.planIndex = i;
  //    this.showPlan = false;
  //    this.hidePlan = true;
  //    this.disablebtn7 = false;
  //   this.plan.get('plan_notes').setValue(a);
  //  }

  addHero(value)
  {
    console.log(value);
    if(value == '')
    {
      this.res = 'add';
    }else{
      this.res = 'edit';
      console.log(this.clinicalNotesIndex);
    }
  }

  addHeroo(value)
  {
    console.log(value);
    if(value == '')
    {
      this.ress = 'add';
    }else{
      this.ress = 'edit';
    }
  }

  addHerooo(value)
  {
    console.log(value);
    if(value == '')
    {
      this.resss = 'add';
    }else{
      this.resss = 'edit';
    }
  }

  editPrescription(index,name,food,days,qty,remark,mode,all)
  {
    // this.showFrequency = false;
    // this.hideFrequency = true;
    this.disablebtn5 = false;
    this.editedPrescription = index;
    console.log(index,name,food,days,qty,remark,mode);
    console.log(all);
    // console.log(all.frquency.viewValue)
    // this.frequencyEdited = all.frquency.viewValue;
    this.DrugForm.get('drugField').setValue(name);
    // this.DrugForm.get('drug_id').setValue(searchValue);
    // this.DrugForm.get('drug_formulation').setValue(searchValue);
    this.DrugForm.get('mode').setValue(mode);
    this.DrugForm.get('frquency').setValue('1-0-1');
    // this.selectedFre = all.frquency.viewValue;
    this.DrugForm.get('food').setValue(food);
    this.DrugForm.get('days').setValue(days);
    this.DrugForm.get('qty').setValue(qty);
    this.DrugForm.get('remark').setValue(remark);
  }
}
