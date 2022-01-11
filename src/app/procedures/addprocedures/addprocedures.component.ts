import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { PatientserviceService } from 'src/app/service/patientservice.service';
import { ProceduresService } from '../procedures.service';
import { FormGroup, FormControl, FormGroupDirective } from '@angular/forms';
import { NotificationService } from 'src/app/shared/notification.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {Location, DOCUMENT} from '@angular/common';
@Component({
  selector: 'app-addprocedures',
  templateUrl: './addprocedures.component.html',
  styleUrls: ['./addprocedures.component.css']
})
export class AddproceduresComponent implements OnInit {
  obj_R: any;
  myHtml=''
  EditUrl: any;
  ProcedureForm: FormGroup;
  procedure_id: string;
  mp_id: string;
  htmlContent='';
  disabled: boolean = false;

  constructor(private _location: Location,private route: ActivatedRoute,private users: UsersService,private service: PatientserviceService,private proceduresservice: ProceduresService,private notification : NotificationService) { }
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
      {class: 'times-new-roman', name: 'Times New Roman'},
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
  ngOnInit() {
    this.route.params.subscribe(params => {

      let productid = params['id'];
    //  this.id = this.route.snapshot.paramMap.get("id");
   //   console.log(this.id)
     this.procedure_id = this.route.snapshot.paramMap.get('id1');
     this.mp_id =this.route.snapshot.paramMap.get('id2');
     console.log(productid)
     let roleId = params['id1'];
     this.users.roleId(roleId);
     this.service.GetPatient(productid).subscribe(data =>{
       console.log(data.result['parameters'][0])
       this.obj_R = data.result['parameters'][0];
       if(data.result['parameters'][0].status == 'closed'){
         this.disabled = true;
       }
       console.log(this.obj_R)
       this.getHtmlview(this.obj_R,this.mp_id)
     })
    })
    this.ProcedureForm = new FormGroup({
      patientName: new FormControl(''),
      patientage: new FormControl(''),
      gender: new FormControl(''),
      umr_no: new FormControl(''),
      date: new FormControl(''),
      Emergency: new FormControl(''),
      Performingdr: new FormControl(''),
      Anaesthetist:new FormControl(''),
      Assistingdr:new FormControl(''),
      Assistingnurse:new FormControl(''),
      typeofanesthesia: new FormControl(''),
      Preoperative: new FormControl(''),
      Postoperative: new FormControl(''),
      Indication: new FormControl(''),
      Position: new FormControl(''),
    })
  }
  saveProcedure(data,formDirective: FormGroupDirective){
    console.log(data)
    this.proceduresservice.saveProcedure(data,this.mp_id,this.obj_R ).subscribe(res =>{
      console.log(res)
      if(res['code'] == '200'){
          this.notification.success('Procedures Updated successfully')
          formDirective.resetForm()
      }
    })  
  }
  getHtmlview(obj_R,id) {
    console.log(id)
    this.proceduresservice.getHtmlview(this.obj_R,id).subscribe((result) => {
      console.log(result.result.procedure_description)
      this.myHtml = result.result.procedure_description;
      this.htmlContent = result.result.procedure_description
      this.EditUrl = result.result.procedure_url;
 
    })
  }
  editDescription(){
    let url = this.EditUrl
     window.open(url,'_blank',"width=500,height=500")
  }
  saveforthispatient(){
    console.log(this.htmlContent,this.obj_R,this.mp_id)
    this.proceduresservice.saveforpatient(this.htmlContent,this.obj_R,this.mp_id).subscribe((res)=>{
      console.log(res)
      if(res['code'] == '200'){
        this.notification.success('Procedures Updated successfully')
      }
    })
  }
  saveastemplate(){
    this.proceduresservice.saveastemplate(this.htmlContent,this.obj_R,this.mp_id).subscribe((res)=>{
      console.log(res)
      if(res['code'] == '200'){
        this.notification.success('Procedures Updated successfully')
      }
    })
  }
  backlocation(){
    this._location.back()
  }
}
