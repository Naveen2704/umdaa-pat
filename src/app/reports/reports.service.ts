import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  public baseurl = environment.baseUrl;
  reportdate: string;
  fileslists:Array<File> = [];
  // fileHolder:File= null;
  constructor(private http:HttpClient) { }

  
  ReportsPost(data,date,fileHolder,result):Observable<any> {

    console.log(data,date)
    // console.log(fileHolder)
    let fd = new FormData();
    for(let i=0;i<fileHolder.length;i++){
      this.fileslists[i]=  fileHolder.item(i)
      fd.append("file_i[]",   this.fileslists[i]);
    }
    console.log(this.fileslists)

    let month = data.reportdate.getMonth() +1
    this.reportdate = data.reportdate.getDate()+"-"+month+"-"+ data.reportdate.getFullYear();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    let options = { headers: headers, crossDomain: true, withCredentials: true };
    let value = JSON.stringify(
      {
        "appointment_id": result.appointment_id,
        "current_date": new Date(),
        "description": data.reportdesc,
        "document_type":data.reporttype,
        "patient_id": result.patient_id,
        "report_date": date,
        "requesterid": "101",
        "requestname": "previous_document_insert"
    }
    );
    fd.append("requestpara",value);
    console.log(fd)
    return this.http.post(this.baseurl,fd,{reportProgress: true})
  }

    
  

  ReportsGet(result):Observable<any>{
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    let options = { headers: headers, crossDomain: true, withCredentials: true };
    return this.http.post(this.baseurl,
      {
      "requesterid": 101,
      "requestname": "previous_documents",
      "requestparameters": {
          "appointment_id":result.appointment_id,
          "patient_id": result.patient_id
      }
  }


    )
  }
  patientOCR(appointment_id,image,processing):Observable<any> {
    console.log(appointment_id,image);
    console.log(image.replace("data:image/jpeg;base64,", ""))
    console.log(processing);
    // // console.log(fileHolder)
    let fd = new FormData();
    // for(let i=0;i<image.length;i++){
        this.fileslists=  image;
        console.log(this.fileslists);
        fd.append("file_i",image);
    // }
    console.log(this.fileslists)
    console.log(this.fileslists)
    let value = JSON.stringify(
      {
        "appointment_id": appointment_id,
        // "uniqid":app,
        "image":image.replace("data:image/jpeg;base64,", ""),
        "requesterid": "101",
        "requestname": "patient_ocr_image"
      }
    );
    fd.append("requestpara",value);
    console.log(fd)
    return this.http.post(this.baseurl,fd)
  }
  ReportsCitizensGet(result):Observable<any>{
    console.log(result)
    return this.http.post(this.baseurl,
      {
      "requesterid": 101,
      "requestname": "patient_shared_documents",
      "requestparameters": {
          "appointment_id":result.appointment_id,
          "doctor_id":result.doctor_id,
          "patient_id": result.patient_id
      }
  }


    )
  }

  ReportsImages(id):Observable<any>{

    return this.http.post(this.baseurl,
      {
        "requesterid": 11,
        "requestname": "reportImages",
        "requestparameters": {
          "previous_document_id":id
        }
    }


    )
  }


}
