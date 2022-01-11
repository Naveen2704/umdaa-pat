import { Injectable } from '@angular/core';
import {FormBuilder,FormGroup,FormControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProfileEditService {

  constructor() { }
  form:FormGroup = new FormGroup({
    $key:new FormControl(null),
    title:new FormControl(1),
    firstName:new FormControl(''),
    lastName:new FormControl(''),
    age:new FormControl(''),
    gender:new FormControl(''),
    mobile:new FormControl(''),
    email:new FormControl(''),
    location:new FormControl(''),

  })


}
