import { Component, OnInit ,Input, Output, EventEmitter, Inject} from '@angular/core';
import { MatSidenav } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { PatientserviceService } from '../service/patientservice.service';
import { DailogService } from '../shared/dailog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../services/service.service';
import {Location, DOCUMENT} from '@angular/common';
import { UserService } from '../services/user.service';
import { UsersService } from '../services/users.service';
import { PserviceService } from '../services/pservice.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ServiceService]
})
export class HeaderComponent implements OnInit {
 // @Input() app_id: any;
  // @Output() changeName = new EventEmitter();
  @Input() sidenav: MatSidenav
  animal: string;
  name: string;
  patientDetails: any=[];
  matDialogRef: any;
  smallDialogSubscription: any;
  data: any;
  id: any;
  message: string;
  app_id: any;
  headerObj: any;
  image_link: any;
  path: any;
  routeName: any;
  backId: string;
  backName: string;
  hide:boolean = false;
  show:boolean = true;
  backPName: string;
  backPId: string;
  pRouteName: string;
  roleIdd: string;
  urlSafe: SafeResourceUrl;
  url: string;
  status: any;

  constructor( @Inject(DOCUMENT) private document: Document,private sanitizer: DomSanitizer,private preview: PserviceService,private users: UsersService,private userService: UserService,public dialog: MatDialog,
     private patientservice:PatientserviceService,private _location: Location,
    private route: ActivatedRoute,private _dataService:ServiceService,private router: Router,public notification:NotificationService) {  

 console.log(_dataService.getMyGV())
  }

  public myImgUrl : string ="assets/icons/default.jpg";
  ngOnInit() {
    this.users.roleIdd.subscribe(user =>{
      console.log(user);
      this.roleIdd=user;
      console.log(this.roleIdd);
    });
    // this.pathUrl123();
    // console.log(this._location.path());
    // this.path = this.router.url;
    // console.log(this.path);
     this.userService.castUser.subscribe(user =>{
      console.log(user);
      this.backName=user
     });

    this.patientservice.currentMessage.subscribe((message) =>{
        this.app_id = message
        console.log(this.app_id)
        console.log(this.app_id)
        this.getPatientInfo(this.app_id);
        this.patientservice.GetPatient(this.app_id).subscribe(data =>{
          console.log(data.result['parameters'][0])
          this.headerObj = data.result['parameters'][0],
          console.log(this.headerObj.status)
          this.status = this.headerObj.status
    
        })
    });
     this.users.castUser.subscribe(userr => {console.log(userr);
      this.backId=userr});

     this.users.checkRoute.subscribe(a => 
       {   
        console.log(a);
     this.routeName = a}
      );

  // preview

  this.preview.castUser.subscribe(user =>{
    console.log(user);
    this.backPName=user
   });

   this.preview.castUserr.subscribe(userr =>{
    console.log(userr);
    this.backPId=userr
   });

   this.preview.castUserrr.subscribe(userrr =>{
    console.log(userrr);
    this.pRouteName=userrr
   });
// preview
  }

  

  key(key: any): string {
    throw new Error("Method not implemented.");
  }
 
//   val() {
//     // console.log(this._dataService.getValue());
//     this.id = this._dataService.getValue();
//     console.log(this.id);
//     // return this.id;
// }

  openDialog(){
    const dialog_ref =
       this.dialog.open(DialogBodyComponent,
        {
          panelClass: ['myapp-no-padding-dialog'],
          position:  {
            left:'0px'
          } ,

          data: this.headerObj 

        }
        );

        dialog_ref.afterClosed().subscribe(result => {
          ///console.log('The dialog was closed');
            this.getPatientInfo(this.app_id);
        });
   
  }
  routeback(){
   // this._location.back();
  //  this.document.location.href  =('https://umdaa.co/webapp/doctors/#/appointment');
  window.location.replace("https://devumdaa.in/umdaaa/#/appointment"); 
  console.log( window.location.replace("https://devumdaa.in/umdaaa/#/appointment"));
  }
 Finish(){
  //location.href =('https://umdaa.co/webapp/doctors/#/appointment');
  this.patientservice.Finishappountment(this.headerObj).subscribe((res)=>{
  console.log(res);
  console.log(res['result'].appointment.status)
   
    if(res['code'] == '200'){

      this.document.location.href  =('https://umdaa.co/webapp/doctors/#/appointment');
    // this.status = res['result'].appointment.status
      this.notification.success('Closed your appointment');
   // this._location.prepareExternalUrl('https://umdaa.co/webapp/doctors/#/appointment');
      //  window.open('http://localhost:8100/#/appointment')
    // this.router.navigateByUrl('https://umdaa.co/webapp/doctors/#/appointment');
    }
  })
 }

getPatientInfo(id){
     console.log(id)
    this.patientservice.GetDetails_P(id).subscribe(data =>{
    console.log(data.result);
    this.patientDetails = data.result
    console.log(  this.patientDetails.photo);

    const input =  this.patientDetails.photo;

    const [name, street, unit, city, state, zip,image] = input.split('/');
    this.image_link = image;
    console.log(this.image_link);

  })
}

backk()
{
  if(this.backPName == 'SE')
  {
    this.router.navigate([this.backPName+'/'+this.backPId]);
    this.preview.previewName('Zero');
  }
  else if(this.backPName == 'GPE')
  {
    this.router.navigate([this.backPName+'/'+this.backPId]);
    this.preview.previewName('Zero');
  }
  else if(this.backPName == 'OS')
  {
    this.router.navigate([this.backPName+'/'+this.backPId]);
    this.preview.previewName('Zero');
  }
 else{
  this.router.navigate(['History/'+this.backPId]);
  this.preview.previewName('Zero');
 }
 
  // this.hide= false;
}

back()
{
  if(this.backName == 'SE')
  {
    this.router.navigate([this.backName+'/'+this.backId]);
    this.users.editrouter('Zero');

  }
  else if(this.backName == 'GPE')
  {
    this.router.navigate([this.backName+'/'+this.backId]);
    this.users.editrouter('Zero');
  }
  else if(this.backName == 'OS')
  {
    this.router.navigate([this.backName+'/'+this.backId]);
    this.users.editrouter('Zero');
  }
 else{
  this.router.navigate(['History/'+this.backId]);
  this.users.editrouter('Zero');
 }
 
  // this.hide= false;
}

backIonic()
{

  this.url  = 'https://www.facebook.com/';
  // this.url  = 'http://13.126.121.159/umdaa_patients/#/Patientprofile/'+this.id;
  this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  // this.router.navigate(['History/'+this.backId]);
}

}
