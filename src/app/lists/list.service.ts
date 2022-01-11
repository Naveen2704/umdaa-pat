import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  public baseurl:string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  saveSuggestions(data,form_type,id):Observable<any>
  {
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "saveSuggestions",
      requestparameters:{
        "appointment_id":id,
        "form_type":form_type,
        "suggestion_name":data.firstName
      }
      }));
  }

  saveSuggestionss(data,form_type,id):Observable<any>
  {
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "saveSuggestions",
      requestparameters:{
        "appointment_id":id,
        "form_type":form_type,
        "suggestion_name":data.seName
      }
      }));
  }

  getClinicDoctorInfo(id):Observable<any>
  {
    // let url = 'https://devumdaa.in/dev/WebApi/Ipd/getClinicDepartments/'+id;
    let url = environment.ipdUrl+'getClinicDepartments/'+id;
    return this.http.get(url);
  }

  saveSuggestionsss(data,form_type,id):Observable<any>
  {
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "saveSuggestions",
      requestparameters:{
        "appointment_id":id,
        "form_type":form_type,
        "suggestion_name":data.osName
      }
      }));
  }

  savePastSuggestions(data,form_type,id):Observable<any>
  {
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "saveSuggestions",
      requestparameters:{
        "appointment_id":id,
        "form_type":form_type,
        "suggestion_name":data.pastName
      }
      }));
  }

  saveSocialSuggestions(data,form_type,id):Observable<any>
  {
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "saveSuggestions",
      requestparameters:{
        "appointment_id":id,
        "form_type":form_type,
        "suggestion_name":data.socialName
      }
      }));
  }

  savePersonalSuggestions(data,form_type,id):Observable<any>
  {
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "saveSuggestions",
      requestparameters:{
        "appointment_id":id,
        "form_type":form_type,
        "suggestion_name":data.personalName
      }
      }));
  }

  saveTreatmentSuggestions(data,form_type,id):Observable<any>
  {
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "saveSuggestions",
      requestparameters:{
        "appointment_id":id,
        "form_type":form_type,
        "suggestion_name":data.treatmentName
      }
      }));
  }

  saveFamilySuggestions(data,form_type,id):Observable<any>
  {
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "saveSuggestions",
      requestparameters:{
        "appointment_id":id,
        "form_type":form_type,
        "suggestion_name":data.familyName
      }
      }));
  }



  getSuggestions(id,form_type):Observable<any>
  {
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "getSuggestionsList",
      requestparameters:{
        "appointment_id":id,
        "form_type":form_type
      }
      }));
  }

  getAllSuggestionsList(id,form_type):Observable<any>
  {
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "getAllSuggestions",
      requestparameters:{
        "appointment_id":id,
        "form_type":form_type
      }
      }));
  }

  deleteSuggestions(id,form_type):Observable<any>
  {
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "deleteSuggestions",
      requestparameters:{
        "id":id,
        "form_type":form_type
      }
      }));
  }

  updateSuggestions(data):Observable<any>
  {
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "editSuggestions",
      requestparameters:{
        "id":data.id,
        "suggestion_name":data.Search
      }
      }));
  }

  subjective(data):Observable<any>
  {
    console.log(localStorage.getItem('doctor_id'));
    var doctor_id= localStorage.getItem('doctor_id');
    var patient_id = localStorage.getItem('patient_id');
    var appointment_id = localStorage.getItem('appointment_id');
    console.log(doctor_id);
    // var currentDate = new Date();
    // currentDate.toLocaleDateString('en-US'); 
    // console.log(currentDate.toLocaleDateString('en-US'));
    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
  }
   
    // let url = 'https://devumdaa.in/dev/WebApi/Ipd/rounds_subjective'
    // let url = 'https://devumdaa.in/dev/WebApi/Ipd/rounds_subjective'
    let url = environment.ipdUrl + 'rounds_subjective/';
    console.log(url);
    let fd = new FormData();
    fd.append('appointment_id',appointment_id)
    fd.append('patient_id',patient_id)
    fd.append('doctor_id',doctor_id)
    fd.append('date',formatDate(new Date()))
    fd.append('subjective',data.subjective)
    fd.append('objective',data.objective)
    fd.append('analysis',data.analysis)
    fd.append('plan',data.plan)

    return this.http.post(url,fd);
  }

  objective(data):Observable<any>
  {
    console.log(localStorage.getItem('doctor_id'));
    var doctor_id= localStorage.getItem('doctor_id');
    var patient_id = localStorage.getItem('patient_id');
    var appointment_id = localStorage.getItem('appointment_id');
    console.log(doctor_id);
    // var currentDate = new Date();
    // currentDate.toLocaleDateString('en-US'); 
    // console.log(currentDate.toLocaleDateString('en-US'));
    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
  }
   
    // let url = 'https://devumdaa.in/dev/WebApi/Ipd/rounds_objective'
    let url = environment.ipdUrl+'rounds_objective';
    let fd = new FormData();
    fd.append('appointment_id',appointment_id)
    fd.append('patient_id',patient_id)
    fd.append('doctor_id',doctor_id)
    fd.append('date',formatDate(new Date()))
    fd.append('objective',data.objective)

    return this.http.post(url,fd);
  }

  analysis(data):Observable<any>
  {
    console.log(localStorage.getItem('doctor_id'));
    var doctor_id= localStorage.getItem('doctor_id');
    var patient_id = localStorage.getItem('patient_id');
    var appointment_id = localStorage.getItem('appointment_id');
    console.log(doctor_id);
    // var currentDate = new Date();
    // currentDate.toLocaleDateString('en-US'); 
    // console.log(currentDate.toLocaleDateString('en-US'));
    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
  }
   
    // let url = 'https://devumdaa.in/dev/WebApi/Ipd/rounds_analysis'
    let url = environment.ipdUrl+'rounds_analysis';
    let fd = new FormData();
    fd.append('appointment_id',appointment_id)
    fd.append('patient_id',patient_id)
    fd.append('doctor_id',doctor_id)
    fd.append('date',formatDate(new Date()))
    fd.append('analysis',data.analysis)

    return this.http.post(url,fd);
  }

  plan(data):Observable<any>
  {
    console.log(data);
    console.log(data.plan);
    console.log(localStorage.getItem('doctor_id'));
    var doctor_id= localStorage.getItem('doctor_id');
    var patient_id = localStorage.getItem('patient_id');
    var appointment_id = localStorage.getItem('appointment_id');
    console.log(doctor_id);
    // var currentDate = new Date();
    // currentDate.toLocaleDateString('en-US'); 
    // console.log(currentDate.toLocaleDateString('en-US'));
    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
  }
   
    // let url = 'https://devumdaa.in/dev/WebApi/Ipd/rounds_plan'
    let url = environment.ipdUrl+'rounds_plan';
    let fd = new FormData();
    fd.append('appointment_id',appointment_id)
    fd.append('patient_id',patient_id)
    fd.append('doctor_id',doctor_id)
    fd.append('date',formatDate(new Date()))
    fd.append('plan',data.plan)

    return this.http.post(url,fd);
  }

  getRounds(appointment_id,doctor_id,patient_id):Observable<any>
  {
    let url = environment.ipdUrl +'getRoundDetails/'+ appointment_id+"/" +doctor_id+"/" +patient_id;
    console.log(url);
    // let url = 'https://devumdaa.in/dev/WebApi/Ipd/getRoundDetails/' + appointment_id+"/" +doctor_id+"/" +patient_id;
    // let url = 'https://devumdaa.in/dev/WebApi/Ipd/getRoundDetails/' + appointment_id+"/" +doctor_id+"/" +patient_id;
    // let fd = new FormData();
    // fd.append('appointment_id',appointment_id)
    // fd.append('patient_id',patient_id)
    // fd.append('doctor_id',doctor_id)

    return this.http.get(url); 
  }

  crossNotes(appointment_id,doctor_id,patient_id,crossNotes,crossDoctorName)
  {
    // let url = 'https://devumdaa.in/dev/WebApi/Ipd/saveCrossConsultation';
    let url = environment.ipdUrl+'saveCrossConsultation';
    let fd = new FormData();
    fd.append('appointment_id',appointment_id)
    fd.append('patient_id',patient_id)
    fd.append('doctor_id',doctor_id)
    fd.append('crossNotes',crossNotes)
    fd.append('send_doctor_id',crossDoctorName)
    return this.http.post(url,fd); 
  }

  presentationSubmit(appointment_id,doctor_id,patient_id,data)
  {
    // console.log(appointment_id,doctor_id,patient_id,data);
    // console.log(data.followup);
    // console.log(data.disData);
    // console.log(data.disData.target._value._d);
    // let dis_date = data.disData.target._value._d.getFullYear()  + "-" + (data.disData.target._value._d.getMonth() + 1) + "-" + data.disData.target._value._d.getDate()
    // console.log(dis_date);

    // let sur_date = data.surDate.target._value._d.getFullYear()  + "-" + (data.surDate.target._value._d.getMonth() + 1) + "-" + data.surDate.target._value._d.getDate()
    // console.log(sur_date);

    // let url = 'https://devumdaa.in/dev/WebApi/Ipd/discharge_presentation';
    let url = environment.ipdUrl+'discharge_presentation';
    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
  }
    let fd = new FormData();
    fd.append('appointment_id',appointment_id)
    fd.append('patient_id',patient_id)
    fd.append('doctor_id',doctor_id)
    fd.append('date',formatDate(new Date()))
    fd.append('date_of_discharge',localStorage.getItem('dischargeDate'))
    fd.append('date_of_surgery',localStorage.getItem('surgeryDate'))
    fd.append('presentation',data.presentation)
    fd.append('course_mangement',data.course)
    fd.append('follow_up_advice',data.followup)
    fd.append('primary_consultant',localStorage.getItem('primaryConsultant'))
    fd.append('consultant',localStorage.getItem('consultant'))
    return this.http.post(url,fd); 
  }

  courseData(appointment_id,doctor_id,patient_id,data)
  {
    console.log(appointment_id,doctor_id,patient_id,data);
    console.log(data.CandM);
    // let url = 'https://devumdaa.in/dev/WebApi/Ipd/discharge_courseAndManagement';
    let url = environment.ipdUrl+'discharge_courseAndManagement';
    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
  }
    let fd = new FormData();
    fd.append('appointment_id',appointment_id)
    fd.append('patient_id',patient_id)
    fd.append('doctor_id',doctor_id)
    fd.append('date',formatDate(new Date()))
    fd.append('candm',data.CandM)
    return this.http.post(url,fd); 
  }

  followUpData(appointment_id,doctor_id,patient_id,data)
  {
    console.log(appointment_id,doctor_id,patient_id,data.followUp);
    console.log(data.followUp);
    // let url = 'https://devumdaa.in/dev/WebApi/Ipd/discharge_followAdvice';
    let url = environment.ipdUrl+'discharge_followAdvice';
    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
  }
    let fd = new FormData();
    fd.append('appointment_id',appointment_id)
    fd.append('patient_id',patient_id)
    fd.append('doctor_id',doctor_id)
    fd.append('date',formatDate(new Date()))
    fd.append('follow_up_advice',data.followUp)
    return this.http.post(url,fd); 
  }

  pConsultant(appointment_id,doctor_id,patient_id,data)
  {
    console.log(appointment_id,doctor_id,patient_id,data.followUp);
    console.log(data.followUp);
    // let url = 'https://devumdaa.in/dev/WebApi/Ipd/primary_consultant';
    let url = environment.ipdUrl+'primary_consultant';
    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
  }
    let fd = new FormData();
    fd.append('appointment_id',appointment_id)
    fd.append('patient_id',patient_id)
    fd.append('doctor_id',doctor_id)
    fd.append('date',formatDate(new Date()))
    fd.append('primary_consultant',data.pConsultant)
    return this.http.post(url,fd); 
  }

  consultant(appointment_id,doctor_id,patient_id,data)
  {
    console.log(appointment_id,doctor_id,patient_id,data.followUp);
    console.log(data.followUp);
    // let url = 'https://devumdaa.in/dev/WebApi/Ipd/consultant';
    let url = environment.ipdUrl+'consultant';
    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
  }
    let fd = new FormData();
    fd.append('appointment_id',appointment_id)
    fd.append('patient_id',patient_id)
    fd.append('doctor_id',doctor_id)
    fd.append('date',formatDate(new Date()))
    fd.append('consultant',data.consultant)
    return this.http.post(url,fd); 
  }

  roundsPdf(doctor_id,patient_id,appointment_id):Observable<any>
  {
    console.log(doctor_id,patient_id,appointment_id);
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":8,
      "requestname": "roundsSummary",
      requestparameters:{
        "doctor_id":doctor_id,
        "patient_id":patient_id,
        "appointment_id":appointment_id
      }
      }));
  }

  dischargePdf(doctor_id,patient_id,appointment_id):Observable<any>
  {
    console.log(doctor_id,patient_id,appointment_id);
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":8,
      "requestname": "ipdDischargeSummary",
      requestparameters:{
        "doctor_id":doctor_id,
        "patient_id":patient_id,
        "appointment_id":appointment_id
      }
      }));
  }
}
