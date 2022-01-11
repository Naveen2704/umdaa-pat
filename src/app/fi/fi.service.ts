import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { compileBaseDefFromMetadata } from '@angular/compiler';




 
@Injectable({
  providedIn: 'root'
})


export class FiService {
  // baseUrl: string = 'http://13.126.121.159/dev/WebApi/ClinicalDiagnosis/';
  // baseUrl: string = 'https://clinic.umdaa.co/WebApi/ClinicalDiagnosis/';
  public apiUrl = environment.baseUrl;
  dataMorning: string;
  dataNight: string;
  dataAftenoon: string;
  day: string;

  id:string;
  
  
  constructor(private _http: HttpClient) { }

  search(term:string):Observable<any> {
    // console.log(term);
    // let wikiUrl = 'https://clinic.umdaa.co/WebApi/ClinicalDiagnosis/';
    // let wikiUrl = 'https://procli.devumdaa.in/WebApi/ClinicalDiagnosis/';
    let wikiUrl = environment.Url + '/' + 'ClinicalDiagnosis/'
    let params = new URLSearchParams();
    params.set('search', term); // the user's search value
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');
    let _URL = wikiUrl + term;
    if (term === '') {
      return of([]);
    }
    let searchResult  = this._http.get(_URL).pipe( debounceTime(1000),distinctUntilChanged(),
     map((data:any) => {
      //  console.log(data);
      if(data.length != 0) {
        return data as any[];
      }
    }));
    return searchResult;
         
  }

  searchh(term:string,appid):Observable<any> {
    // console.log(term);
    // let wikiUrl = 'https://clinic.umdaa.co/WebApi/ClinicalDiagnosis/';
    // let wikiUrl = 'https://procli.devumdaa.in/WebApi/ClinicalDiagnosis/';
    // let wikiUrl = environment.Url + '/ClinicalDiagnosis/' + 'ClinicalDiagnosiss/'
    // let wikiUrl = environment.Url + '/' + 'ClinicalDiagnosis/ClinicalDiagnosiss/';
    let wikiUrl = environment.Url + '/' + 'ClinicalDiagnosis/ClinicalDiagnosiss/'+appid + '/';
    let params = new URLSearchParams();
    params.set('search', term); // the user's search value
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');
    let _URL = wikiUrl + term;
    if (term === '') {
      return of([]);
    }
    // let searchResult  = this._http.get('https://procli.devumdaa.in/WebApi/ClinicalDiagnosis/ClinicalDiagnosiss/Hyper')
    let searchResult  = this._http.get(_URL).pipe( debounceTime(1000),distinctUntilChanged(),
     map((data:any) => {
      //  console.log(data);
      if(data.length != 0) {
        return data as any[];
      }
    }));
    return searchResult;
         
  }

  searchhh(term:string,appid):Observable<any> {
    // console.log(term);
    // let wikiUrl = 'https://clinic.umdaa.co/WebApi/ClinicalDiagnosis/';
    // let wikiUrl = 'https://procli.devumdaa.in/WebApi/ClinicalDiagnosis/';
    // let wikiUrl = environment.Url + '/ClinicalDiagnosis/' + 'ClinicalDiagnosiss/'
    // let wikiUrl = environment.Url + '/' + 'ClinicalDiagnosis/ClinicalDiagnosiss/';
    let wikiUrl = environment.Url + '/' + 'ClinicalDiagnosis/ClinicalDiagnosisss/'+appid + '/';
    let params = new URLSearchParams();
    params.set('search', term); // the user's search value
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');
    let _URL = wikiUrl + term;
    if (term === '') {
      return of([]);
    }
    // let searchResult  = this._http.get('https://procli.devumdaa.in/WebApi/ClinicalDiagnosis/ClinicalDiagnosiss/Hyper')
    let searchResult  = this._http.get(_URL).pipe( debounceTime(1000),distinctUntilChanged(),
     map((data:any) => {
      //  console.log(data);
      if(data.length != 0) {
        return data as any[];
      }
    }));
    return searchResult;
         
  }
  searchInve(query:string):Observable<any> {
    console.log(query);
    let wikiUrl = environment.Url+'/Investigations/';
    // let wikiUrl = 'https://umdaa.co/clinic/clinic/WebApi/Investigations/';
    let params = new URLSearchParams();
    params.set('search', query); // the user's search value
    // params.set('action', 'opensearch');
    // params.set('format', 'json');
    // params.set('callback', 'JSONP_CALLBACK');
    let _URL = wikiUrl + query;
    return this._http.get(_URL)
         
  } 

  searchRemarks(query:string,appid):Observable<any> {
    console.log(query);
    // let wikiUrl = environment.Url+'/Investigations/';
    let wikiUrl = environment.Url + '/' + 'ClinicalDiagnosis/Remarks/'+appid + '/';
    // let wikiUrl = 'https://umdaa.co/clinic/clinic/WebApi/Investigations/';
    let params = new URLSearchParams();
    params.set('search', query); // the user's search value
    // params.set('action', 'opensearch');
    // params.set('format', 'json');
    // params.set('callback', 'JSONP_CALLBACK');
    let _URL = wikiUrl + query;
    return this._http.get(_URL)
         
  } 

  // searchInve(query:string):Observable<any> {
  //   console.log(query);
  //   // let wikiUrl = 'https://clinic.umdaa.co/WebApi/Investigations/';
  //   // let wikiUrl = 'https://clinic.umdaa.co/WebApi/Investigations/';
    
  //   let wikiUrl = environment.Url + '/' + 'Investigations/'
  //   let params = new URLSearchParams();
  //   params.set('search', query); // the user's search value
  //   params.set('action', 'opensearch');
  //   params.set('format', 'json');
  //   params.set('callback', 'JSONP_CALLBACK');
  //   let _URL = wikiUrl + query;
  //   return this._http.get(_URL)

  //   // Lab Back Up
  //   // let wikiUrl = environment.Url + '/' + 'Investigations/1'
  //   // let wikiUrl = 'https://devumdaa.in/dev/WebApi/Investigations/1/'
  //   // let params = new URLSearchParams();
  //   // params.set('search', query); // the user's search value
  //   // params.set('action', 'opensearch');
  //   // params.set('format', 'json');
  //   // params.set('callback', 'JSONP_CALLBACK');
  //   // let _URL = wikiUrl + query;
  //   // return this._http.get(_URL)
  //   // Lab Back Up
         
  // }
  Drugsearch(drugs:string,result):Observable<any> {
    // let wikiUrl = 'https://clinic.umdaa.co/WebApi/Drug/DrugSearch/';
    // let wikiUrl = 'https://clinic.umdaa.co/MobileApi/Drug/DrugSearch/'
    // let wikiUrl = 'http://devumdaa.in/dev/WebApi/Drug/DrugSearch/';
    console.log(result,drugs)
    let wikiUrl = environment.Url + '/' + 'Drug/DrugSearch/'
    let params = new URLSearchParams();
    params.set('search', drugs); // the user's search value
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');
    let _URL = wikiUrl+result.clinic_id+"/"+drugs+"/"+result.package_id+"/"+result.rmp_status;
    return this._http.get(_URL)
  }
  addDiagnosisSug(code,cdid,data,result):Observable<any>{
    console.log(data,result)
    return this._http.post(this.apiUrl,
      {
      "requesterid": result.doctor_id,
      "requestname": "patient_clinical_diagnosis",
      "requestparameters": {
          "appointment_id": result.appointment_id,
          "clinic_id": result.clinic_id,
          "clinicaldiagnosis": [
              {
                  "clinical_diagnosis_id": cdid,
                  "code": code,
                  "disease_name": data,
                  "isEnabled": false
              }
          ],
          "doctor_id": result.doctor_id,
          "patient_id": result.patient_id,
          "position": 0,
          "umr_no": result.umr_no,
      }
  }
  )
  }
  addDiagnosis(code,cdid,data,result):Observable<any>{
    console.log(data);
    console.log(code);
    console.log(result);
    return this._http.post(this.apiUrl,
      {
      "requesterid": result.doctor_id,
      "requestname": "patient_clinical_diagnosis",
      "requestparameters": {
          "appointment_id": result.appointment_id,
          "clinic_id": result.clinic_id,
          "clinicaldiagnosis": [
              {
                  "clinical_diagnosis_id": cdid,
                  "code": code,
                  "disease_name": data.queryField,
                  "isEnabled": false
              }
          ],
          "doctor_id": result.doctor_id,
          "patient_id": result.patient_id,
          "position": 0,
          "umr_no": result.umr_no,
      }
  }
  //   return this._http.post(this.apiUrl,
  //     {
  //     "requesterid": result.doctor_id,
  //     "requestname": "patient_clinical_diagnosis",
  //     "requestparameters": {
  //         "appointment_id": result.appointment_id,
  //         "clinic_id": result.clinic_id,
  //         "clinicaldiagnosis": [
  //             {
  //                 "clinical_diagnosis_id": cdid,
  //                 "code": code,
  //                 "disease_name": data.queryField,
  //                 "isEnabled": false
  //             }
  //         ],
  //         "doctor_id": result.doctor_id,
  //         "patient_id": result.patient_id,
  //         "position": 0,
  //         "umr_no": result.umr_no,
  //     }
  // }
  )
  }
  addOcrClinicalDiagnosis(doctorid,appid,clinicid,cdid,cd,patienttid,umr):Observable<any>{
    console.log(doctorid,appid,clinicid,cdid,cd,patienttid,umr);
    return this._http.post(this.apiUrl,
      {
      "requesterid": doctorid,
      "requestname": "patient_ocr_clinical_diagnosis",
      "requestparameters": {
          "appointment_id": appid,
          "clinic_id": clinicid,
          "clinicaldiagnosis": cd,
          "doctor_id": doctorid,
          "patient_id": patienttid,
          "position": 0,
          "umr_no": umr,
      }
  }
  )
  }
  addOcrPrescription(doctorid,appid,clinicid,cdid,pres,patienttid,umr):Observable<any>{
    console.log(doctorid,appid,clinicid,cdid,pres,patienttid,umr);
    return this._http.post(this.apiUrl,
      {
      "requesterid": doctorid,
      "requestname": "patient_ocr_prescription",
      "requestparameters": {
          "appointment_id": appid,
          "clinic_id": clinicid,
          "prescription": pres,
          "doctor_id": doctorid,
          "patient_id": patienttid,
          "position": 0,
          "umr_no": umr,
      }
  }
  )
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
  
  checkPatientOcrSubmit(id):Observable<any>{
    console.log(id);
    return this._http.post(this.apiUrl,
      {
        "requesterid": 112,
        "requestname": "patient_ocr_final_submit",
        "requestparameters": {
            "appointment_id": id
        }
    }
      );
  }


  addcdsketch(result):Observable<any>
  {
    var getPreviewOnee=[];
    var getInfo1 = localStorage.getItem("CD"+result.appointment_id+1);
    var getInfo2 = localStorage.getItem("CD"+result.appointment_id+2);

    if(getInfo1 != null)
    {
      getInfo1 = getInfo1.replace("data:image/jpeg;base64,", "");
      console.log(getInfo1);
      getPreviewOnee.push(getInfo1);
    }
    if(getInfo2 != null)
    {
      getInfo2 = getInfo2.replace("data:image/jpeg;base64,", "");
      console.log(getInfo2);
      getPreviewOnee.push(getInfo2);
    }
    console.log(getPreviewOnee);
  let fd =new FormData();
    let value = JSON.stringify(
      {
        "appointment_id":result.appointment_id,
        "requesterid":result.doctor_id,
        "patient_id":result.patient_id,
        "clinic_id":result.clinic_id,
        "requestname": "clincal_dianosis_image_web",
        "form_image":getPreviewOnee
    }
    );
    fd.append("requestpara",value);
    return this._http.post(this.apiUrl,fd)
  }

  addcdsketchh(result):Observable<any>
  {
    console.log(result)
    var getPreviewOneee=[];
    var getInfo11 = localStorage.getItem("CD"+result.appointment_id+1);
    var getInfo22 = localStorage.getItem("CD"+result.appointment_id+2);

    if(getInfo11 != null)
    {
      getInfo11 = getInfo11.replace("data:image/jpeg;base64,", "");
      console.log(getInfo11);
      getPreviewOneee.push(getInfo11);
    }
    if(getInfo22 != null)
    {
      getInfo22 = getInfo22.replace("data:image/jpeg;base64,", "");
      console.log(getInfo22);
     getPreviewOneee.push(getInfo22);
    }
    console.log(getPreviewOneee);
  let fdd =new FormData();
    let value = JSON.stringify(
      {
        "appointment_id":result.appointment_id,
        "requesterid":result.doctor_id,
        "patient_id":result.patient_id,
        "clinic_id":result.clinic_id,
        "requestname": "clincal_dianosis_image_web",
        "form_image":getPreviewOneee
    }
    );
    console.log(value)
    fdd.append("requestpara",value);
    return this._http.post(this.apiUrl,fdd)

  }

  DelSketch(appid,result):Observable<any>
  {

    return this._http.post(this.apiUrl,
      {
        "requesterid":6,
        "requestname": "deleteCdImage",
        "requestparameters": {
            "appointment_id":appid,
            "doctor_id":result.doctor_id,
            "patient_id":result.patient_id,
            "clinic_id":result.clinic_id,
            "index":"1"
        }
    }
      )

  }

  DelSketchh(result):Observable<any>
  {

    return this._http.post(this.apiUrl,
      {
        "requesterid":6,
        "requestname": "deleteCdImage",
        "requestparameters": {
            "appointment_id":result.appointment_id,
            "doctor_id":result.doctor_id,
            "patient_id":result.patient_id,
            "clinic_id":result.clinic_id,
            "index":"2"
        }
    }
      )

  }

  addinvsug(name,id,result):Observable<any>{
    
    console.log(result.umr_no);
    return this._http.post(this.apiUrl,
      {
      "requesterid": 11,
      "requestname": "investigations_submit",
      "requestparameters": {
          "appointment_id": result.appointment_id,
          "clinic_id": result.clinic_id,
          "doctor_id": result.doctor_id,
          "investigations_list": [
              {
                  "category": "Excel",
                  "checked": "",
                  "investigation_code": "",
                  "investigation_id":id,
                  "investigation_name": name,
                  "isClinicInvestigation": true,
                  "isSelectedCheckbox": false,
                  "patient_lab_report_id": 0
              }
          ],
          "patient_id": result.patient_id,
          "position": -1,
          "umr_no": result.umr_no,
      }
  }
  )
  }
  addinvestigations(id,name,result):Observable<any>{
    
    console.log(result.umr_no);
    return this._http.post(this.apiUrl,
      {
      "requesterid": 11,
      "requestname": "investigations_submit",
      "requestparameters": {
          "appointment_id": result.appointment_id,
          "clinic_id": result.clinic_id,
          "doctor_id": result.doctor_id,
          "investigations_list": [
              {
                  "category": "Excel",
                  "checked": "",
                  "investigation_code": "",
                  "investigation_id":id,
                  "investigation_name": name,
                  "isClinicInvestigation": true,
                  "isSelectedCheckbox": false,
                  "patient_lab_report_id": 0,
                  // "clinic_lab_package_id":clinic_lab_package_id
              }
          ],
          "patient_id": result.patient_id,
          "position": -1,
          "umr_no": result.umr_no,
      }
  }
  )
  }

  addOcrInvestigations(doctorid,appid,clinicid,cdid,inv,patienttid,umr):Observable<any>{
    
    console.log(doctorid,appid,clinicid,cdid,inv,patienttid,umr);
    return this._http.post(this.apiUrl,
      {
      "requesterid": 11,
      "requestname": "patient_ocr_investigations",
      "requestparameters": {
          "appointment_id": appid,
          "clinic_id": clinicid,
          "doctor_id": doctorid,
          "investigations_list": inv,
          "patient_id": patienttid,
          "position": -1,
          "umr_no": umr,
      }
  }
  )
  }



  get_latestDaignosis(result):Observable<any>{
    return this._http.post(this.apiUrl,{
      "requesterid": 11,
      "requestname": "getLatestCD",
      "requestparameters": {
          "appointment_id": result.appointment_id,
          "clinic_id": result.clinic_id,
          "patient_id":result.patient_id
      }
  })
  }

  getLatestComments(result):Observable<any>{
    return this._http.post(this.apiUrl,{
      "requesterid": 3,
      "requestname": "getLatestComments",
      "requestparameters": {
          "appointment_id": result.appointment_id,
          "clinic_id": result.clinic_id,
          "patient_id": result.patient_id,
          "doctor_id":result.doctor_id
      }
  })
  }

  get_plan(result):Observable<any>{
    return this._http.post(this.apiUrl,{
      "requesterid": 3,
      "requestname": "getPlan",
      "requestparameters": {
          "appointment_id": result.appointment_id
      }
  })
  }
  get_latestinv(result):Observable<any>{
    return this._http.post(this.apiUrl,
      {
        "requesterid": 11,
        "requestname": "getLatestInv",
        "requestparameters": {
            "appointment_id": result.appointment_id,
            "clinic_id": result.clinic_id,
            "patient_id": result.patient_id
        }
    }
  )
  }

  deletecd(id,result):Observable<any>{
    return this._http.post(this.apiUrl,
      {
        "requesterid": 11,
        "requestname": "patient_clinical_diagnosis",
        "requestparameters": {
          "appointment_id": result.appointment_id,
          "clinic_id": result.clinic_id,
            "clinicaldiagnosis": [
                {
                    // "clinical_diagnosis_id": "187",
                    // "code": "A312",
                    // "disease_name": "Disseminated mycobacterium avium-intracellulare complex (DMAC)",
                    // "isEnabled": false,
                    "patient_cd_line_item_id": id,
                    "type": "del"
                }
            ],
            "doctor_id": result.doctor_id,
            "patient_id": result.patient_id,
            "position": 0,
            "umr_no": result.umr_no,
        }
    })
  }
  delete_inv(id,result):Observable<any>{
    return this._http.post(this.apiUrl,
      {
        "requesterid": 11,
        "requestname": "investigations_submit",
        "requestparameters": {
          "appointment_id": result.appointment_id,
          "clinic_id": result.clinic_id,
          "doctor_id": result.doctor_id,
            "investigations_list": [
                {
                    "checked": "0",
                    "clinic_status": "0",
                    "investigation_id": 593,
                    "investigation_name": "Endomysial Antibody IgA",
                    "isClinicInvestigation": false,
                    "isSelectedCheckbox": false,
                    "patient_investigation_line_item_id":id,
                    "patient_lab_report_id": 0,
                    "type": "del"
                }
            ],
            "patient_id": result.patient_id,
            "position": 0,
            "umr_no": result.umr_no,
        }
    })
  }

  get_latestdruglist(result):Observable<any>{
    console.log(result)
    return this._http.post(this.apiUrl,{
      "requesterid": 11,
      "requestname": "get_latestPrescription",
      "requestparameters": {
          "appointment_id": result.appointment_id,
          "clinic_id": result.clinic_id,
          "patient_id": result.patient_id
      }
  })
  }
  getdrugSuggestions(result):Observable<any>{
    return this._http.post(this.apiUrl,
      {
        "requesterid": 11,
        "requestname": "getDrugSuggestions",
        "requestparameters": {
            "doctor_id":result.doctor_id,
            "clinic_id": result.clinic_id
        }
    }
  )
  }
  getInvSuggestions(result):Observable<any>{
    return this._http.post(this.apiUrl,
      {
        "requesterid": 0,
        "requestname": "getInvSuggestions",
        "requestparameters": {
        "doctor_id":result.doctor_id,
        "clinic_id":result.clinic_id
        }
      }
  )
  } 
  getCDSuggestions(result):Observable<any>{
    return this._http.post(this.apiUrl,
      {
        "requesterid": 0,
        "requestname": "getCDSuggestions",
        "requestparameters": {
        "doctor_id":result.doctor_id,
        "clinic_id":result.clinic_id
        }
        }
  )
  }
  addPrescription_check(data,result,day):Observable<any>{
    console.log(data)
    let day_schedule = data.M+","+data.A+","+data.N
    console.log(day_schedule)
    if(data.M == 'M' && data.A == 'A' && data.N == 'N')
    {this.day = data.M+","+data.A+","+data.N}
    else if(data.M == 'M' && data.N == 'N'){this.day = data.M+","+data.N}
    else if(data.A == 'A' && data.N == 'N'){this.day = data.A+","+data.N}
    else if(data.M == 'M' && data.A == 'A'){this.day = data.M+","+data.A}
    else if(data.M == 'M' ){ this.day = data.M}
    else if(data.A == 'A' ){ this.day = data.A}
    else if(data.N == 'N' ){ this.day = data.N}
    // else if (data.M =='M' && data.A ==false && data.N =='N')
    //   {this.day = data.M+","+data.N}
    
    else{} 
    console.log(this.day)
    if(data.Note === null){
      data.Note = ''
    }
    if(data.type == 'Others' || data.type == 'Drops' || data.type == 'mL' || data.type == 'Tea spoons' || data.type == 'Puffs' || data.type == 'Injection' || data.type == 'Application')
    {
      var Quantity:any = 0;
    }
    else{
     var Quantity:any  = data.Qty
    }
    return this._http.post(this.apiUrl,
      {
        "requesterid": 11,
        "requestname": "prescription_submit",
        "requestparameters": {
            "appointment_id": result.appointment_id,
            "clinic_id": result.clinic_id,
            "doctor_id": result.doctor_id,
            "patient_id": result.patient_id,
            "position": 3,
            "drug_allergy":data.allergy == 'Yes'?data.drugAllergy:'No',
            "prescription": [
                {
                    "composition": "",
                    "day_schedule":this.day,
                    "dosage_unit": data.type,
                    "dose_course": data.Duration,
                    "drug_dose": data.Qty,
                    "drug_id": data.Drug_id == undefined?'0':data.Drug_id,
                    "drug_status": "exist",
                    "medicine_name": data.drugField,
                    "mode": data.Mode,
                    "preffered_intake": data.radio,
                    "quantity":Quantity*data.Duration*(this.day.split(',')).length,
                    "remarks": data.Note,
                    
                }
            ]
        }
    }
    )
  }
  addPrescription_select(data,result):Observable<any>{
    // if(data.M == 'M' && data.A == 'A' && data.N == 'N')
    // {this.day = data.M+","+data.A+","+data.N}
    // else if(data.M == 'M' && data.N == 'N'){this.day = data.M+","+data.N}
    // else if(data.A == 'A' && data.N == 'N'){this.day = data.A+","+data.N}
    // else if(data.M == 'M' && data.A == 'A'){this.day = data.M+","+data.A}
    // else if(data.M == 'M' ){ this.day = data.M}
    // else if(data.A == 'A' ){ this.day = data.A}
    // else if(data.N == 'N' ){ this.day = data.N}
    // else{}   
    // console.log(this.day)
    // console.log(this.day.split(','))
    // console.log((this.day.split(',')).length)
    if(data.Note === null){
      data.Note = ''
    }
   if(data.type == 'Others' || data.type == 'Drops' || data.type == 'mL' || data.type == 'Tea spoons' || data.type == 'Puffs' || data.type == 'Injection' || data.type == 'Application')
   {
     var Quantity:any = 0;
   }
   else{
    var Quantity:any  = data.Qty
   }
    return this._http.post(this.apiUrl,
      {
        "requesterid": 11,
        "requestname": "prescription_submit",
        "requestparameters": {
          "appointment_id": result.appointment_id,
          "clinic_id": result.clinic_id,
          "doctor_id": result.doctor_id,
          "patient_id": result.patient_id,
          "drug_allergy":data.allergy == 'Yes'?data.drugAllergy:'No',
            "position": 3,
            "prescription": [
                {
                    "composition": "",
                    "day_schedule": "",
                    "day_dosage": data.time,
                    "dosage_frequency": data.Frequency,
                    "dosage_unit": data.type,
                    "dose_course": data.Duration,
                    "drug_dose": data.Qty,
                    "drug_id": data.Drug_id == undefined?'0':data.Drug_id,
                    "drug_status": "exist",
                    "medicine_name": data.drugField,
                    "mode": data.Mode,
                    "preffered_intake": data.radio,
                    "quantity":Quantity*data.Duration*data.time,
                    "remarks": data.Note,
                    // "drug_allergy":data.allergy == 'yes'?data.drugAllergy:'No'
                }
            ]
        }
    }
    )
  }
  editprescribe_check(data,result):Observable<any>{
    console.log(data)
    let day_schedule = data.M+","+data.A+","+data.N
    console.log(day_schedule)
    if(data.M == 'M' && data.A == 'A' && data.N == 'N')
    {this.day = data.M+","+data.A+","+data.N}
    else if(data.M == 'M' && data.N == 'N'){this.day = data.M+","+data.N}
    else if(data.A == 'A' && data.N == 'N'){this.day = data.A+","+data.N}
    else if(data.M == 'M' && data.A == 'A'){this.day = data.M+","+data.A}
    else if(data.M == 'M' ){ this.day = data.M}
    else if(data.A == 'A' ){ this.day = data.A}
    else if(data.N == 'N' ){ this.day = data.N}
    else{} 
    if(data.type == 'Others' || data.type == 'Drops' || data.type == 'mL' || data.type == 'Tea spoons' || data.type == 'Puffs' || data.type == 'Injection' || data.type == 'Application')
    {
      var Quantity:any = 0;
    }
    else{
     var Quantity:any  = data.Qty
    }
    return this._http.post(this.apiUrl,
      {
        "requesterid": 11,
        "requestname": "prescription_submit",
        "requestparameters": {
            "appointment_id": result.appointment_id,
            "clinic_id": result.clinic_id,
            "doctor_id": result.doctor_id,
            "patient_id": result.patient_id,
            "position": 0,
            "drug_allergy":"",
            "prescription": [
                {
                    "day_schedule": this.day,
                    "dosage_unit": data.type,
                    "dose_course": data.Duration,
                    "drug_dose": data.Qty,
                    "drug_id": data.Drug_id,
                    "drug_status": "not_exist",
                    "medicine_name": data.drugname,
                    "mode": data.Mode,
                    "patient_prescription_drug_id": data.p_drug_id,
                    "patient_prescription_id": data.p_p_id,
                    "preffered_intake": data.radio,
                    "quantity": Quantity*data.Duration*(this.day.split(',')).length,
                    "remarks": data.Note,
                    "type": "edit"
                }
            ]
        }
    })
  }
  editprescribe_select(data,result):Observable<any>{
    console.log(data)
    if(data.type == 'Others' || data.type == 'Drops' || data.type == 'mL' || data.type == 'Tea spoons' || data.type == 'Puffs' || data.type == 'Injection' || data.type == 'Application')
    {
      var Quantity:any = 0;
    }
    else{
     var Quantity:any  = data.Qty
    }
    return this._http.post(this.apiUrl,
      {
        "requesterid": 11,
        "requestname": "prescription_submit",
        "requestparameters": {
          "appointment_id": result.appointment_id,
          "clinic_id": result.clinic_id,
          "doctor_id": result.doctor_id,
          "patient_id": result.patient_id,
            "position": 0,
            "drug_allergy":"",
            "prescription": [
                {
                  "day_schedule": "",
                  "day_dosage": data.time,
                  "dosage_frequency": data.Frequency,
                  "dosage_unit": data.type,
                  "dose_course": data.Duration,
                  "drug_dose": data.Qty,
                  "drug_id": data.drug_id,
                  "drug_status": "not_exist",
                  "medicine_name": data.drugname,
                  "mode": data.Mode,
                  "patient_prescription_drug_id": data.p_drug_id,
                  "patient_prescription_id": data.p_p_id,
                  "preffered_intake": data.radio,
                  "quantity": Quantity*data.Duration*data.time,
                  "remarks": data.Note,
                  "type": "edit"
              }
            ]
        }
    })
  }
  DeletePrescription(id):Observable<any>{
    return this._http.post(this.apiUrl,
    {"requesterid":11,"requestname":"delete_drug","requestparameters":{"patient_prescription_drug_id":id}}
    )
  }
  saveTemp(data,array,result):Observable<any>{
    return this._http.post(this.apiUrl,{
      "requesterid": 11,
      "requestname": "prescription_saveas_template",
      "requestparameters": {
          "appointment_id": result.appointment_id,
          "clinic_id": result.clinic_id,
          "doctor_id": result.doctor_id,
          "patient_id": result.patient_id,
          "position": 0,
          "prescription":array,
          "prescription_template_name": data.tempname
      }
  }
    
    )
  }

  saveTempp(data,array,result):Observable<any>{
    return this._http.post(this.apiUrl,{
      "requesterid": 11,
      "requestname": "prescription_saveas_templatee",
      "requestparameters": {
          "appointment_id": result.appointment_id,
          "clinic_id": result.clinic_id,
          "doctor_id": result.doctor_id,
          "patient_id": result.patient_id,
          "position": 0,
          "prescription":array,
          "prescription_template_name": data.tempname
      }
  }
    
    )
  }
  saveinvtemp(data,array,result):Observable<any>{
    console.log(array)
    return this._http.post(this.apiUrl,
      {
        "requesterid": 4,
        "requestname": "investigation_saveas_template",
        "requestparameters": {
            "clinic_id": result.clinic_id,
            "doctor_id": result.doctor_id,
            "investgating_ids": array,
            "investigation_template_name": data.tempname
        }
    }
    )
  }

  saveinvtempp(data,array,result):Observable<any>{
    console.log(array)
    return this._http.post(this.apiUrl,
      {
        "requesterid": 4,
        "requestname": "investigation_saveas_templatee",
        "requestparameters": {
            "clinic_id": result.clinic_id,
            "doctor_id": result.doctor_id,
            "investgating_ids": array,
            "investigation_template_name": data.tempname
        }
    }
    )
  }
  getInvTempList(result):Observable<any>{
    return this._http.post(this.apiUrl,
      {
        "requesterid": 4,
        "requestname": "get_investigation_template",
        "requestparameters": {
            "clinic_id": result.clinic_id,
            "doctor_id":result.doctor_id
        }
    }
    )}
  getTempList(result):Observable<any>{
    return this._http.post(this.apiUrl,
      {
        "requesterid": 11,
        "requestname": "get_prescription_template",
        "requestparameters": {
            "clinic_id": result.clinic_id,
            "doctor_id": result.doctor_id
        }
    }
    )}
    delTemp(id):Observable<any>{
      return this._http.post(this.apiUrl,
        {
          "requesterid": 11,
          "requestname": "prescription_template_delete",
          "requestparameters": {
              "prescription_template_id": id,
              "type": "del"
          }
      }
      )}
      delinvTemp(id):Observable<any>{
        return this._http.post(this.apiUrl,
          {
            "requesterid": 4,
            "requestname": "investigation_template_delete",
            "requestparameters": {
                "investigation_template_id": id,
                "type": "del"
            }
        }
        )}
      EditTemp(data):Observable<any>{
        return this._http.post(this.apiUrl,
          {
            "requesterid": 11,
            "requestname": "prescription_template_delete",
            "requestparameters": {
                "prescription_template_name": data.tempname,
                "prescription_template_id":data.temp_id,
                "type": "edit"
            }
        
        })
        }
        EditInvTemp(data):Observable<any>{
          return this._http.post(this.apiUrl,
            {
              "requesterid": 4,
              "requestname": "investigation_template_delete",
              "requestparameters": {
                  "investigation_template_name": data.tempinvname,
                  "investigation_template_id": data.tempinv_id,
                  "type": "edit"
              }
          }
          )
          }
          AddTempinv(array,result):Observable<any>{
            console.log(array);
            return this._http.post(this.apiUrl,
              {
                "requesterid": 11,
                "requestname": "investigations_submit",
                "requestparameters": {
                    "appointment_id": result.appointment_id,
                    "clinic_id": result.clinic_id,
                    "doctor_id": result.doctor_id,
                    "investigations_list":array,
                    "patient_id": result.patient_id,
                    "position": -1,
                    "umr_no": result.umr_no,
                }
            }
            
            )
            }
      AddTemp(array,result):Observable<any>{
        console.log(array)
        return this._http.post(this.apiUrl,
          {
            "requesterid": 11,
            "requestname": "prescription_submit",
            "requestparameters": {
              "appointment_id": result.appointment_id,
              "clinic_id": result.clinic_id,
              "doctor_id": result.doctor_id,
              "patient_id": result.patient_id,
              "position": 0,
                "prescription": array
            }
        })
        }
        Gitempsave(data,gi,result):Observable<any>{
          return this._http.post(this.apiUrl,
            {
              "requesterid": result.doctor_id,
              "requestname": "gen_instructions_templates_save",
              "requestparameters": {
                "clinic_id": result.clinic_id,
                "doctor_id": result.doctor_id,
                "followup": "",
                "gen_instructions": gi,
                "plan": "",
                "template_name": data.tempname,
              }
            }
          )
          }
          GetgitempList(result):Observable<any>{
            return this._http.post(this.apiUrl,
              {
                "requesterid": 8,
                "requestname": "gen_instructions_templates_list",
                "requestparameters": {
                  "clinic_id": result.clinic_id,
                  "doctor_id": result.doctor_id
                }
              }
            )
            }
        getfolllowupplan(result,data): Observable<any>{
        
          return this._http.post(this.apiUrl,
            {
              "requesterid": 67,
              "requestname": "followup_plan",
              "requestparameters": {
                  "appointment_id": result.appointment_id,
                  "clinic_id": result.clinic_id,
                  "doctor_id": result.doctor_id,
                  "patient_id": result.patient_id,
                  "plan": data.Planfeild,
                  "position": 0
              }
          })
        }

        addComment(result,data): Observable<any>{
        
          return this._http.post(this.apiUrl,
            {
              "requesterid": 67,
              "requestname": "patient_addcomment",
              "requestparameters": {
                  "appointment_id": result.appointment_id,
                  "clinic_id": result.clinic_id,
                  "doctor_id": result.doctor_id,
                  "patient_id": result.patient_id,
                  "comments": data.commentData
              }
          })
        }

        getfolllowupgi(result,res): Observable<any>{
        
          return this._http.post(this.apiUrl,
            {
              "requesterid": 67,
              "requestname": "followup_instructions",
              "requestparameters": {
                  "appointment_id": result.appointment_id,
                  "clinic_id": result.clinic_id,
                  "doctor_id": result.doctor_id,
                  "instructions":res.gifeild,
                  "patient_id": result.patient_id,
                  "position": 0
              }
          })
        }
        getfolllowupfd(result,data): Observable<any>{
        
          return this._http.post(this.apiUrl,
            {
              "requesterid": 67,
              "requestname": "followup_date",
              "requestparameters": {
                  "appointment_id": result.appointment_id,
                  "clinic_id": result.clinic_id,
                  "days": data.followupdate,
                  "doctor_id": result.doctor_id,
                  "patient_id": result.patient_id,
                  "position": 0
              }
          })
        }
        DsSubmit(result,data): Observable<any>{
          return this._http.post(this.apiUrl,
            {
              "requesterid": 67,
              "requestname": "submit_discharge_summary",
              "requestparameters": {
                  "appointment_id": result.appointment_id,
                  "course_in_hospital": data.ds
              }
          })
        }
        addnote(data,result): Observable<any>{
          // let url ="https://clinic.umdaa.co/WebApi/Notes/save_notes"
          let url= environment.Url + '/' + 'Notes/save_notes'
          let fd = new FormData();
          fd.append("patient_id",result.patient_id)
          fd.append("appointment_id",result.appointment_id)
          fd.append("clinic_id",result.clinic_id)
          fd.append("doctor_id",result.doctor_id)
          fd.append("umr_no",result.umr_no)
          fd.append("note_details",data.notefeild)
          return this._http.post(url,fd)
        }
        addnotesug(data,result): Observable<any>{
          // let url ="https://clinic.umdaa.co/WebApi/Notes/save_notes"
          let url= environment.Url + '/' + 'Notes/save_notes'
          let fd = new FormData();
          fd.append("patient_id",result.patient_id)
          fd.append("appointment_id",result.appointment_id)
          fd.append("clinic_id",result.clinic_id)
          fd.append("doctor_id",result.doctor_id)
          fd.append("umr_no",result.umr_no)
          fd.append("note_details",data)
          return this._http.post(url,fd)
        }
        delNote(id): Observable<any>{
          // let url ="https://clinic.umdaa.co/WebApi/Notes/deleteNotes"
          let url= environment.Url + '/' + 'Notes/deleteNotes'
          let fd = new FormData();
          fd.append("patient_notes_line_item_id",id)
          return this._http.post(url,fd)
        }
        getnlist(result):Observable<any>{
          // let url = "https://clinic.umdaa.co/WebApi/Notes/get_notes/"
          let url= environment.Url + '/' + 'Notes/get_notes/'
          let _url = url + result.appointment_id
        return this._http.get(_url)
        }
        getsugList(result):Observable<any>{
          // let url = "https://clinic.umdaa.co/WebApi/Notes/getSuggestions/"
          let url= environment.Url + '/' + 'Notes/getSuggestions/'
          let _url = url + result.appointment_id
        return this._http.get(_url)
        }
}