import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientserviceService } from '../service/patientservice.service';
import { SummaryService } from '../summary/summary.service';

@Component({
  selector: 'app-rmpsummary',
  templateUrl: './rmpsummary.component.html',
  styleUrls: ['./rmpsummary.component.css']
})
export class RmpsummaryComponent implements OnInit {
  fi_Obj: any;
  patientsummary: any;
  patient_details: any;
  vitals: any;
  symptoms: any;
  audioFile: any;
  respration=[];
  left_infra_clavicle_audio: any;
  left_infra_mammary_audio: any;
  left_infrascapular_audio: any;
  left_interscapular_audio: any;
  right_infra_clavicle_audio: any;
  right_infrascapular_audio: any;
  right_infra_mammary_audio: any;
  right_interscapular_audio: any;
  arotic_audio: any;
  pulmonary_audio: any;
  tricuspid_audio: any;
  mitral_audio: any;
  abdominal_audio: any;
  cns_audio: any;
  mysclera: string = "assets/sumimg/sclera.png"
  mypaleper:string = "assets/sumimg/palpebralconjuncativa.png"
  myoral:string="assets/sumimg/oralcavity.png"
  myneck:string="assets/sumimg/neck.png"
  mydorasalHand:string="assets/sumimg/dorsalhand.png";
  mypalms:string="assets/sumimg/palms.png";
  myleg:string="assets/sumimg/leg.png";
  sclera: any;
  patient_palpebral_conjunctiv: any;
  patient_palms: any;
  patient_neck: any;
  patient_oral_cavity: any;
  patient_leg: any;
  patient_dorsal_hand: any;
  reports_desc: any;
  reports_img: any[];

  constructor(private route: ActivatedRoute,private service: PatientserviceService,private _service:SummaryService) { }
  @ViewChildren('audio') audioElms :ElementRef[];

  @ViewChildren('audio1') audioElms1 :ElementRef[];
  @ViewChildren('audio2') audioElms2 :ElementRef[];
  @ViewChildren('audio3') audioElms3 :ElementRef[];
  @ViewChildren('audio4') audioElms4 :ElementRef[];

  @ViewChildren('audio5') audioElms5 :ElementRef[];
  @ViewChildren('audio6') audioElms6 :ElementRef[];
  @ViewChildren('audio7') audioElms7 :ElementRef[];
  ngOnInit() {
    this.route.params.subscribe(params => {
      let app_id = params['id'];
      let role_id = params['id1'];
      console.log(app_id,role_id)
      this.service.GetPatient(app_id).subscribe(data =>{
        console.log(data)
        this.fi_Obj = data.result['parameters'][0];
        this._service.getRmpsummary(this.fi_Obj).subscribe((res)=>{
          console.log(res)
          this.patientsummary = res.patient_summary
          this.patient_details = res.patient_summary.patient_details 
          this.vitals = res.patient_summary.vitals;
          this.symptoms = res.patient_summary.symptoms
          this.audioFile = res.patient_summary.symptoms.symptoms_audio;
          //reports img 

          this.reports_desc = res.patient_summary.reports.desc;
         this.reports_img = res.patient_summary.reports.images
          /// gpe img 

          this.sclera = res.patient_summary.gpe.patient_sclera;
          this.patient_palpebral_conjunctiv = res.patient_summary.gpe.patient_palpebral_conjunctiva
          this.patient_palms = res.patient_summary.gpe.patient_palms
          this.patient_oral_cavity = res.patient_summary.gpe.patient_oral_cavity
          this.patient_neck = res.patient_summary.gpe.patient_neck
          this.patient_leg = res.patient_summary.gpe.patient_leg;
          this.patient_dorsal_hand = res.patient_summary.gpe.patient_dorsal_hand;
          // cardio
          this.arotic_audio = res.patient_summary.sc_cardio.arotic_audio;
          this.mitral_audio = res.patient_summary.sc_cardio.mitral_audio;
          this.pulmonary_audio = res.patient_summary.sc_cardio.pulmonary_audio;
          this.tricuspid_audio = res.patient_summary.sc_cardio.tricuspid_audio;

          // RESPIRATION

          this.left_infra_clavicle_audio =  res.patient_summary.sc_respiration.left_infra_clavicle_audio;
          this.left_infra_mammary_audio = res.patient_summary.sc_respiration.left_infra_mammary_audio
          this.left_infrascapular_audio = res.patient_summary.sc_respiration.left_infrascapular_audio 
          this.left_interscapular_audio = res.patient_summary.sc_respiration.left_interscapular_audio
          this.right_infra_clavicle_audio = res.patient_summary.sc_respiration.right_infra_clavicle_audio 
          this.right_infra_mammary_audio = res.patient_summary.sc_respiration.right_infra_mammary_audio
          this.right_infrascapular_audio = res.patient_summary.sc_respiration.right_infrascapular_audio 
          this.right_interscapular_audio = res.patient_summary.sc_respiration.right_interscapular_audio
          this.respration.push(
            {file_name:this.left_infra_clavicle_audio,label:"1. Left Infra Clavicle"},
            {file_name: this.left_infra_mammary_audio ,label:"2. Left Infra Mammary"},
            {file_name: this.left_interscapular_audio ,label:"3.  Left Interscapular" },
            {file_name: this.left_infrascapular_audio ,label:"4.  Left Infrascapular"},
            {file_name: this.right_infra_clavicle_audio ,label:"5. Right Infra Clavicle " },
            {file_name:  this.right_infra_mammary_audio,label:"6.  Right Infra Mammary" },
            {file_name: this.right_infrascapular_audio ,label:"7. Right Infrascapularr" },
            {file_name:  this.right_interscapular_audio ,label:"8. Right Interscapular" },
            
            );
          console.log(this.respration)
          // abdominal

          this.abdominal_audio = res.patient_summary.sc_abdominal.abdominal_audio;

          // cns 

          this.cns_audio = res.patient_summary.sc_cns.cns_audio
          
        })
       })
    });
    
    }
  
    onPaly(elm:HTMLAudioElement) {
      console.log(elm)
      this.audioElms.forEach(({nativeElement:e})=>{
       if (e !== elm) {
         e.pause();
       }
      })
    }
    onPalyc1(elm:HTMLAudioElement) {
      console.log(elm)
      this.audioElms1.forEach(({nativeElement:e})=>{
       if (e !== elm) {
         e.pause();
       }
      })
    }
    onPalyc2(elm:HTMLAudioElement) {
      console.log(elm)
      this.audioElms2.forEach(({nativeElement:e})=>{
       if (e !== elm) {
         e.pause();
       }
      })
    }
    onPalyc3(elm:HTMLAudioElement) {
      console.log(elm)
      this.audioElms3.forEach(({nativeElement:e})=>{
       if (e !== elm) {
         e.pause();
       }
      })
    }
    onPalyc4(elm:HTMLAudioElement) {
      console.log(elm)
      this.audioElms4.forEach(({nativeElement:e})=>{
       if (e !== elm) {
         e.pause();
       }
      })
    }
    onPalyR(elm:HTMLAudioElement) {
      console.log(elm)
      this.audioElms5.forEach(({nativeElement:e})=>{
       if (e !== elm) {
         e.pause();
       }
      })
    }
    onPalyA(elm:HTMLAudioElement) {
      console.log(elm)
      this.audioElms6.forEach(({nativeElement:e})=>{
       if (e !== elm) {
         e.pause();
       }
      })
    }
    onPalycns(elm:HTMLAudioElement) {
      console.log(elm)
      this.audioElms7.forEach(({nativeElement:e})=>{
       if (e !== elm) {
         e.pause();
       }
      })
    }
  

}
