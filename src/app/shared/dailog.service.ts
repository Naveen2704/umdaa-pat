import { Injectable, TemplateRef } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class DailogService {

  constructor(private dialog: MatDialog, private breakpointObserver: BreakpointObserver) { }
  matDialogRef: any=[];
  smallDialogSubscription: any=[];

open(componentOrTemplateRef: ComponentType<any>| TemplateRef<any>, mobileWidth: string, data?: MatDialogConfig): MatDialogRef<any> {
if (data) {
data.maxWidth = '50vw';
data.maxHeight = '100vh';
}

this.matDialogRef = this.dialog.open(componentOrTemplateRef, data);

this.smallDialogSubscription = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
.subscribe(size => {
if (size.matches) {
this.matDialogRef.updateSize('100%', '100%');
} else {
this.matDialogRef.updateSize(mobileWidth, 'auto');
}
});

return this.matDialogRef;
}

close(): void {
this.smallDialogSubscription.unsubscribe();
this.matDialogRef.close();
}
}
