import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescribemobileComponent } from './prescribemobile.component';

describe('PrescribemobileComponent', () => {
  let component: PrescribemobileComponent;
  let fixture: ComponentFixture<PrescribemobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescribemobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescribemobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
