import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeService {

  public baseurl:string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getSeMainData(data):Observable<any>
  {
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "get_systemic_examination_main_data",
      requestparameters:{
        "appointment_id":data,
        "form_type":"Systemic Examination"
      }
      }));
  }

  getSeInnerHeading(data):Observable<any>
  {
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "get_systemic_examination_inner_heading",
      requestparameters:{
        "form_id":data,
      }
      }));
  }

  getInnerSubHeadings(form_id,section_id):Observable<any>
  {
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "get_systemic_examination_inner_sub_heading",
      requestparameters:{
        "form_id":form_id,
        "section_id":section_id,
      }
    }));
  }

  getSeDependencies(field_id,option_id,section_id):Observable<any>
  {
   console.log(option_id,field_id,section_id);
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "get_systemic_examination_dependencies",
      requestparameters:{
        "field_id":field_id,
        "option_id":option_id,
        "section_id":section_id,    
      }
    }));
  }

  dataMining(b,c):Observable<any>
  {
    console.log(b,c);
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "get_systemic_examination_inner_sub_heading",
      requestparameters:{
        "form_id":c,
        "section_id":b,    
      }
    }));
  }

  // dataDependencies(data):Observable<any>
  // {
  //   // console.log(data);
  //   return this.http.post(this.baseurl,JSON.stringify({
  //     "requesterid":11,
  //     "requestname": "get_systemic_examination_main_data",
  //     requestparameters:{
  //       "patient_id":data,
  //     }
  //     }));
  // }

  // dataDependencie(data):Observable<any>
  // {
  //   console.log(data);
  //   return this.http.post(this.baseurl,JSON.stringify({
  //     "requesterid":11,
  //     "requestname": "custom_form_recursive_systemicc",
  //     requestparameters:{
  //       "form_id":data,
  //       "form_type":"Systemic Examination"
  //     }
  //     }));
  // }

  dataDependencie(a,b):Observable<any>
  {
    // console.log(data);
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "custom_form_recursive_system",
      requestparameters:{
        "form_id":a,
        "section_id":b,
        "form_type":"Systemic Examination"
      }
      }));
  }


  dataDependencies(data,form_type):Observable<any>
  {
    // console.log(data);
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "completese",
      requestparameters:{
        "appointment_id":data,
        "form_type":form_type
      }
      }));
  }

  dataDependenciess(data):Observable<any>
  {
    // console.log(data);
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "get_systemic_examination_inner_heading",
      requestparameters:{
        "form_id":data,
      }
      }));
  }

  dataDependenciesss(a,b):Observable<any>
  {
    // console.log(data);
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "get_systemic_examination_inner_sub_headingg",
      requestparameters:{
        "form_id":b,
        "section_id":a,
      }
      }));
  }

  dataDependenciessss(removeformId,f_type,r_number,pft,a,b,c):Observable<any>
  {
    console.log(removeformId,f_type,r_number,pft,a,b,c);
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "get_systemic_examination_dependencies",
      requestparameters:{
        "form_id":removeformId,
        "f_type":f_type,
        "r_number":r_number,
        "section_id":a,
        "field_id":b,
        "option_id":c,
        "type":pft
      }
      }));
  }
  
  saveData(a_id,removeformId,a,b,c):Observable<any>
  {
  let fd =new FormData();
    let value = JSON.stringify(
      {
        "appointment_id": a_id,
        "form_id":removeformId,
        "form_type":"Systemic Examination",
        "requestname": "save_custom_forms",
        "labels":a,
        "main_section":b,
        "form_image":c
    }
    );
    fd.append("requestpara",value);
    return this.http.post(this.baseurl,fd)
  }

  getList(app_id):Observable<any>
  {
    console.log(app_id);
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "getSavedRecursiveForms_web",
      requestparameters:{
        "app_id":0,
        "appointment_id":app_id,
        "form_type":'Systemic Examination',
      }
      }));
  }

  getPdfData(f_id,pf_id,f_type,d_id,p_id):Observable<any>
  {
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "getSavedRecursiveForm_pdf",
      requestparameters:{
        "app_id":0,
        "appointment_id":0,
        "doctor_id":d_id,
        "form_id":f_id,
        "form_type":f_type,
        "patient_form_id":pf_id,
        "patient_id":p_id
      }
      }));
  }

  deletePdf(f_id,pf_id,f_type,d_id,p_id):Observable<any>
  {
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "deletePatienForm",
      requestparameters:{
        "app_id":0,
        "appointment_id":0,
        "doctor_id":d_id,
        "form_id":f_id,
        "form_type":f_type,
        "patient_form_id":pf_id,
        "patient_id":p_id
      }
      }));
  }


}
