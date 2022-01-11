import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(){}
  private user = new BehaviorSubject<string>("zero");
  castUser = this.user.asObservable();
  
  private userr = new BehaviorSubject<string>("zeroo");
  castUserr = this.userr.asObservable();
  editUser(a){
    this.user.next(a); 
  }

  editUserr(a){
    this.userr.next(a); 
  }
}
