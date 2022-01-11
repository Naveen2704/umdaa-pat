import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddreportsComponent } from './addreports/addreports.component';
import { ReportsService } from './reports.service';
import { Gallery, GalleryItem, ImageItem, ImageSize, ThumbnailsPosition, GalleryConfig } from '@ngx-gallery/core';
import { map } from 'rxjs/operators';
import { merge, Subscription } from 'rxjs';
import 'hammerjs';
import { ActivatedRoute } from '@angular/router';
import { PatientserviceService } from '../service/patientservice.service';
import { UsersService } from '../services/users.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;

}



@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  showSpinner: boolean;
  ReportsList: any;
  Lion:string;
  displayedColumns: string[] = ['position','name', 'weight', 'symbol','actions'];
  // dataSource = this.ReportsList;
  // dataSource = this.ReportsList;
 
  images=[];
  
  json: { src: string; caption: string; thumb: string; };
  njson: any = [];
  
  imageList: GalleryItem[];
  items: any;
  NVimages: any=[];


  Scanimage=[]
  obj_R: any;
  Reportsdoctors: any=[];
  Reportscitizen: any=[];

  constructor(private users: UsersService,private service: PatientserviceService,private route: ActivatedRoute,private _dialog:MatDialog,private _service:ReportsService,public gallery: Gallery) { 
  }

  ngOnInit() {
    this.route.params.subscribe(params => {

      let productid = params['id'];
    // let productid = this.route.snapshot.paramMap.get('id');
     console.log(productid)
     let roleId = params['id1'];
     this.users.roleId(roleId);
     this.service.GetPatient(productid).subscribe(data =>{
       console.log(data.result['parameters'][0])
       this.obj_R = data.result['parameters'][0]
       this.getReports(this.obj_R);
     })
})

   
    //  this.images = new Object();
    
    console.log(this.Scanimage)
    this.basicLightboxExample();

  }
  basicLightboxExample() {
   console.log(this.imageList)
  //  var img= 'https://www.devumdaa.in/dev/uploads/previous_documents/Customer_Behaviour_(1).jpg';
  const galleryRef = this.gallery.ref();
    galleryRef.setConfig({loadingMode: 'indeterminate', loadingStrategy: 'lazy'});
    galleryRef.load(this.imageList);
   // this.gallery.ref().load(this.imageList);
    
  }

 
  openreports(){
  const dialog_ref = this._dialog.open(AddreportsComponent,{
    data:this.obj_R
  });

  dialog_ref.afterClosed().subscribe(() => {
    ///console.log('The dialog was closed');
    this.getReports(this.obj_R)
  });

  }

  getReports(obj_R){
    // this.images = "";
    console.log(obj_R);

    this._service.ReportsGet(this.obj_R).subscribe((data)=>{
      console.log(data)

      // Add New Api
      this._service.ReportsCitizensGet(this.obj_R).subscribe((data)=>{
        console.log(data)
        this.Reportscitizen = data.result.previous_documents;
        console.log(this.Reportscitizen)
      })
      console.log(data.result.previous_documents);
      this.ReportsList = data.result.previous_documents;
      console.log(this.ReportsList);
      // this.dataSource = this.ReportsList;
      // console.log(this.Reportsdoctors);
    //   this.Reportsdoctors = extend(this.Reportsdoctors,this.Reportscitizen);
    //   console.log( this.Reportsdoctors)
    //   for (var i=0; i<this.Reportscitizen.length; i++){
    //     this.ReportsList = this.Reportsdoctors.push(this.Reportscitizen[i]);
    // }
      //  this.ReportsList = this.Reportsdoctors.concat(this.Reportscitizen)
      // var array = this.Reportsdoctors.push(this.Reportsdoctors,this.Reportscitizen);
      // let array3 = this.Reportsdoctors.map((o: any,i: string | number) => ({...o, ...this.Reportscitizen[i]}));
      // console.log(array3);
      
      // this.ReportsList = [ ...this.Reportsdoctors, ...this.Reportscitizen];
      // var naveen = this.Reportsdoctors.concat(this.Reportscitizen)
      // console.log(naveen);
      if(data['code']== '200'){
        // this.ReportsList = data.result.previous_documents;
      }else{
        alert('NO REPORTS');
       
      }

    })
  }
  openPdf(element){
    console.log(element)
    console.log(element.images[0].image)
      let url = element.images[0].image
       window.open(url,'_blank',"width=500,height=500")
  }
  openDoc(element){
    console.log(element)
    console.log(element.images[0].image)
      let url = element.images[0].image
       window.open(url,'_blank',"width=500,height=500")
  }
  open(id){
    // alert(id);
    console.log(id)
    this._service.ReportsImages(id).subscribe((res)=>{
      console.log(res)
      this.Scanimage =  res.result
      console.log(res.result[0].type);
      if(res.result[0].type === "images"){
        this.imageList = 
        this.Scanimage.map((item) =>{
               console.log(item.image)
        return {
          type: 'image',
          data: {
            src: item.image,
            thumb:item.image
          }
        }
  
        }
    
         );
         this.basicLightboxExample();
      }
     

       
    })
  }


  


}

