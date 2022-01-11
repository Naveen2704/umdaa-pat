import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class ProceduresService {
  public baseurl = environment.baseUrl;

  constructor(private http:HttpClient) { }

  
  getProceduresList(result):Observable<any>{
    console.log(result.appointment_id)
  //  let wikiUrl = ' http://devumdaa.in/dev/WebApi/Procedures/proceduresList/';
    // let wikiUrl = 'https://clinic.umdaa.co/WebApi/Procedures/proceduresList/';
    let wikiUrl  = environment.Url +'/'+ 'Procedures/proceduresList/'
    let url = wikiUrl + result.appointment_id
    return this.http.get(url)
  }
  getHtmlview(result,id):Observable<any>{
    return this.http.post(this.baseurl,
      {
        "requesterid": result.doctor_id,
        "requestname": "patient_procedure_edit",
        "requestparameters": {
            "appointment_id": result.appointment_id,
            "clinic_id": result.clinic_id,
            "doctor_id":result.doctor_id,
            "medical_procedure_id": id,
            "patient_id": result.patient_id
        }
    }
    )
  }
 
  searchprocedure(query:string,result):Observable<any> {
  //  let wikiUrl = 'http://devumdaa.in/dev/WebApi/Procedures/';
    // let wikiUrl = 'https://clinic.umdaa.co/WebApi/Procedures/';
    let wikiUrl  = environment.Url +'/'+ 'Procedures/'
    let params = new URLSearchParams();
    params.set('search', query); // the user's search value
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');
    let _URL = wikiUrl +result.doctor_id+'/'+query;
    return this.http.get(_URL)
         
  }

addprocedure(data,result):Observable<any> {
  console.log(data)
  //  let wikiUrl = 'http://devumdaa.in/dev/WebApi/Procedures/AddProcedure';
    // let wikiUrl = 'https://clinic.umdaa.co/WebApi/Procedures/AddProcedure';
    let wikiUrl  = environment.Url +'/'+ 'Procedures/AddProcedure'
    let fd = new FormData();
    fd.append('appointment_id',result.appointment_id)
    fd.append('procedure_id',data.procedure_id)
    return this.http.post(wikiUrl,fd)
         
  }

  saveProcedure(data,id,result):Observable<any>{
    console.log(id)
    // let wikiUrl ="http://devumdaa.in/dev/WebApi/Procedures/updateProcedure";
    // let wikiUrl = 'https://clinic.umdaa.co/WebApi/Procedures/updateProcedure';
    // let fd = new FormData();
    // fd.append('surgeon',data.Performingdr)
    // fd.append('anesthetist',data.Anaesthetist)
    // fd.append('assisting_surgeon',data.Assistingdr)
    // fd.append('type_of_anesthesia',data.typeofanesthesia)
    // fd.append('assisting_nurse',data.Assistingnurse)
    // fd.append('preoperative',data.Preoperative)
    // fd.append('postoperative_diagnosis',data.Postoperative)
    // fd.append('indication',data.Indication)
    // fd.append('position',data.Position)
    // fd.append('patient_procedure_id',id)
    return this.http.post(this.baseurl,
      {
        "requesterid": 5,
        "requestname": "patient_procedure",
        "requestparameters": {
            "anesthetist": data.Anaesthetist,
            "appointment_id": result.appointment_id,
            "assisting_nurse": data.Assistingnurse,
            "assisting_surgeon": data.Assistingdr,
            "doctor_id": result.doctor_id,
            "indication":data.Indication,
            "medical_procedure_id": id,
            "patient_id": result.patient_id,
            "position": data.Position,
            "postoperative_diagnosis": data.Postoperative,
            "preoperative_diagnosis": data.Preoperative,
            "surgeon": data.Performingdr,
            "type_of_anesthesia": data.typeofanesthesia
        }
    })
  }
  saveforpatient(desc,result,m_id):Observable<any>{
    console.log(desc,result,m_id)
    return this.http.post(this.baseurl,
      {
        "requesterid": 2445,
        "requestname": "patient_procedure_save",
        "requestparameters": {
          "appointment_id": result.appointment_id,
          "clinic_id": result.clinic_id,
          "doctor_id": result.doctor_id,
          "medical_procedure_id": m_id,
          "patient_id": result.patient_id,
          "type": "Save For This Patient",
          "description": desc
        }
      }
      )
  }
  saveastemplate(desc,result,m_id):Observable<any>{
    console.log(desc,result,m_id)
    return this.http.post(this.baseurl,
      {
        "requesterid": 2445,
        "requestname": "patient_procedure_save",
        "requestparameters": {
          "appointment_id": result.appointment_id,
          "clinic_id": result.clinic_id,
          "doctor_id": result.doctor_id,
          "medical_procedure_id": m_id,
          "patient_id": result.patient_id,
          "type": "Save As Template",
          "description": desc
        }
      }
      )
  }
getDyanamicformslist():Observable<any> {
  // let wikiUrl = 'http://devumdaa.in/dev/WebApi/Forms/formlist';
  // let wikiUrl = 'https://clinic.umdaa.co/WebApi/Forms/formlist';
  let wikiUrl  = environment.Url +'/'+ 'Forms/formlist'
  
  return this.http.get(wikiUrl)
}


getFormssearch(term: string,id):Observable<any> {
//  let wikiUrl = 'http://devumdaa.in/dev/WebApi/Forms/formlist_details/';
  // let wikiUrl = 'https://clinic.umdaa.co/WebApi/Forms/formlist_details/';
  let wikiUrl  = environment.Url +'/'+ 'Forms/formlist_details/'
  let params = new URLSearchParams();
  params.set('search', term); // the user's search value
  params.set('action', 'opensearch');
  params.set('format', 'json');
  params.set('callback', 'JSONP_CALLBACK');
 let _URL = wikiUrl+id+'/'+term;
  return this.http.get(_URL)
}

savePatientform(data,result):Observable<any> {
//  let wikiUrl = 'http://devumdaa.in/dev/WebApi/Forms/patient_form_save';
  // let wikiUrl = 'https://clinic.umdaa.co/WebApi/Forms/patient_form_save';
  let wikiUrl  = environment.Url +'/'+ 'Forms/patient_form_save'
  let fd = new FormData();
  fd.append('patient_id',result.patient_id)
  fd.append('clinic_id',result.clinic_id)
  fd.append('appointment_id',result.appointment_id)
  fd.append('doctor_id',result.doctor_id)
  fd.append('form_list_id',data.mform_id_type)
  fd.append('form_list_line_item_id',data.mform_id)
  fd.append('name',data.queryField)
  return this.http.post(wikiUrl,fd)
}
cformPrint(result,id):Observable<any>{
  return this.http.post(this.baseurl,
    {"requesterid":24,"requestname":"consent_form_pdf","requestparameters":
    {"web_patient_consent_form_id":id,"appointment_id":result.appointment_id,"patient_id":result.patient_id,"clinic_id":result.clinic_id,"doctor_id":result.doctor_id}
  
  }
  )
}

getFormList(result):Observable<any> {
  console.log(result)
  // let wikiUrl = 'http://devumdaa.in/dev/WebApi/Forms/getFormList/'
  //  let wikiUrl = 'https://clinic.umdaa.co/WebApi/Forms/getFormList/';
   let wikiUrl  = environment.Url +'/'+ 'Forms/getFormList/'

   let _URL = wikiUrl+result.appointment_id
   return this.http.get(_URL)
}
getDescription(id):Observable<any> {
  // let wikiUrl = 'http://devumdaa.in/dev/WebApi/Forms/getDescription/';
  // let wikiUrl = 'https://clinic.umdaa.co/WebApi/Forms/getDescription/';
  let wikiUrl  = environment.Url +'/'+ 'Forms/getDescription/'

  let _URL = wikiUrl+id
  return this.http.get(_URL)
}
EditDescription(id,desc):Observable<any> {
  console.log(desc)
//  let wikiUrl = 'http://devumdaa.in/dev/WebApi/Forms/editForm/';
  // let wikiUrl = 'https://clinic.umdaa.co/WebApi/Forms/editForm/';
  let wikiUrl  = environment.Url +'/'+ 'Forms/editForm/'
  let fd = new FormData();
  fd.append('id',id)
  fd.append('description',desc)
  return this.http.post(wikiUrl,fd)
}
savemoreTemp(id,desc,result,name):Observable<any> {
  console.log(id,desc,result,name)
  //  let wikiUrl = 'http://devumdaa.in/dev/WebApi/Forms/patient_form_save';
    // let wikiUrl = 'https://clinic.umdaa.co/WebApi/Forms/doctor_saveastemplate/';
    let wikiUrl  = environment.Url +'/'+ 'Forms/doctor_saveastemplate/'
    let fd = new FormData();

    fd.append('clinic_id',result.clinic_id)
    fd.append('doctor_id',result.doctor_id)
    fd.append('form_list_line_item_id',id)
    fd.append('name',name)
    fd.append('description',desc)
    return this.http.post(wikiUrl,fd)
  }

getCformsSearch(term,result):Observable<any> {
  // let wikiUrl = 'http://devumdaa.in/dev/WebApi/consentForm/searchForm/';
  // let wikiUrl = 'https://clinic.umdaa.co/WebApi/consentForm/searchForm/';
  let wikiUrl  = environment.Url +'/'+ 'consentForm/searchForm/';
  let _URL = wikiUrl+result.department+'/'+ term;
  console.log(_URL);
  return this.http.get(_URL);
}

addchecklist(data,result):Observable<any>
{
  console.log(data.c_id)
  return this.http.post(this.baseurl,
      {
      "requesterid":51,
      "requestname": "patient_consent_form_add",
      requestparameters:{
        "appointment_id":result.appointment_id,
        "department_id":result.department,
        "clinic_id":result.clinic_id,
        "consent_form_id":data.cl_id,
        "doctor_id":result.doctor_id,
        "patient_id":result.patient_id
      }
    }
    );
}

chekeddata(id):Observable<any>
{
  console.log(id)
  return this.http.post(this.baseurl,
    {
      "requesterid":51,
      "requestname": "get_consentform_details",
      requestparameters:
      {
       
        "patient_consent_form_id":id,
        
      }
      }
    );
}
printMore(id,result):Observable<any>
{
  console.log(id,result)
  return this.http.post(this.baseurl,
    {
      "requesterid": 24,
      "requestname": "more_forms_pdf",
      "requestparameters": {
        "id": id,
        "appointment_id": result.appointment_id,
        "patient_id": result.patient_id,
        "clinic_id": result.clinic_id,
        "doctor_id": result.doctor_id
      }
    }
    );
}


getCaddedList(data,result):Observable<any>
{
  console.log(data.c_id)
  // let wikiUrl = 'http://devumdaa.in/dev/WebApi/ConsentForm/add_consent_form/'
  // let wikiUrl = 'https://clinic.umdaa.co/WebApi/ConsentForm/add_consent_form/'
  let wikiUrl  = environment.Url +'/'+ 'ConsentForm/add_consent_form/'
  let fd = new FormData();
  fd.append('appointment_id',result.appointment_id)
  fd.append('consent_form_id',data.c_id)
  return this.http.post(wikiUrl,fd);
}
getCheckList(result):Observable<any>
{
  return this.http.post(this.baseurl,{
    "requesterid":51,
    "requestname": "patient_consent_form_list",
    requestparameters:{
      "appointment_id":result.appointment_id,
    }
    });
}
getList(result):Observable<any>
{
  // let url = 'http://devumdaa.in/dev/WebApi/ConsentForm/consentform_List/'
  // let url = 'https://clinic.umdaa.co/WebApi/ConsentForm/consentform_List/'
  let url  = environment.Url +'/'+ 'ConsentForm/consentform_List/'
  let _URL = url + result.appointment_id
  return this.http.get(_URL);
}
getDesc(result,c_id):Observable<any>
{
  console.log(result)
  // let url = 'http://devumdaa.in/dev/WebApi/ConsentForm/consentform_getDescriptionData/'
  // let url = 'https://clinic.umdaa.co/WebApi/ConsentForm/consentform_getDescriptionData/';
  let url  = environment.Url +'/'+ 'ConsentForm/consentform_getDescriptionData/'
  let _URL = url + result.appointment_id + '/' + c_id
  return this.http.get(_URL);
}
addConDesc(result,id,title,desc):Observable<any>
{
  console.log(result,id,title,desc)
  // let wikiUrl = 'http://devumdaa.in/dev/WebApi/ConsentForm/consentform_saveforpatient/';
  let wikiUrl  = environment.Url +'/'+ 'ConsentForm/consentform_saveforpatient/'
  let fd = new FormData();
  fd.append('appointment_id',result.appointment_id)
  fd.append('patient_id',result.patient_id)
  fd.append('doctor_id',result.doctor_id)
  fd.append('clinic_id',result.clinic_id)
  fd.append('consent_form_id',id)
  fd.append('consent_form_title',title)
  fd.append('patient_consent_form_description',desc)
  return this.http.post(wikiUrl,fd);
}
saveastempDesc(result,id,title,desc):Observable<any>
{
  console.log(result,id,title,desc)
  // let wikiUrl = 'http://devumdaa.in/dev/WebApi/ConsentForm/consentform_saveastemplate/';
  let wikiUrl  = environment.Url +'/'+ 'ConsentForm/consentform_saveastemplate/'
  let fd = new FormData();
  fd.append('appointment_id',result.appointment_id)
  fd.append('patient_id',result.patient_id)
  fd.append('doctor_id',result.doctor_id)
  fd.append('clinic_id',result.clinic_id)
  fd.append('consent_form_id',id)
  fd.append('consent_form_title',title)
  fd.append('doctor_consent_form_description',desc)
  return this.http.post(wikiUrl,fd);
}
getcmaster(result): Observable<any>{
  return this.http.post(this.baseurl,
    {"requesterid":1,"requestname":"checkListMaster","requestparameters":{ "department_id":result.department}}
    
    );
}
getBeforeDescription(id):Observable<any>
{
  console.log(id);
  return this.http.post(this.baseurl,
    {
    "requesterid":51,
    "requestname": "get_patient_consent_check_list",
    requestparameters:{
      "patient_consent_form_id":id,
      "patient_consent_form_category":"before",
      "patient_consent_form_min":0,
      "patient_consent_form_max":0,
    }
    }
    )
}

getAfterDescription(id):Observable<any>
{
  console.log(id);
  return this.http.post(this.baseurl,{
    "requesterid":15,
    "requestname": "get_patient_consent_check_list",
    requestparameters:{
      "patient_consent_form_id":id,
      "patient_consent_form_category":"after",
      "patient_consent_form_min":0,
      "patient_consent_form_max":0,
    }
    })
}

getDuringDescription(id):Observable<any>
{
  return this.http.post(this.baseurl,
    
    {
    "requesterid":51,
    "requestname": "get_patient_consent_check_list",
    requestparameters:{
      "patient_consent_form_id":id,
      "patient_consent_form_category":"during",
      "patient_consent_form_min":0,
      "patient_consent_form_max":0,
    }
    }
    )
  
}

checklistadd(data,result,c_id):Observable<any>
{
  console.log(data);
  return this.http.post(this.baseurl,
    
    {
    "requesterid":51,
    "requestname": "patient_checklist_update",
    requestparameters:
    {
      "anesthetist":data.anesthetist,
      "appointment_id":result.appointment_id,
      "assisted_by":data.assisted_by,
      "checked_by":data.checked_by,
      "done_by":data.done_by,
      "doctor_id":result.doctor_id,
      "nurse":data.nurse,
      "patient_consent_form_id":c_id,
      "consent_check_list":data.consent_check_list,
      "umr_no":data.UHID
    }
    }
    )
    
}
}
