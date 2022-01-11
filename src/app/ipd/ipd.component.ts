import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroupDirective, FormGroup, Validators } from '@angular/forms';
import { ListService } from '../lists/list.service';
import { PatientserviceService } from '../service/patientservice.service';
import { NotificationService } from '../shared/notification.service';
import { timeStamp } from 'console';
import { FiService } from '../fi/fi.service';
// import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
// import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material';

export const MY_FORMATS = {
    parse: {
        dateInput: 'LL'
    },
    display: {
        dateInput: 'DD-MM-YYYY',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY'
    }
};
const bullet = "\u2022";
const bulletWithSpace = `${bullet} `;
const enter = 13;

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-ipd',
  templateUrl: './ipd.component.html',
  styleUrls: ['./ipd.component.css'],
  // providers: [
  //   // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
  //   // application's root module. We provide it at the component level here, due to limitations of
  //   // our example generation script.
  //   {
  //     provide: DateAdapter,
  //     useClass: MomentDateAdapter,
  //     deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  //   },

  //   {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  // ],
  
})

export class IpdComponent implements OnInit {
  demo1TabIndex = localStorage.getItem('tabsIndex');
  ipdSubjective: any;
  ipdObjective:any;
  ipdAnalysis:any;
  ipdPlan:any;
  presentationForm:any;
  primaryConsultant:any;
  candmForm:any;
  fuForm:any;
  crossForm:any;
  consultantForm:any;
  id: any;
  show:boolean = true;
  hide:boolean = false;
  rounds: any=[];
  FirstObjective: any;

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  doctorsList: any=[];
  crossNotes: any;
  crossDoctorName: any;
  id2: any;
  disabled: boolean = false;
  hideLoading:boolean = false;
  showLoading:boolean = true;
  hideDischargeLoading:boolean = false;
  showDischargeLoading:boolean = true;
  firstDrug: any=[];
  finalDrug: any=[];
  presentation = '';
  course='';
  followup='';
  selected2:any;
  pConsultantSelected= '';
  consultantSelected: string;
  appDate: any;
  surDate:any;
  disDate:any;
  Drug_allergy: any;
  prescription: any;
  dischargeForm: FormGroup;
  appDatee: string;
  // date = moment(localStorage.getItem('appointmentDate'),"DD-MM-YYYY");
  // date1 = moment(localStorage.getItem('surgeryDate'),"DD-MM-YYYY");
  // date2 = moment(localStorage.getItem('dischargeDate'),"DD-MM-YYYY");
  date = localStorage.getItem('appointmentDate');
  date1 = localStorage.getItem('surgeryDate');
  date2 = localStorage.getItem('dischargeDate');
  crossDoctorNamee: any;
  appDate2: any;
  naveeen = new Date((new Date().getTime() - 3888000000)); 
  consultant: string;
  pConsultant1: string;
  patient_name: any;
  patient_info: any;
  constructor(private _searchService:FiService,private _notification:NotificationService,private patientservice:PatientserviceService,private route: ActivatedRoute,public router: Router,public _fb :FormBuilder,private service:ListService) { }
  drugs = [
    "WITH FLOOD",
    "SADA",
    "MR",
    "1",
    "PAN AMLIPASE",
    "( 10000 - 5000 - 5000 )",
    "50Yea",
    "with food.",
    "90",
    "Drug",
    "Valid",
    "2",
    "SUPRADYN",
    "x x - I",
    "AF 90 day",
    "Vital",
    "PR",
    "3",
    "ZOLGAS",
    "I - X - x",
    "BF",
    "Note",
    "90 day",
    "1.Pa",
    "2C",
    "4",
    "Clin",
    "1. o",
    "Inv",
    "5",
    "1.",
    "2.",
    "3",
    "6",
    "4.",
    "Pr",
    "S",
    "7"
  ]
  ngOnInit() {
    // alert(moment(this.appDate2),)
    this.patient_info = JSON.parse(localStorage.getItem('getInfo'));
    console.log(this.patient_info.patient_name);
    // console.log(this.patient_name.umr_no);
    // console.log(this.patient_name.mobile);
    localStorage.setItem('tabsIndex','0');
    console.log(this.drugs)
    this.checkDrugs();
    this.getClinicDoctor('1');
    this.ipdSubjective = this._fb.group({
      subjective:new FormControl('', Validators.required),
      objective:new FormControl('', Validators.required),
      analysis:new FormControl('', Validators.required),
      plan:new FormControl('', Validators.required)
    });
    this.ipdObjective = this._fb.group({
      objective:new FormControl('', Validators.required)
    });
    this.ipdAnalysis = this._fb.group({
      analysis:new FormControl('', Validators.required)
    });
    this.ipdPlan = this._fb.group({
      plan:new FormControl('', Validators.required)
    });
    this.crossForm = this._fb.group({
      CrossNotes:new FormControl('', Validators.required),
      // doc_name:new FormControl('', Validators.required),
    });

    this.presentationForm = this._fb.group({
      presentation:new FormControl('', Validators.required),
    });

    this.candmForm = this._fb.group({
      CandM:new FormControl('', Validators.required),
    });

    this.fuForm = this._fb.group({
      followUp:new FormControl('', Validators.required),
    });

    this.primaryConsultant = this._fb.group({
      pConsultant:new FormControl('', Validators.required),
    })

    this.consultantForm = this._fb.group({
      consultant:new FormControl('', Validators.required),
    })
  

    this.dischargeForm = this._fb.group({
      appDate:new FormControl( '',Validators.required),
      surDate:new FormControl('', Validators.required),
      disDate:new FormControl('', Validators.required),
      pConsultant:new FormControl('', Validators.required),
      consultant:new FormControl('', Validators.required),
      presentation:new FormControl('', Validators.required),
      course:new FormControl('', Validators.required),
      followup:new FormControl('', Validators.required),
    })
    
    this.route.params.subscribe(res => {
      this.id =  res['id'];
      this.id2 =  res['id1'];
      console.log(this.id);
      this.getPatientInfo(this.id)
    });

    this.drugsList();
  
    this.surDate = localStorage.getItem('surgeryDate');
    this.disDate = localStorage.getItem('dischargeDate');
    this.presentation = localStorage.getItem('presentation');
    this.course = localStorage.getItem('course&manegement');
    this.followup = localStorage.getItem('followup');
    this.pConsultantSelected = localStorage.getItem('primaryConsultant_id');
    this.consultantSelected =localStorage.getItem('consultant_id');
    this.appDate2 = localStorage.getItem('appointmentDate');
    this.surDate = localStorage.getItem('surgeryDate');
    this.disDate = localStorage.getItem('dischargeDate');
    console.log(this.appDate2);
    console.log(this.surDate);
    console.log(this.disDate);
    this.pConsultant1= localStorage.getItem('primaryConsultant'),
    this.consultant = localStorage.getItem('consultant')
    console.log(this.appDate);console.log(this.surDate);console.log(this.disDate);
    console.log(this.pConsultantSelected)
    this.dischargeForm.setValue({
      appDate: localStorage.getItem('appointmentDate'),
      surDate: localStorage.getItem('surgeryDate'),
      disDate: localStorage.getItem('dischargeDate'),
      pConsultant: localStorage.getItem('primaryConsultant'),
      consultant: localStorage.getItem('consultant')
   });
  }

  drugsList()
  {
    var data =  JSON.parse(localStorage.getItem('patientInfo'));
    console.log(data);
    this._searchService.get_latestdruglist(data).subscribe((drug)=>{
      console.log(drug)
      this.Drug_allergy = drug.result.drug_allergy;
      this.prescription = drug.result.prescription;
      console.log(this.Drug_allergy);
      console.log(this.prescription);

      // if(this.Drug_allergy != '')
      // {
      //   this.allergyShow=true;
      //   this.cheked = true;
      //   this.DrugForm.get('allergy').setValue('Yes')
      //   this.DrugForm.get('drugAllergy').setValue(this.Drug_allergy);
      // }else
      // {
      //   this.checkedData = false;
      //   this.allergyShow=false;
      // }
      // console.log(drug.result.prescription);
      // this.drugData = drug.result.prescription;
      // this.dataSource = new MatTableDataSource(drug.result.prescription);
  
      // // this.schedule = this.drugData
      // this.dataSource.paginator = this.paginator;
      // console.log(this.drugData )

    });
  }

  checkDrugs()
  {
    console.log(this.drugs);
    for(var i=0;i<this.drugs.length;i++){
      console.log(this.drugs[i],this.drugs.indexOf(this.drugs[i]));
      // console.log(this.drugs.indexOf(this.drugs[i]));
      if(this.drugs[i] == '1')
      {
        this.drugs.slice(3,11);
        console.log(this.drugs.slice(3,11));
        console.log(this.drugs.slice(3,11)[0]);
        console.log(this.drugs.slice(3,11)[1]);
        console.log(this.drugs.slice(3,11)[2]);

         this.firstDrug.push({id:this.drugs.slice(3,11)[0],
          drug_name:this.drugs.slice(3,11)[1],
          frequency:this.drugs.slice(3,11)[2]});
          console.log(this.firstDrug);

      }
    }
  }

  getClinicDoctor(clinic_id)
  {
    this.service.getClinicDoctorInfo(clinic_id).subscribe(res =>{
      console.log(res);
      this.doctorsList = res['result'].Doctor;
      console.log(this.doctorsList);
    });
  }

  getPatientInfo(id)
  {
    this.patientservice.Getdetails(id).subscribe(res =>{
      console.log(res);
      console.log(res['result']['parameters'][0]);
      localStorage.setItem('patientInfo', JSON.stringify(res['result']['parameters'][0]));
      console.log(res['result']['parameters'][0].doctor_id);
      console.log(res['result']['parameters'][0].patient_id);
      console.log(res['result']['parameters'][0].appointment_id);
      localStorage.setItem('doctor_id',res['result']['parameters'][0].doctor_id);
      localStorage.setItem('patient_id',res['result']['parameters'][0].patient_id);
      localStorage.setItem('appointment_id',res['result']['parameters'][0].appointment_id);
    });
  }
  
  
  handleInput(event){
    const { keyCode, target } = event;
    const { selectionStart, value } = target;
    
    if (keyCode === enter || keyCode == 13) {
      // console.log('a');
      target.value = [...value]
        .map((c, i) => i === selectionStart - 1
          ? `\n${bulletWithSpace}`
          : c
        )
        .join('');
        console.log(target.value);
        
      target.selectionStart = selectionStart+bulletWithSpace.length;
      target.selectionEnd = selectionStart+bulletWithSpace.length;
    }
    
    if (value[0] !== bullet) {
      target.value = `${bulletWithSpace}${value}`;
    }
  }

  presribe()
  {
    this.router.navigate(['/ipdPrescription/'+this.id+'/'+this.id2]);
  }

  subSubmit(data,form)
  {
    console.log(data,form);
    var doctor_id = localStorage.getItem('doctor_id');
    var patient_id =localStorage.getItem('patient_id');
    var appointment_id = this.id;
    console.log(doctor_id);
    console.log(patient_id);
    console.log(appointment_id);
    this.service.subjective(data).subscribe((res)=>{
      console.log(res);
      this._notification.success('Rounds Added');
    });
    this.ipdSubjective.reset();
  }

  objSubmit(data,form)
  {
    console.log(data,form);
    var doctor_id = localStorage.getItem('doctor_id');
    var patient_id =localStorage.getItem('patient_id');
    var appointment_id = this.id;
    console.log(doctor_id);
    console.log(patient_id);
    console.log(appointment_id);
    this.service.objective(data).subscribe((res)=>{
      console.log(res);
      this._notification.success('Objective Added ');
    });
    this.ipdObjective.reset();
  }

  analysisSubject(data,form)
  {
    console.log(data,form);
    var doctor_id = localStorage.getItem('doctor_id');
    var patient_id =localStorage.getItem('patient_id');
    var appointment_id = this.id;
    console.log(doctor_id);
    console.log(patient_id);
    console.log(appointment_id);
    this.service.analysis(data).subscribe((res)=>{
      console.log(res);
      this._notification.success('Analysis Added ');
    });
    this.ipdAnalysis.reset();
  }

  submitIpdPlan(data,form)
  {
    console.log(data);
    console.log(form)
    var doctor_id = localStorage.getItem('doctor_id');
    var patient_id =localStorage.getItem('patient_id');
    var appointment_id = this.id;
    console.log(doctor_id);
    console.log(patient_id);
    console.log(appointment_id);
    this.service.plan(data).subscribe((res)=>{
      console.log(res);
      this._notification.success('Plan Added ');
    });
    this.ipdPlan.reset();
  }

  viewTimeLines()
  {
    this.getRoundsInfo();
    this.show = false;
    this.hide = true;
    // alert("check");
  }

  back()
  {
    this.show = true;
    this.hide = false;
  }

  getRoundsInfo()
  {
    var doctor_id = localStorage.getItem('doctor_id');
    var patient_id =localStorage.getItem('patient_id');
    var appointment_id = this.id;
    console.log(doctor_id);
    console.log(patient_id);
    console.log(appointment_id);
    this.service.getRounds(appointment_id,doctor_id,patient_id).subscribe((res)=>{
      console.log(res);
      console.log(res['result']['Rounds']);
      this.rounds = res['result']['Rounds'];
      console.log(this.rounds);
      console.log(this.rounds[0].objective);
      // this.FirstObjective = this.rounds[0].objective;
    //   this.ipdObjective.setValue({
    //     objective: this.rounds[0].objective
    //  });
      // this._notification.success('Analysis Added ');
    });
  }

  crossNotesSubmit(data,form)
  {
    console.log(data);
    // var doctor_id = localStorage.getItem('doctor_id');
    // var patient_id =localStorage.getItem('patient_id');
    // var appointment_id = this.id;
    // this.service.crossNotes(appointment_id,doctor_id,patient_id).subscribe((res)=>{
    //   console.log(res);
    //   console.log(res['result']['Rounds']);
    //   this.rounds = res['result']['Rounds'];
    //   console.log(this.rounds);
    //   console.log(this.rounds[0].objective);
    // });
  }

  getCrossNotes(e)
  {
    this.crossNotes = e;
  }


  changeClient(e)
  {
    console.log(e);
    this.crossDoctorName = e;
    this.service.getClinicDoctorInfo('1').subscribe(res =>{
      console.log(res);
      console.log(res['result'].Doctor);
      var result = res['result'].Doctor.filter(user => user.doctor_id == e);
      console.log(result);
      localStorage.setItem('primaryConsultant_id',result[0].doctor_id);
      localStorage.setItem('primaryConsultant',result[0].doctor_name+','+result[0].qualification);
      this.pConsultantSelected = localStorage.getItem('primaryConsultant_id');
      this.pConsultant1= localStorage.getItem('primaryConsultant');
      console.log(this.pConsultantSelected);
      // this.pConsultantSelected = result[0].doctor_name+','+result[0].qualification;
      // this.consultantSelected = result[0].doctor_name+','+result[0].qualification;
    });
  }

  changeClientt(e)
  {
    console.log(e);
    this.crossDoctorNamee = e;
    this.service.getClinicDoctorInfo('1').subscribe(res =>{
      console.log(res);
      console.log(res['result'].Doctor);
      var result = res['result'].Doctor.filter(user => user.doctor_id == e);
      console.log(result);
      // this.pConsultantSelected = result[0].doctor_name+','+result[0].qualification;
      localStorage.setItem('consultant',result[0].doctor_name+','+result[0].qualification);
      localStorage.setItem('consultant_id',result[0].doctor_id);
      this.consultantSelected =localStorage.getItem('consultant_id');
      this.consultant= localStorage.getItem('consultant');
      console.log(this.consultantSelected);
    });
  }
  // onChangeEvent(type: string, event: MatDatepickerInputEvent<Date>) {
  //   console.log(event.value)
  //   let formatted_date = event.target._value._d.getDate() + "-" + (event.target._value._d.getMonth() + 1) + "-" + event.target._value._d.getFullYear()
  //       console.log(formatted_date);
  //       // this.appDate = formatted_date;
  //       localStorage.setItem('appointmentDate',formatted_date);
  //       this.appDate2 = localStorage.getItem('appointmentDate');
  // }
  onChangeEvent(type,event){
    console.log(event);
    // console.log(event.target._value._d);
    console.log(event.value);
    let formatted_date = event.value.getDate() + "-" + (event.value.getMonth() + 1) + "-" + event.value.getFullYear()
    console.log(formatted_date);
    // this.appDate = formatted_date;
    localStorage.setItem('appointmentDate',formatted_date);
    this.appDate2 = localStorage.getItem('appointmentDate');
  }

  onChangeEventt(type,event){
    console.log(event);
    console.log(event.value);
    let formatted_date = event.value.getDate() + "-" + (event.value.getMonth() + 1) + "-" + event.value.getFullYear()
    console.log(formatted_date);
    // this.surDate = formatted_date;
    localStorage.setItem('surgeryDate',formatted_date);
    this.surDate = localStorage.getItem('surgeryDate');
  }


  onChangeEventtt(type,event){
    console.log(event);
    console.log(event.value);
    let formatted_date = event.value.getDate() + "-" + (event.value.getMonth() + 1) + "-" + event.value.getFullYear()
    console.log(formatted_date);
    // this.disDate = formatted_date;
    localStorage.setItem('dischargeDate',formatted_date);
    this.disDate = localStorage.getItem('dischargeDate');
  }
  


  getCross()
  {
    console.log(this.crossNotes);
    console.log(this.crossDoctorName);
    var doctor_id = localStorage.getItem('doctor_id');
    var patient_id =localStorage.getItem('patient_id');
    var appointment_id = this.id;
      this.service.crossNotes(appointment_id,doctor_id,patient_id,this.crossNotes,this.crossDoctorName).subscribe((res)=>{
      console.log(res);
     });
     this.crossForm.reset();
  }

  presentationSubmit(data,form)
  {
    var doctor_id = localStorage.getItem('doctor_id');
    var patient_id =localStorage.getItem('patient_id');
    var appointment_id = this.id;
    console.log(data,form);
    this.service.presentationSubmit(appointment_id,doctor_id,patient_id,data).subscribe((res)=>{
      console.log(res);
      this._notification.success('Presentation Added ');
     });
     this.presentationForm.reset();
  }

  addPresentation(event){
    console.log(event.target.value);
    // this.presentation = event.target.value;
    localStorage.setItem('presentation',event.target.value);
    this.presentation = localStorage.getItem('presentation');
   }

   addCourse(event){
    console.log(event.target.value);
    // this.course = event.target.value;
    localStorage.setItem('course&manegement',event.target.value);
    this.course = localStorage.getItem('course&manegement');
   }

   addFollowUp(event){
    console.log(event.target.value);
    // this.followup = event.target.value;
    localStorage.setItem('followup',event.target.value);
    this.followup = localStorage.getItem('followup');
   }

  courseSubmit(data,form)
  {
    var doctor_id = localStorage.getItem('doctor_id');
    var patient_id =localStorage.getItem('patient_id');
    var appointment_id = this.id;
    console.log(data,form);
    this.service.courseData(appointment_id,doctor_id,patient_id,data).subscribe((res)=>{
      console.log(res);
      this._notification.success('Course and Mangement Added ');
     });
     this.candmForm.reset();
  }

  followUpSubmit(data,form)
  {
    var doctor_id = localStorage.getItem('doctor_id');
    var patient_id =localStorage.getItem('patient_id');
    var appointment_id = this.id;
    console.log(data,form);
       this.service.followUpData(appointment_id,doctor_id,patient_id,data).subscribe((res)=>{
        console.log(res);
        this._notification.success('Follow Up Advice Added ');
      });
     this.fuForm.reset();
  }

  pConsultant(data,form)
  {
    console.log(data,form);
    var doctor_id = localStorage.getItem('doctor_id');
    var patient_id =localStorage.getItem('patient_id');
    var appointment_id = this.id;
    this.service.pConsultant(appointment_id,doctor_id,patient_id,data).subscribe((res)=>{
      console.log(res);
      this._notification.success('Follow Up Advice Added ');
     });
     this.primaryConsultant.reset();
  }

  consultantSubmit(data,form)
  {
    console.log(data,form);
    var doctor_id = localStorage.getItem('doctor_id');
    var patient_id =localStorage.getItem('patient_id');
    var appointment_id = this.id;
    this.service.consultant(appointment_id,doctor_id,patient_id,data).subscribe((res)=>{
      console.log(res);
      this._notification.success('Follow Up Advice Added ');
     });
     this.consultantForm.reset();
  }

  getPrint()
  {
    this.hideLoading = true;
    this.showLoading = false;
    var doctor_id = localStorage.getItem('doctor_id');
    var patient_id =localStorage.getItem('patient_id');
    var appointment_id = this.id;
    this.service.roundsPdf(doctor_id,patient_id,appointment_id).subscribe((res)=>{
      console.log(res);
      console.log(res['result'].pdf_name);
      window.open(res['result'].pdf_name,'_blank');
      this.hideLoading = false;
      this.showLoading = true;
      // this._notification.success('Follow Up Advice Added ');
     });
  }

  getDischargePrint()
  {
    this.hideDischargeLoading = true;
    this.showDischargeLoading = false;
    var doctor_id = localStorage.getItem('doctor_id');
    var patient_id =localStorage.getItem('patient_id');
    var appointment_id = this.id;
    this.service.dischargePdf(doctor_id,patient_id,appointment_id).subscribe((res)=>{
      console.log(res);
      console.log(res['result'].pdf_name);
      window.open(res['result'].pdf_name,'_blank');
      this.hideDischargeLoading = false;
      this.showDischargeLoading = true;
      // this._notification.success('Follow Up Advice Added ');
     });
  }

  dischargeFormSubmit(data,form)
  {
    console.log(data,form);
    console.log(data);
    console.log(data.disDate);
    // console.log(data.disDate.target._value._d);
    console.log(data.disDate.value);
    // let formatted_date = event.target._value._d.getDate() + "-" + (event.target._value._d.getMonth() + 1) + "-" + event.target._value._d.getFullYear()
    // console.log(formatted_date);
    var doctor_id = localStorage.getItem('doctor_id');
    var patient_id =localStorage.getItem('patient_id');
    var appointment_id = this.id;

    this.service.presentationSubmit(appointment_id,doctor_id,patient_id,data).subscribe((res)=>{
      console.log(res);
      this._notification.success('Successfully Added');
    });
  } 
}
