import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PserviceService {

  constructor(){}
  private user = new BehaviorSubject<string>("zero");
  castUser = this.user.asObservable();
  
  private userr = new BehaviorSubject<string>("zeroo");
  castUserr = this.userr.asObservable();

  private userrr = new BehaviorSubject<string>("zerooo");
  castUserrr = this.userrr.asObservable();
  editUser(a){
    this.user.next(a); 
  }

  editUserr(a){
    this.userr.next(a); 
  }

  previewName(a){
    this.userrr.next(a); 
  }
}
