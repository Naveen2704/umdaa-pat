import { Component, OnInit } from '@angular/core';
import {DocScannerConfig} from 'ngx-document-scanner';
// import { MatDialog, MatDialogRef } from '@angular/material';
import { ReportsService } from '../reports/reports.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scan-document',
  templateUrl: './scan-document.component.html',
  styleUrls: ['./scan-document.component.css']
})
export class ScanDocumentComponent implements OnInit {
  overZone = false;
  image: File;
  processing: boolean;
  test: boolean;
  allImages: any=[];
  finalImage: any;
  main: Blob;
  ocr_image: any;
  config: DocScannerConfig = {
    editorBackgroundColor: '#fafafa',
    buttonThemeColor: 'primary',
    cropToolColor: '#ff4081',
    cropToolShape: 'rect',
    cropToolDimensions: {
      width: 16,
      height: 16
    },
  //   exportImageIcon: 'cloud_download',
  //   editorDimensions: {
  //     width: '99vw',
  //     height: '82vh'
  //   },
  //   extraCss: {
  //     position: 'absolute',
  //     top: 0,
  //     left: 0
  //   }
  };
  constructor(private router:Router,public dialogRef: MatDialogRef<ScanDocumentComponent>,@Inject(MAT_DIALOG_DATA) public result,
    private _dialog:MatDialog,private _service:ReportsService){ }

  ngOnInit() {
    console.log(this.result);
  }

  // ******* //
  // file input handlers //
  // ******* //
  dropFile(event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files.item(0)) {
      const file = event.dataTransfer.files.item(0);
      if (this.isImage(file)) {
        this.loadFile(file);
      } else {
        this.overZone = false;
      }
    }
  }

  loadFile(event: any) {
    this.processing = true;
    this.overZone = false;
    let f: File;
    if (event instanceof File) {
      f = event;
    } else {
      const files = event.target.files;
      f = files[0];
    }
    if (this.isImage(f)) {
      this.image = f;
    }
  }

  isImage(file: File) {
    const types = [
      'image/png',
      'image/jpeg',
      'image/jpg',
    ];
    return types.findIndex(type => {
      return type === file.type;
    }) !== -1;
  }


  // ************ //
  // bindings to doc scanner component//
  // ************ //
  // resets the file input when the user exits the editor
  exitEditor() {
    // console.log(message);
    this.image = null;
  }

  // handles the result emitted by the editor
  editResult(result) {
    console.log(result);
    this.main = result;
    const link = <HTMLAnchorElement> document.createElement('a');
    console.log(link);
    link.href = URL.createObjectURL(result);
    link.setAttribute('download', `edited_image_${new Date().toLocaleString()}.${this.image.type.split('/')[1]}`);
    // link.click();
    console.log(URL.createObjectURL(result));
    console.log(link);
    console.log(this.image);
    // this.fire(result);
    let blob = result;  
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend =  () => {
    var base64String = reader.result;
    console.log(base64String);
    // return base64String;
    this._service.patientOCR(this.result.id,base64String,this.processing).subscribe((res)=>{
      console.log(res);
      console.log(res['result'].ocr_image);
      this.ocr_image = res['result'].ocr_image;
      if(res.code == 200){
        // this.dialogRef.close();
        var result = confirm("Successfully Uploaded");
        if (result) {
          window.location.reload();
            //Logic to delete the item
        }
      }else{
        alert('upload again');
      }
    
    })
  }
    // this.finalImage = this.fire(result);
    console.log(this.finalImage);
  }

  fire(a)
  {
    let blob = a;  
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend =  () => {
    var base64String = reader.result;
    console.log(base64String);
    // return base64String;
    this._service.patientOCR(this.result.id,base64String,this.processing).subscribe((res)=>{
      console.log(res);
      console.log(res['result'].ocr_image);
      this.ocr_image = res['result'].ocr_image;
    })
  }
  }

  public blobToFile = (theBlob: Blob, fileName:string): File => {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
}

//   public convert = (blb: Blob, f:string): File => {
//     var b: any = blb;
//     b.lastModifiedDate = new Date();
//     b.name = f;
//     return <File>b;
// }

//   convert(blb: Blob, f:string): File => {
//     var b: any = blb;
//     b.lastModifiedDate = new Date();
//     b.name = f;
//     return <File>theBlob;
// }

  // handles errors emitted by the component
  onError(err: Error) {
    console.error(err);
  }

  // handles changes in the editor state - is it processing or not
  editorState(processing) {
    console.log(processing);
    this.processing = null;
    this.processing = processing;
  }

  close()
  {
    this.dialogRef.close();
  }

  // submit()
  // {
  //   console.log(this.finalImage);
  //   // console.log(this.image);

  //   // console.log(this.processing);
  //   // this.allImages.push(this.image)
  //   this._service.patientOCR(this.result.id,this.finalImage,this.processing).subscribe((res)=>{
  //     console.log(res);
  //   })
  // }

}