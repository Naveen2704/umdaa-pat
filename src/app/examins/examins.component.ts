import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-examins',
  templateUrl: './examins.component.html',
  styleUrls: ['./examins.component.css']
})
export class ExaminsComponent implements OnInit {
  id: string;
  tabs = [
    { path: '/Lists/{{id}}', label: 'Lists' },
    { path: '/GPE/{{id}}', label: 'GPE' },
    { path: '/SE/{{id}}', label: 'SE' }
  ]
  roleId: string;
  id1: string;
  navLinks=[
    {
    name:'BRIEF',
    link:'./Lists/',
    path:'/Lists/',
    label:'Lists'
    },
    {
    name:'GPE',
    link:'./GPE/',
    path:'/GPE/',
    label:'GPE'
    }, 
    {
    name:'SE',
    link:'./SE/',
    path:'/SE/',
    label:'SE'
    },
    {
    name:'OS',
    link:'./OS/',
    path:'/OS/',
    label:'OS'
    }
    ];
  constructor(private route: ActivatedRoute,private users: UsersService) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.id = this.route.snapshot.paramMap.get("id"); 
      this.id1 = this.route.snapshot.paramMap.get("id1"); 
      this.users.roleId(this.id1);
    }); 

    // this.users.roleIdd.subscribe(user =>{
    //   console.log(user);
    //   this.roleId=user
    //   console.log(this.roleId);
    //  });
  }

}
