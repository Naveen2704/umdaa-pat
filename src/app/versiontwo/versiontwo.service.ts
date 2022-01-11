import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VersiontwoService {
  public apiUrl = environment.baseUrl;
  constructor( private _http:HttpClient) { }

  saveNotes(appointment_id, notes) {
    let url = this.apiUrl;
    return this._http.post(this.apiUrl, {
      "requesterid": 86,
      "requestname": "saveNewOcrData",
      "requestparameters": {
          "appointment_id": appointment_id,
          "notes": notes,
          "type": "notes"
      }
    })
  }
  
  saveData(appointment_id, value, type, id = '') {
    let url = this.apiUrl;
    return this._http.post(this.apiUrl, {
      "requesterid": 86,
      "requestname": "saveNewOcrData",
      "requestparameters": {
          "appointment_id": appointment_id,
          "notes": value,
          "id": id,
          "type": type
      }
    })
  }
  
  addGenPlanFu(appointment_id, gen = '', plan = '', fu = '') {
    let url = this.apiUrl;
    return this._http.post(this.apiUrl, {
      "requesterid": 86,
      "requestname": "genplanfu",
      "requestparameters": {
          "appointment_id": appointment_id,
          "gen": gen,
          "plan": plan,
          "followupdate": fu
      }
    })
  }

  deleteData(delete_id, type) {
    let url = this.apiUrl;
    return this._http.post(this.apiUrl, {
      "requesterid": 86,
      "requestname": "deleteData",
      "requestparameters": {
          "delete_id": delete_id,
          "type": type
      }
    })
  }

  saveVitals(vitals, appointment_id) {
    return this._http.post(this.apiUrl, {
      "requesterid": 86,
      "requestname": "vitals_save_new",
      "requestparameters": {
        "appointment_id": appointment_id,
        "vitals": {
            "PR": vitals.PR,
            "SBP": vitals.SBP,
            "DBP":vitals.DBP,
            "RR": vitals.RR,
            "Temp": vitals.Temp,
            "SaO2": vitals.SaO2,
            "Height": vitals.Height,
            "Weight": vitals.Weight,
            "BMI": vitals.BMI,
            "BSA": vitals.BSA,
            "WH": vitals.WH,
            "allergy": vitals.allergy,
        }
      }
    })
  }

  deleteVitals(appointment_id) {
    return this._http.post(this.apiUrl, {
      "requesterid": 86,
      "requestname": "deleteVitals",
      "requestparameters": {
        "appointment_id": appointment_id
      }
    })
  }

  saveDrug(appointment_id, prescription) {
    return this._http.post(this.apiUrl, {
      "requesterid": 3,
      "requestname": "saveDrugs",
      "requestparameters": {
        "appointment_id": appointment_id,
        "prescription": prescription
      }
    })
  }

  addOcr(followdays,result,app_id):Observable<any>{
    console.log(result)
    console.log(result.investigations);
    console.log(result.prescription);
    for(var i=0;i<result.clnotes.length;i++){
      console.log(result.clnotes[i].clnotes);
    }
    return this._http.post(this.apiUrl,
      {
        "requesterid": 3,
        "requestname": "saveOcr",
        "requestparameters": {
            "appointment_id": app_id,
            "vitals": {
                "PR": result.vitals.PR,
                "SBP": result.vitals.SBP,
                "DBP":result.vitals.DBP,
                "RR": result.vitals.RR,
                "Temp": result.vitals.Temp,
                "SaO2": result.vitals.SaO2,
                "Height": result.vitals.Height,
                "Weight": result.vitals.weight,
                "BMI": result.vitals.BMI,
                "BSA": result.vitals.BSA,
                "WH": result.vitals.WH,
                "allergy": result.vitals.allergy,
            },
            "clnotes": result.clnotes,
            "pastnotes":result.pastnotes,
            "cd": result.cd,
            "investigations": result.investigations,
            "prescription": result.prescription,
            "gen": result.gi,
            "plan":result.plan.plan_notes,
            "followupdate": followdays
        }
    }
  )
  }
}
