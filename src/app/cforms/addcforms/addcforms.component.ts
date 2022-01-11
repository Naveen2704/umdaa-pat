import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientserviceService } from 'src/app/service/patientservice.service';
import { ProceduresService } from 'src/app/procedures/procedures.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {Location, DOCUMENT} from '@angular/common';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-addcforms',
  templateUrl: './addcforms.component.html',
  styleUrls: ['./addcforms.component.css']
})
export class AddcformsComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    showToolbar: false,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: "Times New Roman"},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
    {
      name: 'quote',
      class: 'quote',
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1',
    },
  ],
  uploadUrl: 'v1/image',
  uploadWithCredentials: false,
  sanitize: false,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    ['bold', 'italic'],
    ['fontSize']
  ]
  };
  obj_R: any;
  id: any;
  roleId: any;
  title: any;
  p_name:any;
  umr_no:any ;
  age:any ;
  gender:any ;
  dr_name:any ;
  c_id: string;
 
  anesthesia: any;
  clinic_name: any;
  benefits: any;
  complications: any;
  alternative: any;
  medical_conditions: any;
  public brief: any;

  htmlContent;
  status: any;
  w_p_id: any;
  print_enable: boolean = false;
  disabled: boolean = false;


  constructor(private route: ActivatedRoute,private service: PatientserviceService,private proceduresservice: ProceduresService,private _location:Location,private notification:NotificationService)
   { 
    
   }

  ngOnInit() {

    this.route.params.subscribe(params => {

      let productid = params['id'];
      this.id = this.route.snapshot.paramMap.get("id");
      this.roleId = this.route.snapshot.paramMap.get("id1")
      console.log(this.route.snapshot.paramMap.get("id2"))
      this.c_id = this.route.snapshot.paramMap.get("id2")
     this.service.GetPatient(productid).subscribe(data =>{
       console.log(data.result['parameters'][0])
       this.obj_R = data.result['parameters'][0];
       if(data.result['parameters'][0].status == 'closed'){
        this.disabled = true;
      }
       this.p_name = this.obj_R.patient_name
       this.umr_no = this.obj_R.umr_no;
       this.age = this.obj_R.age
       this.gender = this.obj_R.gender
       this.dr_name = this.obj_R.doctor_name
       this.clinic_name = this.obj_R.clinic_name
      // this.getCformdesc(this.obj_R,this.c_id)
      this.proceduresservice.getDesc(this.obj_R,this.c_id).subscribe((res)=>{
        console.log(res)
        this.w_p_id = res.result.web_patient_consent_form_id
        this.benefits = res.result.benefits;
        this.title = res.result.consent_form_title;
        this.alternative = res.result.alternative;
        this.anesthesia = res.result.anesthesia;
        this.complications = res.result.complications;
        this.medical_conditions = res.result.medical_conditions;
        this.brief = res.result.brief;
        this.status = res.result.status;
        console.log(this.brief)
        var desc = '<p style="text-align: center;"><span style="font-size: 22px; line-height: 107%;">INFORMED CONSENT</span></p><p style="text-align: center;"><span style="font-size: 16px; line-height: 107%;">'+this.title+'</span></p><hr class="linebreak"><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">PATIENTS NAME: <b>'+this.p_name+'</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";font-weight:bold">UMR NO. <b>'+this.umr_no+'</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Age :<b>'+this.age+'</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Sex: '+this.gender+'</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">I/we hereby declare and confirm that I/we have been given detailed oral explanation by:</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";"><b>Dr.&nbsp;'+this.dr_name+'</b>&nbsp;&nbsp;&nbsp;&nbsp;in language I/we best understand</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">My doctors have recommended the following operation or procedure or </span><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">treatment</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">(BRIEF EXPLANATION) </span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";"><b style="margin-top: 10px">'+this.brief+'</b></span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman"; color: black;">and the following type of anesthesia: &nbsp;&nbsp; <b>'+this.anesthesia+'</b>&nbsp; </span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman"; color: black;">The operations or procedures will be performed by the doctor named below (or, in the event the doctor is unable to perform or complete the procedure, a qualified substitute doctor), together with associates and assistants, including anesthesiologists, pathologists, and radiologists from the medical staff of &nbsp;&nbsp;&nbsp;&nbsp;<b>'+this.clinic_name+'</b>(name of hospital)&nbsp;&nbsp;&nbsp;&nbsp;</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman"; color: black;">&nbsp;I/we have been explained the procedure in detail, in particular :</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman"; color: black;">INTENDED BENEFITS:&nbsp;&nbsp;<b>'+this.benefits+'</b></span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman"; color: black;">SERIOUS AND FREQUENTLY OCCURING RISKS,</span></p><table><tbody><tr><td style="border: .75pt solid black; vertical-align: top; background: white;" width="608"><table width="100%"><tbody><tr><td><p><b>'+this.complications+'</b></p></td></tr></tbody></table>&nbsp;</td></tr></tbody></table><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman"; color: black;">including any extra procedure,which may be necessary during the procedure.</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman"; color: black;">I/we have been explained in detail what the procedure is likely to involve,the benefits and risks of any avaliable alternative treatments(including no treatment)</span></p><table><tbody><tr><td style="border: .75pt solid black; vertical-align: top; background: white;" width="608"><table width="100%"><tbody><tr><td><p>ALTERNATIVE TREATMENT: <b>'+this.alternative+'</b></p></td></tr></tbody></table>&nbsp;</td></tr></tbody></table><br><br><br><br><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman"; color: black;">T</span><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">he risk associated with blood transfusion, alternatives to transfusion of blood and blood products should I need any blood transfusion is explained to me in detail.</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">I /we are also made aware that in addition to these above-mentioned risks, there are other risks also which have been discussed with me/us but are not listed above. I/we understand the purpose and all benefits of the proposed treatment and/or special procedure, that no guarantee has been made to me/us as to the results that may be obtained, and that the concerned doctor has offered to answer any of our questions about the proposed surgery/procedure/treatment.</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">Due to the following specific medical condition(s): <b>'+this.medical_conditions+'</b>, additional risks and/ or complications of the operation or procedure and anesthesia is explained to me/us. </span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">I/we agree </span></p><ul style="margin-top: 0in;"><li><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">the use of anesthesia and /or sedation/analgesia as required</span></li><li><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">the procedure and course of treatment as described above</span></li><li><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">to blood transfusion if necessary</span></li><li><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">any tissue removed during this procedure could be stored and used for medical research purpose</span></li><li><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">any procedure in addition to those described in this form will only be carried out if it is necessary to save my life or to prevent serious harm to my life</span></li><li><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">I/we also authorize the hospital and treating physician to photograph, video and or use any other mediums which result in permanent documentation of my image for medical, scientific or educational purpose, provided my identity is not revealed to them.</span></li></ul><p style="margin-left: .5in;"><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">&nbsp;</span></p><p><span style="font-size: 12.0pt;width:400px;float: left;text-align: left; line-height: 107%; font-family: "Times New Roman";">Patient or legally authorized representative&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-size: 12.0pt;width:200px;float: left; text-align:right;line-height: 107%; font-family: "Times New Roman";"> Patients relative</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">&nbsp;</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">--------------------------------------------------- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; 1.----------------------------------------------</span></p><ol start="2"><li style="margin-left: 4.1in;"> <span style="font-size: 12.0pt;margin-top: 10px;margin-bottom: 10px line-height: 107%; font-family: "Times New Roman";">--------------------------------------------- Relationship-----------------------------</span></li></ol><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">&nbsp;</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">Date: -------------------------------------&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time: -------------------------------------------------</span></p><p style="border: none; padding: 0in;"><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">Interpreter responsible for explaining the procedure and special treatment:</span></p><p style="border: none; padding: 0in;"><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">&nbsp;</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">&nbsp;</span></p><br><br><br><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">Physician certification</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">I certify that I have discussed the procedure described in the consent form with the patient or patient&rsquo;s legal representative, the risks and benefits of procedure, reasonable adverse effects that may occur, alternate methods of treatment their risks and benefits. I encouraged patients and their relatives to ask questions and that all questions were answered.</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">Signature of physician: -------------------------------------------------</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">Name of physician: -------------------------------------------------------</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">Date: ---------------------------&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time:------------------------------</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">&nbsp;</span></p>'
        
        if(this.status ==  0){
          this.htmlContent = desc
        }
        else if(this.status ==  '1'){ 
          this.htmlContent = res.result.patient_consent_form_description
        }
        else
        {
          this.htmlContent = res.result.doctor_consent_form_description
        }
        
      })
     })
    })

    
  }

  
  saveforthispatient(){
    console.log(this.htmlContent)
    this.proceduresservice.addConDesc(this.obj_R,this.c_id,this.title,this.htmlContent).subscribe((res)=>{
      console.log(res)
      if(res['code'] == 200){
        this.notification.success('updated successfully')
        this.print_enable = true
      }
      else{
        this.notification.error('updated failed')
      }
    })
  }
  saveastemplate(){
    this.proceduresservice.saveastempDesc(this.obj_R,this.c_id,this.title,this.htmlContent).subscribe((res)=>{
      console.log(res)
      if(res['code'] == 200){
        this.notification.success('updated successfully')
      }
      else{
        this.notification.error('updated failed')
      }
    })
  }
  getCformdesc(obj_R,id){
    this.proceduresservice.getDesc(this.obj_R,this.c_id).subscribe((res)=>{
      console.log(res.result.brief)
      this.brief = res.result.brief;
      console.log(this.brief)
      var desc = '<p style="text-align: center;"><span style="font-size: 22px; line-height: 107%;">INFORMED CONSENT</span></p><p style="text-align: center;"><span style="font-size: 16px; line-height: 107%;">'+this.title+'</span></p><hr class="linebreak"><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">PATIENTS NAME: <b>'+this.p_name+'</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";font-weight:bold">UMR NO. <b>'+this.umr_no+'</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Age :<b>'+this.age+'</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Sex: '+this.gender+'</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">I/we hereby declare and confirm that I/we have been given detailed oral explanation by:</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";"><b>Dr.&nbsp;'+this.dr_name+'</b>&nbsp;&nbsp;&nbsp;&nbsp;in language I/we best understand</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">My doctors have recommended the following operation or procedure or </span><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">treatment</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">(BRIEF EXPLANATION) </span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";"><b style="margin-top: 10px">'+this.brief+'</b></span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman"; color: black;">and the following type of anesthesia: &nbsp;&nbsp; <b>'+this.anesthesia+'</b>&nbsp; </span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman"; color: black;">The operations or procedures will be performed by the doctor named below (or, in the event the doctor is unable to perform or complete the procedure, a qualified substitute doctor), together with associates and assistants, including anesthesiologists, pathologists, and radiologists from the medical staff of &nbsp;&nbsp;&nbsp;&nbsp;<b>'+this.clinic_name+'</b>(name of hospital)&nbsp;&nbsp;&nbsp;&nbsp;</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman"; color: black;">&nbsp;I/we have been explained the procedure in detail, in particular :</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman"; color: black;">INTENDED BENEFITS:&nbsp;&nbsp;<b>'+this.benefits+'</b></span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman"; color: black;">SERIOUS AND FREQUENTLY OCCURING RISKS,</span></p><table><tbody><tr><td style="border: .75pt solid black; vertical-align: top; background: white;" width="608"><table width="100%"><tbody><tr><td><p><b>'+this.complications+'</b></p></td></tr></tbody></table>&nbsp;</td></tr></tbody></table><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman"; color: black;">including any extra procedure,which may be necessary during the procedure.</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman"; color: black;">I/we have been explained in detail what the procedure is likely to involve,the benefits and risks of any avaliable alternative treatments(including no treatment)</span></p><table><tbody><tr><td style="border: .75pt solid black; vertical-align: top; background: white;" width="608"><table width="100%"><tbody><tr><td><p>ALTERNATIVE TREATMENT: <b>'+this.alternative+'</b></p></td></tr></tbody></table>&nbsp;</td></tr></tbody></table><br><br><br><br><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman"; color: black;">T</span><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">he risk associated with blood transfusion, alternatives to transfusion of blood and blood products should I need any blood transfusion is explained to me in detail.</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">I /we are also made aware that in addition to these above-mentioned risks, there are other risks also which have been discussed with me/us but are not listed above. I/we understand the purpose and all benefits of the proposed treatment and/or special procedure, that no guarantee has been made to me/us as to the results that may be obtained, and that the concerned doctor has offered to answer any of our questions about the proposed surgery/procedure/treatment.</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">Due to the following specific medical condition(s): <b>'+this.medical_conditions+'</b>, additional risks and/ or complications of the operation or procedure and anesthesia is explained to me/us. </span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">I/we agree </span></p><ul style="margin-top: 0in;"><li><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">the use of anesthesia and /or sedation/analgesia as required</span></li><li><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">the procedure and course of treatment as described above</span></li><li><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">to blood transfusion if necessary</span></li><li><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">any tissue removed during this procedure could be stored and used for medical research purpose</span></li><li><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">any procedure in addition to those described in this form will only be carried out if it is necessary to save my life or to prevent serious harm to my life</span></li><li><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">I/we also authorize the hospital and treating physician to photograph, video and or use any other mediums which result in permanent documentation of my image for medical, scientific or educational purpose, provided my identity is not revealed to them.</span></li></ul><p style="margin-left: .5in;"><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">&nbsp;</span></p><p><span style="font-size: 12.0pt;width:400px;float: left;text-align: left; line-height: 107%; font-family: "Times New Roman";">Patient or legally authorized representative&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-size: 12.0pt;width:200px;float: left; text-align:right;line-height: 107%; font-family: "Times New Roman";"> Patients relative</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">&nbsp;</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">--------------------------------------------------- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; 1.----------------------------------------------</span></p><ol start="2"><li style="margin-left: 4.1in;"> <span style="font-size: 12.0pt;margin-top: 10px;margin-bottom: 10px line-height: 107%; font-family: "Times New Roman";">--------------------------------------------- Relationship-----------------------------</span></li></ol><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">&nbsp;</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">Date: -------------------------------------&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time: -------------------------------------------------</span></p><p style="border: none; padding: 0in;"><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">Interpreter responsible for explaining the procedure and special treatment:</span></p><p style="border: none; padding: 0in;"><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">&nbsp;</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">&nbsp;</span></p><br><br><br><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">Physician certification</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">I certify that I have discussed the procedure described in the consent form with the patient or patient&rsquo;s legal representative, the risks and benefits of procedure, reasonable adverse effects that may occur, alternate methods of treatment their risks and benefits. I encouraged patients and their relatives to ask questions and that all questions were answered.</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">Signature of physician: -------------------------------------------------</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">Name of physician: -------------------------------------------------------</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">Date: ---------------------------&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time:------------------------------</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: "Times New Roman";">&nbsp;</span></p>';

      this.htmlContent = desc
    })
  }
  print(){
    console.log(this.obj_R,this.w_p_id)
    this.proceduresservice.cformPrint(this.obj_R,this.w_p_id).subscribe((res)=>{
      console.log(res)
      let url = res.result.pdf_name
       window.open(url,'_blank',"width=500,height=500")
    })
  }
  backlocation(){
    this._location.back()
  }
}
