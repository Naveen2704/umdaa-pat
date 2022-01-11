import { Directive, Input, ElementRef, OnChanges } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDisablecontrol]'
})
export class DisablecontrolDirective implements OnChanges {
  @Input() appDisablecontrol: boolean;
 
  constructor(private el: ElementRef) { }

  ngOnChanges(): void {
    this.el.nativeElement.disabled = (this.appDisablecontrol) ? true : false;
  }
}
