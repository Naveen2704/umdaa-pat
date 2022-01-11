import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FiService } from '../fi/fi.service';
import { PatientserviceService } from '../service/patientservice.service';
import { UsersService } from '../services/users.service';
import {FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {startWith, map} from 'rxjs/operators';
import { NotificationService } from '../shared/notification.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { DrugeditComponent } from '../drugedit/drugedit.component';
import { exit } from 'process';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
  }
  
  const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];


@Component({
  selector: 'app-ocrdata',
  templateUrl: './ocrdata.component.html',
  styleUrls: ['./ocrdata.component.css']
})

// export class Country {
//     constructor(public name: string, public code: string) {}
// }

export class OcrdataComponent implements OnInit {  
    control = new FormControl();
    streets: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
    filteredStreets: Observable<string[]>;
    items: Observable<string[]>;
    queryinvField = new FormControl();
    isLoading = false;
    myModel='text';
    data:any;
    btnDisabled: boolean = true;
    // data = {
    //   "Clinical_Diagnosis": [
    //     {
    //       "clinical_diagnosis_name": "? APD"
    //     },
    //     {
    //       "clinical_diagnosis_name": "dyspepsia"
    //     },
    //     {
    //       "clinical_diagnosis_name": "Typhoid knee"
    //     }
    //   ],
    //   "Drugs": [
    //     {
    //       "count": "60.",
    //       "dose": "40mg",
    //       "drug_name": "Pan to dec",
    //       "duration": "30",
    //       "food": "BF",
    //       "frequency": "1-0-1",
    //       "remarks": "so in before food intake.",
    //       "sn": "1)"
    //     },
    //     {
    //       "count": "-",
    //       "dose": "AF",
    //       "drug_name": "Sy. sucrabet plun",
    //       "duration": "-",
    //       "food": "1",
    //       "frequency": "v-V- -",
    //       "remarks": "-",
    //       "sn": "2)"
    //     },
    //     {
    //       "count": "-",
    //       "dose": "AF",
    //       "drug_name": "Pnegaba M",
    //       "duration": "30",
    //       "food": "50",
    //       "frequency": "0-0-1",
    //       "remarks": "-",
    //       "sn": "3)"
    //     },
    //     {
    //       "count": "-",
    //       "dose": "-",
    //       "drug_name": "-",
    //       "duration": "-",
    //       "food": "-",
    //       "frequency": "-",
    //       "remarks": "-",
    //       "sn": "4)"
    //     },
    //     {
    //       "count": "-",
    //       "dose": "-",
    //       "drug_name": "-",
    //       "duration": "-",
    //       "food": "-",
    //       "frequency": "-",
    //       "remarks": "-",
    //       "sn": "5)"
    //     },
    //     {
    //       "count": "30",
    //       "dose": "40 my",
    //       "drug_name": "ZOLGAS",
    //       "duration": "15",
    //       "food": "Bf",
    //       "frequency": "1-0-1",
    //       "remarks": "30 in before food",
    //       "sn": "6)"
    //     },
    //     {
    //       "count": "-",
    //       "dose": "V",
    //       "drug_name": "SUCRAL-C",
    //       "duration": "1",
    //       "food": "AK",
    //       "frequency": "V",
    //       "remarks": "-",
    //       "sn": "7)"
    //     },
    //     {
    //       "count": "-",
    //       "dose": "-",
    //       "drug_name": "-",
    //       "duration": "-",
    //       "food": "-",
    //       "frequency": "-",
    //       "remarks": "-",
    //       "sn": "8)"
    //     },
    //     {
    //       "count": "-",
    //       "dose": "-",
    //       "drug_name": "-",
    //       "duration": "-",
    //       "food": "-",
    //       "frequency": "-",
    //       "remarks": "-",
    //       "sn": "9)"
    //     },
    //     {
    //       "count": "-",
    //       "dose": "-",
    //       "drug_name": "-",
    //       "duration": "-",
    //       "food": "-",
    //       "frequency": "-",
    //       "remarks": "-",
    //       "sn": "10)"
    //     }
    //   ],
    //   "Investigations": [
    //     {
    //       "investigation_name": "(CBP)"
    //     },
    //     {
    //       "investigation_name": "T3,T4,TSH"
    //     },
    //     {
    //       "investigation_name": "ESR"
    //     },
    //     {
    //       "investigation_name": "Sc. Creatinine"
    //     },
    //     {
    //       "investigation_name": "(CRP)"
    //     },
    //     {
    //       "investigation_name": "Endoscopy"
    //     },
    //     {
    //       "investigation_name": "US Abdomen"
    //     },
    //     {
    //       "investigation_name": "Colonoscopy"
    //     },
    //     {
    //       "investigation_name": "LA ."
    //     }
    //   ]
    // };
    showinvEdit:boolean = false;
    showText: boolean = true;
    InForm: FormGroup;
    CdForm: any;
    hideDrugs:boolean = false;
    cd=[];
    inv=[];
    drugs=[];
    options: any=[];
    id: any;
    id1: any;
    fi_Obj: any;
    getlatestinv: any=[];
    myControl = new FormControl();
    // optionss: string[] = ['One', 'Two', 'Three'];
    // optionss = 
    // [{"clinical_diagnosis_id":"1",
    // "disease_name":"Cholera due to Vibrio cholerae 01, biovar cholerae","code":"A000"},
    // {"clinical_diagnosis_id":"2","disease_name":"Cholera due to Vibrio cholerae 01, biovar eltor","code":"A001"},{"clinical_diagnosis_id":"3","disease_name":"Cholera, unspecified","code":"A009"},{"clinical_diagnosis_id":"6","disease_name":"Typhoid fever with heart involvement","code":"A0102"},
    // {"clinical_diagnosis_id":"7","disease_name":"Typhoid pneumonia","code":"A0103"},
    // {"clinical_diagnosis_id":"8","disease_name":"Typhoid arthritis","code":"A0104"},
    // {"clinical_diagnosis_id":"10","disease_name":"Typhoid fever with other complications","code":"A0109"},
    // {"clinical_diagnosis_id":"11","disease_name":"Paratyphoid fever A","code":"A011"},
    // {"clinical_diagnosis_id":"12","disease_name":"Paratyphoid fever B","code":"A012"},
    // {"clinical_diagnosis_id":"13","disease_name":"Paratyphoid fever C","code":"A013"},
    // {"clinical_diagnosis_id":"14","disease_name":"Paratyphoid fever, unspecified","code":"A014"},
    // {"clinical_diagnosis_id":"15","disease_name":"Salmonella enteritis","code":"A020"},
    // {"clinical_diagnosis_id":"16","disease_name":"Salmonella sepsis","code":"A021"},
    // {"clinical_diagnosis_id":"17","disease_name":"Localized salmonella infection, unspecified","code":"A0220"},
    // {"clinical_diagnosis_id":"18","disease_name":"Salmonella meningitis","code":"A0221"},
    // {"clinical_diagnosis_id":"19","disease_name":"Salmonella pneumonia","code":"A0222"},
    // {"clinical_diagnosis_id":"20","disease_name":"Salmonella arthritis","code":"A0223"},
    // {"clinical_diagnosis_id":"21","disease_name":"Salmonella osteomyelitis","code":"A0224"},
    // {"clinical_diagnosis_id":"22","disease_name":"Salmonella pyelonephritis","code":"A0225"},
    // {"clinical_diagnosis_id":"23","disease_name":"Salmonella with other localized infection","code":"A0229"}];

    optionss: string[] = ['Cholera due to Vibrio cholerae 01, biovar cholerae', 
    'Cholera due to Vibrio cholerae 01, biovar eltor', 
    'Cholera, unspecified',
    'Typhoid fever with heart involvement',
    'Typhoid pneumonia','Typhoid arthritis',
    'Typhoid fever with other complications','Paratyphoid fever A'];

    optionsss: string[] = ['(1,3)-Beta-D-Glucan', 
    '1,25-Dihydroxy Vitamin Dr', 
    '125-Di Hydroxy Cholecalciferol (Vitamin D3)',
    '17-alpha Hydroxy Progesterone (17-OHP)',
    '24 Hrs Urinary Cortisol\/Creatinine Ratio',
    '24-Hours Urinary Protein'];

    optionssss: string[] = ['3G DOX 200MG', 
    '4 MOL 10',  
    '5 MONO(AIIMS) SR', 
    'A DOM', 
    'A-DOXID 100MG', 
    'AARDOL 50MG','DOLO 650'];

    filteredOptions: Observable<string[]>;
    filteredOptionss: Observable<string[]>;
    filteredOptionsss: Observable<string[]>;
    checkedData: any;
    editCd: any;
  invId: string;
  isadded: boolean;
  DrugForm: FormGroup;
  inv_id: any;
  editinvId: any;
  editinv: any;
  editformbtnText : any = "Edit Form";
  showcdEdit: boolean;
  queryField = new FormControl();
  cdId: string;
  code: string;
  isSubmitted: boolean;
  cdInfo: any;
  getlatestCds: any;
  editcd: any;
  editcdId: any;
  results: any;
  isprescribed: boolean;
  avlQty: any;
  drug_id: any;
  s_drugId: any;
  editdrug: any;
  editdrugId: any;
  dose:any;
  drugData: any;
  checkedInformation: any;

  // invDForm: FormGroup;
  // invField: FormArray;

  constructor(private router:Router,public dialog: MatDialog,public _fb :FormBuilder,private _notification:NotificationService,private users: UsersService,private service: PatientserviceService,private _searchService:FiService,private route: ActivatedRoute,) { 
 
  }


ngOnInit()
{
  // for(var i=0;i<4;i++){
  //   setTimeout(()=> {
  //     console.log(i);
  //   }, i * 3000);
  // }
  
  console.log(JSON.parse(localStorage.getItem('translateData')));
  this.data = JSON.parse(localStorage.getItem('translateData'));
  console.log(this.data.data);
  // localStorage.setItem('translateData',res);
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.filteredOptionss = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterr(value))
    );

    this.filteredOptionsss = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterrr(value))
    );


    this.cd = this.data.data.Clinical_Diagnosis;
    this.inv = this.data.data.Investigations;
    // this.addInvFields()

    this.drugs = this.data.data.Drugs;
    console.log(this.cd);
    
    this.route.params.subscribe(params => {
        let productid = params['id'];
        this.id = params['id'];
        this.service.GetPatient(productid).subscribe(data =>{
            console.log(data)
    
            let roleId = params['id1'];
            this.users.roleId(roleId);
            this.id1 = params['id1'];
            this.fi_Obj = data.result['parameters'][0];
        });
        });

        this.InForm =  this._fb.group({
          queryinvField:new FormControl(''),
          Inv_id:new FormControl('')
        })

        this.CdForm = this._fb.group({
          queryField:new FormControl(''),
          cd_id : new FormControl(''),
          cd_code:new FormControl('')
        });

        this.DrugForm = this._fb.group({
          drugField:new FormControl('')
          
        })

}

// addInvFields() {
//   let arr = [];
//   for(var i = 0;i < this.inv.length;i++) {
//     arr.push(this.setFormArray(this.inv[i]))
//   }
//   console.log(arr)
//   this.invDForm = this._fb.group({
//     invField: this._fb.array(arr)
//   })
  
// }
// setFormArray(res):FormGroup {
//   return this._fb.group({
//     invText: [res.investigation_name]
//   });
// }

getId(id,code)
{
  console.log(id,code);
  //this.cd_id_s = id;
  //this.cd_id = this.cd_id_s 
  //console.log(this.cd_id);
  this.CdForm.get('cd_id').setValue(id);
  this.CdForm.get('cd_code').setValue(code)
}

getDose(i,e)
{
  console.log(e);
}

updateCd(i, val) {
  this.cd[i].clinical_diagnosis_name = val
}

updateInv(i, val) {
  this.inv[i].investigation_name = val
}

updateDrugName(i, val) {
  this.drugs[i].drug_name = val
}
updateDose(i, val) {
  this.drugs[i].dose = val
}
updateFood(i, val) {
  this.drugs[i].food = val
}
updateDays(i, val) {
  this.drugs[i].duration = val
}
updateFrequency(i, val) {
  this.drugs[i].frequency = val
}
updateRemarks(i, val) {
  this.drugs[i].remarks = val
}

private _filter(value: string){
    const filterValue = value.toLowerCase();
    // return this.optionss.filter(item => item.disease_name === value);
    return this.optionss.filter(option => option.toLowerCase().includes(filterValue));
  }

  
private _filterr(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsss.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterrr(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionssss.filter(option => option.toLowerCase().includes(filterValue));
  }

  displayedColumns: string[] = ['position', 'clinical_diagnosis'];
  dataSource = ELEMENT_DATA;

  editAll() {
    
    if(this.showText == true) {
      this.showText = false;
      this.btnDisabled = false;
      this.editformbtnText = "Cancel Edit";
    }
    else {
      this.showText = true;
      this.btnDisabled = true;
      this.editformbtnText = "Edit Form";
    }
    
    console.log(this.showText)
  }

  edit(i,name)
  {
    this.showinvEdit = true;
    console.log(i);
    console.log(name);
    this.editinv = name;
    this.editinvId = i;
    this.InForm.get('queryinvField').setValue(name);
  }

  editCD(i,name)
  {
    this.showcdEdit = true;
    console.log(i);
    console.log(name);
    this.editcd = name;
    this.editcdId = i;
    this.CdForm.get('queryField').setValue(name);
    // this.InForm.get('queryField').setValue(name);
  }

  
editDrugs(i,name)
{
  // this.hideDrugs = true;
  console.log(i);
  console.log(name);
  this.editdrug = name;
  this.editdrugId = i;
  this.DrugForm.get('drugField').setValue(name);
  this.drugData = this.drugs[i];
  const dialog_ref =
  this.dialog.open(DrugeditComponent,
   {
     data: this.drugs[i]
    // data: { name: 'austin' },
   }
   );

   dialog_ref.afterClosed().subscribe(result => {
     console.log(result);
     ///console.log('The dialog was closed');
       // this.getPatientInfo(this.app_id);
   });

}

editDrugss(i,name)
{
  console.log(i,name);
}

  search (term: string) {
    console.log(term);
    if(term.length >= 3 ){
    this.items = this._searchService.search(term);
    console.log(this.items);
    // this.getlatestCd(this.fi_Obj);
    }
  }


   onKeyPress($event) {
    console.log($event.target.value)
   }

   valuechange(a) {
    console.log(a);
    // this.optionss = this._searchService.search(a);
    // this._searchService.search(a).subscribe((result)=>{
    //     console.log(result);
    //     // this.getlatestinv = result.result.investigations_list;
    //     // console.log(this.getlatestinv)
    //   })
   }
   
   getlatesinv(fi_Obj){
    this._searchService.get_latestinv(fi_Obj).subscribe((result)=>{
      console.log(result);
      this.getlatestinv = result.result.investigations_list;
      console.log(this.getlatestinv)
    })
  }

  onSubmit(e)
  {
    console.log(e);
  }

  onChangeEvent(event: any){

    this.checkedData = event;
    console.log(event.target.value);

  }

  toggle(event){
    console.log(event.checked);
    this.checkedInformation = event.checked;
  }

  insearch(data,formDirective: FormGroupDirective){
    // console.log(clinic_lab_package_id);
    console.log(data.Inv_id)
    console.log(data,data.queryinvField)
    if(data.Inv_id == null)
    {
      this.invId = '0'
    }
    else{
      this.invId = data.Inv_id
    }

   this.isadded= true;
   if (!this.InForm.valid ) {
     return false;
   }else{
     console.log(this.inv);
     console.log(this.editinvId);
     this.inv[this.editinvId] = {investigation_name:data.queryinvField};
     formDirective.resetForm();
     this.showinvEdit = false;
   }
 }

 getinvid(id){
  this.inv_id = id
  this.InForm.get('Inv_id').setValue(this.inv_id );
}

 invsearch (query: string) {
  console.log(query);
  // console.log(this.);
   if(query.length>=3){
    this.isLoading = true
    //  this.options = this._searchService.searchInve(query)
    this._searchService.searchInve(query).subscribe((res) => {
      console.log(res);
      this.options=res;
    })
     console.log(this.options);
     this. getlatesinv(this.fi_Obj)
     this.isLoading = false;
   }
    if(query.length ==0 ){
     this.options = this._searchService.searchInve(query);
     console.log(this.options);
     this.isLoading = false
   }else{

   }
   
 }

 cdsearch(data,formDirective: FormGroupDirective){
  console.log(data.cd_id,data.cd_code);
  // console.log(this.getlatestCds)
  console.log(data)
  if(data.cd_id == null )
  {
    this.cdId = '0';
    
  }
  else{
    this.cdId = data.cd_id
    
  }
  if(data.cd_code == null)
  {
    
    this.code = '';
  }
  else{
   
    this.code = data.cd_code
  }
  this.isSubmitted = true;
  if (!this.CdForm.valid ) {
    return false;
  }
  else{
    console.log(this.cd);
    console.log(this.editcdId);
    this.cd[this.editcdId] = {clinical_diagnosis_name:data.queryField};
    formDirective.resetForm()
  }
  this.showcdEdit = false;
}

getlatestCd(fi_Obj){
  this._searchService.get_latestDaignosis(this.fi_Obj).subscribe((res)=>{
    console.log(res)
    this.cdInfo = res.result;
    this.getlatestCds = res.result.clinicaldiagnosis;
    console.log(this.getlatestCds)
    //this.getcd = res.result
  })
}

drugsearch(drugs: string){
  if(drugs.length>=3){
    this.isLoading = true;
    this._searchService.Drugsearch(drugs,this.fi_Obj).subscribe((data=>{
      this.results = data.result['medicine_object']['drugs']
    }));
    
  }
  if(drugs.length ==0){
    this._searchService.Drugsearch(drugs,this.fi_Obj).subscribe((data=>{
      this.results = data.result['medicine_object']['drugs']
    }));
    
   // this.results = this._searchService.search(drugs)
    this.isLoading = false
  }
}

Prescribe(data,formDirective: FormGroupDirective,){
  console.log(data)
 this.isprescribed= true;
 if (!this.DrugForm.valid ) {
   return false;
 }else{
   console.log(data);
   console.log(this.drugs);
   console.log(this.editdrugId);
   console.log(this.drugs[this.editdrugId]);

   this.drugs[this.editdrugId] = {drug_name:data.drugField,dose:this.drugs[this.editdrugId].dose,
    duration:this.drugs[this.editdrugId].duration,food:this.drugs[this.editdrugId].food,
    frequency:this.drugs[this.editdrugId].frequency,remarks:this.drugs[this.editdrugId].remarks,
    count:this.drugs[this.editdrugId].count};
   formDirective.resetForm();
   this.hideDrugs = false;
 
 }
 
}

druginfo(item){
  console.log(item.available_quantity)
  this.avlQty = item.available_quantity
 console.log(item.trade_name,item.drug_id)
 this.drug_id = item.drug_id
 this.s_drugId = item.drug_id;
 console.log(this.s_drugId)
}

onSearchChange(searchValue: string): void {  
  console.log(searchValue);
}

removeInv(i) {
  this.inv.splice(i, 1)
}

removeCd(i) {
  this.cd.splice(i, 1)
}

removeDrug(i) {
  this.drugs.splice(i, 1)
}

finalSubmit(){
  console.log(this.checkedInformation);
  if(this.checkedInformation == true){
    console.log(this.cd);
    console.log(this.inv);
    console.log(this.drugs);
    var filteredDrugs = this.drugs.filter(a => a.drug_name != "-");
    console.log(filteredDrugs);
    // exit;
    var data = JSON.parse(localStorage.getItem('getInfo'));
    var cdid =0;
    this._searchService.addOcrClinicalDiagnosis(data.doctor_id,data.appointment_id,data.clinic_id,
      cdid,this.cd,data.patient_id,data.umr_no).subscribe((data=>{
      console.log(data);
    }));
    this._searchService.addOcrInvestigations(data.doctor_id,data.appointment_id,data.clinic_id,
      cdid,this.inv,data.patient_id,data.umr_no).subscribe((data=>{
      console.log(data);
    }));
    this._searchService.addOcrPrescription(data.doctor_id,data.appointment_id,data.clinic_id,
      cdid,filteredDrugs,data.patient_id,data.umr_no).subscribe((data=>{
      console.log(data);
    }));
    this._searchService.ocrFinalSubmit(data.doctor_id,data.appointment_id,data.clinic_id,data.patient_id).subscribe((data=>{
      console.log(data);
    }));
    
    this.router.navigateByUrl('/Summary/'+this.id+'/'+this.id1)
  }else{
    alert("Please confirm the information is true");
  }
}


}
