import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-ipd-prescription',
  templateUrl: './ipd-prescription.component.html',
  styleUrls: ['./ipd-prescription.component.css']
})
export class IpdPrescriptionComponent implements OnInit {
  id: any;
  id2: any;

  constructor(private route: ActivatedRoute,private router: Router,private _location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.id =  res['id'];
      this.id2 =  res['id1'];
      console.log(this.id);
    });
  }

  back()
  {
    localStorage.setItem('tabsIndex','2');
    this._location.back();
    // this.router.navigate(['/ipd/'+this.id+'/'+this.id2]);
  }

}
