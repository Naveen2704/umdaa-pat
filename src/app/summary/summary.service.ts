import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  apiUrl:string = environment.baseUrl;

  constructor(private _http:HttpClient) { }

  getData(result):Observable<any>
  {
    console.log(result);
   return this._http.post(this.apiUrl,
    {
      "requesterid": 102,
      "requestname": "patient_summary_list",
      "requestparameters": {
          "clinic_id": result.clinic_id,
          "patient_id": result.patient_id,
          "doctor_id": result.doctor_id
      }
  }
    
    );
    }
    getfullsummary(id):Observable<any>
    {
     return this._http.post(this.apiUrl,
      {
        "requesterid": 1,
        "requestname": "fullSummary",
        "requestparameters": {
            "appointment_id": id
        }
    }
      
      );
      }
      getshortsummary(result):Observable<any>
      {
        
       return this._http.post(this.apiUrl,
        {"requesterid":1,
        "requestname":"shortSummary",
        "requestparameters":
        {
          "appointment_id":result.appointment_id
      }
    }
        );
        }
        getshortsummarys(result):Observable<any>
        {
          
         return this._http.post(this.apiUrl,
          {"requesterid":1,
          "requestname":"shortSummary",
          "requestparameters":
          {
            "appointment_id":result
        }
      }
          );
          }
        getdischargesummary(id):Observable<any>
      {
       return this._http.post(this.apiUrl,
        {
          "requesterid": 112,
          "requestname": "dischargeSummary",
          "requestparameters": {
              "appointment_id": id
          }
      }
        );
        }

        getRmpsummary(obj):Observable<any>{
          let url = environment.rural+"/Rural/patientsummary"
          let fd = new FormData();
          fd.append("patient_id",obj.patient_id)
          fd.append("rmp_id",obj.rmp_id)
          return this._http.post(url,fd)
        }
        getOcrPdf(id):Observable<any>{
          console.log(id);
          return this._http.post(this.apiUrl,
            {
              "requesterid": 112,
              "requestname": "getPatientOcr",
              "requestparameters": {
                  "appointment_id": id
              }
          }
            );
        }
        checkPatientOcrSubmit(id):Observable<any>{
          console.log(id);
          return this._http.post(this.apiUrl,
            {
              "requesterid": 112,
              "requestname": "patient_ocr_final_submitt",
              "requestparameters": {
                  "appointment_id": id
              }
          }
            );
        }

        getImagesId(id):Observable<any>{
          console.log(id);
          return this._http.post(this.apiUrl,
            {
              "requesterid": 112,
              "requestname": "getOcrImagesName",
              "requestparameters": {
                  "appointment_id": id
              }
          }
            );
        }

        translateImage(ip,image1,image2):Observable<any>{

          console.log(image1,image2)
          let abbasCreativeUrl = ip;
          // let abbasCreativeUrl = 'http://15.206.190.159/ocrtxt';
          return this._http.post(abbasCreativeUrl,{
            "Images": [
              image1,
              image2
            ]
          })
          // return this._http.post(url,{
          //   "Images": [
          //     "IMG_20210830_122436.jpg",
          //     "IMG_20210830_122448.jpg"
          //   ]
          // })
        }

        ocrFinalSubmit(d,a,c,p):Observable<any>{
          console.log(d,a,c,p);
          return this._http.post(this.apiUrl,
            {
            "requesterid": d,
            "requestname": "patient_ocr_final_submit",
            "requestparameters": {
                "appointment_id": a,
                "clinic_id": c,
                "doctor_id": d,
                "patient_id": p
            }
        }
        )
        }
      
}
