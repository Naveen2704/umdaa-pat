import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-confirmdailog',
  templateUrl: './confirmdailog.component.html',
  styleUrls: ['./confirmdailog.component.css']
})
export class ConfirmdailogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    cancelText: string,
    confirmText: string,
    message: string,
    title: string
},private mdDialogRef: MatDialogRef<ConfirmdailogComponent>) { }

  ngOnInit() {
  }
  public cancel() {
    this.close(false);
  }
public close(value) {
    this.mdDialogRef.close(value);
  }
public confirm() {
    this.close(true);
  }
@HostListener("keydown.esc") 
  public onEsc() {
    this.close(false);
  }
}
