import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import {ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../services/service.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { SketchDialogComponent } from '../sketch-dialog/sketch-dialog.component';
import { FiService } from '../fi/fi.service';


@Component({
  selector: 'app-secondsektch',
  templateUrl: './secondsektch.component.html',
  styleUrls: ['./secondsektch.component.css']
})
export class SecondsektchComponent implements OnInit {
  // export class SketchDialogComponent implements OnInit {

    @ViewChild('screennn', {static: false}) screennn: ElementRef;
    @ViewChild('canvas', {static: false}) canvas: ElementRef;
    @ViewChild('canvass', {static: false}) canvass: ElementRef;
    @ViewChild('downloadLink', {static: false}) downloadLink: ElementRef;
    // @ViewChild('myname') input:any;
    capturedImage: string;
    canvasImageUrl: string;
    text: string;
    count: number = 0;
    show:boolean = false;
    aggi:boolean=true;
    fire:boolean=false;
    showw: boolean= false;
    hideLeftArrow:boolean=true;
    hideRightArrow:boolean=false;
    abc: number;
    previewOne: any;
    previewTwo: any;
    hideDelete:boolean=false;
    hideAdd:boolean=false;
    selectedFile : File = null;
    dataImage: {};
    backgroundUrl:string;
    backgroundUrl2:string;
    first:boolean=true;
    second:boolean=false;
    dialogText: any;
    dialogappId: any;
    dialogDataOne: any;
    dialogDataTwo: any;

  resultObj: any;
    constructor(private see:FiService,public dialogRef: MatDialogRef<SecondsektchComponent>, 
      public dialog: MatDialog, private router: Router,@Inject(MAT_DIALOG_DATA) public result,
      private _dataService:ServiceService,private http:HttpClient) 
      { 
         this.resultObj = result.obj

        console.log(this.resultObj)
      }
  
    ngOnInit() {
      
    this.dialogText = this.result.text;
    this.dialogappId = this.result.appId;
    // this.resultObj = this.result.obj
    console.log(this.dialogText,this.dialogappId);
    this.dialogDataOne = this.dialogText+this.dialogappId+1;
    this.dialogDataTwo = this.dialogText+this.dialogappId+2;

    if(localStorage.getItem(this.dialogDataTwo) == null )
    {
      this.backgroundUrl="assets/images/lines.jpeg";
    }
    else
    {
      this.backgroundUrl=localStorage.getItem(this.dialogDataTwo);
      // if(localStorage.getItem(this.dialogDataOne) != null)
      // {
        // if(this.dialogText=='CD')
        // {
        // this.hideDelete=false;
        // }else{
          this.hideDelete=true;
        // }
      //   this.hideRightArrow=true;
      //   this.hideAdd=false;
      // }
      // else{
      //   this.hideAdd=true;
      //   this.hideDelete=true;
      // }
    }

      // console.log(localStorage.getItem('SEPreview1'));
      // if(localStorage.getItem('SEPreview1') == null )
      // {
        // this.backgroundUrl="assets/images/lines.png";
       
      // }
      // else
      // {
      //   this.backgroundUrl=localStorage.getItem('SEPreview1');
      //   if(localStorage.getItem('SEPreview2') != null)
      //   {
      //     this.hideDelete=true;
      //     this.hideRightArrow=true;
      //     this.hideAdd=false;
      //   }
      //   else{
      //     this.hideAdd=true;
      //     this.hideDelete=true;
      //   }
      // }
  
      // if(localStorage.getItem('SEPreview2') == null)
      // {
      //   this.backgroundUrl2="assets/images/lines.png";
       
      // }
      // else
      // {
      //   this.backgroundUrl2=localStorage.getItem('SEPreview2');
      // }
    
      console.log(screen.width);console.log(screen.width);
      // console.log(screen.width.substring(0, 3));
  // this.loadImage();
   (function() {
    
     // document.getElementById('userAgent').textContent = navigator.userAgent;
   
     var isActive = false;
   
     var canvass = <HTMLCanvasElement>document.getElementById('drawCanvass');
     var ctx = canvass.getContext('2d');
  
    //  var canvass = <HTMLElement>document.getElementById('download');
    //  var canvass = this.loadImage();
     
     // Media-queries
     if (window.matchMedia("(orientation: portrait)").matches) {
      if (window.matchMedia('(min-width: 1025px)').matches) {
       canvass.width = 500;
       canvass.height = screen.height-220;
       }
       else if(window.matchMedia('(min-width:767px) and (max-width: 1024px)').matches)
       {
         canvass.width = screen.width;
         canvass.height = screen.height-330;
       }
        else {
         canvass.width = screen.width;
         canvass.height = screen.height-280;
       }
     }
   
     if (window.matchMedia("(orientation: landscape)").matches) {
     if (window.matchMedia('(min-width: 1025px)').matches) {
      canvass.width = 500;
      canvass.height = screen.height-270;
      }
      else if(window.matchMedia('(min-width:767px) and (max-width: 1024px)').matches)
      {
        canvass.width = screen.width;
        canvass.height = screen.height-150;
      }
       else {
        canvass.width = screen.width;
        canvass.height = screen.height-100;
      }
    }
    //  if (window.matchMedia('(min-width: 1025px)').matches) {
    //   canvass.width = 500;
    //   canvass.height = screen.height-220;
    //   }
    //   else if(window.matchMedia('(min-width:767px) and (max-width: 1024px)').matches)
    //   {
    //     canvass.width = screen.width;
    //     canvass.height = screen.height-330;
    //   }
    //    else {
    //     canvass.width = screen.width;
    //     canvass.height = screen.height-280;
    //   }
          
    //  if (window.matchMedia('(min-width: 1025px)').matches) {
    //    canvas.width = 500;
    //    canvas.height =500;
    //    }
    //     else {
    //      canvas.width = screen.width;
    //      canvas.height = screen.height-180;
    //    }
           
           const lineWidthRangee = <HTMLElement> document.querySelector( '.js-line-rangee' );
           const lineWidthLabell = document.querySelector( '.js-range-valuee' );
       
       lineWidthRangee.addEventListener( 'input', event => {
         console.log(((event.target) as HTMLInputElement).value);
          var elementt = event.target as HTMLInputElement;
            const widthh = elementt.value; 
           lineWidthLabell.innerHTML =  widthh;
           ctx.lineWidth = parseInt(elementt.value); 
       });
  
       
     // ctx.lineWidth = 3;
     // ctx.strokeStyle = document.querySelector(':(check)ed').value;
     
     // document.getElementById('colorSwatch').addEventListener('click', function() {
     // 	ctx.strokeStyle = document.querySelector(':checked').value;
     // }, false);
     
        const colorPicker = document.querySelector( '.js-color-pickerr');
       
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
       
     canvass.addEventListener(downEvent, startDraw, false);
     canvass.addEventListener(moveEvent, draw, false);
     canvass.addEventListener(upEvent, endDraw, false);
     
     var img = new Image();
     img.onload = function() {
       ctx.drawImage(img, 0, 0);
     };
   
 
     function draw(e) {
      e.preventDefault();
      if(isActive) {
        if (window.matchMedia("(orientation: portrait)").matches) {
        var x = isTouchSupported ? (e.targetTouches[0].pageX - canvass.offsetLeft- 10) : (e.offsetX || e.layerX - canvass.offsetLeft);
        var y = isTouchSupported ? (e.targetTouches[0].pageY - canvass.offsetTop-30) : (e.offsetY || e.layerY - canvass.offsetTop);
        ctx.lineTo(x, y);
        ctx.stroke();
        }
        if (window.matchMedia("(orientation: landscape)").matches) {
          if (window.matchMedia('(min-width: 1200px)').matches) {
            var x = isTouchSupported ? (e.targetTouches[0].pageX - canvass.offsetLeft- 10) : (e.offsetX || e.layerX - canvass.offsetLeft);
            var y = isTouchSupported ? (e.targetTouches[0].pageY - canvass.offsetTop-30) : (e.offsetY || e.layerY - canvass.offsetTop);
            ctx.lineTo(x, y);
            ctx.stroke();
          }
          else
          {
            alert("Please draw in Potrait Mode");
          }
        }
      }
  
   }
     
     function startDraw(e) {
       
      console.log(this.count);
      //  alert("Can't Draw"+this.count);
      // if('apple' == 'apple')
      // {
      //   alert("Only Two Images");
      // }
      // else{
        e.preventDefault();
        isActive = true;
        ctx.beginPath();
      // }
  
     }
     
     function endDraw(e) {
       e.preventDefault();
       isActive = false;
     }
       const clearButtonn = document.getElementById('clear-buttonn');
       const eraserr = document.getElementById('eraser-buttonn');
       const draw_AfterErasee = document.getElementById('draw-buttonn');
       const previewww = document.getElementById('preview');
       
       clearButtonn.addEventListener('click', handleClearButtonClick);
       eraserr.addEventListener('click', eraseButtonClick);
       draw_AfterErasee.addEventListener('click', drawButtonClick);
       previewww.addEventListener('click', preview);
       
       function handleClearButtonClick(event) {
         event.preventDefault();
         
         clearCanvas();
       }
       
       function clearCanvas() {
         ctx.clearRect(0, 0, canvass.width, canvass.height);
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
     
       function preview()
       {
        const imgConverted =<HTMLImageElement> document.getElementById('imgConverted');
        // imgConverted.src = canvas.toDataURL();
        // console.log(canvas.toDataURL());
        const dataURI = canvass.toDataURL("");
        imgConverted.src = dataURI;
       }
  
       function DownloadCanvasAsImage(){
        let downloadLink = document.createElement('a');
        downloadLink.setAttribute('download', 'CanvasAsImage.png');
        let canvas =  <HTMLCanvasElement>document.getElementById('drawCanvas');
        let dataURL = canvas.toDataURL('image/png');
        console.log(dataURL);
        // let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
        // downloadLink.setAttribute('href',url);
        // downloadLink.click();
      }
       
     
   
     // if (window.matchMedia('(min-width: 420px)').matches) {
     // 	img.src = 'assets/images/lines.png'
   
     // 	} else {
     // 		img.src = 'assets/images/lines.png'
     // 	}
     
   })();
   
          }
   
  
    close() {
      this.dialogRef.close();
    }
  
    
  
    downloadImage(data, filename = 'untitled.jpeg') {
      var a = document.createElement('a');
      a.href = data;
      a.download = filename;
    
      document.body.appendChild(a);
      console.log(document.body.appendChild(a));
       a.click();
       localStorage.setItem('dataSource', a.download );
       localStorage.setItem('dataSource1', a.href );
    }
    
    clickmee() {
    
      // if(a == 0)
      // {
        // this.aggi = false;
        // this.fire=true;
        // <HTMLCanvasElement>document.getElementById('drawCanvas').style.display = "none";
        // this.show = true;
        html2canvas(this.screennn.nativeElement).then(canvas => {
          // if(localStorage.getItem('SEPreview1') != null )
          // {
          //   this.backgroundUrl2=canvas.toDataURL('image/jpeg');
          //   console.log( this.backgroundUrl2);
          //   localStorage.setItem('SEPreview2', this.backgroundUrl2);
          //   // this.count = 1;
          //   this.hideDelete=true;this.hideAdd=false;
           
          // }
          // else{
            // this.backgroundUrl=canvas.toDataURL('image/jpeg');
            console.log( this.backgroundUrl);
            localStorage.setItem(this.dialogDataTwo,canvas.toDataURL('image/jpeg'));
            // this.count = 1;
            // if(this.dialogText=='CD')
            // {
            // this.hideDelete=false;
            // }else
            // {
              this.hideDelete=true;
            // }
            this.hideAdd=true;
            // localStorage.setItem('SEPreview1', this.backgroundUrl);
          // }
          if(this.dialogText=='CD')
          {
            this.see.addcdsketchh(this.resultObj).subscribe((data)=>{
              console.log(data)
            });
          }
         
        });
        // this.dialogRef.close();
        // this.ngOnInit();
      // }
      // else if(a == 1)
      // {
      //     this.showw = true;
      //     html2canvas(this.screen.nativeElement).then(canvas => {
      //       if(this.canvass.nativeElement.src == '')
      //       {
      //         this.canvass.nativeElement.src = canvas.toDataURL('image/jpeg');
      //         this.count = 2;
      //         this.ngOnInit();
      //       }
      //       else{
      //         alert("Only Two Images Bro!!!");
      //         this.ngOnInit();
      //       }
      //     });
      // }
      // else{
      //   alert("Only two Images");
      //   this.ngOnInit();
      // }
        
          }
  
  
      imgDeleteee()
      {

        if(this.dialogText=='CD')
        {
          this.see.DelSketchh(this.resultObj).subscribe((data)=>{
            console.log(data)
          })
        }
        html2canvas(this.screennn.nativeElement).then(canvas => {
          localStorage.removeItem(this.dialogDataTwo);
        
          // this.canvas.nativeElement.src ='';
           this.hideDelete = false;
           this.hideAdd=false;
           this.ngOnInit();
          //  this.count = 0;
          
        });
      }
    
      imgDeletee()
      {
        html2canvas(this.screennn.nativeElement).then(canvas => {
          this.canvass.nativeElement.src ='';
          this.showw = false;
           if( this.canvas.nativeElement.src == '')
           {
            this.count = 0;
           }
           else{
            this.count = 1;
           }
        });
      }
  
      saveImage()
      {
        html2canvas(this.screennn.nativeElement).then(canvas => {
          // alert(this.canvas.nativeElement.src);
          // console.log(this.canvas.nativeElement.src);
          if(localStorage.getItem('SEPreview1') != null )
          {
            localStorage.setItem('SEPreview2', this.backgroundUrl2);
           
          }
          else{
            localStorage.setItem('SEPreview1', this.backgroundUrl);
          }
          // this.ngOnInit();
          // this._dataService.setOption('size', this.canvas.nativeElement.src);  
          // this.dataImage = this._dataService.getOption(); 
          // console.log(this.dataImage);
          // console.log(this.dataImage[0].preview1);
          // console.log(this.dataImage[size]);
        });
      }
  
       urltoFile(url, filename, mimeType){
        return (fetch(url)
            .then(function(res){return res.arrayBuffer();})
            .then(function(buf){return new File([buf], filename,{type:mimeType});})
        );
    }
  
    onselect(e)
    {
      console.log(e.target.files[0]);
    }
    
  
  loadImage()
  {
    // this.show=true;
    console.log(localStorage.getItem('SEPreview1'));
    var SEPreviews = localStorage.getItem('SEPreview1');
    var elem = document.createElement("img");
  elem.setAttribute("src", SEPreviews);
  elem.setAttribute("height", "80%");
  elem.setAttribute("width", "50%");
  elem.setAttribute("alt", "Flower");
  document.getElementById("placehere").appendChild(elem);
    // this.show = true;
    // console.log(localStorage.getItem('SEPreview1'));
    // var SEPreviews = localStorage.getItem('SEPreview1');
    // console.log(SEPreviews);
  
    // html2canvas(this.screen.nativeElement).then(canvas => {
    //     this.canvas.nativeElement.src = SEPreviews;
    // });
  
  }
  
  check()
  {
    this.dialogRef.close();
    const dialog_ref =
    this.dialog.open(SecondsektchComponent,
     {
       panelClass: ['sketchCss'],
       // position:  {
       //   left:'0px'
       // } ,
  
       // data: this.headerObj 
  
     }
     );
  
     dialog_ref.afterClosed().subscribe(result => {
       ///console.log('The dialog was closed');
         // this.getPatientInfo(this.app_id);
     });
    // this.router.navigate(['/GPE/33/4']);
    // if(localStorage.getItem('SEPreview1') != null )
    // {
      // this.backgroundUrl="assets/images/lines.png";
      // this.hideDelete=false;
      // this.hideAdd=false;
      // this.hideLeftArrow=true;
    // }
    // this.ngOnInit();
    // this.backgroundUrl="assets/images/lines.png";
    // this.hideDelete=false;
    // this.hideAdd=false;
  }
  
  leftArrow()
  {
    // if(localStorage.getItem(this.dialogDataOne) != null )
    // {
      this.dialogRef.close();
      const dialog_ref =
      this.dialog.open(SketchDialogComponent,
       {
         panelClass: ['sketchCss'],
         data:{
           text:this.dialogText,
           appId:this.dialogappId,
           obj:this.resultObj
         }
         // position:  {
         //   left:'0px'
         // } ,

         // data: this.headerObj 

       }
       );

       dialog_ref.afterClosed().subscribe(result => {
         ///console.log('The dialog was closed');
           // this.getPatientInfo(this.app_id);
       });
      // this.backgroundUrl=localStorage.getItem('SEPreview1');
      // this.hideDelete=true;
      // this.hideLeftArrow=false;
      // if(localStorage.getItem('SEPreview2') != null )
      // {
      // this.hideAdd=false;
      // this.hideRightArrow=true;
      // }
      // else{
      //   this.hideAdd=true;
      // }
    // }
    // else
    // {
    //   this.backgroundUrl=localStorage.getItem('SEPreview1');
    // }
  }
  
  rightArrow()
  {
    if(localStorage.getItem('SEPreview2') != null )
    {
      this.backgroundUrl=localStorage.getItem('SEPreview2');
      this.hideDelete=true;
      this.hideRightArrow=false;
  
      if(localStorage.getItem('SEPreview1') != null )
      {
      this.hideAdd=false;
      this.hideLeftArrow=true;
      }
      // else{
      //   this.hideAdd=true;
      // }
    }
    // else
    // {
    //   this.backgroundUrl=localStorage.getItem('SEPreview1');
    // }
  }
  
  // openDialog(){
  //   this.dialogRef.close();
  //   const dialog_ref =
  //      this.dialog.open(SecondsektchComponent,
  //       {
  //         panelClass: ['sketchCss'],
  //         // position:  {
  //         //   left:'0px'
  //         // } ,
  
  //         // data: this.headerObj 
  
  //       }
  //       );
  
  //       dialog_ref.afterClosed().subscribe(result => {
  //         ///console.log('The dialog was closed');
  //           // this.getPatientInfo(this.app_id);
  //       });
   
  // }
  
      // onFileSelected(event){
      //   this.selectedFile = <File> event.target.files[0];
      //   console.log(this.selectedFile);
      // }
  
      // onUpload(){
      //   const fd = new FormData();
      //   fd.append('image', this.selectedFile, this.selectedFile.name);
      //   this.http.post('assets/Aggi/', fd)
      //     .subscribe(res => {
      //       console.log(res);
      //     });
  
      // }
  
  }
