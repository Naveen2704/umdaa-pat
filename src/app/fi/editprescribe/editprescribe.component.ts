import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatListOption } from '@angular/material';
import { FiService } from '../fi.service';
import { NotificationService } from 'src/app/shared/notification.service';

export interface Mode {
  value: string;
  viewValue: string;
}
export interface Time {
  value: string;
  viewValue: string;
}
export interface Type {
  value: string;
  viewValue: string;
}

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-editprescribe',
  templateUrl: './editprescribe.component.html',
  styleUrls: ['./editprescribe.component.css']
})
export class EditprescribeComponent implements OnInit {
  DrugFormEdit: FormGroup;

  types: Type[] = [
    {value: 'Form', viewValue: 'Form'},
    {value: 'mL', viewValue: 'mL'},
    {value: 'Drops', viewValue: 'Drops'},
    {value: 'Tea spoons', viewValue: 'Tea spoonss'},
    {value: 'Tablet', viewValue: 'Tablet'},
    {value: 'Capsule', viewValue: 'Capsule'},{value: 'Scoops', viewValue: 'Scoops'},
    {value: 'Respules', viewValue: 'Respules'},

    {value: 'Sachets', viewValue: 'Sachets'},
    {value: 'Puffs', viewValue: 'Puffs'},{value: 'Patch', viewValue: 'Patch'},
    {value: 'Enema', viewValue: 'Enema'},

    {value: 'Suppository', viewValue: 'Suppository'},
    {value: 'Pint', viewValue: 'Pint'},{value: 'Bottle', viewValue: 'Bottle'},
    {value: 'Injection', viewValue: 'Injection'},{value: 'Application', viewValue: 'Application'},
    {value: 'Others', viewValue: 'Others'}
  ];
  modes: Mode[] = [
    {value: 'Minute', viewValue: 'Minute'},
    {value: 'Hour', viewValue: 'Hour'},
    {value: 'Day', viewValue: 'Day'},
    {value: 'Week', viewValue: 'Week'},
    {value: 'Fortnight', viewValue: 'Fortnight'},
    {value: 'Month', viewValue: 'Month'},
    {value: 'Year', viewValue: 'Year'},
    {value: '--', viewValue: '--'},
  ];
  times: Time[] = [
    {value: 'SOS', viewValue: 'SOS'},
    {value: 'STAT', viewValue: 'STAT'},
    {value: 'HS', viewValue: 'HS'},
    {value: '1', viewValue: '1 TIME'},
    {value: '2 ', viewValue: '2 TIMES'},{value: '3 ', viewValue: '3 TIMES'},{value: '4 ', viewValue: '4 TIMES'},{value: '5 ', viewValue: '5 TIMES'},{value: '6 ', viewValue: '6 TIMES'},{value: '7 ', viewValue: '7 TIMES'},{value: '8 ', viewValue: '8 TIMES'},{value: '9 ', viewValue: '9 TIMES'},{value: '10 ', viewValue: '10 TIMES'},{value: '11 ', viewValue: '11 TIMES'},{value: '12 ', viewValue: '12 TIMES'},{value: '13 ', viewValue: '13 TIMES'},{value: '14 ', viewValue: '14 TIMES'},{value: '15 ', viewValue: '15 TIMES'},{value: '16 ', viewValue: '16 TIMES'},{value: '17 ', viewValue: '17 TIMES'},{value: '18 ', viewValue: '18 TIMES'},{value: '19 ', viewValue: '19 TIMES'},
    {value: '20 ', viewValue: '20 TIMES'}, {value: '21 ', viewValue: '21 TIMES'}, {value: '22 ', viewValue: '22 TIMES'}, {value: '23 ', viewValue: '23 TIMES'}, {value: '24 ', viewValue: '24 TIMES'},
 
    
  ];
  foods: Food[] = [
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
  ];
  morningSchedule: string;
  afternoonSchedule: string;
  nightSchedule: string;
  checkboxvalue: any;
  changedvalue: any;
  isChecked: any;
  isprescribed: boolean;
  edit_obj: any=[];
  status: any;
  disabled: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data,public _fb :FormBuilder,private _service :FiService,private _dialogRef:MatDialogRef<EditprescribeComponent>,private _notification:NotificationService) { 
    console.log(data)
    this.edit_obj = data.package
    console.log(data.day_schedule)
    this.status = data.package.status

    if(this.status === 'closed'){
      this.disabled = true
    }
    // console.log(data.day_schedule.split(','));
    // console.log(data.day_schedule.split(',')[0]);
    for(var z=0;z<data.day_schedule.length;z++)
    {
      console.log(data.day_schedule[z]);
      if(data.day_schedule[z] == 'M')
      {
        this.morningSchedule = 'M';
      }
      if(data.day_schedule[z] == 'A')
      {
        this.afternoonSchedule = 'A';
      }
      if(data.day_schedule[z] == 'N')
      {
        this.nightSchedule = 'N';
      }
    }
  }

  ngOnInit() {
  
    this.DrugFormEdit= this._fb.group({
      drugname:new FormControl(''),
      Drug_id:new FormControl(''),
      p_drug_id:new FormControl(''),
      p_p_id:new FormControl(''),
      Mode:new FormControl('',Validators.required),
      type:new FormControl('',Validators.required),
      M:new FormControl(''),
      A:new FormControl(''),
      N:new FormControl(''),

      time:new FormControl(''),
      Frequency:new FormControl(''),
      radio:new FormControl('',),
      Qty:new FormControl('',Validators.required),
      Duration:new FormControl('',Validators.required),
      Note:new FormControl(''),
      // followupdate:new FormControl(Date)
      
    })

  }
  close(){
    this._dialogRef.close();
  }
  onNoClick(): void {
    this._dialogRef.close();
  }
  Editchange(option: MatListOption) {
    //  console.log(option.value);
      this.changedvalue = option.value
      console.log(this.changedvalue)
      if(this.changedvalue!=''){
        this.DrugFormEdit.get('M').patchValue('');
        this.DrugFormEdit.get('A').patchValue(''); 
        this.DrugFormEdit.get('N').patchValue(''); 
        }
     
    }
  EditCheckM(event){

    console.log(event.source.value);
    this.checkboxvalue = event.source.value;
    this.isChecked = event.checked
    console.log(this.checkboxvalue)
    if( event.checked == true){
      this.DrugFormEdit.get('time').patchValue('');
      this.DrugFormEdit.get('Frequency').patchValue('');
      this.DrugFormEdit.get('M').setValue('M');
   
    }
    else
    {
      this.DrugFormEdit.get('M').setValue('');
    }
  }
  EditCheckA(event){

    console.log(event.source.value);
    this.checkboxvalue = event.source.value;
    this.isChecked = event.checked
    console.log(this.checkboxvalue)
    if( event.checked == true){
      this.DrugFormEdit.get('time').patchValue('');
      this.DrugFormEdit.get('Frequency').patchValue('');
      this.DrugFormEdit.get('A').setValue('A');
   
    }
    else
    {
      this.DrugFormEdit.get('A').setValue('');
    }
  }
  
  EditCheckN(event){

    console.log(event.source.value);
    this.checkboxvalue = event.source.value;
    this.isChecked = event.checked
    console.log(this.checkboxvalue)
    if( event.checked == true){
      this.DrugFormEdit.get('time').patchValue('');
      this.DrugFormEdit.get('Frequency').patchValue('');
      this.DrugFormEdit.get('N').setValue('N');
   
    }
    else
    {
      this.DrugFormEdit.get('N').setValue('');
    }
  }
  

  PrescribeUpdate(values,formDirective:FormGroupDirective){
    console.log(values);
     this.isprescribed= true;
    if (!this.DrugFormEdit.valid ) {
      return false;
    }else{
    if( values.M != '' || values.A != '' || values.N != '' ){
      this._service.editprescribe_check(values,this.edit_obj).subscribe((res) => {
        console.log(res)
        if(res['code'] == '200'){
          this._notification.success('Prescribe Updated successfully');
          this.close();
        }
        else{
          this._notification.error('Prescribe Updated failed')
        }
       
      })
    }
    else{
      console.log(values)
      this._service.editprescribe_select(values,this.edit_obj).subscribe((res) => {
        console.log(values)
        console.log(res)
        if(res['code'] == '200'){
          this._notification.success('Prescribe Updated successfully');
          this.close();
        }
       
      })
    }
   
  }
}
}
