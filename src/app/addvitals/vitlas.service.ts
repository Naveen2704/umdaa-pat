import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PatientserviceService } from '../service/patientservice.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VitlasService {
  dob: string;
  month: any;
  setgivendob: string;
  private _refreshcaldata = new Subject<any[]>();
  getRefreshData$: Observable<any>;
  setid: any;
  due_on: any;
  getmonth: any;
  
  getRefreshData(): Observable<any>{
    return this._refreshcaldata.asObservable()
  }

  constructor( private http: HttpClient,
    private patientservice:PatientserviceService,
    private route: ActivatedRoute,private service: PatientserviceService,) { 
    
  }
  apiUrl:string = environment.baseUrl;
  saveData(id,result):Observable<any>
  {
    console.log(id)
    console.log(result)
    console.log(new Date());
   var vitals=[];
   console.log(id);
    var j = 11;
    var pr = [];
    var lp_last_len = 0;
    for(var i=0;i<id.cal.length;i++)
    {
      pr[j] = {"vital_sign_recording_date_time": new Date(),"position": j,"value": id.cal[i].LMP,"vital_sign_name": "LMP"};
      j++;
      pr[j] = {"vital_sign_recording_date_time": new Date(),"position": j,"value": id.cal[i].EDD,"vital_sign_name": "EDD"};
      j++;
      pr[j] = {"vital_sign_recording_date_time":  new Date(),"position": j,"value": id.cal[i].POD,"vital_sign_name": "POD"};
      j++;
      
     lp_last_len=j;
     var cal = pr
    }
    console.log(pr)
    var last_len = (!lp_last_len || lp_last_len==0)?20:lp_last_len

   for(var v=0;v<id.addRow.Array.length;v++)
   {
     vitals[v]= {"vital_sign_recording_date_time":  new Date(),"position": last_len,"value": id.addRow.Array[v].phaseValue,"vital_sign_name": id.addRow.Array[v].phaseType};
     last_len++;
     }
     var extras = vitals;
     console.log(extras) 
     let aa=[
     {
     "vital_sign_recording_date_time":  new Date(),
     "position": 0,
     "value": id.pulse,
     "vital_sign_name": "PR"
     },
     {
     "vital_sign_recording_date_time":  new Date(),
     "position": 1,
     "value": id.bp1,
     "vital_sign_name": "DBP"
     },
     {
     "vital_sign_recording_date_time":  new Date(),
     "position": 1,
     "value": id.bp2,
     "vital_sign_name": "SBP"
     },
     {
     "vital_sign_recording_date_time":  new Date(),
     "position": 2,
     "value": id.rr,
     "vital_sign_name": "RR"
     },
     {
     "vital_sign_recording_date_time":  new Date(),
     "position": 3,
     "value": id.temp,
     "vital_sign_name": "Temp"
     },
     {
     "vital_sign_recording_date_time":  new Date(),
     "position": 4,
     "value": id.sao2,
     "vital_sign_name": "SaO2"
     },
     {
     "vital_sign_recording_date_time":  new Date(),
     "position": 5,
     "value": id.height,
     "vital_sign_name": "Height"
     },
     {
     "vital_sign_recording_date_time":  new Date(),
     "position": 6,
     "value": id.weight,
     "vital_sign_name": "Weight"
     },
     {
     "vital_sign_recording_date_time":  new Date(),
     "position": 7,
     "value": id.bmi,
     "vital_sign_name": "BMI"
     },
     {
     "vital_sign_recording_date_time":  new Date(),
     "position": 8,
     "value": id.bsa,
     "vital_sign_name": "BSA"
     },
     {
     "vital_sign_recording_date_time":  new Date(),
     "position": 9,
     "value": id.wh,
     "vital_sign_name": "WH Ratio"
     },
     {
     "vital_sign_recording_date_time":  new Date(),
     "position": 10,
     "value": id.default2,
     "vital_sign_name": id.default1
     }
     ]
     
    console.log(aa)
    var final = aa.concat(extras)
    final =final.concat(pr)
    var final2 = [];
    // final = final.concat(pr)
     Object.keys(final).forEach((key) => (!final[key]) && delete final[key]);
    console.log(final.length)
    for(var a=0;a<final.length;a++)
    {
      if(final[a] == undefined)
      {
        continue;
      }
      else if(final[a].value == undefined || final[a].value == null)
      {
        continue;
      }
      else
      {
        final2[a] =         {
        "vital_sign_recording_date_time": final[a].vital_sign_recording_date_time,
        "position": final[a].position,
        "value": final[a].value,
        "vital_sign_name": final[a].vital_sign_name
        }
      }
    }
// final2 = final2.concat(pr)
// thisonsole.log(final2)
var final3 = final2.filter(function (el) {
  return el != null;
});
console.log(final3)

//alert("ready")
return this.http.post(this. apiUrl,
{
"requesterid": 34,
"requestname": "patient_vitals_insert",
"requestparameters": {
"appointment_id":result.appointment_id,
"clinic_id":result.clinic_id,
"select_flag": 1,
"drug_allergy":id.Allergy == 'yes'?id.drugallergy:'No',
"patient_id":result.patient_id,
"umr_no":result.umr_no,
"vitalsign":final3
}
} 
  )} 

  getData(obj):Observable<any>
{
 return this.http.post(this.apiUrl,
  {
    "requesterid":34,
    "requestname":"patient_vitals_info",
    "requestparameters":
    {
      "patient_id":obj.patient_id
    }
  });
  }

  getImuCal(data,result):Observable<any>{
    console.log(data.dob)
    this.month = data.dob.getMonth()+1
    this.dob = data.dob.getDate()+"-"+this.month+"-"+data.dob.getFullYear();
    console.log(this.dob)
    return this.http.post(this.apiUrl,
      {
        "requesterid": 101,
        "requestname": "immunization_list",
        "requestparameters": {
            "appointment_id": result.appointment_id,
            "clinic_id": result.clinic_id,
            "dob": this.dob,
            "doctor_id": result.doctor_id,
            "patient_id": result.patient_id,
        }
    }).pipe(tap((res)=>{
        return this._refreshcaldata.next(null);
    }));;
  }

  updatedcal(result):Observable<any>{
    return this.http.post(this.apiUrl,
      {
        "requesterid": 101,
        "requestname": "immunization_list",
        "requestparameters": {
            "appointment_id": result.appointment_id,
            "clinic_id": result.clinic_id,
            "dob": this.dob,
            "doctor_id": result.doctor_id,
            "patient_id": result.patient_id
        }
    })
  }

  setGivenDate(data,result):Observable<any>{
   console.log(result.package.appointment_id)
  // this.getmonth = result.due_on.getMonth() + 1;
 //  this.due_on = result.due_on.getDate()+"-"+this.getmonth+"-"+ result.due_on.getFullYear()
   this.setid = result
   this.month = data.SetDob.getMonth()+1
    this.setgivendob = data.SetDob.getFullYear()+"-"+this.month+"-"+data.SetDob.getDate();
    console.log(this.setgivendob)
    return this.http.post(this.apiUrl,
      {
        "requesterid": 101,
        "requestname": "update_vaccine",
        "requestparameters": {
            "appointment_id":result.package.appointment_id,
            "clinic_id": result.package.clinic_id,
            "doctor_id": result.package.doctor_id,
            "due_on": result.due_on,
            "given_on":this.setgivendob,
            "patient_id": result.package.patient_id,
            "type": "edit",
            "umr_no": result.package.umr_no,
            "vaccine_id": result.id
        }
    });
  }
  
  delGivenDate(id,result):Observable<any>{
    console.log()
    return this.http.post(this.apiUrl,
      {
        "requesterid": 101,
        "requestname": "update_vaccine",
        "requestparameters": {
            "appointment_id": result.appointment_id,
            "clinic_id": result.clinic_id,
            "due_on": this.dob,
            "given_on":this.setgivendob,
            "doctor_id": result.doctor_id,
            "patient_id": result.patient_id,
            "type": "del",
            "umr_no":result.umr_no,
            "vaccine_id":id
        }
    }
      )
  }

  getPrintPath(obj):Observable<any>{
    return this.http.post(this.apiUrl,
      {
        "requesterid": 0,
        "requestname": "print_vitals",
        "requestparameters": {
            "clinic_id": obj.clinic_id,
            "doctor_id": obj.doctor_id,
            "patient_id": obj.patient_id
        }
    })
  }
}
