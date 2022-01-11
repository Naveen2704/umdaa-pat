import { Component, OnInit, Output } from '@angular/core';
import { PatientserviceService } from '../service/patientservice.service';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { UsersService } from '../services/users.service';
export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-patientprofile',
  templateUrl: './patientprofile.component.html',
  styleUrls: ['./patientprofile.component.css']
})
export class PatientprofileComponent implements OnInit {
  message: string;
  id: any;
  patientDetails: any=[];
  sub: any;


  constructor( private service: PatientserviceService,private users: UsersService,
    private patientservice:PatientserviceService,
    private route: ActivatedRoute,private _dataService:ServiceService) { 
   }

  ngOnInit() {
    this.route.params.subscribe(params => {

    let productid = params['id'];
    let roleId = params['id1'];
    this.users.roleId(roleId);
    this.service.Getdetails(productid).subscribe(data =>{
      console.log(data)
    })
  });
  }

  // newMessage() {
  //   this._dataService.changeMessage("Hello from Sibling")
  // }

//   getPatientInfo(){
//     console.log(this.id);
//     this.patientservice.GetDetails().subscribe(data =>{
//     console.log(data.result);
//     this.patientDetails = data.result
//     console.log(  this.patientDetails);
//   })
// }


}
