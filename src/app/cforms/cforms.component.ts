import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective } from '@angular/forms';
import { ProceduresService } from '../procedures/procedures.service';
import { PatientserviceService } from '../service/patientservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cforms',
  templateUrl: './cforms.component.html',
  styleUrls: ['./cforms.component.css']
})
export class CformsComponent implements OnInit {
  cForm: FormGroup;
  obj_R: any;
  id: any;
  Cformlist: any=[];
  CList: any=[];
  roleId: string;
  disabled: boolean = false;

  constructor(private router: Router,private _fb:FormBuilder,private proceduresservice: ProceduresService,private service: PatientserviceService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {

      let productid = params['id'];
      this.id = this.route.snapshot.paramMap.get("id");
      this.roleId = this.route.snapshot.paramMap.get("id1")
      console.log(this.id)
    // let productid = this.route.snapshot.paramMap.get('id');
     console.log(productid)
     let roleId = params['id1'];
     this.service.GetPatient(productid).subscribe(data =>{
       console.log(data.result['parameters'][0])
       this.obj_R = data.result['parameters'][0]
       if(data.result['parameters'][0].status == 'closed'){
        this.disabled = true;
      }
       this.getCaddedList(this.obj_R)
     })
    })
    this.cForm = this._fb.group({
      queryField:new FormControl(''),
      c_id : new FormControl('')
    });
    
  }

  CFormSearch(term:string){
    console.log(term);
    this.proceduresservice.getCformsSearch(term,this.obj_R).subscribe((res)=>{
      console.log(res);
      this.Cformlist = res.result.consent_form
      
    })
  }
  getId(id){
    this.cForm.get('c_id').setValue(id)
  }

  Csearchadd(data,formDirective:FormGroupDirective){
    console.log(data)
    this.proceduresservice.getCaddedList(data,this.obj_R).subscribe((res)=>{
      console.log(res)
      if (res['code'] == 200){
        this.getCaddedList(this.obj_R);
        formDirective.resetForm()
      }
      else{ 
        alert(res.message);
        formDirective.resetForm()
      }
     
    })
    
  }

  getCaddedList(obj_R){
    this.proceduresservice.getList(this.obj_R).subscribe((res)=>{
      console.log(res.result.list)
      this.CList = res.result.list;

    })
  }
  CId(id){
    console.log(id)
    this.router.navigate(['/addcforms/'+this.id+'/'+this.roleId +'/'+id]);
  }
}
