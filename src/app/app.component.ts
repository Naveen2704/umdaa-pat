import { Component, Input, Output,EventEmitter } from '@angular/core';
import { onMainContentChange } from './animations';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { filter, windowTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ onMainContentChange ]
})
export class AppComponent {

  public sideNavState: boolean = true;
  
  @Input() app_id: any;
  title = 'umdaa-app';
  public onSideNavChange: boolean;
  id: any;
  urlCheck: boolean;
  hide: boolean = false;
  show: boolean = true;
  constructor(private route: ActivatedRoute,private router: Router,private location: Location) { 

  }

  ngOnInit() {
    console.log(this.id);
    // this.get(this.id);
    console.log(this.router.url);
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)  
    ).subscribe((event: NavigationEnd) => {
      console.log(event.url);
      
      localStorage.setItem('latestUrl', event.url);
      this.urlCheck = event.url.includes("version2");
      console.log(this.urlCheck);
      if(this.urlCheck == true)
      {
        this.hide = true;
        this.show = false;
        // window.location.reload()
      }else{
        this.show = true;
        this.hide = false;
        // window.location.reload()
      }
    });
  }

  

}
