import { Component, OnInit, ViewChild, ElementRef , ViewChildren} from '@angular/core';
import { FormControl, FormBuilder, FormGroupDirective, FormGroup } from '@angular/forms';
import { FiService } from './fi.service';
import { debounceTime, distinctUntilChanged, switchMap, startWith, map, tap, finalize, filter } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { NotificationService } from '../shared/notification.service';
import { ConfirmdailogService } from '../shared/confirmdailog/confirmdailog.service';
import { MatAutocompleteTrigger, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientserviceService } from '../service/patientservice.service';
import { InvtempComponent } from './invtemp/invtemp.component';
import { InvtemplistComponent } from './invtemplist/invtemplist.component';
import { UsersService } from '../services/users.service';
import { SummaryService } from '../summary/summary.service';
import { SketchDialogComponent } from '../sketch-dialog/sketch-dialog.component';
import { GentempComponent } from './gentemp/gentemp.component';
import { GentemplistComponent } from './gentemplist/gentemplist.component';
import * as introJs from 'intro.js/intro.js';
import Swal from 'sweetalert2';
import { AddvitalsComponent } from '../addvitals/addvitals.component';
import { EditLabComponent } from '../edit-lab/edit-lab.component';
  

const options = {
  title: 'CONFIRM.DOWNLOAD.JOB.TITLE',
  message: 'Are you sure to delete ?',
  cancelText: 'NO',
  confirmText: 'YES'
};
const bullet = "\u2022";
const bulletWithSpace = `${bullet} `;
const enter = 13;



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-fi',
  templateUrl: './fi.component.html',
  styleUrls: ['./fi.component.css']
})
export class FiComponent implements OnInit {

  introJS = introJs();

  counter: number =0;
  counterArray: Array<number>;

  show = false;
  CdForm: any;
  results: Observable<string[]>;
  filteredUsers: any=[];
  filteredOptions: any;
  term: any;
  GIForm:FormGroup;
  PlanForm: FormGroup;
  FdForm:FormGroup;
  CommentForm:FormGroup;
  isSubmitted: boolean;
  InForm: FormGroup;
  isadded: boolean;
  DietForm: FormGroup;
  commentDataa:any;

  displayedColumns: string[] = ['position', 'name', 'weight'];
  displayedColumns_in :string[] = ['position', 'name', 'weight','Edit'];
  displayedColumns_plan: string[] = ['position', 'name', 'weight','action'];
  getlatestCds: any=[];
  getlatestinv: any=[];
  clinicaldiagnosisId: any;
  inv_id: any;
  AfterClick:boolean = true;
  BeforeClick:boolean = false;
  selectedIndex: number = 0;
  index:number;
  public tabs = [
    {id:1}, 
    {id:2}, 
    {id:3}
  ];
  fi_Obj: any;
  getcd: any;
  cdInfo: any;
  invInfo: any=[];
  cdsuggitions: any;
  cd_id: any;
  suggestcd: any;
  cd_id_s: any;
  Invsuggitions: any;
  Inv_id: any;
  invId: any;
  followingDate: Date;
  sunday: number;
  value: any;
  dsForm: FormGroup;
  showScroll:boolean;
  cdId: string;
  code: string;
  id: any;
  getPreviewOne: any=[];
  cd_code:any;
  status: any;
  disabled: boolean = false;
  nForm: FormGroup;
  Day: any;
  notesList: any=[];
  NsugList: any=[];
  giname: any;
  id1: any;
  getlatestplan: any=[];

  constructor(private _dialog:MatDialog,private dialog:MatDialog,private _service:SummaryService,private users: UsersService,private dailog: MatDialog,private service: PatientserviceService,private route: ActivatedRoute,
   public router: Router,public _fb :FormBuilder, private _searchService:FiService,private _notification:NotificationService,private _dailog:ConfirmdailogService) { 
  }
  handleInput(event){
    const { keyCode, target } = event;
    const { selectionStart, value } = target;
    
    if (keyCode === enter || keyCode == 13) {
      // console.log('a');
      target.value = [...value]
        .map((c, i) => i === selectionStart - 1
          ? `\n${bulletWithSpace}`
          : c
        )
        .join('');
        console.log(target.value);
        
      target.selectionStart = selectionStart+bulletWithSpace.length;
      target.selectionEnd = selectionStart+bulletWithSpace.length;
    }
    
    if (value[0] !== bullet) {
      target.value = `${bulletWithSpace}${value}`;
    }
  }
   addDays(date, days) {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
  }
  private searchTermStream = new Subject<string>();

  // search(term: string) { this.searchTermStream.next(term); }

  navbarOpen = false;
  myControl = new FormControl();
  

  queryField = new FormControl();
  queryinvField = new FormControl();
  isLoading = false;

  items: Observable<string[]>;
  options: any=[];
  ngOnInit() {

    this.route.params.subscribe(params => {

      let productid = params['id'];
      this.id = params['id'];
     this.service.GetPatient(productid).subscribe(data =>{
      console.log(data)

      let roleId = params['id1'];
      this.users.roleId(roleId);
      this.id1 = params['id1']
      

      this.fi_Obj = data.result['parameters'][0];
      this.status = data.result['parameters'][0].status;
      if(this.status === 'closed'){
        this.disabled = true;
        this.CdForm.get('queryField').disable();
        this.InForm.get('queryinvField').disable();
      }
      else{
        this.CdForm.get('queryField').enable();
        this.InForm.get('queryinvField').enable();
      }
      this.getlatestCd(this.fi_Obj);

      this.getlatesinv(this.fi_Obj);

      this.getCDsuggest(this.fi_Obj);
      this.getInvsuggest(this.fi_Obj)
      this.getnoteList();
      this.getnsug();
      this.getplanList();
      this.getPatientComments();
     })
  });


  this.nForm = this._fb.group({
    notefeild:new FormControl('')
  });
    this.CdForm = this._fb.group({
      queryField:new FormControl(''),
      cd_id : new FormControl(''),
      cd_code:new FormControl('')
    });
    this.InForm =  this._fb.group({
      queryinvField:new FormControl(''),
      Inv_id:new FormControl('')
    })
    this.GIForm = this._fb.group({
      gifeild:new FormControl('')
    })
    this.PlanForm = this._fb.group({
      Planfeild:new FormControl('')
    })
    this.FdForm = this._fb.group({
      followupdate:new FormControl('')
    })
    this.dsForm = this._fb.group({
      ds:new FormControl('')
    })

    this.CommentForm = this._fb.group({
      commentData:new FormControl('')
    })
 

  }
 
  help(){
    this.introJS.start();
    
  }
  onEnter(thing: HTMLTextAreaElement) {
    console.log(thing);
    console.log(thing.rows);
    this.counter = ++thing.rows;
    console.log("textarea.rows:", this.counter);
    this.counterArray = new Array(this.counter);
  }

  getPatientComments()
  {
    this._searchService.getLatestComments(this.fi_Obj).subscribe((res)=>{
      console.log(res);
      this.CommentForm.setValue({
        commentData: res['result'].comments
     });
  
    })
  }


 

  Nadd(data,formDirective: FormGroupDirective){
    console.log(data)
    if(!this.nForm.valid){
      return false;
    }
    else{
      this._searchService.addnote(data,this.fi_Obj).subscribe((res)=>{
        console.log(res)
        if(res['code']=='200'){
          this._notification.success('Note Added Successfully');
          // Swal.fire('','Notes Added Successfully','success')
          formDirective.resetForm();
          this.getnoteList()
        }
      })
    }
    
  }
  getnoteList(){
    this._searchService.getnlist(this.fi_Obj).subscribe((res)=>{
      console.log(res)
      this.notesList = res.result.patient_notes
    })
  }
  getnsug(){
    this._searchService.getsugList(this.fi_Obj).subscribe((res)=>{
      console.log(res)
      this.NsugList = res.result.notesSuggestions
    })
  }
  selectedSug(id,note){
    this._searchService.addnotesug(note,this.fi_Obj).subscribe((res)=>{
      console.log(res)
      if(res['code']=='200'){
        // Swal.fire('','Notes Added Successfully','success')
        this._notification.success('Note Added Successfully');
        this.getnoteList()
      }
      else{
        this._notification.error('Something wrong !');
      }
    })
  }
  ndel(id){
    this._searchService.delNote(id).subscribe((res)=>{
      console.log(res)
      if(res['code']=='200'){
        this._notification.success('Note Deleted Successfully')
        // Swal.fire('','Deleted','success')
        this.getnoteList()
      }
    })
  }
  //private tabsCount = this.tabs.length;
  gisubmit(data,formDirective: FormGroupDirective){
    console.log(data)
    this._searchService.getfolllowupgi(this.fi_Obj,data).subscribe((res)=>{
      console.log(res)
      if(res['code']=='200'){
        formDirective.resetForm()
        this._notification.success('Genaral instructions Added ');
        this.getplanList();
    }
  })
  }
  Plansubmit(data,formDirective: FormGroupDirective){
    console.log(data);
    this._searchService.getfolllowupplan(this.fi_Obj,data).subscribe((res)=>{
      console.log(res)
      if(res['code']=='200'){
        formDirective.resetForm()
        this._notification.success('Plan instructions Added ');
        this.getplanList();
    }
    })
    //formDirective.resetForm()
  }
  commentsubmit(data,formDirective: FormGroupDirective){
    console.log(data);
    this._searchService.addComment(this.fi_Obj,data).subscribe((res)=>{
      console.log(res)
      if(res['code']=='200'){
        // formDirective.resetForm()
        this._notification.success('Comments Added ');
        // this.getplanList();
    }
    })
    // formDirective.resetForm();
  }
  dssubmit(data,formDirective: FormGroupDirective){
    console.log(data);
    this._searchService.DsSubmit(this.fi_Obj,data).subscribe((res)=>{
      console.log(res)
      if(res['code']=='200'){
        formDirective.resetForm()
        this._notification.success('Discharge summary  Added ');
      
    }
    })
    //formDirective.resetForm()
  }
  FDsubmit(data,formDirective: FormGroupDirective){
    console.log(data)
    this._searchService.getfolllowupfd(this.fi_Obj,data).subscribe((res)=>{
      console.log(res)
      if(res['code']=='200'){
        formDirective.resetForm()
        this._notification.success('Next followup date added');
        this.getplanList();
    }
    })
  }
 date(e){
   console.log(e)
   this.value = e
   const date = new Date();
   const newDate = this.addDays(date, parseInt(e));
   console.log(newDate.getDay())
   var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

   this.sunday = newDate.getDay()
   this.Day = days[this.sunday] 
   console.log(this.Day) 
   this.followingDate = newDate
 }
  selectChange(): void{
    console.log("Selected INDEX: " + this.selectedIndex);
  }

  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  // Action triggered when user swipes
  // swipe(index,$event) {

  //   console.log(event);
  //   console.log("number",selectedIndex);
  //   console.log("action",action);
  //   // Out of range
  //   if (this.selectedIndex < 0/* starter point as 1 */ || this.selectedIndex > this.tabsCount/* here it is */ ) return;

  //   // Swipe left, next tab
  //   if (action === this.SWIPE_ACTION.LEFT) {
  //     const isLast = this.selectedIndex === this.tabsCount;
  //     this.selectedIndex = isLast ? 0 : this.selectedIndex + 1;
  //     console.log("Swipe right - INDEX: " + this.selectedIndex);
  //   }

  //   // Swipe right, previous tab
  //   if (action === this.SWIPE_ACTION.RIGHT) {
  //     const isFirst = this.selectedIndex === 0 /* starter point as 1 */;
  //     this.selectedIndex = isFirst ? 1 : this.selectedIndex - 1;
  //     console.log("Swipe left - INDEX: " + this.selectedIndex);
  //   }
  // }


  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  selectedcd(event: any=[],clinical_diagnosis_id,code){
    // console.log(event)
    // console.log(clinical_diagnosis_id,code)
    // this.cd_id = clinical_diagnosis_id;
    // this.suggestcd = event;
    // this.CdForm.get('queryField').setValue(this.suggestcd);
    // this.CdForm.get('cd_id').setValue(this.cd_id);
    // this.CdForm.get('cd_code').setValue(code)
   
    if(code == null)
    {
      
      this.code = '';
    }
    else{
     
      this.code = code
    }
    this._searchService.addDiagnosisSug(this.code,clinical_diagnosis_id,event,this.fi_Obj).subscribe((res)=>{
      console.log(res)
      if(res['code']=='200'){
        // this.ngOnInit();
        this.getlatestCd(this.fi_Obj);
        this._notification.success('Diagnosis Added successfully');
        // Swal.fire('','Diagnosis Added successfully','success')
      } if(res['code']=='201'){
        this._notification.error(res.message);
        // Swal.fire('',res.message,'warning')
      }
    })
  
  }
  selectedInv(name,id){
    // console.log(event)
    // console.log(investigation_id)
    // this.Inv_id = investigation_id;
    // this.suggestcd = event;
    // this.InForm.get('queryinvField').setValue(this.suggestcd);
    // this.InForm.get('Inv_id').setValue(this.Inv_id);
    this._searchService.addinvsug(name,id,this.fi_Obj).subscribe((res)=>{
      console.log(res)
      if(res['code']=='200'){
       // this.getlatestCd();
        this._notification.success('Investigations Added successfully');
        // Swal.fire('','Investigations Added successfully','success')
        this. getlatesinv(this.fi_Obj);
      }if(res['code']=='201'){
        this._notification.error('Investigations Added failed');
        // Swal.fire('',res.message,'warning')
      }
    }
   )
  }
  getCDsuggest(fi_Obj){
    this._searchService.getCDSuggestions(this.fi_Obj).subscribe((res)=>{
       this.cdsuggitions = res.result.cdSuggestions;
       console.log(this.cdsuggitions)
     })
   }
   getInvsuggest(fi_Obj){
    this._searchService.getInvSuggestions(this.fi_Obj).subscribe((res)=>{
       this.Invsuggitions = res.result.invSuggestions;
       console.log(this.Invsuggitions)
     })
   }
  search (term: string) {
    console.log(term);
    if(term.length >= 3 ){
    this.items = this._searchService.search(term);
    console.log(this.items);
   // this.getlatestCd(this.fi_Obj);
    }
    // if(term.length == 0){
    //   this.items = this._searchService.search(term)
    //   this.isLoading = false
    //   console.log(this.items);
    // }
    
  }

  openDialog(){
    this.router.navigate(['/secondsketch/'+'CD/'+this.id+'/'+this.id1]);
  }

  
  cdsearch(data,formDirective: FormGroupDirective){
    console.log(data.cd_id,data.cd_code);
    console.log(this.getlatestCds)
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
      // this is for 
      
      this._searchService.addDiagnosis(this.code,this.cdId,data,this.fi_Obj).subscribe((res)=>{
        console.log(res)
        if(res['code']=='200'){
          // this.ngOnInit();
          this.getlatestCd(this.fi_Obj);
          this._notification.success('Diagnosis Added successfully');
          // Swal.fire('','Diagnosis Added successfully','success')
        }if(res['code']=='201'){
          // this._notification.error('Diagnosis Added failed');
          Swal.fire('',res.message,'warning')
        }
      })
      var getInfo1 = localStorage.getItem('CD'+this.id+'1');
      var getInfo2 = localStorage.getItem('CD'+this.id+'2');
      console.log(getInfo1); 
      console.log(getInfo2); 
      if(getInfo1 != null)
      {
        getInfo1 = getInfo1.replace("data:image/jpeg;base64,", "");
        console.log(getInfo1);
        this.getPreviewOne.push(getInfo1);
      }
      if(getInfo2 != null)
      {
        getInfo2 = getInfo2.replace("data:image/jpeg;base64,", "");
        console.log(getInfo2);
        this.getPreviewOne.push(getInfo2);
      }
// this is for images
      // this._searchService.addcdsketch(this.fi_Obj,this.getPreviewOne).subscribe((res)=>{
      //   console.log(res)
      // })
      formDirective.resetForm()
    }
   
  }

   
  invsearch (query: string) {
    console.log(query);

     if(query.length>=3){
      this.isLoading = true
      //  this.options = this._searchService.searchInve(query)
      this._searchService.searchInve(query).subscribe((res) => {
        console.log(res);
        this.options=res;
        // console.log(res['result'])
        // console.log(res['result'].investigations);
        // this.options = res['result'].investigations;
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

  // invsearch (query: string) {
  //   console.log(query);

  //    if(query.length>=3){
  //     this.isLoading = true
  //     this.options = this._searchService.searchInve(query);
  //     //  console.log(this.options);
  //     // Lab Back Up
  //     // this._searchService.searchInve(query).subscribe((res) => {
  //     //   console.log(res)
  //     //   console.log(res['result'])
  //     //   console.log(res['result'].investigations);
  //     //   this.options = res['result'].investigations;
  //     // })
  //     // Lab Back Up
  //      this.getlatesinv(this.fi_Obj)
  //      this.isLoading = false;
  //    }
  //     if(query.length ==0 ){
  //     this.options = this._searchService.searchInve(query);
  //      this.isLoading = false
  //    }else{

  //    }
     
  //  }
   
   submitprint(){
    //console.log()
    let id = this.fi_Obj.appointment_id
     this._service.getshortsummary(id).subscribe((res) => {
      //console.log(res.result.pdf_name)
      let url = res.result.pdf_name
     window.open(url,'_blank',"width=500,height=500")
    })
    }
  // Lab Start
  // insearch(data,formDirective: FormGroupDirective,clinic_lab_package_id){
  //    console.log(clinic_lab_package_id);
  //    console.log(data.Inv_id)
  //    console.log(data,data.queryinvField)
  //    if(data.Inv_id == null)
  //    {
  //      this.invId = '0'
  //    }
  //    else{
  //      this.invId = data.Inv_id
  //    }

  //   this.isadded= true;
  //   if (!this.InForm.valid ) {
  //     return false;
  //   }else{
  //     this._searchService.addinvestigations(clinic_lab_package_id,this.invId,data.queryinvField,this.fi_Obj).subscribe((res)=>{
  //       console.log(res)
  //       if(res['code']=='200'){
  //        // this.getlatestCd();
  //         this._notification.success('Investigations Added successfully');
  //         // Swal.fire('','Investigations Added successfully','success')
  //         this. getlatesinv(this.fi_Obj);
  //       }if(res['code']=='201'){
  //         // Swal.fire('',res.message,'warning')
  //         this._notification.error(res.message);
  //       }
  //     }
  //    )
  //     formDirective.resetForm()
  //   }
  // }
  // Lab Back Up
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
     this._searchService.addinvestigations(this.invId,data.queryinvField,this.fi_Obj).subscribe((res)=>{
       console.log(res)
       if(res['code']=='200'){
        // this.getlatestCd();
         this._notification.success('Investigations Added successfully');
         // Swal.fire('','Investigations Added successfully','success')
         this. getlatesinv(this.fi_Obj);
       }if(res['code']=='201'){
         // Swal.fire('',res.message,'warning')
         this._notification.error(res.message);
       }
     }
    )
     formDirective.resetForm()
   }
 }
  dietsubmit(data,formDirective: FormGroupDirective){
    console.log(data);
    formDirective.resetForm()
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
  getplanList(){
    this._searchService.get_plan(this.fi_Obj).subscribe((res)=>{
      console.log(res)
      this.getlatestplan = res.result.planInfo;
      console.log( this.getlatestplan )
      //this.getcd = res.result
    })
  }
  getlatesinv(fi_Obj){
    this._searchService.get_latestinv(this.fi_Obj).subscribe((result)=>{
      console.log(result)
    // this.invInfo = result.result;
      this.getlatestinv = result.result.investigations_list;
      console.log(this.getlatestinv)
    })
  }

  getId(id,code)
  {
    console.log(id,code);
    //this.cd_id_s = id;
    //this.cd_id = this.cd_id_s 
    //console.log(this.cd_id);
    this.CdForm.get('cd_id').setValue(id);
    this.CdForm.get('cd_code').setValue(code)
  }
  getinvid(id){
    this.inv_id = id
    this.InForm.get('Inv_id').setValue(this.inv_id );
  }
  deletcd(id){
    console.log(id);
     this._dailog.open(options).afterClosed().subscribe(res =>{
      if(res){
        this._searchService.deletecd(id,this.fi_Obj).subscribe(data => {
          console.log(data);
          if(data['code'] == '200'){
            this._notification.success('Diagnosis Deleted successfully');
            // Swal.fire('','Deleted','success')
            this.getlatestCd(this.fi_Obj);
          // this.usersForm.reset();
         // formDirective.resetForm();
          }
          else{
            this._notification.error('Diagnosis Deletion failed');
            // Swal.fire('','Something wrong','error')
          }
          
         })
      }
    })
  }

  deleteinv(id){
    console.log(id)
    this._dailog.open(options).afterClosed().subscribe(res =>{
      if(res){
        this._searchService.delete_inv(id,this.fi_Obj).subscribe(data => {
          console.log(data);
          if(data['code'] == '200'){
            this._notification.success('Investigation Deleted successfully');
            // Swal.fire('','Deleted','success')
            this. getlatesinv(this.fi_Obj);
          // this.usersForm.reset();
         // formDirective.resetForm();
          }
          else{
            this._notification.error('Investigation Deletion failed');
            // Swal.fire('','Something wrong','error')
          }
          
         })
      }
    })
  }

  saveTemp(invlist){
    console.log(invlist)
    this.templateModel(invlist)
  }
  templateModel(invlist){
    return this.dailog.open(InvtempComponent,
      {
       
        disableClose:true,
        panelClass:['editprescribe-dailog'],
        data:{
          InvListArray:invlist,
          package:this.fi_Obj
    
        }
      }
      );
  }

 
  selectinvTemp(){
    this.templatelistmodel().afterClosed().subscribe((res)=>{
      this.getlatesinv(this.fi_Obj);
    })
   }
   templatelistmodel(){
    return this.dailog.open(InvtemplistComponent,{
      disableClose:true,
      panelClass:['Template-dailog'],
      data:{
        package:this.fi_Obj
      }
    })
  }

  template(){
    const dialogRef =this.dailog.open(GentemplistComponent,{
      panelClass:['Template-dailog'],
      data:this.fi_Obj
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.giname = result.event
    });
  }
  savetemp(value){
    console.log(value.gifeild)
    if(value.gifeild == ''){
      alert("Please add Genral Instruction")
    }
   else{
    this.dailog.open(GentempComponent,{
      panelClass:['editprescribe-dailog'],
      data:{
        giname:value.gifeild,
        obj:this.fi_Obj
      }
    })
   }
  
  }
  getPrint(){
    this.AfterClick = false;
    this.BeforeClick = true;
    this._service.getshortsummary(this.fi_Obj).subscribe((res) => {
      //console.log(res.result.pdf_name)
      let url = res.result.pdf_name
     window.open(url,'_blank',"width=500,height=500");
     this.AfterClick = true;
     this.BeforeClick = false;
    })
  }

  editLabInv(name,id)
  {
    console.log(name);
    // alert("Edit Lab Investigations");
    const dialogRef = this._dialog.open(EditLabComponent,{
      panelClass:[],
      disableClose:true,
      autoFocus: false,
      maxHeight: '90vh',
      data:{'name':name}
      
    });
    dialogRef.afterClosed().subscribe(result => {
     ///console.log('The dialog was closed');
 
    //  this.getvitals(this.obj);
   });
  }

  viewPdf()
  {
    window.open('https://google.com');
  }

}
  

  

    
  


