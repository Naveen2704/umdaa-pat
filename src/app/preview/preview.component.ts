import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import { TouchComponent } from '../touch/touch.component';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationService } from '../shared/notification.service';
import { ConfirmdailogService } from '../shared/confirmdailog/confirmdailog.service';
import { PserviceService } from '../services/pservice.service';
import { UsersService } from '../services/users.service';
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
const options = {
  title: 'CONFIRM.DOWNLOAD.JOB.TITLE',
  message: 'Are you sure to delete ?',
  cancelText: 'NO',
  confirmText: 'YES'
};
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  id: string;
  Canvasimagee: any;
  capturedImage;
  count: number = 0;
  @ViewChild('screen', {static: false}) screen: ElementRef;
  @ViewChild('canvas', {static: false}) canvas: ElementRef;
  idea: string;
  backgroundUrl='http://13.126.121.159/dev/uploads/section_images/abdominal_examination_palpation.png';
  iframe: any;
  urltarget: any;
  callbacktarget: any;
  show:boolean = false;
  acting:boolean = false;
  equal:number;
  setId: number;
  id2: string;
  close:boolean =false;
  special:boolean = true;
  id3: string;
  id4: any;
  id123: string;
  roleId: string;
  constructor(private users: UsersService,private pService:PserviceService,private router: Router,private route: ActivatedRoute,public  _notification:NotificationService,
    private _dailog:ConfirmdailogService) { }

  ngOnInit() {
    this.idea = 'assets/images/lines.png';
    this.route.params.subscribe(res => {
      this.id = this.route.snapshot.paramMap.get("id3");
      console.log(this.id);
      this.id2 = this.route.snapshot.paramMap.get("id2");
      console.log(this.id2);
      this.id3 = this.route.snapshot.paramMap.get('id');
      console.log(this.id3);
      this.id4 = this.route.snapshot.paramMap.get('id4');
      console.log(this.id4);
            
      this.roleId = this.route.snapshot.paramMap.get('id5');
      console.log(this.roleId);
      this.users.roleId(this.roleId);

      this.id123 = 'assets/sketches/'+this.id
    });

    (function() {

        
      // document.getElementById('userAgent').textContent = navigator.userAgent;
    
      var isActive = false;
    
      var canvas = <HTMLCanvasElement>document.getElementById('drawCanvas');
      var ctx = canvas.getContext('2d');
      
      // Media-queries
      if (window.matchMedia('(min-width: 420px)').matches) {
        canvas.width = 400;
        canvas.height = 400;
        } else {
          canvas.width = 300;
        canvas.height = 300;
        }
      ctx.lineWidth = 3;const lineWidthRange = <HTMLElement> document.querySelector( '.js-line-range' );
      const lineWidthLabel = document.querySelector( '.js-range-value' );
  
  lineWidthRange.addEventListener( 'input', event => {
    console.log(((event.target) as HTMLInputElement).value);
     var elementt = event.target as HTMLInputElement;
       const widthh = elementt.value; 
      lineWidthLabel.innerHTML =  widthh;
      ctx.lineWidth = parseInt(elementt.value); 
  } );


   const colorPicker = document.querySelector( '.js-color-picker');
  
  colorPicker.addEventListener( 'change', event => {
  
      ctx.strokeStyle = ((event.target) as HTMLTextAreaElement).value ; 
  });
  
      // ctx.strokeStyle = document.querySelector(':checked').value;
      
      // document.getElementById('colorSwatch').addEventListener('click', function() {
      //   // ctx.strokeStyle = document.querySelector(':checked').value;
      // }, false);
      
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
      // img.src = 'http://13.126.121.159/dev/uploads/section_images/ENT-Throat.png'.replace(/^data:image\/(png|jpg);base64,/, "");
      // var baseImage = img.src.replace(/^data:image\/(png|jpg);base64,/, "");
    
      img.onload = function() {
        ctx.drawImage(img, 0, 0,img.width*0.5,img.height*.5);
        // var ptrn = ctx.createPattern(img, 'repeat'); // Create a pattern with this image, and set it to "repeat".
        // ctx.fillStyle = ptrn;
        //  ctx.fillRect(0, 0, img.width/3,img.height/3.5);
      };
    
      function draw(e) {
        e.preventDefault();
        if(isActive) {

          var x = isTouchSupported ? (e.targetTouches[0].pageX - canvas.offsetLeft-72) : (e.offsetX || e.layerX - canvas.offsetLeft);
          var y = isTouchSupported ? (e.targetTouches[0].pageY - canvas.offsetTop-72) : (e.offsetY || e.layerY - canvas.offsetTop);
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
      
      

      // function getBase64Image(img) {
      //   var canvas = document.createElement("canvas");
      //   canvas.width = img.width;
      //   canvas.height = img.height;
      //   var ctx = canvas.getContext("2d");
      //   ctx.drawImage(img, 0, 0);
      //   var dataURL = canvas.toDataURL("image/png");
      //   return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
      // }
      
    //   if (window.matchMedia('(min-width: 420px)').matches) {

    //     // img.src=base64
    //     //  img.alt="Smiley face"
    //     //  img.width = 10;
    //     //  img.height = 10;
    //  var elem = document.createElement("img");
    //       elem.setAttribute("src", 'assets/images/lines.png');
    //    elem.setAttribute("height", "80%");
    //       elem.setAttribute("width", "50%");
    //     } else {
    //       img.src = 'base64';
    //     }
      
    
    })();

    this.pService.editUser(this.id3);
    this.pService.editUserr(this.id4);
    this.pService.previewName('preview');
  //  this.check('http://13.126.121.159/dev/uploads/section_images/'+this.id);

   var SEPreviews = localStorage.getItem('SESpecialImage,'+this.id2);
   if(SEPreviews != null)
   {
     this.equal = 6;
   }
   else if(this.setId == 1)
   {
     this.equal = 6;
   }
 else{
   this.equal = 12;
 }
   var SEPreviews = localStorage.getItem('SESpecialImage,'+this.id2);
   if(SEPreviews != null)
   {
     this.backImage();
   }
  }

  // check(a)
  // {
  //   console.log(a);

  //   var getDataUri = function (targetUrl, callback) {
  //     var xhr = new XMLHttpRequest();
  //     xhr.onload = function () {
  //         var reader = new FileReader();
  //         reader.onloadend = function () {
  //             callback(reader.result);
            
  //         };
  //         reader.readAsDataURL(xhr.response);
  //     };
  //     var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  //     xhr.open('GET', proxyUrl + targetUrl);
  //     xhr.responseType = 'blob';
  //     xhr.send();
    
  // };
  // getDataUri(a, function (base64) {
  //   // base64 availlable here
  //   // console.log(base64);
   
  // })

  // // console.log(this.impcode);

  // }

  clickmeeee() {
    var checkImage = localStorage.getItem('SESpecialImage,'+this.id2);
    if(checkImage != null)
    {
      this._notification.warning('Image Already Exists');
    }
    else{
      this.special = false;
      this.equal = 6;
      this.show = true;
      this.close = true;
      html2canvas(this.screen.nativeElement).then(canvas => {
        // alert(this.canvas.nativeElement.src);
        if(this.canvas.nativeElement.src == '')
        {
          
          this.canvas.nativeElement.src =canvas.toDataURL();
          var canvas = <HTMLCanvasElement>document.getElementById('drawCanvas');
          var ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          this.setId =1;
          this.ngOnInit();
        }
      });
    }

  }

  imgDelete()
  {
    html2canvas(this.screen.nativeElement).then(canvas => {
      
      this._dailog.open(options).afterClosed().subscribe(res=>{
        if(res){
      this.canvas.nativeElement.src ='';
      this._notification.error('Deleted Successfully');
      this.show = false;
      this.close =false;
      this.special = true;
      this.equal = 12;
        }
      });
    });
  }

  saveImage()
  {
    html2canvas(this.screen.nativeElement).then(canvas => {
      // console.log(this.canvas.nativeElement.src);
      // var value = [{id:this.id2,value:this.canvas.nativeElement.src}]
      localStorage.setItem( 'SESpecialImage,'+this.id2  ,this.canvas.nativeElement.src);
      this.show=false;
      var SEPreviews = localStorage.getItem('SESpecialImage,'+this.id2);
      // alert(SEPreviews[0]['id']);
      if(SEPreviews == null)
      {
 
        this._notification.warning('No Previews');
      }
      else{
         this.acting = true;
        var aggi = <HTMLImageElement>document.getElementById('place');
        aggi.src = SEPreviews;
        this._notification.success('SuccessFully Saved');
      }
    });
  }
  
  backImage()
  {
    this.close =true;
    this.acting =true;
    var SEPrev = localStorage.getItem('SESpecialImage,'+this.id2);
    if(SEPrev == null)
    {
      this._notification.warning('No Previews');
    }
    else{
      var aggii = <HTMLImageElement>document.getElementById('place');
      aggii.src = SEPrev;
      this._notification.success('SuccessFully Saved');
    }
  }

  delete()
  {
    
    this._dailog.open(options).afterClosed().subscribe(res=>{
      if(res){
     localStorage.removeItem('SESpecialImage,'+this.id2);
     var canvasssss = <HTMLImageElement>document.getElementById('place');
     canvasssss.src = '';
     this._notification.error('Deleted Successfully');
     this.acting =false;
     this.close =false;
     this.special = true;
     this.equal = 12;
      }
    });
  }

  link()
  {

    if(this.id3 == 'SE' || this.id3 == 'GPE' || this.id3 == 'OS')
    {
      this.router.navigate([this.id3+'/'+this.id4+'/'+this.roleId]);
    }
    else
    {
      this.router.navigate(['History/'+this.id4 +'/'+this.roleId]);
    }
    
  }

}
