import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FuService {
  public apiUrl = environment.baseUrl;

  constructor(private _http: HttpClient) { }

  Getfutemplates(result):Observable<any>{
    return this._http.post(this.apiUrl,
      {
        "requesterid": 67,
        "requestname": "followup_template_list",
        "requestparameters": {
            "appointment_id": result.appointment_id,
            "check": false,
            "department_id":result.department
        }
    }
  )
  }
  Getfudata(result,id):Observable<any>{
console.log(id)
    return this._http.post(this.apiUrl,
      {
        "requesterid": 42,
        "requestname": "addFollowup_template",
        "requestparameters": {
            "appointment_id": result.appointment_id,
            "clinic_id": result.clinic_id,
            "patient_id": result.patient_id,
            "template_id": id
        }
    }
  )
  }
  getfidata(result):Observable<any>{
    return this._http.post(this.apiUrl,
      {
        "requesterid": 42,
        "requestname": "get_fi",
        "requestparameters": {
            "appointment_id": result.appointment_id,
            "clinic_id": result.clinic_id
        }
    }
  )
  }
  getaddpopupdata(date,complince,params,result):Observable<any>{
    console.log(date,complince,params,result);
   // Object.keys(data).forEach((key) => (!data[key]) && delete data[key]);
    return this._http.post(this.apiUrl,
      {
        "requesterid": 67,
        "requestname": "patient_followup_insert",
        "requestparameters": {
            "appointment_id": result.appointment_id,
            "compliance": complince,
            "date": date,
            "params_list": params
        }
    }
  )
  }
}

