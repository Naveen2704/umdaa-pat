import { Component, OnInit } from '@angular/core';
import { onSideNavChange, animateText } from '../animations'
import { ServiceService } from '../services/service.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { PatientserviceService } from '../service/patientservice.service';
import { UsersService } from '../services/users.service';
import * as introJs from 'intro.js/intro.js';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [onSideNavChange, animateText]
})
export class SidenavComponent implements OnInit {
  sidenavWidth: number;
  selected :any;
  public sideNavState: boolean = false;
  public linkText: boolean = false;
  introJS = introJs();
  // public pages: Page[] = [
  //   {name: 'Profile',link:'',subpages:[]},
  //   {name: 'Vitals',link:'',subpages:[]},
  //   {name: 'Forms',link:'',subpages:[
  //     {name:'Consents',link:'./Vitals',subpages:[]},
  //     {name:'procedures',link:'',subpages:[]}
  // ]}
    
  // ]

  
  






  url: any;
  id: any;
  app_id: any;
  roleId: string;
  roleIdd: any;
  pages=[];
  rmp: any;
  calltype: any;
  constructor(private users: UsersService,private patientservice:PatientserviceService,private _sidenavService: ServiceService,
    private route: ActivatedRoute,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
      this.introJS.setOptions({
        steps: [
          {
            element: document.querySelector('#step1'),
            intro: 'Welcome to your new app!',
            position: 'top'
          }
        ]
      });
   }

  ngOnInit() {
    this.users.roleIdd.subscribe(user =>{
      console.log(user);
      this.roleIdd=user;
      console.log(this.roleIdd);
      console.log(this.roleIdd);
    
      this.users.app_id.subscribe(data=>{
        console.log(data)
        this.app_id = data
        this.patientservice.Getdetails(data).subscribe(res =>{
          console.log(res)
          this.rmp = res.result['parameters'][0].rmp_status
          console.log(this.rmp)
          this.calltype = res.result['parameters'][0].slot_type 
          console.log(this.rmp)

        if( this.roleIdd == '6')
        {
      
        
          this.pages = [ 
            {
              name:'VITALS',
              link:'./Vitals/',     
               icon:'././assets/icon/vitals_w.png',
               Activeicon:'././assets/icon/vitals.png',
               subpages:[]
          }, 
          
        {
          name:'HISTORY',
          icon:'././assets/icon/history_w.png',
          link:'/History/',
          Activeicon:'././assets/icon/history.png',
           subpages:[ ]
        },
        {
          name:'EXAM',
          icon:'././assets/icon/examin_w.png',
          Activeicon:'././assets/icon/examin.png',
          link:'/Lists/', 
          subpages:[]
        },
        
        {
          name:'REPORTS',
          link:'/Reports/',
          icon:'././assets/icon/report_w.png',
          Activeicon:'././assets/icon/report.png',
           subpages:[]
        },
       
        {
          name:'SUMMARY',
          icon:'././assets/icon/summary_w.png',
          Activeicon:'././assets/icon/summary.png',
          link:'/Summary/',
           subpages:[]
        },
      
        {
          name:'FORMS',
          icon:'././assets/icon/forms_w.png',
          Activeicon:'././assets/icon/forms.png',
          link:'/Procedures/',
           subpages:[]
        },
       
        
            
          ]
          
        }
        else if(this.roleIdd == '4')
        {

          this.pages = [ 
            {
              
              name:'VITALS',
              link:'./Vitals/',     
               icon:'././assets/icon/vitals_w.png',
               Activeicon:'././assets/icon/vitals.png',
               subpages:[]
          }, 
          
        {
          name:'HISTORY',
          icon:'././assets/icon/history_w.png',
          link:'/History/',
          Activeicon:'././assets/icon/history.png',
           subpages:[ ]
        },
        {
          name:'EXAM',
          icon:'././assets/icon/examin_w.png',
          Activeicon:'././assets/icon/examin.png',
          link:'/Lists/', 
          subpages:[]
        },
        {
          name:'IMP',
          icon:'././assets/icon/fi_w.png',
          Activeicon:'././assets/icon/fi.png',
          link:'/Fi/',
           subpages:[ ]
        },
        {
          name:'REPORTS',
          link:'/Reports/',
          icon:'././assets/icon/report_w.png',
          Activeicon:'././assets/icon/report.png',
           subpages:[]
        },
       
        {
          name:'SUMMARY',
          icon:'././assets/icon/summary_w.png',
          Activeicon:'././assets/icon/summary.png',
          link:'/Summary/',
           subpages:[]
        },
         {
          name:'F/U',
          icon:'././assets/icon/followup_w.png',
          Activeicon:'././assets/icon/followup.png',
          link:'/f/u/',
           subpages:[]
        }, 
        {
          name:'FORMS',
          icon:'././assets/icon/forms_w.png',
          Activeicon:'././assets/icon/forms.png',
          link:'/Procedures/',
           subpages:[]
        },
        {
          name:'IPD',
          icon:'././assets/icon/forms_w.png',
          Activeicon:'././assets/icon/forms.png',
          link:'/ipd/',
           subpages:[]
        },
        //   {
        //      name:'FORMS',
        //      icon:'././assets/images/sidenav/forms.png',
        //      subpages:[
        //         {
        //           name:'PROCEDURE',
        //           link:'/Procedures/', 
        //           icon:'assets/images/sidenav/Procedure.png',
        //         }, 
        //         {
        //           name:'C-FORMS',
        //           link:'/Forms/', 
        //           icon:'assets/images/sidenav/forms.png',
        //         },
        //         {
        //           name:'CHECKLIST',
        //           link:'/checkList/', 
        //           icon:'assets/images/sidenav/checklist.png',
        //         }
        //   ]
        // }, 
        
        
            
          ]
        }
        else if(this.rmp =='1' && this.calltype == "video call")
        {
                  this.pages = [ 
          {
            name:'SUMMARY',
            icon:'././assets/icon/summary_w.png',
            Activeicon:'././assets/icon/summary.png',
            link:'/Summary/',
             subpages:[]
          },
          {
            name:'HISTORY',
            icon:'././assets/icon/history_w.png',
            link:'/History/',
            Activeicon:'././assets/icon/history.png',
             subpages:[ ]
          },
          {
            name:'IMP',
            icon:'././assets/icon/fi_w.png',
            Activeicon:'././assets/icon/fi.png',
            link:'/Fi/',
             subpages:[ ]
          },
        ]
        }
        else if(this.roleIdd == '2' && this.calltype == "video call"){
          
            this.pages = [ 
              {
                
                name:'VITALS',
                link:'./Vitals/',     
                 icon:'././assets/icon/vitals_w.png',
                 Activeicon:'././assets/icon/vitals.png',
                 subpages:[]
            }, 
            
          {
            name:'HISTORY',
            icon:'././assets/icon/history_w.png',
            link:'/History/',
            Activeicon:'././assets/icon/history.png',
             subpages:[ ]
          },
          // {
          //   name:'EXAM',
          //   icon:'././assets/icon/examin_w.png',
          //   Activeicon:'././assets/icon/examin.png',
          //   link:'/Lists/', 
          //   subpages:[]
          // },
      
          {
            name:'REPORTS',
            link:'/Reports/',
            icon:'././assets/icon/report_w.png',
            Activeicon:'././assets/icon/report.png',
             subpages:[]
          },
         
          {
            name:'SUMMARY',
            icon:'././assets/icon/summary_w.png',
            Activeicon:'././assets/icon/summary.png',
            link:'/Summary/',
             subpages:[]
          },
          //  {
          //   name:'F/U',
          //   icon:'././assets/icon/followup_w.png',
          //   Activeicon:'././assets/icon/followup.png',
          //   link:'/f/u/',
          //    subpages:[]
          // }, 
          // {
          //   name:'FORMS',
          //   icon:'././assets/icon/forms_w.png',
          //   Activeicon:'././assets/icon/forms.png',
          //   link:'/Procedures/',
          //    subpages:[]
          // },
          //   {
          //      name:'FORMS',
          //      icon:'././assets/images/sidenav/forms.png',
          //      subpages:[
          //         {
          //           name:'PROCEDURE',
          //           link:'/Procedures/', 
          //           icon:'assets/images/sidenav/Procedure.png',
          //         }, 
          //         {
          //           name:'C-FORMS',
          //           link:'/Forms/', 
          //           icon:'assets/images/sidenav/forms.png',
          //         },
          //         {
          //           name:'CHECKLIST',
          //           link:'/checkList/', 
          //           icon:'assets/images/sidenav/checklist.png',
          //         }
          //   ]
          // }, 
          
          
              
            ]
          
       
        
        }
        else if(this.roleIdd == '3' && this.calltype == "video call"){
          
          this.pages = [ 
            {
              
              name:'VITALS',
              link:'./Vitals/',     
               icon:'././assets/icon/vitals_w.png',
               Activeicon:'././assets/icon/vitals.png',
               subpages:[]
          }, 
          
        {
          name:'HISTORY',
          icon:'././assets/icon/history_w.png',
          link:'/History/',
          Activeicon:'././assets/icon/history.png',
           subpages:[ ]
        },
        // {
        //   name:'EXAM',
        //   icon:'././assets/icon/examin_w.png',
        //   Activeicon:'././assets/icon/examin.png',
        //   link:'/Lists/', 
        //   subpages:[]
        // },
        {
          name:'IMP',
          icon:'././assets/icon/fi_w.png',
          Activeicon:'././assets/icon/fi.png',
          link:'/Fi/',
           subpages:[ ]
        },
        {
          name:'REPORTS',
          link:'/Reports/',
          icon:'././assets/icon/report_w.png',
          Activeicon:'././assets/icon/report.png',
           subpages:[]
        },
       
        {
          name:'SUMMARY',
          icon:'././assets/icon/summary_w.png',
          Activeicon:'././assets/icon/summary.png',
          link:'/Summary/',
           subpages:[]
        },
        //  {
        //   name:'F/U',
        //   icon:'././assets/icon/followup_w.png',
        //   Activeicon:'././assets/icon/followup.png',
        //   link:'/f/u/',
        //    subpages:[]
        // }, 
        // {
        //   name:'FORMS',
        //   icon:'././assets/icon/forms_w.png',
        //   Activeicon:'././assets/icon/forms.png',
        //   link:'/Procedures/',
        //    subpages:[]
        // },
        //   {
        //      name:'FORMS',
        //      icon:'././assets/images/sidenav/forms.png',
        //      subpages:[
        //         {
        //           name:'PROCEDURE',
        //           link:'/Procedures/', 
        //           icon:'assets/images/sidenav/Procedure.png',
        //         }, 
        //         {
        //           name:'C-FORMS',
        //           link:'/Forms/', 
        //           icon:'assets/images/sidenav/forms.png',
        //         },
        //         {
        //           name:'CHECKLIST',
        //           link:'/checkList/', 
        //           icon:'assets/images/sidenav/checklist.png',
        //         }
        //   ]
        // }, 
        
        
            
          ]
        
     
      
      }

        else{
          
        }
     
    })
  })
 
   });

    this.get();


  }
  help(){
    this.introJS.start(".menu-section");
  }
changeIcon(index)
{
  console.log(index)
  var id = document.getElementById('active_img_'+index)
  id.classList.remove('d-none');
  document.getElementById('img_'+index).classList.add('d-none');
}

//   pages = [
    
//     // // {name: 'PROFILE', link:'/Patientprofile', icon:'person'},
//     // {name: 'VITALS', link:'./Vitals', icon: 'timeline',id:'0'},
//     // {name: 'FORMS', link:'', icon: 'file_copy',id:'1'},
//     // {name: 'REPORTS', link:'/Reports', icon: 'library_add',id:'0'},
//     // {name: 'SYMPTOMS', link:'./Symptoms', icon: 'accessibility',id:'0'},
//     // {name: 'HOPI', link:'/Hopi', icon: 'eco',id:'0'},
//     // {name: 'HISTORY', link:'/History', icon: 'history',id:'0'},
//     // {name: 'GPE', link:'/Gpe', icon: 'history',id:'0'},
//     // {name: 'SE', link:'./Se', icon: 'voicemail',id:'0'},
//     // {name: 'OS', link:'/Os', icon: 'list_alt',id:'0'},
//     // {name: 'FI', link:'/Fi', icon: 'change_history',id:'0'},
//     // {name: 'SUMMARY', link:'/Summary', icon: 'event_note',id:'0'},
//     // {name: 'PROCEDURE', link:'/Procedures', icon: 'double_arrow',id:'0'},
//     // {name: 'Dropdown',link:'', icon: 'double_arrow',id:'0'}
 
//     {
//       name:'VITALS',
//       link:'./Vitals/',     
//        icon:'././assets/images/vitals.png',
//        subpages:[]
//   }, 
  
// {
//   name:'HISTORY',
//   icon:'././assets/images/sidenav/history.png',
//   link:'/History/',
//    subpages:[ ]
// },
// {
//   name:'EXAMINS',
//   icon:'././assets/images/sidenav/Examin.png',
//   link:'/Lists/', 
//   subpages:[]
//   //  subpages:[
//   //    {
//   //     name: 'GPE',
//   //     link:'/Gpe', 
//   //     icon:'././assets/images/sidenav/gpe.png',
//   //    },
//   //    {
//   //     name: 'SE', 
//   //     link:'./Se', 
//   //     icon:'././assets/icons/icons_systmic Examination.svg',
//   //   },
//   //   {
//   //     name: 'OS', 
//   //     link:'/Os', 
//   //     icon:'././assets/images/sidenav/os.png',
//   //   }
    
//   //  ]
// },
// {
//   name:'F.I',
//   icon:'././assets/icons/icons_FI.svg',
//   link:'/Fi/',
//    subpages:[ ]
// },
// {
//   name:'REPORTS',
//   link:'/Reports/',
//   icon:'././assets/images/sidenav/Reports_1.png',
//    subpages:[]
// },
// // {
// //   name:'F/U',
// //   icon:'././assets/images/sidenav/fallowup.png',
// //   link:'/f/u/',
// //    subpages:[]
// // }, 
// {
//   name:'SUMMARY',
//   icon:'././assets/images/sidenav/summary.png',
//   link:'/Summary/',
//    subpages:[]
// },
// //   {
// //      name:'FORMS',
// //      icon:'././assets/images/sidenav/forms.png',
// //      subpages:[
// //         {
// //           name:'PROCEDURE',
// //           link:'/Procedures', 
// //           icon:'././assets/images/sidenav/Procedure.png',
// //         }, 
// //         {
// //           name:'C-FORMS',
// //           link:'/Forms', 
// //           icon:'././assets/images/sidenav/forms.png',
// //         },
// //         {
// //           name:'CHECKLIST',
// //           link:'/checkList', 
// //           icon:'././assets/images/sidenav/checklist.png',
// //         }
// //   ]
// // }, 


    
//   ]

 

  get() {
    // this._sidenavService.GetDetails().subscribe(data =>{
    //   // console.log(data['result']);
    //    this.url = data['result'].url;
    //    console.log(this.url);
    // })
  }

  changeClass(i) {
    console.log(i)
    var elems = document.querySelectorAll(".list-group-item ");
    [].forEach.call(elems, function(el) {
        el.classList.remove("activeNV_link");
    });
    var element = document.getElementById('side_'+i);    
    element.classList.add("activeNV_link")
  }

  changeSubClass(i,j) {
    var elems = document.querySelectorAll(".list-group-item");
    [].forEach.call(elems, function(el) {
        el.classList.remove("activeNV_link");
    });
    var element = document.getElementById('side'+i+'_'+j);    
    element.classList.add("activeNV_link")
  }

  onSinenavToggle() {
    this.sideNavState = !this.sideNavState
    
    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200)
    // this._sidenavService.sideNavState$.next(this.sideNavState)
  }
  select(item) {
    console.log(item)
    this.selected = item; 
};
isActive(item) {
    return this.selected === item;
};
  // increase(){
  //   this.sidenavWidth = 15;
  //   console.log("increase sidenav width");
  // }
  // decrease(){
  //   this.sidenavWidth = 4;
  //   console.log("decrease sidenav width");
  // }

}
