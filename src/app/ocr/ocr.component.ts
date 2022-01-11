import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Console } from 'console';
import { SummaryService } from '../summary/summary.service';

@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.component.html',
  styleUrls: ['./ocr.component.css']
})
export class OcrComponent implements OnInit {
  id: any;
  id1: any;
  image: any;
  image2: string;
  show=true;
  hide=false;
  // data: any;
  data = {
      "Clinical_Diagnosis": [
        {
          "clinical_diagnosis_name": "? APD"
        },
        {
          "clinical_diagnosis_name": "dyspepsia"
        },
        {
          "clinical_diagnosis_name": "Typhoid knee"
        }
      ],
      "Drugs": [
        {
          "count": "60.",
          "dose": "40mg",
          "drug_name": "Pan to dec",
          "duration": "30",
          "food": "BF",
          "frequency": "1-0-1",
          "remarks": "so in before food intake.",
          "sn": "1)"
        },
        {
          "count": "-",
          "dose": "AF",
          "drug_name": "Sy. sucrabet plun",
          "duration": "-",
          "food": "1",
          "frequency": "v-V- -",
          "remarks": "-",
          "sn": "2)"
        },
        {
          "count": "-",
          "dose": "AF",
          "drug_name": "Pnegaba M",
          "duration": "30",
          "food": "50",
          "frequency": "0-0-1",
          "remarks": "-",
          "sn": "3)"
        },
        {
          "count": "-",
          "dose": "-",
          "drug_name": "-",
          "duration": "-",
          "food": "-",
          "frequency": "-",
          "remarks": "-",
          "sn": "4)"
        },
        {
          "count": "-",
          "dose": "-",
          "drug_name": "-",
          "duration": "-",
          "food": "-",
          "frequency": "-",
          "remarks": "-",
          "sn": "5)"
        },
        {
          "count": "30",
          "dose": "40 my",
          "drug_name": "ZOLGAS",
          "duration": "15",
          "food": "Bf",
          "frequency": "1-0-1",
          "remarks": "30 in before food",
          "sn": "6)"
        },
        {
          "count": "-",
          "dose": "V",
          "drug_name": "SUCRAL-C",
          "duration": "1",
          "food": "AK",
          "frequency": "V",
          "remarks": "-",
          "sn": "7)"
        },
        {
          "count": "-",
          "dose": "-",
          "drug_name": "-",
          "duration": "-",
          "food": "-",
          "frequency": "-",
          "remarks": "-",
          "sn": "8)"
        },
        {
          "count": "-",
          "dose": "-",
          "drug_name": "-",
          "duration": "-",
          "food": "-",
          "frequency": "-",
          "remarks": "-",
          "sn": "9)"
        },
        {
          "count": "-",
          "dose": "-",
          "drug_name": "-",
          "duration": "-",
          "food": "-",
          "frequency": "-",
          "remarks": "-",
          "sn": "10)"
        }
      ],
      "Investigations": [
        {
          "investigation_name": "(CBP)"
        },
        {
          "investigation_name": "T3,T4,TSH"
        },
        {
          "investigation_name": "ESR"
        },
        {
          "investigation_name": "Sc. Creatinine"
        },
        {
          "investigation_name": "(CRP)"
        },
        {
          "investigation_name": "Endoscopy"
        },
        {
          "investigation_name": "US Abdomen"
        },
        {
          "investigation_name": "Colonoscopy"
        },
        {
          "investigation_name": "LA ."
        }
      ]
    };


  constructor(private route: ActivatedRoute,private _service:SummaryService,private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {

      let productid = params['id'];
      let roleId = params['id1'];
      this.id = params['id'],
      this.id1 = params['id1'];
      console.log(this.id);
      this.getPdf(this.id);
  });   
  this.searchPreviousOcrData();
  }

  searchPreviousOcrData(){
    console.log(this.id);
    this._service.checkPatientOcrSubmit(this.id).subscribe((res) => {
      console.log(res);
      if(res.message==1){
        this.show=false;
        this.hide=false;
      }else{
        this.hide=false;
        this.show=true
      }
    })
  }

  getPdf(id)
  {
    this._service.getOcrPdf(id).subscribe((res) => {
      console.log(res);
      console.log(res['result']['tutorial'])
      console.log(res['result']['tutorial'][0].ocr_image)
      console.log(res['result']['tutorial'][1].ocr_image)
      // this.image= res['result'].ocr_image;
      this.image= res['result']['tutorial'][0].ocr_image;
      this.image2 = res['result']['tutorial'][1].ocr_image;
      // var myWindow = window.open(url,'_blank');
      // myWindow.document.write("<p><button type='button' class='btn btn-success'>Translate</button></p>");
      // myWindow.document.write("<br>");    
      // myWindow.document.write("<img src='https://www.devumdaa.in/dev/uploads/OCR/61150ad7afb50.jpg'>");  
      // let url = res.result.pdf_name
      // window.open(url,'_blank',"width=500,height=500")
    })
  }

  translate()
  {
    this.hide=true;
    this.show=false;
    console.log(this.id);
    var data = JSON.parse(localStorage.getItem('getInfo'));
    // this._service.ocrFinalSubmit(data.doctor_id,data.appointment_id,data.clinic_id,data.patient_id).subscribe((data=>{
    //   console.log(data);
    // }));
    this._service.getImagesId(this.id).subscribe((res) => {
      console.log(res);
      console.log(res['result']['tutorial'][0].image);
      console.log(res['result']['tutorial'][1].image);
      // localStorage.setItem('translateData',JSON.stringify(this.data));

      // this.router.navigateByUrl('/ocrData/'+this.id+'/'+this.id1)
     
      this._service.translateImage( localStorage.getItem('ip'),res['result']['tutorial'][0].image,
      res['result']['tutorial'][1].image).subscribe((res) => {
      console.log(res);
      if(res != ''){
        localStorage.setItem('translateData',JSON.stringify(res));
        this.router.navigateByUrl('/ocrData/'+this.id+'/'+this.id1)
      }else{
        localStorage.setItem('translateData',JSON.stringify(this.data));
        this.router.navigateByUrl('/ocrData/'+this.id+'/'+this.id1)
      }
    })
    })
  }

}
