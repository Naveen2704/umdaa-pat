import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject,Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SymptomsService {
  public baseurl = environment.baseUrl;

  public _refreshSymptomsList = new BehaviorSubject<any>(null);
  getrefreshData$:Observable<any> = this._refreshSymptomsList.asObservable();
  getRefreshList(): Observable<any>{
    return this._refreshSymptomsList.asObservable();
  }
  constructor( private http: HttpClient) { }

  GetSymptoms(result):Observable<any>{
      return this.http.post(this.baseurl,
        {
          "requesterid": 0,
          "requestname": "SymptomMaster"
      }
      );
}
GetSymptomsSuggestions(result):Observable<any>{
  console.log(result);
  return this.http.post(this.baseurl,
    {
      "requesterid": 0,
      "requestname": "getPSSuggestions",
      "requestparameters": {
          "clinic_id": result.clinic_id,
          "doctor_id":result.doctor_id
      }
  }
  );
}
PostSymptoms(data,result):Observable<any>{
  console.log(data,data.Search)
  return this.http.post(this.baseurl,
    {
      "requesterid": 11,
      "requestname": "presenting_symptoms_submit_angular",
      "requestparameters": {
          "appointment_id": result.appointment_id,
          "clinic_id": result.clinic_id,
          "doctor_id": result.doctor_id,
          "patient_id":result.patient_id,
          "symptoms": [
              {
                  "form_id": data.form_id,
                  "form_name": "",
                  "isEnabled": false,
                  "span_type":data.duration,
                  "symptom_data":data.Search,
                  "time_span": data.span,
                  "type": 3
              }
          ],
          "umr_no": result.umr_no,
      }
  }
  );
}
GetSymptomsList(result):Observable<any>{
  return this.http.post(this.baseurl,
    {
      "requesterid": 11,
      "requestname": "presenting_symptoms_list",
      "requestparameters": {
          "appointment_id": result.appointment_id,
          "clinic_id": result.clinic_id,
          "doctor_id": result.doctor_id,
          "patient_id": result.patient_id
      }
  }
  ).pipe(tap(()=>{
    this._refreshSymptomsList.next(null);
  }));
}
DeleteSymptoms(id):Observable<any>{
  return this.http.post(this.baseurl,
    {
      "requesterid": 11,
      "requestname": "presenting_symptoms_delete",
      "requestparameters": {
          "isEnabled": false,
          "pps_line_item_id": id,
          "type": 3
      }
  }
  );
}
UpdateSymptoms(data):Observable<any>{
  console.log(data)
  return this.http.post(this.baseurl,
    {
      "requesterid": 11,
      "requestname": "presenting_symptoms_updatee",
      "requestparameters": {
          "isEnabled": false,
          "pps_line_item_id": data.id,
          "form_id":data.form_id,
          "span_type": data.duration,
          "symptom_data": data.Search,
          "time_span": data.span,
          "type": 3
      }
  });
}


}
