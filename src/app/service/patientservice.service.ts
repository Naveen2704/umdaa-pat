import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable ,BehaviorSubject} from 'rxjs';
import {tap, map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders()
    // 'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin':'*',
    // 'Access-Control-Allow-Methods':' GET, POST, PATCH, PUT, DELETE, OPTIONS',
    // 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    .append('Content-Type', 'application/json')
    .append('Access-Control-Allow-Headers', 'Content-Type')
    .append('Access-Control-Allow-Methods', ' GET, POST, PATCH, PUT, DELETE, OPTIONS')
    .append('Access-Control-Allow-Origin', '*')
  
};

@Injectable({
  providedIn: 'root'
})

export class PatientserviceService {
  id:any;
  public patientInfo:any=[];

  private messageSource = new BehaviorSubject<any>(null);
  currentMessage = this.messageSource.asObservable();



 imageurl:any;
  public baseurl = environment.baseUrl;


  result: any;

  constructor(private http:HttpClient) {
  }
  GetDetails_PE(result):Observable<any>{
    console.log(result);
    return this.http.post(this.baseurl,
      {
        "requesterid": 11,
        "requestname": "getProfileDetails",
        "requestparameters": {
            "appointment_id": result.appointment_id,
        }
    });
}

  GetDetails_P(id):Observable<any>{

      return this.http.post(this.baseurl,
        {
          "requesterid": 11,
          "requestname": "getProfileDetails",
          "requestparameters": {
              "appointment_id": id,
          }
      });
}
Finishappountment(result){
 
   
    return this.http.post(this.baseurl,
      {"requesterid":0,"requestname":"appointment_status",
      "requestparameters":{"appointment_id":result.appointment_id,"status_type":"closed"}}
 )
  }
updateDetails(data,fileHolder,result):Observable<any> {
  let fd = new FormData();
console.log(fileHolder)
  let value = JSON.stringify({
        "age": data.age,
        "appointment_id": result.appointment_id,
        "clinic_id": result.clinic_id,
        "email_id": data.email,
        "first_name": data.first_name,
        "last_name": data.last_name,
        "gender": data.gender,
        "location": data.location,
        "mobile": data.mobile,
        "occupation": "bussiness",
        "patient_id":result.patient_id,
        "requesterid": 11,
        "requestname": "patient_profile_edit",
        "status": "1",
        "title": data.title,
        // "file_i":data.file_i
  });
  fd.append("requestpara",value);
  fd.append("file_i",fileHolder)
  return this.http.post(this.baseurl,fd)
}
Getdetails(id):Observable<any>{
  return this.http.post(this.baseurl,
   
    {"requesterid":11,"requestname":"getInfo","requestparameters":{"appointment_id":id}}
  )
}

  GetPatient(id):Observable<any>{
      console.log(id);
      return this.http.post(this.baseurl,{"requesterid":11,
      "requestname":"getInfo",
      "requestparameters":{"appointment_id":id}
    })
  }
}