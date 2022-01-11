import { Component, OnInit } from '@angular/core';
import { ProceduresService } from './procedures.service';
import { PatientserviceService } from '../service/patientservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { FormGroup, FormControl, FormBuilder, FormGroupDirective } from '@angular/forms';
import * as introJs from 'intro.js/intro.js';
@Component({
  selector: 'app-procedures',
  templateUrl: './procedures.component.html',
  styleUrls: ['./procedures.component.css']
})
export class ProceduresComponent implements OnInit {
  introJS = introJs();

  obj_R: any;
  ProceduresList: any=[];
  id: string;
  ProcedureForm: FormGroup;
  options: any[];
  roleId: string;
  disabled: boolean = false;

  constructor(private _fb:FormBuilder,private router: Router,private users: UsersService,private proceduresservice: ProceduresService,private service: PatientserviceService,private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(params => {

      let productid = params['id'];
      this.id = this.route.snapshot.paramMap.get("id");
      this.roleId = this.route.snapshot.paramMap.get("id1");
      console.log(this.id)
    // let productid = this.route.snapshot.paramMap.get('id');
     console.log(productid)
     let roleId = params['id1'];
     this.users.roleId(roleId);
     this.service.GetPatient(productid).subscribe(data =>{
       console.log(data.result['parameters'][0])
       this.obj_R = data.result['parameters'][0];
       if(data.result['parameters'][0].status == 'closed'){
         this.disabled = true;
       }
      this.getProceduresList(this.obj_R)
     })
    })

    this.ProcedureForm = this._fb.group({
      queryField:new FormControl(''),
      procedure_id : new FormControl('')
    });
  }
  help(){
    this.introJS.start();
    
  }
  getProceduresList(obj_R){
    this.proceduresservice.getProceduresList(this.obj_R).subscribe((data) => {
    console.log('procedureList',data)
      this.ProceduresList = data.result.procedure_list
    })
  }
  procedureId(id2){
    console.log(id2)
    this.router.navigate(['/addprocedure/'+this.id+'/'+this.roleId +'/'+id2]);
  }

  procedureSearch(term){
    this.proceduresservice.searchprocedure(term,this.obj_R).subscribe(result =>{
      console.log('search',result)
      this.options  = result.result.procedures
    })
  }
  getId(id){
    this.ProcedureForm.get('procedure_id').setValue(id)
  }
  Proceduresearchadd(data,formDirective: FormGroupDirective){
    console.log('add',data)
    this.proceduresservice.addprocedure(data,this.obj_R).subscribe(result =>{
      console.log(result);
      this.getProceduresList(this.obj_R)
      formDirective.resetForm()
    })
  
  }
}
