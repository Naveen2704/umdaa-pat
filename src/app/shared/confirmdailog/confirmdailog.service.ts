import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmdailogComponent } from './confirmdailog.component';
import { take, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ConfirmdailogService {

  constructor(private dialog: MatDialog) { }


  dialogRef: MatDialogRef<ConfirmdailogComponent>;
  public open(options: { title: any; message: any; cancelText: any; confirmText: any; }) {
    return this.dialogRef = this.dialog.open(ConfirmdailogComponent, {    
      data: {
        title: options.title,
        message: 'Are you sure to delete ?',
        cancelText: options.cancelText,
        confirmText: options.confirmText
      }
 });
  }  
  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
      return res;
    }
  ));
  }
}
