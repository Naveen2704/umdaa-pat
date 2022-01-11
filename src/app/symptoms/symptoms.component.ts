import { Component, OnInit, Inject } from '@angular/core';
import { ElementRef, ViewChild} from '@angular/core';
import { MatDialogRef, MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SymptomsService } from '../service/symptoms.service';
import { NotificationService } from '../shared/notification.service';
import { ConfirmDailogComponent } from '../confirm-dailog/confirm-dailog.component';
export interface Food {
  value: string;
  viewValue: string;
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Fever', weight: 25, symbol: 'Days'},
 
];
@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.component.html',
  styleUrls: ['./symptoms.component.css']
})

export class SymptomsComponent implements OnInit {
  options: any[]=[];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  SymptomsInfo: any[]=[];
  Symptom_Id: any;
  myForm: FormControl;
  span: FormControl;
  duration: FormControl;
  usersForm: any;
  //data: any;
  selectable = true;
  // search: any;
  fruits = [{value:'Lemon'},{value:'apple'}];
  SuggestSymptoms: any;
  var: any;
  item: any;
  suggitions: any;
  result: any;
  disabled: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data,private _notification:NotificationService,
  private service:SymptomsService,public dialogRef: MatDialogRef<SymptomsComponent>,private formBuilder: FormBuilder,private _dialog:MatDialog) 
  {
    console.log(data.package)
    this.result = data.package
    if(this.result.status == 'closed'){
      this.disabled = true;
    }
   }
  registerForm: FormGroup;
  filteredOptions: Observable<any[]>;
  foods: Food[] = [
    {value: 'Min', viewValue: 'Min'},
    {value: 'Hrs', viewValue: 'Hrs'},
    {value: 'Days', viewValue: 'Days'},
    {value: 'Months', viewValue: 'Months'},
    {value: 'Years', viewValue: 'Years'}
  ];

  @ViewChild('fruitInput', {static: false}) fruitInput: ElementRef<HTMLInputElement>;
  ngOnInit() {

    // this.service.UpdateSymptoms().subscribe(data=>{
    //   console.log(data)
    // })
   
    this.getsuggitions(this.result);
   // this.getSymptomslist(this.result);
    this.usersForm = this.formBuilder.group({
      id:null,
      form_id:null,
      Search: null,
      span:null,
      duration:null,
      
    })
    
    this.SetSymptoms();
    // this.myForm = new FormControl();
    this.span = new FormControl();
    this.duration = new FormControl();
    this.filteredOptions = this.usersForm.get('Search').valueChanges
     .pipe(
       startWith(''),
       map((value: any | null) => value ? this._filter(value):this.item
       
       )
      
     );
   // console.log(this.filteredOptions)
  }
  selected(event: any=[]) {
   this.SuggestSymptoms = event
    console.log(this.SuggestSymptoms)
    this.usersForm.get('Search').setValue(this.SuggestSymptoms.symptom);
    this.usersForm.get('form_id').setValue(this.SuggestSymptoms.form_id);
  }
 
  private _filter(value: any=[]): any[] {
   // console.log(value)
   console.log(this.options);
  
   // const filterValue = value.toLowerCase();
    return this.options.filter(option => {

      return option.synonym.toLowerCase().includes(value.toLowerCase())});
      
  }
 getsuggitions(result){
   this.service.GetSymptomsSuggestions(this.result).subscribe(data => {
    this.suggitions = data.result.symptoms
    //console.log(data.result.symptoms)
   
  })
 }
getSymptomslist(){
  this.service.GetSymptomsList(this.data).subscribe(data=>data)
}
  SetSymptoms(){
    this.service.GetSymptoms(this.result).subscribe(data => {
      this.options = data.result.symptoms;
     
    })
  }
 
  close() {
    this.dialogRef.close("Thanks for using me!");
  }
  openDialog(){
    const dialog_ref =
       this._dialog.open(ConfirmDailogComponent,
        {
          panelClass: ['myapp-no-padding-dialog'],
          position:  {
            left:'0px'
          }   }
        );
   
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  update(data){
    console.log(data)
    this.service.UpdateSymptoms(data).subscribe(data=>{
      console.log(data)
      if(data['code'] == '200'){
        this._notification.success('::Symptoms Updated successfully');
        //this.getSymptomslist();
        this.close();
      }
      else{
        this._notification.error('::Symptom Updation failed');
      }
    })
  }

  getFormId(a)
  {
    console.log(a);
    // this.usersForm.get('id').set(a);
    this.usersForm.get('form_id').setValue(a.form_id)
  }
}
