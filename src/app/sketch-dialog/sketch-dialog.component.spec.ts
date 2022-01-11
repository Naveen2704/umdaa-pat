import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SketchDialogComponent } from './sketch-dialog.component';

describe('SketchDialogComponent', () => {
  let component: SketchDialogComponent;
  let fixture: ComponentFixture<SketchDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SketchDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SketchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
