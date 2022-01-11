import { Component, OnInit, Inject } from '@angular/core';
import { ElementRef, ViewChild} from '@angular/core';
import { MatDialogRef, MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SymptomsService } from '../service/symptoms.service';
import { NotificationService } from '../shared/notification.service';
import { ConfirmDailogComponent } from '../confirm-dailog/confirm-dailog.component';
import { SymptomsComponent } from '../symptoms/symptoms.component';
import { ListService } from '../lists/list.service';
import { ListsComponent } from '../lists/lists.component';
import { HopiComponent } from '../hopi/hopi.component';

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
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
 export class SuggestionsComponent implements OnInit {
  // @ViewChild(ListsComponent,{static: false}) private _child: 
  // ListsComponent;
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
  constructor(@Inject(MAT_DIALOG_DATA) public data,private _notification:NotificationService,
  private listService:ListService,
  private service:SymptomsService,public dialogRef: MatDialogRef<SuggestionsComponent>,private formBuilder: FormBuilder,private _dialog:MatDialog) 
  {
    console.log(data.package)
    this.result = data.package
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
    this.usersForm = this.formBuilder.group({
      id:null,
      Search: null,  
    })
  }
 
  close() {
    this.dialogRef.close("Thanks for using me!");
  }
  // openDialog(){
  //   const dialog_ref =
  //      this._dialog.open(ConfirmDailogComponent,
  //       {
  //         panelClass: ['myapp-no-padding-dialog'],
  //         position:  {
  //           left:'0px'
  //         }   }
  //       );
   
  // }
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  update(data){
    console.log(data)
    this.listService.updateSuggestions(data).subscribe((res)=>{
      console.log(res);
      this._notification.success('Symptoms Updated successfully');
      this.close();
      // this._child.gpeAllSuggestions();
    // this._child.gpeAllSuggestions();
    })
    // this.service.UpdateSymptoms(data).subscribe(data=>{
    //   console.log(data)
    //   if(data['code'] == '200'){
    //     this._notification.success('::Symptoms Updated successfully');
    //     //this.getSymptomslist();
    //     this.close();
    //   }
    //   else{
    //     this._notification.error('::Symptom Updation failed');
    //   }
    // })
  }

}
