import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder ,FormGroupDirective} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ListService } from './list.service';
import { NotificationService } from '../shared/notification.service';
import { MatDialog } from '@angular/material';
import { SymptomsComponent } from '../symptoms/symptoms.component';
import { SuggestionsComponent } from '../suggestions/suggestions.component';
import { ConfirmdailogService } from '../shared/confirmdailog/confirmdailog.service';
import { UsersService } from '../services/users.service';
import { PatientserviceService } from '../service/patientservice.service';
const options = {
  title: 'CONFIRM.DOWNLOAD.JOB.TITLE',
  message: 'Are you sure to delete ?',
  cancelText: 'NO',
  confirmText: 'YES'
};
@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})


export class ListsComponent implements OnInit {
  userForm: FormGroup;
  id: string;
  gpeSList: any=[];
  isSubmitted = false;
  allGpeSList: any =[];
  hide:boolean=false;

  seForm: FormGroup;
  seSList: any=[];
  isSubmittedd = false;
  allSeSList: any =[];
  hidee:boolean=false;

  osForm: FormGroup;
  osSList: any=[];
  isSubmitteddd = false;
  allOsSList: any =[];
  hideee:boolean=false;
  roleId: string;
  status: any;
  disabled: boolean = false;

  constructor(private _service: PatientserviceService,private _dailog:ConfirmdailogService,private fb: FormBuilder,private users: UsersService,
    private route: ActivatedRoute,public dailog:MatDialog,private service:ListService,
    public  _notification:NotificationService) {
    this.userForm = this.fb.group({
      'firstName': null
    });

    this.seForm = this.fb.group({
      'seName': null
    });

    this.osForm = this.fb.group({
      'osName': null
    });
   }


  ngOnInit() {
    
    this.users.roleIdd.subscribe(user =>{
      console.log(user);
      this.roleId=user
      console.log(this.roleId);
     });
    this.id = this.route.snapshot.paramMap.get('id');
    this._service.GetPatient(this.id ).subscribe(data =>{

      this.status = data.result['parameters'][0].status
      if(this.status === 'closed'){
        this.disabled = true
      }
    
   
     })
    console.log(this.id);
    this.gpeSuggestions();
    this.gpeAllSuggestions();
    this.seSuggestions();
    this.seAllSuggestions();
    this.osSuggestions();
    this.osAllSuggestions();
  }
  
  onSubmit(form,formDirective: FormGroupDirective)
  {
    this.isSubmitted = true;
    console.log(form,formDirective,this.id);
    if (!this.userForm.valid ) {
      return false;
    } else{
    this.service.saveSuggestions(form,'GPE',this.id).subscribe((data)=>{
      console.log(data);
      this._notification.success('SuccessFully Saved');
      formDirective.resetForm();
      this.gpeSuggestions();
       this.isSubmitted = false;
    })
  }
  }

  onSubmitt(form,se: FormGroupDirective)
  {
    this.isSubmittedd = true;
    console.log(form,se);
    if (!this.seForm.valid ) {
      return false;
    } else{
    this.service.saveSuggestionss(form,'SE',this.id).subscribe((data)=>{
      console.log(data);
      this._notification.success('SuccessFully Saved');
      se.resetForm();
      this.seSuggestions();
       this.isSubmittedd = false;
    })
  }
  }

  
  onSubmittt(form,os: FormGroupDirective)
  {
    this.isSubmitteddd = true;
    console.log(form,os);
    if (!this.osForm.valid ) {
      return false;
    } else{
    this.service.saveSuggestionsss(form,'OS',this.id).subscribe((data)=>{
      console.log(data);
      this._notification.success('SuccessFully Saved');
      os.resetForm();
      this.osSuggestions();
       this.isSubmitteddd = false;
    })
  }
  }

  gpeSuggestions()
  {
    
    this.service.getSuggestions(this.id,'GPE').subscribe((data)=>{
      console.log(data);
      console.log(data['result']['Suggestions']);
      this.gpeSList = data['result']['Suggestions'];
      this.gpeAllSuggestions();
    })
  }

  seSuggestions()
  {
    
    this.service.getSuggestions(this.id,'SE').subscribe((data)=>{
      console.log(data);
      console.log(data['result']['Suggestions']);
      this.seSList = data['result']['Suggestions'];
      this.seAllSuggestions();
    })
  }

  osSuggestions()
  {
    
    this.service.getSuggestions(this.id,'OS').subscribe((data)=>{
      console.log(data);
      console.log(data['result']['Suggestions']);
      this.osSList = data['result']['Suggestions'];
      this.osAllSuggestions();
    })
  }

  sendGpeSuggestion(name)
  {
    console.log(name);
    this.userForm.get('firstName').setValue(name)
  }

  
  sendSeSuggestion(name)
  {
    console.log(name);
    this.seForm.get('seName').setValue(name)
  }

  sendOsSuggestion(name)
  {
    console.log(name);
    this.osForm.get('osName').setValue(name)
  }



  gpeAllSuggestions()
  {
    this.service.getAllSuggestionsList(this.id,'GPE').subscribe((data)=>{

      console.log(data);
      console.log(data['result']['Suggestions']);
      this.allGpeSList = data['result']['Suggestions'];
      if(this.allGpeSList !='')
      {
        this.hide=true;
      }
      else{
        this.hide=false;
      }
    })
  }

  seAllSuggestions()
  {
    this.service.getAllSuggestionsList(this.id,'SE').subscribe((data)=>{

      console.log(data);
      console.log(data['result']['Suggestions']);
      this.allSeSList = data['result']['Suggestions'];
      if(this.allSeSList !='')
      {
        this.hidee=true;
      }
      else{
        this.hidee=false;
      }
    })
  }

  osAllSuggestions()
  {
    this.service.getAllSuggestionsList(this.id,'OS').subscribe((data)=>{

      console.log(data);
      console.log(data['result']['Suggestions']);
      this.allOsSList = data['result']['Suggestions'];
      if(this.allOsSList !='')
      {
        this.hideee=true;
      }
      else{
        this.hideee=false;
      }
    })
  }
  updateModal(id,name){

    return this.dailog.open(SuggestionsComponent,
      {
       
        disableClose:true,
        panelClass:['Symptom_dailog'],
        data:{
          id:id,
          symptom_name:name,
          symptom_span:1,
          symptom_type:2,
          package:2,
          symptom_text:'general phyical examination'
        }
    
        }
      );
  
  }

  updateSuggestions(id,name)
  {
    console.log(id,name);
    this.updateModal(id,name).afterClosed().subscribe(res=>{
      console.log(res)
      if(res){
      //  this.getSymptomsList(this.obj_Sy)
      }
     
    })
  }

  deleteSuggestions(id,form_type)
  {
    this._dailog.open(options).afterClosed().subscribe(res=>{
      if(res){
    this.service.deleteSuggestions(id,form_type).subscribe((data)=>{
      console.log(data);
      this._notification.error('Deleted Successfully');
      this.gpeAllSuggestions();
      this.gpeSuggestions();
      // console.log(data['result']['Suggestions']);
      // this.allGpeSList = data['result']['Suggestions'];
    })
  }
  });
  }

  
  deleteSeSuggestions(id,form_type)
  {
    this._dailog.open(options).afterClosed().subscribe(res=>{
      if(res){
    this.service.deleteSuggestions(id,form_type).subscribe((data)=>{
      console.log(data);
      this._notification.error('Deleted Successfully');
      this.seAllSuggestions();
      this.seSuggestions();
      // console.log(data['result']['Suggestions']);
      // this.allGpeSList = data['result']['Suggestions'];
    })
  }
  });
  }

  deleteOsSuggestions(id,form_type)
  {
    this._dailog.open(options).afterClosed().subscribe(res=>{
      if(res){
    this.service.deleteSuggestions(id,form_type).subscribe((data)=>{
      console.log(data);
      this._notification.error('Deleted Successfully');
      this.osAllSuggestions();
      this.osSuggestions();
      // console.log(data['result']['Suggestions']);
      // this.allGpeSList = data['result']['Suggestions'];
    })
  }
  });
  }

}
