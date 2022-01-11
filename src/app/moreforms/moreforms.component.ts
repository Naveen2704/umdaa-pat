import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ProceduresService } from '../procedures/procedures.service';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { PatientserviceService } from '../service/patientservice.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NotificationService } from '../shared/notification.service';






@Component({
  selector: 'app-moreforms',
  templateUrl: './moreforms.component.html',
  styleUrls: ['./moreforms.component.css']
})
export class MoreformsComponent implements OnInit {

  isLoading = false;

  htmlContent ='';
  desc_id: any;
  config: AngularEditorConfig = {
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
  formList: any=[];
  MoreForm: FormGroup;
  termsList: any;
  List: any=[];
  id: string;
  obj_R: any;
  formData: any;
  type_id: any;
  AddedList: any=[];
  chipControl = new FormControl(new Set());
  tmpindex: number;
  EditForm: FormGroup;
  form_id: any;
  form_name: any;
  print_enable: boolean = false;
  disable: boolean = false;
 
  constructor(private service:ProceduresService,private _fb:FormBuilder,private route: ActivatedRoute,private servics: PatientserviceService,private notification: NotificationService) { }
  @ViewChild('term',{static: false}) terms : ElementRef;
  ngOnInit() {
    this.MoreForm = this._fb.group({
      queryField:new FormControl(''),
      mform_id : new FormControl(''),
      mform_id_type:new FormControl('')
    });
    // this.EditForm = new FormGroup({
    //  htmlContent : new FormControl('') 
    // })
    this.service.getDyanamicformslist().subscribe((res)=>{
      console.log(res)
      if(res['code']=='200'){
        this.formList = res.result.form_list
        console.log(this.formList)
       // console.log(this.formList[0]['form_id']);
        //this.type_id = this.formList[0]['form_id']
      }
    });
    this.route.params.subscribe(params => {

      let productid = params['id'];
      this.id = this.route.snapshot.paramMap.get("id");
      console.log(this.id)
    // let productid = this.route.snapshot.paramMap.get('id');
     console.log(productid)
     let roleId = params['id1'];
    // this.users.roleId(roleId);
     this.servics.GetPatient(productid).subscribe(data =>{
       console.log(data.result['parameters'][0])
       this.obj_R = data.result['parameters'][0];
       if(data.result['parameters'][0].status == 'closed'){
        this.disable = true;
      }
       this.addedFormsList(this.obj_R)
     })
    })

    //this.addedFormsList()
  }

  // formId=(id,chip: any)=>{
  //   // console.log(id)
  //   // this.formData = id;
  //   // const addChip = () => { this.chips.add(chip); };
  //   // const removeChip = () => { this.chips.delete(chip); };

  //   // this.chips.has(chip) ? removeChip() : addChip();
  //  // this.termsList =  this.terms.nativeElement.value
  //   //console.log(this.termsList)
  //   // this.service.getFormssearch().subscribe((result)=>{
  //   //   console.log(result)
  //   // })
  // }

  // get chips() { return this.chipControl.value; }
  changeClient(data){
    console.log(data)
    this.formData = data
  }
  // formId(data){
  //   console.log(data)
  // }
  MoreFormSearch(term,id){
    console.log(term,id);
   
    
      this.service.getFormssearch(term,id).subscribe((result)=>{
        console.log(result.result.form_list_details);
        this.List = result.result.form_list_details
      })
    

  }
getId(id,type_id){
  console.log(id,type_id)
  this.type_id = type_id
  this.MoreForm.get('mform_id').setValue(id)
  this.MoreForm.get('mform_id_type').setValue(type_id)
}
  MoreFormsubmit(data,formdirective: FormGroupDirective){
  console.log(data)
    this.service.savePatientform(data,this.obj_R).subscribe((res)=>{
      console.log(res)
      if(res['code']=='200'){
        this.addedFormsList(this.obj_R);
        this.notification.success('Successfully added');
        formdirective.resetForm()
      }
      if(res['code']=='201'){
        this.notification.error('Already Exsits');
        formdirective.resetForm()
      }
    })
  }
 
  addedFormsList(obj_R){
    this.service.getFormList(this.obj_R).subscribe((res)=>{
      console.log(res)
      this.AddedList = res.result.form_details
    }
    )
  }
  getaddedId(id:any,name:any){
    console.log(id)
    this.form_name = name 
        this.form_id = id
    this.service.getDescription(id).subscribe((res)=>{
      if(res['code'] == '200'){
        console.log(res.result.form_details[0].id)
        console.log(res.result.form_details[0].description)
        this.desc_id = res.result.form_details[0].id
        this.htmlContent = res.result.form_details[0].description;
        
       
      }
     
    })
  }

  EditFormsubmit(){
    console.log(this.desc_id,this.htmlContent)
    this.service.EditDescription(this.desc_id,this.htmlContent).subscribe((result)=>{
      console.log(result)
      if(result['code'] == '200'){
        this.notification.success('successfully updated');
        this.print_enable = true;
        this.getaddedId(this.form_id,name)
      }
    })
  }

  saveastemp(){ 
    this.service.savemoreTemp(this.desc_id,this.htmlContent,this.obj_R,this.form_name).subscribe((result)=>{
      console.log(result)
      if(result['code'] == '200'){
        this.notification.success('successfully updated');
      }
    })
  }
  print(){ 
    this.service.printMore(this.desc_id,this.obj_R).subscribe((res)=>{
      console.log(res);
      let url = res.result.pdf_name
       window.open(url,'_blank',"width=500,height=500")
    })
  }
}
