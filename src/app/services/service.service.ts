import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class ServiceService {
    

  myGlobalVar;
  seImages =[];

  constructor() {
    
    // this.myGlobalVar = {};
  }
  
  setMyGV(data){
    this.myGlobalVar=data;
    //console.log(this.myGlobalVar);
    // console.log(this.myGlobalVar['result']['parameters']);
    
  }
  getMyGV(){
    console.log(this.myGlobalVar);
    // console.log(this.myGlobalVar['result']['parameters']);
    return this.myGlobalVar ;
  }

  private data = {};  
  
  setOption(size, value) {      
     this.data[size] = value; 
    //  console.log(this.data); 
    //  console.log(this.data[size]); 
     this.seImages.push({preview1:this.data[size]})
     console.log(this.seImages);
   }  
   
   getOption() {  
    //  return this.data;  
     return this.seImages;
   }  


  // setValue(val) {
  //     this.myValue = 10;
  // }

  // getValue() {
  //     return this.myValue;
  // }

  // changeMessage(message: string) {
  //   this.messageSource.next(message)
  //   console.log(    this.messageSource.next(message));
  // }


}
