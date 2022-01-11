import {Component,OnInit,ViewChild,ElementRef} from '@angular/core';
import html2canvas from 'html2canvas';
// import { TestService } from '../services/test.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationService } from '../shared/notification.service';
import { ConfirmdailogService } from '../shared/confirmdailog/confirmdailog.service';
import { HeaderComponent } from '../header/header.component';
import { UserService } from '../services/user.service';
import { UsersService } from '../services/users.service';
const options = {
  title: 'CONFIRM.DOWNLOAD.JOB.TITLE',
  message: 'Are you sure to delete ?',
  cancelText: 'NO',
  confirmText: 'YES'
};
// import * as $ from 'jquery';
declare global  {
  interface Window {
    PointerEvent: typeof PointerEvent;
  }
}
declare global  {
  interface Window {
    MSPointerEvent: typeof MSPointerEvent;
  }
}
// declare var PointerEvent;
// declare var window: Window;

@Component({
  selector: 'app-touch',
  templateUrl: './touch.component.html',
  styleUrls: ['./touch.component.css']
})
export class TouchComponent implements OnInit {
  // @ViewChild('myname') input:any;
  @ViewChild(HeaderComponent,{static: false}) private _child: 
  HeaderComponent;
  capturedImage: string;
  canvasImageUrl: string;
  text: string;
  count: number = 0;
  show:boolean = false;
  showw: boolean= false;
  verify: boolean = false;
  close:boolean = false;
  acting:boolean = false;
  hideImage:boolean;
  abc: number;
  previewOne: any;
  previewTwo: any;
  @ViewChild('screen', {static: false}) screen: ElementRef;
  @ViewChild('canvas', {static: false}) canvas: ElementRef;
  @ViewChild('canvass', {static: false}) canvass: ElementRef;
  @ViewChild('downloadLink', {static: false}) downloadLink: ElementRef;
  id: string;
  actingg: boolean= false;
  type1: string = 'delete';
  type2: string = 'delete';
  nameOne: string;
  nameTwo: string;
  equal: number;
  share:number;
  verificationOne: number =0;
  verificationTwo: number =0;
  hero:boolean = false;
  text123: string;
  special:boolean = true;
  speciall:boolean = true;
  lateImage: string='zero';
  returnUrl:string;
  id2: string;
  roleId: string;

  constructor(private users: UsersService,private userService: UserService,private route: ActivatedRoute,private router: Router, private _dailog:ConfirmdailogService, public  _notification:NotificationService) {}


  ngOnInit() {
// alert(this.lateImage);

// this._child.check123();


    
    console.log(this.count);
 

     this.equal =12;

    // var SEPreviews = localStorage.getItem('SEPreview1');
    // var SEPr= localStorage.getItem('SEPreview2');
      
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);

    this.id2 = this.route.snapshot.paramMap.get('id3');
    console.log(this.id2);

    var getInfo = this.route.snapshot.paramMap.get('id2');
    console.log(getInfo);

    
    this.roleId = this.route.snapshot.paramMap.get('id4');
    console.log(this.roleId);
    this.users.roleId(this.roleId);


    this.userService.editUser(this.id);
     this.users.editUser(this.id2);
     this.users.editrouter('touch');

    if(this.id == 'SE')
    {
      this.nameOne = 'SE,'+getInfo +',one1';
      this.nameTwo = 'SE,'+getInfo+',one2';
    }
    else if(this.id == 'GPE')
    {
      this.nameOne = 'GPE,'+getInfo +',one1';
      this.nameTwo = 'GPE,'+getInfo+',one2';
    }
    else if(this.id == 'OS')
    {
      this.nameOne = 'OS,'+getInfo +',one1';
      this.nameTwo = 'OS,'+getInfo+',one2';
    }
    else if(this.id == 'Family')
    {
      this.nameOne = 'Family,'+getInfo +',one1';
      this.nameTwo = 'Family,'+getInfo+',one2';
    }
    else if(this.id == 'Past')
    {
      this.nameOne = 'Past,'+getInfo +',one1';
      this.nameTwo = 'Past,'+getInfo+',one2';
    }
    else if(this.id == 'Personal')
    {
      this.nameOne = 'Personal,'+getInfo +',one1';
      this.nameTwo = 'Personal,'+getInfo+',one2';
    }
    else if(this.id == 'Social')
    {
      this.nameOne = 'Social,'+getInfo +',one1';
      this.nameTwo = 'Social,'+getInfo+',one2';
    }
    else if(this.id == 'Treatment')
    {
      this.nameOne = 'Treatment,'+getInfo +',one1';
      this.nameTwo = 'Treatment,'+getInfo+',one2';
    }
    else if(this.id == 'HOPI')
    {
      this.nameOne = 'HOPI,'+getInfo +',one1';
      this.nameTwo = 'HOPI,'+getInfo+',one2';
    }
    else
    {

    }



    

    var SChecking = localStorage.getItem(this.nameOne);
    var SEPCheck = localStorage.getItem(this.nameTwo);

    if(SChecking == null && SEPCheck == null)
    {
      this.equal =12;
    }
    else{
      this.equal =6;
    }

    // if(this.id == '0')
    // {
    //   if(SEPreviews == null && SEPr == null)
    //   {
  
    //     // alert("No Previews");
    //   }
    //   else{
    //     this.router.navigate(['/preview/']);
    //   }
    // }
    // else if(this.id == '1')
    // {
    //      this.count = 0;


    // }
    // else if(this.id == '2')
    // {
    //   this.count = 1;
      
    //   // this.clickme(1);
    // }
    // else{

    // }

    (function() {
      // document.getElementById('userAgent').textContent = navigator.userAgent;
     
      var isActive = false;
    
      var canvas = <HTMLCanvasElement>document.getElementById('drawCanvas');
      var ctx = canvas.getContext('2d');
     
      // Media-queries
      if (window.matchMedia('(min-width: 420px)').matches) {
        canvas.width = 570;
        canvas.height = 400;
        } else {
          canvas.width = 570;
          canvas.height = 400;
        }
            
            const lineWidthRange = <HTMLElement> document.querySelector( '.js-line-range' );
            const lineWidthLabel = document.querySelector( '.js-range-value' );
        
        lineWidthRange.addEventListener( 'input', event => {
          console.log(((event.target) as HTMLInputElement).value);
           var elementt = event.target as HTMLInputElement;
             const widthh = elementt.value; 
            lineWidthLabel.innerHTML =  widthh;
            ctx.lineWidth = parseInt(elementt.value); 
        } );
      // ctx.lineWidth = 3;
      // ctx.strokeStyle = document.querySelector(':checked').value;
      
      // document.getElementById('colorSwatch').addEventListener('click', function() {
      // 	ctx.strokeStyle = document.querySelector(':checked').value;
      // }, false);
      
         const colorPicker = document.querySelector( '.js-color-picker');
        
        colorPicker.addEventListener( 'change', event => {
        
            ctx.strokeStyle = ((event.target) as HTMLTextAreaElement).value ; 
        });
        
      
      var isTouchSupported = 'ontouchstart' in window;
      var isPointerSupported = window.PointerEvent;
      var isMSPointerSupported =  window.MSPointerEvent;
      
      var downEvent = isTouchSupported ? 'touchstart' : (isPointerSupported ? 'pointerdown' : (isMSPointerSupported ? 'MSPointerDown' : 'mousedown'));
      var moveEvent = isTouchSupported ? 'touchmove' : (isPointerSupported ? 'pointermove' : (isMSPointerSupported ? 'MSPointerMove' : 'mousemove'));
      var upEvent = isTouchSupported ? 'touchend' : (isPointerSupported ? 'pointerup' : (isMSPointerSupported ? 'MSPointerUp' : 'mouseup'));
       
      // document.getElementById('eventType').textContent = downEvent + ', ' + moveEvent + ', ' + upEvent;
        
      canvas.addEventListener(downEvent, startDraw, false);
      canvas.addEventListener(moveEvent, draw, false);
      canvas.addEventListener(upEvent, endDraw, false);
        
      var img = new Image();
      // img.src = 'http://13.126.121.159/dev/uploads/section_images/ENT_Nose.png';
      img.onload = function() {
        ctx.drawImage(img, 0, 0);
      };
    
      function draw(e) {
        e.preventDefault();
        if(isActive) {
          var x = isTouchSupported ? (e.targetTouches[0].pageX - canvas.offsetLeft - 72) : (e.offsetX || e.layerX - canvas.offsetLeft- 72);
          var y = isTouchSupported ? (e.targetTouches[0].pageY - canvas.offsetTop - 72) : (e.offsetY || e.layerY - canvas.offsetTop- 72);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      }
      
      function startDraw(e) {

        e.preventDefault();
        isActive = true;
        ctx.beginPath();
      }
      
      function endDraw(e) {
        e.preventDefault();
        isActive = false;
      }
        const clearButton = document.getElementById('clear-button');
        const eraser = document.getElementById('eraser-button');
        const draw_AfterErase = document.getElementById('draw-button');
        
        clearButton.addEventListener('click', handleClearButtonClick);
        eraser.addEventListener('click', eraseButtonClick);
        draw_AfterErase.addEventListener('click', drawButtonClick);
    
        function handleClearButtonClick(event) {
          event.preventDefault();
          
          clearCanvas();
        }
        
        function clearCanvas() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
         
        function eraseButtonClick()
        {
          ctx.globalCompositeOperation="destination-out";
          // ctx.lineWidth = 5;
        }
        
        function drawButtonClick()
        {
          ctx.globalCompositeOperation="source-over";
        }
        
        
    
      // if (window.matchMedia('(min-width: 420px)').matches) {
      // 	img.src = 'assets/images/lines.png'
    
      // 	} else {
      // 		img.src = 'assets/images/lines.png'
      // 	}
    
    })();


      var SEPreviews = localStorage.getItem(this.nameOne);
      if(SEPreviews != null)
      {
        // this.acting=true;
        // var elem =<HTMLElement> document.getElementById("abc");
        // elem.parentNode.removeChild(elem);
        this.backImage();
      
      }
  



    var SEP = localStorage.getItem(this.nameTwo);
    if(SEP != null)
    {
      this.backImagee();
    }



      }

  clickme(a) {

    if(a == 0)
    {
      var previewOne = localStorage.getItem(this.nameOne);
      var previewTwo = localStorage.getItem(this.nameTwo);
      if(previewOne != null)
      {
        // alert("Show Off");
        var previewTwo = localStorage.getItem(this.nameTwo);
        if(previewTwo != null)
        {
          this._notification.warning('Only Two Previews');
          
        }
        else
        {
        this.speciall = false;
           this.showw = true;
      
          html2canvas(this.screen.nativeElement).then(canvas => {
            
               if(this.canvass.nativeElement.src == '')
               {
              //   setTimeout(function () {
              //    document.getElementById('download').style.display='none';
              // }, 2000);
                 this.canvass.nativeElement.src = canvas.toDataURL('image/jpeg');
                 this.verificationTwo = 2;
                 this.count = 2;
                 var canvas = <HTMLCanvasElement>document.getElementById('drawCanvas');
                var ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                //  this.ngOnInit();
               }
               else{
                this._notification.warning('Only Two Previews');
                 var canvas = <HTMLCanvasElement>document.getElementById('drawCanvas');
                var ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                //  this.ngOnInit();
               }
             });
        }

      }
      // else if(previewTwo == null)
      // {
      //   // alert("Show Off");
      // }
      else{
        this.special = false;
        this.close =true;
        this.show = true;
        this.equal = 6;
      
        html2canvas(this.screen.nativeElement).then(canvas => {
          if(this.canvas.nativeElement.src == '')
          {
            // var canvasss = <HTMLImageElement>document.getElementById('welcome');
            // canvasss.src = canvas.toDataURL('image/jpeg');
            this.lateImage = canvas.toDataURL('image/jpeg');
            this.canvas.nativeElement.src =canvas.toDataURL('image/jpeg');
            this.verificationOne = 1;
            console.log(this.canvas.nativeElement.src);
            
            this.count = 1;
            var canvas = <HTMLCanvasElement>document.getElementById('drawCanvas');
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // this.ngOnInit();
          }
        });
      }

    }
    else if(a == 1)
    {
      var previewTwo = localStorage.getItem(this.nameTwo);
      if(previewTwo != null)
      {
        this._notification.warning('Only Two Previews');
      }
      else
      {
        this.speciall = false;
        this.showw = true;
        html2canvas(this.screen.nativeElement).then(canvas => {
          
             if(this.canvass.nativeElement.src == '')
             {
             
               this.canvass.nativeElement.src = canvas.toDataURL('image/jpeg');
               this.verificationTwo = 2;
               this.count = 2;
               var canvas = <HTMLCanvasElement>document.getElementById('drawCanvas');
              var ctx = canvas.getContext('2d');
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              //  this.ngOnInit();
             }
             else{
              this._notification.warning('Only Two Previews');
               var canvas = <HTMLCanvasElement>document.getElementById('drawCanvas');
              var ctx = canvas.getContext('2d');
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              //  this.ngOnInit();
             }
           });
      }

    }
    else{
      this._notification.warning('Only Two Previews');
      var canvas = <HTMLCanvasElement>document.getElementById('drawCanvas');
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // this.ngOnInit();
    }
      
        }


    imgDelete()
    {
      // this.close = false;
      html2canvas(this.screen.nativeElement).then(canvas => {

        this._dailog.open(options).afterClosed().subscribe(res=>{
          if(res){
            this.canvas.nativeElement.src ='';
            this._notification.error('Deleted SuccessFully');
            this.verificationOne = 0;
            this.show = false;
            this.special = true;
            // this.equal = 12;
             this.count = 0;
             localStorage.removeItem(this.nameOne);
            //  alert(this.verificationTwo);
             if(this.verificationTwo == 0)
             {
              this.equal = 12;
              this.close = false;
             }
             else
             {
               this.equal = 6;
             }
            //  var SECheck= localStorage.getItem(this.nameTwo);
          }
        })


      });
    }
  
    imgDeletee()
    {
      html2canvas(this.screen.nativeElement).then(canvas => {
        this._dailog.open(options).afterClosed().subscribe(res=>{
          if(res){
        this.verificationTwo = 0;
        if(this.verificationOne == 0)
        {
         this.equal = 12;
         this.close = false;
        }
        else
        {
          this.equal = 6;
        }
        this.canvass.nativeElement.src ='';
        this._notification.error('Deleted SuccessFully');
        this.showw = false;
        this.speciall = true;
         if(this.canvas.nativeElement.src == '')
         {
          this.count = 0;
         }
         else{
          this.count = 1;
         }
        //  alert(this.verificationOne);
          }});
      });
    }

    saveImage()
    {
    
       this.acting = true;
      html2canvas(this.screen.nativeElement).then(canvas => {
        // alert(this.canvas.nativeElement.src);
        console.log(this.canvas.nativeElement.src);
        localStorage.setItem( this.nameOne , this.canvas.nativeElement.src);
        this.show = false;
        // this.acting = true;
        var SEPreviews = localStorage.getItem(this.nameOne);
        // alert(SEPreviews);
        if(SEPreviews == null)
        {
   
          this._notification.warning('No Peview');
        }
        else{
           this.acting = true;
          var aggi = <HTMLImageElement>document.getElementById('place');
          aggi.src = SEPreviews;
          this._notification.success('SuccessFully Saved');
          // this.count = 1;
            // this.acting = true;
          // var elem = document.createElement("img");
          // elem.setAttribute("src", SEPreviews);
          // elem.setAttribute("height", "80%");
          // elem.setAttribute("width", "50%");
          // document.getElementById("place").appendChild(elem);
        }
        // this.router.navigate(['/preview/']);
      });
    }
    saveImagee()
    {
       this.actingg = true;
      html2canvas(this.screen.nativeElement).then(canvas => {
        // alert(this.canvas.nativeElement.src);
        console.log(this.canvass.nativeElement.src);
        // console.log(this.canvass.nativeElement.src.width);
        // alert(this.canvass.nativeElement.src);
        localStorage.setItem( this.nameTwo, this.canvass.nativeElement.src);
        // this.router.navigate(['/preview/']);
        this.showw = false;
         var SEPrev= localStorage.getItem(this.nameTwo);
        // // alert(SEPreviews);
        if(SEPrev == null)
        {
   
          this._notification.warning('No Previews');
        }
        else{
           this.actingg = true;
          var aggi = <HTMLImageElement>document.getElementById('placee');
          aggi.src = SEPrev;
          this._notification.success('SuccessFully Saved');

          // this.count = 1;
          //  this.acting = true;
          // var element = document.createElement("img");
          // element.setAttribute("src", SEPrev);
          // element.setAttribute("height", "80%");
          // element.setAttribute("width", "50%");
          // document.getElementById("placee").appendChild(element);
        }
      });
    }



    //  loadImage()
    // {

    //   // alert("welocme");
    //   // this.verify = true;
    //   // console.log(localStorage.getItem('SEPreview1'));
    //   var SEPreviews = localStorage.getItem('SEPreview1');
    //   // alert(SEPreviews);
    //   if(SEPreviews == null)
    //   {
 
    //     alert("No Previews");
    //   }
    //   else{
    //     this.show = false;
    //     var elem = document.createElement("img");
    //     elem.setAttribute("src", SEPreviews);
    //     elem.setAttribute("height", "80%");
    //     elem.setAttribute("width", "50%");
    //     document.getElementById("place").appendChild(elem);
    //   }

    //   // this.show = true;
    //   // console.log(localStorage.getItem('SEPreview1'));
    //   // var SEPreviews = localStorage.getItem('SEPreview1');
    //   // console.log(SEPreviews);
    
    //   // html2canvas(this.screen.nativeElement).then(canvas => {
    //   //     this.canvas.nativeElement.src = SEPreviews;
    //   // });
    
    // }
    

delete()
{

 
  // this.acting =false;
  // this.type1= "delete";
  this._dailog.open(options).afterClosed().subscribe(res=>{
    console.log(res );
    if(res){
      localStorage.removeItem(this.nameOne);
   var canvasssss = <HTMLImageElement>document.getElementById('place');
   canvasssss.src = '';
   this._notification.error('Deleted SuccessFully');
   this.acting =false;
   this.special = true;
   this.count = 0;
   this.verificationOne = 0;
    if(this.verificationTwo == 0)
    {
     this.equal = 12;
    //  this.close = false;
    }
    else
    {
      this.equal = 6;
    }

    var SP= localStorage.getItem(this.nameTwo);
    if(SP != null)
    {
      this.equal = 6;
    }
    else
    {
      this.equal = 12;
    //  this.close = false;

    }
  }
});
  // canvasssss.setAttribute("src", 'assets/images/lines.png'); 
  // this.ngOnInit();
  // var element = document.createElement("img");
  // element.setAttribute("src", 'assets/images/lines.png');
  // // element.setAttribute("height", "80%");
  // // element.setAttribute("width", "50%");
  // document.getElementById("place").appendChild(element);
  //   this.ngOnInit();
 
}

deletee()
{


  this._dailog.open(options).afterClosed().subscribe(res=>{
    if(res){
      localStorage.removeItem(this.nameTwo);
  var can = <HTMLImageElement>document.getElementById('placee');
  can.src = '';
  this._notification.error('Deleted SuccessFully');
  this.actingg =false;
  this.speciall = true;
  var SP= localStorage.getItem(this.nameOne);
  if(SP == null)
  {
   this.count = 0;
  }
  else{
   this.count = 1;
  }
  this.verificationTwo = 0;
  if(this.verificationOne == 0)
  {
   this.equal = 12;
   this.close = false;
  }
  else
  {
    this.equal = 6;
  }
  // this.actingg =false;
  // // this.type2= "delete";
  //  this.ngOnInit();
}
  });
}



backImage()
{
  this.special = false;
  this.close =true;
   this.acting =true;
  var SEPreviews = localStorage.getItem(this.nameOne);
  // alert(SEPreviews);
  if(SEPreviews == null)
  {

     this._notification.warning('No Previews');
  }
  else{
    // this.acting =true;
    // this.count = 1;
    // this.show = false;
    var aggii = <HTMLImageElement>document.getElementById('place');
    aggii.src = SEPreviews;
    // var elem = document.createElement("img");
    // elem.setAttribute("src", SEPreviews);
    // elem.setAttribute("height", "80%");
    // elem.setAttribute("width", "50%");
    // document.getElementById("place").appendChild(elem);
  }
}


backImagee()
{
  this.speciall = false;
  this.close =true;
   this.actingg =true;
  var SEPrevie = localStorage.getItem(this.nameTwo);
  // alert(SEPreviews);
  if(SEPrevie == null)
  {

    this._notification.warning('No Previews');;
  }
  else{
    // this.actingg =true;
    // this.count = 2;
    // this.showw = false;
    var aggiii = <HTMLImageElement>document.getElementById('placee');
    aggiii.src = SEPrevie;
    // var elem = document.createElement("img");
    // elem.setAttribute("src", SEPrevie);
    // elem.setAttribute("height", "80%");
    // elem.setAttribute("width", "50%");
    // document.getElementById("placee").appendChild(elem);
  }
}

link()
{
  if(this.id == 'SE' || this.id == 'GPE' || this.id == 'OS')
  {
    this.router.navigate([this.id+'/'+this.id2]);
  }
  else
  {
    this.router.navigate(['History/'+this.id2]);
  }
    
}

// backImage()
// {
//   this.show = true;
//   html2canvas(this.screen.nativeElement).then(canvas => {
    
//     if(this.canvas.nativeElement.src == '')
//     {
//       this.canvas.nativeElement.src =canvas.toDataURL();
//       console.log(this.canvas.nativeElement.src);
//       var SEPr= localStorage.getItem('SEPreview2');
//       if(SEPr != null)
//       {
//         alert('Aggi Raja Two Images Saved!!');
//         // this.count = 1;
//         // this.ngOnInit();
//       }
     
//     }
//   });
// }

sendBack()
{

  if(this.id == 'SE')
  {
    this.router.navigate([this.id+'/'+this.id2+'/'+this.roleId]);
  }
  else if(this.id== 'GPE')
  {
    this.router.navigate([this.id+'/'+this.id2+'/'+this.roleId]);
  }
  else if(this.id == 'OS')
  {
    this.router.navigate([this.id+'/'+this.id2+'/'+this.roleId]);
  }
 else{
  this.router.navigate(['History/'+this.id2+'/'+this.roleId]);
 }
  
}


}


