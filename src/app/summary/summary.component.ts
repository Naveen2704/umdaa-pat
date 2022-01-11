import { Component, OnInit } from '@angular/core';
import { SummaryService } from './summary.service';
import { PatientserviceService } from '../service/patientservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { ScanDocumentComponent } from '../scan-document/scan-document.component';
import { MatDialog, MatDialogRef } from '@angular/material';

export interface PeriodicElement {
  name: string;
  position: number;
  symbol: string;

}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  fi_Obj: any;
  id: any;
  id1: any;
  showUpload:boolean = true;
  hideUpload:boolean = false;
  constructor( private _dialog:MatDialog,private router:Router,private users: UsersService,
    private service: PatientserviceService,private route: ActivatedRoute,
    private _service:SummaryService) { }
  summaryList: any=[];
  displayedColumns: string[] = ['name', 'symbol'];
  
    data= {
      "Clinical Diagnosis": [
        {
          "clinical_diagnosis_name": "cor air abdomen"
        },
        {
          "clinical_diagnosis_name": "11 . 15"
        },
        {
          "clinical_diagnosis_name": "Sanfilippo"
        },
        {
          "clinical_diagnosis_name": "Alveolitis ,"
        },
        {
          "clinical_diagnosis_name": "? GR, polyp"
        },
        {
          "clinical_diagnosis_name": "iso ch. Constant"
        },
        {
          "clinical_diagnosis_name": "post"
        }
      ],
      "Drugs": [
        {
          "dosage": "\\ - x - I .",
          "drug_name": "zofer",
          "duration": "B F",
          "food": "40",
          "sn": "1"
        },
        {
          "dosage": "Tdays",
          "drug_name": "PANTOCID",
          "duration": "I - I - I",
          "food": "*",
          "sn": "2"
        },
        {
          "dosage": "2days",
          "drug_name": "ulteacet semi",
          "duration": "water",
          "food": "PEG LECY Sachet with zutees of",
          "sn": "3"
        },
        {
          "dosage": "-",
          "drug_name": "Remarks by 2 lites of wahi",
          "duration": "-",
          "food": "-",
          "sn": "4"
        },
        {
          "dosage": "-",
          "drug_name": "-",
          "duration": "-",
          "food": "-",
          "sn": "5"
        },
        {
          "dosage": "-",
          "drug_name": "-",
          "duration": "-",
          "food": "-",
          "sn": "6"
        },
        {
          "dosage": "-",
          "drug_name": "-",
          "duration": "-",
          "food": "-",
          "sn": "7"
        }
      ],
      "Investigations": [
        {
          "investigation_name": "T3,T4,TSH / LFI / amylone I arte) Endoscopy"
        },
        {
          "investigation_name": "Barium Bence Rate I Early (CIC)"
        }
      ]
    }
  
  ngOnInit() {
    this.route.params.subscribe(params => {

      let productid = params['id'];
      let roleId = params['id1'];
      this.id = params['id'],
      this.id1 = params['id1']
      this.users.roleId(roleId)
     this.users.appID(productid)
     this.service.GetPatient(productid).subscribe(data =>{
      console.log(data)
      this.fi_Obj = data.result['parameters'][0];
      this.getSummary(this.fi_Obj )
     })
  });   
    this.checkocrImages();
  }

  checkocrImages(){
    this._service.getImagesId(this.id).subscribe((res) => {
      console.log(res);
      console.log(res['result']['tutorial'][0].image);
      console.log(res['result']['tutorial'][1].image);
      if(res.code == "201")
      {
        this.showUpload = true;
      }
      else{
        this.showUpload = false; 
      }
    })
  }

  getSummary(fi_Obj){
    this._service.getData(this.fi_Obj).subscribe((res) => {
      console.log(res.result.pa_appointment)

      this.summaryList = res.result.pa_appointment
      console.log(this.summaryList)
    })
  }

  shortsummary(id){
   console.log(id)
  
   this._service.getshortsummarys(id).subscribe((res) => {
    //console.log(res.result.pdf_name)
    let url = res.result.pdf_name
   window.open(url,'_blank',"width=500,height=500")
  })
  }
 fullsummary(id){
  this._service.getfullsummary(id).subscribe((res) => {
    console.log(res)
    //console.log(res.result.pdf_name)
    let url = res.result.pdf_name
   window.open(url,'_blank',"width=500,height=500")
  })
}
rmpsummary(){
  this.router.navigateByUrl('/rmpsummary/'+this.id+'/'+this.id1)
  this._service.getRmpsummary(this.fi_Obj).subscribe((res)=>{
    console.log(res)
  })
}
  discharge(id){
    this._service.getdischargesummary(id).subscribe((res) => {
      //console.log(res.result.pdf_name)
      let url = res.result.pdf_name
     window.open(url,'_blank',"width=500,height=500")
    })
  //console.log(id)
  
 }

 upload()
 {
    //  alert("Scan Document");
    const dialogRef = this._dialog.open(ScanDocumentComponent,{
      // panelClass:['Vitals_css'],
      // disableClose:true,
       data:{id:this.id}
      
    });
    dialogRef.afterClosed().subscribe(result => {
      
      
  });
 }

 openPdfView(app_id){
  alert("CLICK SUBMIT IN PRESCRIPTION TO SEE SUMMARY");
 }

  getOcr(id)
  {
    // this.router.navigateByUrl('/ocr/'+this.id+'/'+this.id1);
    console.log(id);
    this._service.getImagesId(id).subscribe((res) => {
      console.log(res);
      if(res.code == "201")
      {
        alert("No Images Found");
      }else if(res.count == '1'){
        alert("upload ocr second side image");
      }
      else{
        this.router.navigateByUrl('/ocr/'+this.id+'/'+this.id1);
      }
      console.log(res['result']['tutorial'][0].image);
      console.log(res['result']['tutorial'][1].image);

    })
    // this._service.getOcrPdf(id).subscribe((res) => {
    //   console.log(res);
    //   // let url = res['result'].ocr_image;
    //   // var myWindow = window.open(url,'_blank');
    //   // myWindow.document.write("<p><button type='button' class='btn btn-success'>Translate</button></p>");
    //   // myWindow.document.write("<br>");    
    //   // myWindow.document.write("<img src='https://www.devumdaa.in/dev/uploads/OCR/61150ad7afb50.jpg'>");  
    //   // let url = res.result.pdf_name
    //   // window.open(url,'_blank',"width=500,height=500")
    // })
  }

}