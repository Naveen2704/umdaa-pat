import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(){}

  private id = new BehaviorSubject<string>("zero");
  roleIdd = this.id.asObservable();


  private user = new BehaviorSubject<string>("zero");
  castUser = this.user.asObservable();

  private app = new BehaviorSubject<string>("zero");
  app_id = this.app.asObservable()
  
  private userr = new BehaviorSubject<string>("zeroo");
  checkRoute = this.userr.asObservable();
  
  editUser(newUser){
    this.user.next(newUser); 
  }

  editrouter(a){
    this.userr.next(a); 
  }

  roleId(a)
  {
    this.id.next(a); 
  }
  appID(id){
    this.app.next(id)
  }
}
