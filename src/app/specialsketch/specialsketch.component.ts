import { Component, OnInit } from '@angular/core';
import Konva from 'konva'
import html2canvas from 'html2canvas';
import {  ElementRef, ViewChild } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { textShadow } from 'html2canvas/dist/types/css/property-descriptors/text-shadow';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-specialsketch',
  templateUrl: './specialsketch.component.html',
  styleUrls: ['./specialsketch.component.css']
})
export class SpecialsketchComponent implements OnInit {
  // export class SecondsketchComponent implements OnInit {
    height: number=500;
    width: number=500;
    @ViewChild('screenn', {static: false}) screenn: ElementRef;
    deviceInfo = null;
    device:any;
    deviceData: any;
    dialogDataOne: any;
    id: any;
    id1: any;
    id3: string;
    backgroundUrl="assets/images/lines.jpeg";
    hideDelete: boolean;
    hideRightArrow: boolean;
    hideAdd: boolean;
    dialogDataTwo: any;
    hideErase:boolean = true;
    hideDraw:boolean =true;
    id2: string;
    next:boolean;
    id4: string;
  backgroundUrll: string;
    
    // @HostListener('window:orientationchange', ['$event'])
  
    constructor(private router: Router,private route: ActivatedRoute,private deviceService: DeviceDetectorService) { }
  
    ngOnInit() {
  
      this.route.params.subscribe(res => {
        this.id = this.route.snapshot.paramMap.get("id");
        this.id1 = this.route.snapshot.paramMap.get("id1");
        this.id2 = this.route.snapshot.paramMap.get("id2");
        this.id3 = this.route.snapshot.paramMap.get("id3");
        this.id4 = this.route.snapshot.paramMap.get("id4");
        this.dialogDataOne = this.id+this.id1+this.id2;
        // this.dialogDataOne = this.dialogText+this.dialogappId+this.sectionId;
        console.log(this.id);
        console.log(this.id1);
        console.log(this.id2);
        console.log(this.id3);
        console.log(this.id4);

      });  

      if(localStorage.getItem(this.dialogDataOne) == null )
      {
        this.backgroundUrll='assets/sketches/'+this.id3
       
      }
      else
      {
        this.backgroundUrll=localStorage.getItem(this.dialogDataOne);
        if(localStorage.getItem(this.dialogDataTwo) != null)
        {
          this.hideDelete=true;
          // this.hideRightArrow=true;
          // this.hideAdd=false;
        }
        else{
          // this.hideAdd=true;
          this.hideDelete=true;
        }
      }
  
      this.dialogDataOne = this.id+this.id1+1;
      this.dialogDataTwo = this.id+this.id1+2;
      if(localStorage.getItem(this.dialogDataOne) == null )
      {
        // alert("no");
        this.backgroundUrl="assets/images/lines.jpeg";
       
      }
      else
      {
        this.backgroundUrl=localStorage.getItem(this.dialogDataOne);
        if(localStorage.getItem(this.dialogDataOne) != null)
        {
          this.hideErase =  false;
          this.hideDraw = false;
          this.hideAdd=true;
          this.next=false;
          if(localStorage.getItem(this.dialogDataTwo) != null)
          {
            this.hideAdd=false;
            this.next=true;
          }
        }
        else{
          this.hideErase =  true;
          this.hideDraw = true;
          this.hideAdd=false;
        }
      }
      
      this.width = 500;
      this.height = 500;
      // console.log('hello `Home` component');
      this.deviceInfo = this.deviceService.getDeviceInfo();
      const isMobile = this.deviceService.isMobile();
      const isTablet = this.deviceService.isTablet();
      const isDesktopDevice = this.deviceService.isDesktop();
      console.log(this.deviceInfo);
      console.log(this.deviceInfo['deviceType']);
      console.log(this.deviceInfo['orientation']);
      this.deviceData = this.deviceInfo['deviceType'];
      console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
      console.log(isTablet);  // returns if the device us a tablet (iPad etc)
      console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.
      this.device = this.deviceInfo['deviceType'];
      console.log(this.device);
  
      // var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      // var element = document.getElementById('text');
      if (this.device == 'desktop') {
      var width = 500;
      var height = 500;
  
      this.width = 500;
      this.height =500;
      } else {
      if(this.deviceInfo['orientation'] == 'landscape'){
        var width = 500;
        var height =500;
    
        this.width = 500;
        this.height = 500;
      }else{
      var width = screen.width ;
      var height = screen.height-25;
      this.width = screen.width;
      this.height = screen.height-25;
      }
      }
        // element.innerHTML = "You are using Desktop";
      
  
      window.addEventListener("orientationchange", () => {
  
        if(this.device == 'mobile')
        {
          if(screen.orientation.type == 'portrait-primary'){
            if(confirm("Do u want to continue with portrait-primary?")) {
              var width = screen.width ;
              var height = screen.height -25;
              this.width = screen.width;
              this.height = screen.height-25;
              // alert(width);alert(height);
            }
          }
          else{
            if(confirm("Do u want to continue with landscape-primary?")) {
              var width = 500;
              var height = 600;
          
              this.width = 500;
              this.height = 600;
              // alert(width);alert(height);
            }
          }
        
        }
  
          if(this.device == 'tablet')
          {
            if(screen.orientation.type == 'portrait-primary'){
              if(confirm("Do u want to continue with portrait-primary?")) {
                var width = screen.width ;
                var height = screen.height -25;
                this.width = screen.width;
                this.height = screen.height-25;
                // alert(width);alert(height);
              }
            }
            else{
              if(confirm("Do u want to continue with landscape-primary?")) {
                var width = 500;
                var height = 600;
            
                this.width = 500;
                this.height = 600;
                // alert(width);alert(height);
              }
            }
          }
          var stage = new Konva.Stage({
            container: 'container',
            width: width,
            height: height,
          });
      
          var layer = new Konva.Layer();
          stage.add(layer);
      
      
          // then we are going to draw into special canvas element
          var canvas = document.createElement('canvas');
          canvas.width = stage.width();
          canvas.height = stage.height();
      
          // var img = canvas.toDataURL("image/png");
          // var b = document.getElementById("container");
          // b.style.backgroundImage = "url('assets/images/lines.jpeg')";
          // document.getElementById("container").style.backgroundSize = "1500px 1500px";
      
          // created canvas we can add to layer as "Konva.Image" element
          var image = new Konva.Image({
            image: canvas,
          // /  backgroundImage:'assets/images/lines.jpeg',
            x: 0,
            y: 0,
          });
          layer.add(image);
          stage.draw();
      
          // Good. Now we need to get access to context element
          var context = canvas.getContext('2d');
          context.strokeStyle = '#000000';
          context.lineJoin = 'round';
          context.lineWidth = 3;
      
      
          var isPaint = false;
          var lastPointerPosition;
          var mode = 'brush';
      
          // now we need to bind some events
          // we need to start drawing on mousedown
          // and stop drawing on mouseup
          image.on('mousedown touchstart', function() {
            isPaint = true;
            lastPointerPosition = stage.getPointerPosition();
          });
      
          // will it be better to listen move/end events on the window?
      
          stage.on('mouseup touchend', function() {
            isPaint = false;
          });
      
          // and core function - drawing
          stage.on('mousemove touchmove', function() {
            if (!isPaint) {
              return;
            }
      
            if (mode === 'brush') {
              context.globalCompositeOperation = 'source-over';
              context.lineWidth=3;
            }
            if (mode === 'eraser') {
              context.globalCompositeOperation = 'destination-out';
              context.lineWidth=5;
            }
            context.beginPath();
      
            var localPos = {
              x: lastPointerPosition.x - image.x(),
              y: lastPointerPosition.y - image.y()
            };
            context.moveTo(localPos.x, localPos.y);
            var pos = stage.getPointerPosition();
            localPos = {
              x: pos.x - image.x(),
              y: pos.y - image.y()
            };
            context.lineTo(localPos.x, localPos.y);
            context.closePath();
            context.stroke();
      
            lastPointerPosition = pos;
            layer.batchDraw();
          });
  
      }, false);
  
  
       
      // var width = window.innerWidth;
      // var height = window.innerHeight-25;
      // var width = 500;
      // var height = 600;
      // first we need Konva core things: stage and layer
      var stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height,
      });
  
      var layer = new Konva.Layer();
      stage.add(layer);
  
  
      // then we are going to draw into special canvas element
      var canvas = document.createElement('canvas');
      canvas.width = stage.width();
      canvas.height = stage.height();
  
      // var img = canvas.toDataURL("image/png");
      // var b = document.getElementById("container");
      // b.style.backgroundImage = "url('assets/images/lines.jpeg')";
      // document.getElementById("container").style.backgroundSize = "1500px 1500px";
  
      // created canvas we can add to layer as "Konva.Image" element
      var image = new Konva.Image({
        image: canvas,
      // /  backgroundImage:'assets/images/lines.jpeg',
        x: 0,
        y: 0,
      });
      layer.add(image);
      stage.draw();
  
      // Good. Now we need to get access to context element
      var context = canvas.getContext('2d');
      context.strokeStyle = '#000000';
      context.lineJoin = 'round';
      context.lineWidth = 3;
  
  
      var isPaint = false;
      var lastPointerPosition;
      var mode = 'brush';
  
      // now we need to bind some events
      // we need to start drawing on mousedown
      // and stop drawing on mouseup
      image.on('mousedown touchstart', function() {
        isPaint = true;
        lastPointerPosition = stage.getPointerPosition();
      });
  
      // will it be better to listen move/end events on the window?
  
      stage.on('mouseup touchend', function() {
        isPaint = false;
      });
  
      // and core function - drawing
      stage.on('mousemove touchmove', function() {
        if (!isPaint) {
          return;
        }
  
        if (mode === 'brush') {
          context.globalCompositeOperation = 'source-over';
          context.lineWidth=3;
        }
        if (mode === 'eraser') {
          context.globalCompositeOperation = 'destination-out';
          context.lineWidth=5;
        }
        context.beginPath();
  
        var localPos = {
          x: lastPointerPosition.x - image.x(),
          y: lastPointerPosition.y - image.y()
        };
        context.moveTo(localPos.x, localPos.y);
        var pos = stage.getPointerPosition();
        localPos = {
          x: pos.x - image.x(),
          y: pos.y - image.y()
        };
        context.lineTo(localPos.x, localPos.y);
        context.closePath();
        context.stroke();
  
        lastPointerPosition = pos;
        layer.batchDraw();
      });
  
      var select = document.getElementById('tool');
  
      document.getElementById('eraser-button').addEventListener(
        'click',
        function () {
          // alert('onclick removed');
          mode = 'eraser';
        },
      );
  
      document.getElementById('draw-button').addEventListener('click',function(){
        mode = 'brush';
      });
  
  
  }
  
  add()
  {
    // this.router.navigateByUrl(['/secondsketch/'+'SE/'+this.id+'/'+this.id1'])
    this.router.navigate(['/sketch/'+this.id+'/'+this.id1+'/'+this.id2]);
  }
  
  image()
  {
    html2canvas(this.screenn.nativeElement).then(canvas => {
      // console.log( this.backgroundUrl);
      console.log(canvas.toDataURL('image/jpeg'));
  });
  
  }
  
  save()
  {
    html2canvas(this.screenn.nativeElement).then(canvas => {
      console.log(canvas.toDataURL('image/jpeg'));
      this.dialogDataOne = this.id+this.id1+this.id2;
      localStorage.setItem(this.dialogDataOne,canvas.toDataURL('image/jpeg'));
      this.router.navigate(['/'+this.id+'/'+this.id1+'/'+this.id2]);
  });
  }
  
  Next()
  {
    this.router.navigate(['/sketch/'+this.id+'/'+this.id1+'/'+this.id2]);
  }
  }
