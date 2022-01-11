import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  id: string;
  id1: string;

  navLinks=[
    {
    name:'Procedures',
    link:'./Procedures/',
    path:'/Procedures/',
    label:'Procedures'
    },
    {
      name:'Consent-Forms',
      link:'./cforms/',
      path:'/cforms/',
      label:'C-Forms'
      },
      {
        name:'Check-List',
        link:'./checkList/',
        path:'/checkList/',
        label:'CheckList'
        },
    {
      name:'More',
      link:'./moreforms/',
      path:'/moreforms/',
      label:'More'
      }
    ];
  constructor(private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.id = this.route.snapshot.paramMap.get("id"); 
      this.id1 = this.route.snapshot.paramMap.get("id1"); 
      // this.users.roleId(this.id1);
    }); 
  }

}
