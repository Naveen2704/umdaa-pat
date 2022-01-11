import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeService } from '../se/se.service';
import { NotificationService } from '../shared/notification.service';
import { ConfirmdailogService } from '../shared/confirmdailog/confirmdailog.service';

const options = {
  title: 'CONFIRM.DOWNLOAD.JOB.TITLE',
  message: 'Are you sure to delete ?',
  cancelText: 'NO',
  confirmText: 'YES'
};
@Component({
  selector: 'app-se-list',
  templateUrl: './se-list.component.html',
  styleUrls: ['./se-list.component.css']
})
export class SeListComponent implements OnInit {
  book_item: any;
  pdf: any=[];
  pdfListView: any =[];
  listData: any;
  Listdata: number;
  noList: number;
  id: any;

  constructor(private route: ActivatedRoute, private se:SeService,
    public  _notification:NotificationService,private router: Router,
    private _dailog:ConfirmdailogService) { }

  ngOnInit() {
 
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.loadData(this.id);
  }


  loadData(id)
  {
    this.se.getList(id).subscribe((data)=>{
      console.log(data);
      console.log(data['result']['forms']);
      this.listData = data['result']['forms'];
      if(this.listData.length == 0)
      {
        this.noList =0;
        // this.router.navigate(['/Se']);
      }
      // this.router.navigate(['/SeList'], {queryParams: {data: 
      //   JSON.stringify(data['result']['forms'])}, skipLocationChange: true});
    });
  }


  getPdf(f_id,pf_id,f_type,d_id,p_id)
  {
    this.se.getPdfData(f_id,pf_id,f_type,d_id,p_id).subscribe((data)=>{
      console.log(data);
      console.log(data['result']['procedure_patient_pdf']);
      this.pdf=(data['result']['procedure_patient_pdf']);
       window.open(this.pdf,'_blank',"width=500,height=500")
    })
  }

  deletePdff(app_id,f_id,pf_id,f_type,d_id,p_id)
  {

    this._dailog.open(options).afterClosed().subscribe(res=>{
      if(res){
        console.log(app_id,f_id,pf_id,f_type,d_id,p_id);
        this.se.deletePdf(f_id,pf_id,f_type,d_id,p_id).subscribe((data)=>{
          console.log(data);
          console.log(data.code);
          this._notification.error('Deleted Successfully');
          if(data.code == 200)
          {
            this.loadData(app_id);
          }
  
        })
      }
    })


  }

  getSe()
  {
    this.router.navigate(['/Examins/SE'+this.id]);
  }

}
