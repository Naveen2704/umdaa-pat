import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2, Directive, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormGroupDirective, FormControl } from '@angular/forms';
import { ProceduresService } from '../procedures/procedures.service';
import { PatientserviceService } from '../service/patientservice.service';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { NotificationService } from '../shared/notification.service';
import { MatExpansionPanel } from '@angular/material';



@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.css']
})
export class CheckListComponent implements OnInit {


  
  @ViewChild('target',{static: false}) targetEl: ElementRef;

  isLoading = false;
  hideLoading = false;
  hideMainData = false;
  id: string;
  obj_R: any;
  CList: any;


  i="3";
  beforelists:any = [];
  data:string = "";
  totallist:string="";
  lists1:any = [];
  lists2:any = [];
  afterlists:any = [];
  duringlists:any = [];
  errors:any = [];
  marked = true;
  consent_checklist:any = [];
  checkedItems:any="";
  SchoolDetailsForm : FormGroup;    
  Consent_Form:any="";
  toggleBool: boolean=false;
  filter=true;
  beforedata:any=[];
  impbefore:any=[];
  resultArr:any=[];
  resultArr1:any=[];
  isDisabled:boolean=true;
  map='before';
  mapp='after';
  mappp='during';
  count:any=[];
  names:any='';
  inputDisabled: boolean = false;
  isDisabledd:boolean=true;
  isDisab:boolean=true;
  loading: any;
  submitted = false;
  vzmlist:any=[];
  textValue="";
  main: number;
  length:number;
  checked: 5;
  imp12:number= 1;
  checkedValuesun:number = 0;
  testing: any;
  diwali:any;
  impAfter12: number;
  afterTesting: any;
  plate: number;
  groupArray: any=[];
  lists3: any;
  DuringTesting: any;
  impDuring12: number;
  checklistmaster: any;
  c_id: any;
  r_readonly = false;
  readonly:boolean = false;
  disabled:boolean = true;
  private isEditing = false;
  UHID: any;
  panelOpenState:boolean = false;
  shown:boolean = false;
  dataId: number;
  Cformlist: any;
  clForm: FormGroup;
  @ViewChild('mep',{static:true}) mep: MatExpansionPanel
  xpandStatus: boolean = false;
  anesthetist: any;
  assisted_by: any;
  cheked_by: string;
  done_by: any;
  nurse: any;
  disable: boolean = false;
  noDataAvailable: boolean=false;
  constructor(@Inject(DOCUMENT) document,private _fb:FormBuilder,private proceduresservice: ProceduresService,private service: PatientserviceService,private route: ActivatedRoute,private notification:NotificationService) 
  { 
    
  }
 
  ngOnInit() {
    this.route.params.subscribe(params => {
      let productid = params['id'];
      this.id = this.route.snapshot.paramMap.get("id");
      console.log(this.id)
     // let productid = this.route.snapshot.paramMap.get('id');
     console.log(productid)
     let roleId = params['id1'];
     this.service.GetPatient(productid).subscribe(data =>{
       console.log(data);
       console.log(data.result['parameters'][0]);
       this.obj_R = data.result['parameters'][0];
       if(data.result['parameters'][0].status == 'closed'){
        this.disable = true;
      }
     console.log(this.obj_R);
     this.UHID = this.obj_R.umr_no;
     this.GetChecklist();
     this.getChecklistMaster(this.obj_R);
     })
    })
    this.createform(this.resultArr1);  
    this.clForm = this._fb.group({
      queryField:new FormControl(''),
      cl_id : new FormControl('')
    });
  }
  
  Search(term:string){
    console.log(term);
    console.log(this.obj_R);
    this.proceduresservice.getCformsSearch(term,this.obj_R).subscribe((res)=>{
      console.log(res);
      this.Cformlist = res.result.consent_form;
    })
  }

  getId(id){
    this.clForm.get('cl_id').setValue(id)
  }

  Cladd(data,formDirective:FormGroupDirective){ 
    this.proceduresservice.addchecklist(data,this.obj_R).subscribe((res)=>{
      console.log(res);
      if(res['code'] == 200){
        this.GetChecklist()
      }
    })
  }

  GetChecklist(){ 
    this.proceduresservice.getCheckList(this.obj_R).subscribe((res)=>{
      console.log(res)
      console.log(res.result.consent_form)
      this.CList = res.result.consent_form
    })
  }

  test()
  {
   // this.disabled=!this.disabled;
  }

  consentFormId(id){
    this.hideLoading = true;
    this.hideMainData = false;
    console.log(id)
    this.c_id = id
    this.getBeforeList();
    // this.getCheklistparameters(id)
  }

  createform(response)    
  {  
    this.hideLoading = false;
    this.hideMainData = true;
    this.noDataAvailable = false;
  console.log(response);
  var uniqueNames = [];
  for(var i = 0; i< response.length; i++){    
      if(uniqueNames.indexOf(response[i].category) === -1){
         uniqueNames.push(response[i].category);     
          //  console.log(this.plate);  
      }        
  }
   this.count = uniqueNames.length;
   //this.count = 1;

   console.log(this.count );   
  
   this.groupArray = [];
  for(i = 0; i< uniqueNames.length; i++){  
    this.names = uniqueNames[i]; 
    this.groupArray.push(uniqueNames[i]);
    console.log(this.names);
  }
  console.log(this.groupArray);

    let arr=[];    
    for(let i=0;i<response.length;i++)    
    {   
      // console.log(data[i]);   
      arr.push(this.BuildFormDynamic(response[i]))         
    }    
  
      this.SchoolDetailsForm =  this._fb.group({    
        anesthetist : [''],   
        assisted_by:[''], 
        UHID:[this.UHID],
        checked_by:['', Validators.required], 
        nurse:[''],
        done_by:[''],  
        patient_consent_form_id:[''],
        consent_check_list:this._fb.array(arr)    
      })   
      this.getCheklistparameters(this.c_id)
    }
    triggerafterrEvent(res)
    {
    // console.log(res);
    ((document.getElementById(res) as HTMLInputElement).disabled)=!((document.getElementById(res) as HTMLInputElement).disabled);
    
    if((document.getElementById(res) as HTMLInputElement).disabled == false)
    {
      
    this.impAfter12 = 1;
    // document.getElementById(id).clear();
    return this.afterTesting = res;
    
    }
    else{
      this.impAfter12 =0;
      return this.afterTesting = res;
    
    }
    
    }
    
    triggerDuringEvent(res)
    {
     console.log(res);
    
    ((document.getElementById(res) as HTMLInputElement).disabled)=!((document.getElementById(res) as HTMLInputElement).disabled);
    
    if((document.getElementById(res) as HTMLInputElement).disabled == false)
    {
      
    this.impDuring12 = 1;
    // document.getElementById(id).clear();
    return this.DuringTesting = res;
    
    }
    else{
      this.impDuring12 =0;
      return this.DuringTesting = res;
    
    }
    
    }
     
     
      triggerSomeEvent($event) {
     
          this.isDisabled = !this.isDisabled;
        
          return;
    
          
      }
    
      triggerduringEvent($event) {
     
        this.isDisab = !this.isDisab;
        return;
    
        
    }
    

      triggerafterEvent(event)
      {
        this.isDisabledd = !this.isDisabledd;
        return;
      
      }
    
    
    sendOne()
    {
  
         return 0;
      
      // else{
      //   return 0;
      // }
    }

    BuildFormDynamic(product): FormGroup{  
      console.log(product);
       console.log(product.length);
      if(product.checked == 0){
        var checked  = false;
       
      }
      else{
        var checked = true;
        
      }
     
      return this._fb.group({    
            Consent_Form:[product.description],
            checked: [checked]   ,
            category:[product.category],
            checklist_id: [product.checklist_id],
            doctor_review: [''],
            patient_checklist_id: [product.patient_checklist_id],
            type:[product.type],
           // product_id :[{value:product.checklist_id,disabled:true}],
            remark:[product.remark]   
       });
     
     }   
     get f() {  return this.SchoolDetailsForm.controls; }

     getChecklistMaster(obj_R){
       this.proceduresservice.getcmaster(this.obj_R).subscribe((data)=>{
          console.log(data)
          this.checklistmaster = data.result.checklist_master
          console.log(this.checklistmaster )
       })
     }

     getBeforeList()
     {
       console.log(this.c_id);
       this.isLoading = true;
       this.proceduresservice.getBeforeDescription(this.c_id).subscribe((data)=>{
        // this.loading.dismissAll();
          console.log(data);
         this.beforelists = data["result"]["consent_check_list"];
         console.log(this.beforelists);
        //  let myItem = JSON.parse(localStorage.getItem("key"));
        //  this.lists1 = myItem["result"]["checklist_master"];
        //  console.log(this.lists1);
        if(data["result"]["consent_check_list"] == null){
          this.hideLoading = false;
          this.noDataAvailable = true;
        }
        // if( this.beforelists != '')
        // {
          this.beforelists.map((a)=>{
            let obj2 = this.checklistmaster.find((b)=> a.checklist_id === b.checklist_id);
            if(obj2)
              Object.assign(a,obj2);
              this.isLoading = false;
              this.wait(1000).then( () => this.isLoading = false );
              return a;
            });
      
            console.log(this.beforelists);
          // this.createform();
           // this.createBeforeForm(this.beforelists);
            this.beforedata=this.beforelists;
            this.getAfterList(this.beforelists);
            // this.getAfterList(this.beforelists);
        // }
     
 
  
  
       });
     }
  
     getAfterList(res)
     {
       console.log(res);
        this.isLoading = true;
       this.proceduresservice.getAfterDescription(this.c_id).subscribe((data)=>{

        //  let myItem = JSON.parse(localStorage.getItem("key"));
        //  this.lists2 = myItem["result"]["checklist_master"];
        //  console.log(this.lists1);
         this.afterlists = data["result"]["consent_check_list"];
          console.log(this.afterlists);
         
        this.afterlists.map((a)=>{
        let obj2 =  this.checklistmaster.find((b)=> a.checklist_id === b.checklist_id);
        if(obj2)
          Object.assign(a,obj2);
          this.isLoading = false;
          this.wait(2000).then( () => this.isLoading = false );
        return a;
        });
  
         console.log(this.afterlists)
        let resultArr = [];
  
        resultArr= resultArr.concat(this.afterlists);
        resultArr= resultArr.concat(res);
      
        console.log(resultArr);
        this.getDuringList(resultArr);
        this.createform(resultArr);
  
  
        });
     }
     async wait(ms: number): Promise<void> {
      return new Promise<void>( resolve => setTimeout( resolve, ms) );
    }
     getDuringList(res)
     {
      this.isLoading = true;
       this.proceduresservice.getDuringDescription(this.c_id).subscribe((data)=>{
        // this.loading.dismissAll();
        //  let myItem = JSON.parse(localStorage.getItem("key"));
        //  this.lists3 = myItem["result"]["checklist_master"];
        //  console.log(this.lists1);
         this.duringlists = data["result"]["consent_check_list"];
         console.log(this.duringlists);
         this.isLoading = true;
         this.wait(2000).then( () => this.isLoading = false );
        this.duringlists.map((a)=>{
        let obj2 =  this.checklistmaster.find((b)=> a.checklist_id === b.checklist_id);
        if(obj2)
          Object.assign(a,obj2);
          
        return a;
        });
  
        // console.log(this.duringlists);
        let resultArr1 = [];
  
        resultArr1= resultArr1.concat(this.duringlists);
        resultArr1= resultArr1.concat(res);
      
      console.log(resultArr1);
        // this.duringlists(resultArr);
        this.createform(resultArr1);
        });
        // this.getCheklistparameters(this.c_id)
     }

     SaveData(formDirective: FormGroupDirective)    
     {  
       this.submitted = true;
   
        console.log(this.SchoolDetailsForm.value)
       if (this.SchoolDetailsForm.invalid) {
         this.targetEl.nativeElement.scrollIntoView({behavior: 'smooth'}); 
           return;
       }
   
       else{   
         console.log(this.SchoolDetailsForm.value);
       this.proceduresservice.checklistadd(this.SchoolDetailsForm.value,this.obj_R,this.c_id ).subscribe((data)=>{
          console.log(data);
          if(data['code'] == '200'){
            this.closepanel()
            // formDirective.resetForm()
            //  this.panelOpenState = false;
             this.notification.success('Check List Updated Successfully');
             this.mep.expanded = false
              // this.closepanel()
            // this.targetEl.nativeElement.scrollIntoView({behavior: 'smooth'}); 
           
          }
          
       });
     }
     
     }
     closepanel(){
      this.xpandStatus= false;
     }
     clearQuantityIfNecessary(id,) {
    

       console.log(this.SchoolDetailsForm.get(`consent_check_list.${id}`).value)
      let elm = this.SchoolDetailsForm.get(`consent_check_list.${id}`).value.checked
      console.log(elm)
     
      // this.SchoolDetailsForm.get(`consent_check_list.${id}`).value.checked =! this.SchoolDetailsForm.get(`consent_check_list.${id}`).value.checked
      if (!this.SchoolDetailsForm.get(`consent_check_list.${id}`).value.checked) {
          // console.log(!this.SchoolDetailsForm.get(`consent_check_list.${id}`).value.checked)
         this.SchoolDetailsForm.get(`consent_check_list.${id}`).patchValue({remark: ""});
      }
    }
    clearQuantity(id) {
      let elm = this.SchoolDetailsForm.get(`consent_check_list.${id}`).value.checked
      console.log(elm)
      if (!this.SchoolDetailsForm.get(`consent_check_list.${id}`).value.checked) {
        this.SchoolDetailsForm.get(`consent_check_list.${id}`).patchValue({remark: ""});
      }
    }

    clearQuantityD(id){
      let elm = this.SchoolDetailsForm.get(`consent_check_list.${id}`).value.checked
      console.log(elm)
      if (!this.SchoolDetailsForm.get(`consent_check_list.${id}`).value.checked) {
        this.SchoolDetailsForm.get(`consent_check_list.${id}`).patchValue({remark: ""});
      }
    }
   getCheklistparameters(id){ 
     this.proceduresservice.chekeddata(id).subscribe((res)=>{
      console.log(res)
    
      this.anesthetist = res.result.anesthetist;
      this.assisted_by = res.result.assisted_by;
      this.cheked_by = res.result.checked_by;
      this.done_by = res.result.done_by;
      this.nurse = res.result.nurse;
      console.log( this.cheked_by)
      this.SchoolDetailsForm.get('checked_by').setValue(this.cheked_by )
      this.SchoolDetailsForm.get('assisted_by').setValue(this.assisted_by )
      this.SchoolDetailsForm.get('nurse').setValue( this.nurse )
      this.SchoolDetailsForm.get('done_by').setValue(this.done_by )
      this.SchoolDetailsForm.get('anesthetist').setValue(this.anesthetist )
       
     })
   }
}
