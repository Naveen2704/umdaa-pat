import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FiService } from '../fi/fi.service';
import { PatientserviceService } from '../service/patientservice.service';
import { UsersService } from '../services/users.service';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective} from '@angular/forms';
import {startWith, map} from 'rxjs/operators';
import { NotificationService } from '../shared/notification.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
// import { DrugeditComponent } from '../drugedit/drugedit.component';

@Component({
  selector: 'app-drugedit',
  templateUrl: './drugedit.component.html',
  styleUrls: ['./drugedit.component.css']
})
export class DrugeditComponent implements OnInit {
  // export class OcrdataComponent implements OnInit {  
    control = new FormControl();
    streets: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
    filteredStreets: Observable<string[]>;
    items: Observable<string[]>;
    queryinvField = new FormControl();
    isLoading = false;
    // dose:any='';
    myModel='text';
    data = {
      "Clinical_Diagnosis": [
        {
          "clinical_diagnosis_name": "? APD"
        },
        {
          "clinical_diagnosis_name": "dyspepsia"
        },
        {
          "clinical_diagnosis_name": "Typhoid knee"
        }
      ],
      "Drugs": [
        {
          "count": "60.",
          "dose": "40mg",
          "drug_name": "Pan to dec",
          "duration": "30",
          "food": "BF",
          "frequency": "1-0-1",
          "remarks": "so in before food intake.",
          "sn": "1)"
        },
        {
          "count": "-",
          "dose": "AF",
          "drug_name": "Sy. sucrabet plun",
          "duration": "-",
          "food": "1",
          "frequency": "v-V- -",
          "remarks": "-",
          "sn": "2)"
        },
        {
          "count": "-",
          "dose": "AF",
          "drug_name": "Pnegaba M",
          "duration": "30",
          "food": "50",
          "frequency": "0-0-1",
          "remarks": "-",
          "sn": "3)"
        },
        {
          "count": "-",
          "dose": "-",
          "drug_name": "-",
          "duration": "-",
          "food": "-",
          "frequency": "-",
          "remarks": "-",
          "sn": "4)"
        },
        {
          "count": "-",
          "dose": "-",
          "drug_name": "-",
          "duration": "-",
          "food": "-",
          "frequency": "-",
          "remarks": "-",
          "sn": "5)"
        },
        {
          "count": "30",
          "dose": "40 my",
          "drug_name": "ZOLGAS",
          "duration": "15",
          "food": "Bf",
          "frequency": "1-0-1",
          "remarks": "30 in before food",
          "sn": "6)"
        },
        {
          "count": "-",
          "dose": "V",
          "drug_name": "SUCRAL-C",
          "duration": "1",
          "food": "AK",
          "frequency": "V",
          "remarks": "-",
          "sn": "7)"
        },
        {
          "count": "-",
          "dose": "-",
          "drug_name": "-",
          "duration": "-",
          "food": "-",
          "frequency": "-",
          "remarks": "-",
          "sn": "8)"
        },
        {
          "count": "-",
          "dose": "-",
          "drug_name": "-",
          "duration": "-",
          "food": "-",
          "frequency": "-",
          "remarks": "-",
          "sn": "9)"
        },
        {
          "count": "-",
          "dose": "-",
          "drug_name": "-",
          "duration": "-",
          "food": "-",
          "frequency": "-",
          "remarks": "-",
          "sn": "10)"
        }
      ],
      "Investigations": [
        {
          "investigation_name": "(CBP)"
        },
        {
          "investigation_name": "T3,T4,TSH"
        },
        {
          "investigation_name": "ESR"
        },
        {
          "investigation_name": "Sc. Creatinine"
        },
        {
          "investigation_name": "(CRP)"
        },
        {
          "investigation_name": "Endoscopy"
        },
        {
          "investigation_name": "US Abdomen"
        },
        {
          "investigation_name": "Colonoscopy"
        },
        {
          "investigation_name": "LA ."
        }
      ]
    };
    showinvEdit:boolean = false;
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
  dialogText: any;
  dialogappId: any;
  drugDose: any;
  drugDuration: any;
  drugFood: any;
  drugFreuency: any;
  drugRemarks: any;
  latestDrugDose: any;
  latestDrugFood: any;
  latestDrugRemark: any;
  latestDrugFrequency: any;
  latestDrugDuration: any;
  constructor(public dialog: MatDialog,public _fb :FormBuilder,
    private _notification:NotificationService,private users: UsersService,
    private service: PatientserviceService,private _searchService:FiService,
    private route: ActivatedRoute,public dialogRef: MatDialogRef<DrugeditComponent>,
    @Inject(MAT_DIALOG_DATA) public result) { 
 
  }



ngOnInit()
{
  console.log(this.dose);
  console.log(this.result);

  // this.dialogText = this.result.text;
  // this.dialogappId = this.result.appId;
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


    this.cd = this.data.Clinical_Diagnosis;
    this.inv = this.data.Investigations;
    this.drugs = this.data.Drugs;
    this.route.params.subscribe(params => {
      // params['id']='1623';
        let productid = '1623';
        this.id = '1623';
        this.service.GetPatient(productid).subscribe(data =>{
            console.log(data)
    
            let roleId = '4';
            this.users.roleId(roleId);
            this.id1 = '1623';
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

        this.DrugForm.get('drugField').setValue(this.result.drug_name);
        this.drugDose = this.result.dose;
        this.drugDuration = this.result.duration;
        this.drugFood= this.result.food;
        this.drugFreuency = this.result.frequency;
        this.drugRemarks=this.result.remarks;
}

getDose(i,e)
{
  console.log(e);
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
  // dataSource = ELEMENT_DATA;

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

   }
   );

   dialog_ref.afterClosed().subscribe(result => {
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
      console.log(this.checkedData);
    console.log(event.checked);
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



onChange(value) {
  console.log(value);
  this.latestDrugDose = value;
}

foodChange(value)
{
  console.log(value);
  this.latestDrugFood = value;
}

remarkChange(value)
{
  console.log(value);
  this.latestDrugRemark = value;
}

frequencyChange(value)
{
  console.log(value);
  this.latestDrugFrequency = value;
}

durationChange(value)
{
  console.log(value);
  this.latestDrugDuration = value;
}

editDrug()
{
  console.log(this.DrugForm.controls['drugField'].value);
  console.log(this.latestDrugDose);
  console.log(this.latestDrugRemark);
  console.log(this.latestDrugFrequency);
  console.log(this.latestDrugDuration);
  console.log(this.latestDrugFood);
  console.log(this.result);
  this.result['drug_name'] =  this.DrugForm.controls['drugField'].value;
  if(this.latestDrugDose != undefined && this.latestDrugDose != ''){
    console.log(this.latestDrugDose);
    this.result['dose'] =  this.latestDrugDose;
  }else{
    console.log(this.result.dose);
  }
  if(this.latestDrugRemark != undefined && this.latestDrugRemark != ''){
    console.log(this.latestDrugRemark);
    this.result['remarks'] =  this.latestDrugRemark;
  }else{
    console.log(this.result.remarks);
  }
  if(this.latestDrugFrequency != undefined && this.latestDrugFrequency != ''){
    console.log(this.latestDrugFrequency);
    this.result['frequency'] =  this.latestDrugFrequency;
  }else{
    console.log(this.result.frequency);
  }
  if(this.latestDrugDuration != undefined && this.latestDrugDuration != ''){
    console.log(this.latestDrugDuration);
    this.result['duration'] =  this.latestDrugDuration;
  }else{
    console.log(this.result.duration);
  }
  if(this.latestDrugFood != undefined && this.latestDrugFood != ''){
    console.log(this.latestDrugFood);
    this.result['food'] =  this.latestDrugFood;
  }else{
    console.log(this.result.food);
  }
  console.log(this.result);

  this.dialogRef.close(this.result);
}
}
