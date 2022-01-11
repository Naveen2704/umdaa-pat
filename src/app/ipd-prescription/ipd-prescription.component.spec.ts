import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpdPrescriptionComponent } from './ipd-prescription.component';

describe('IpdPrescriptionComponent', () => {
  let component: IpdPrescriptionComponent;
  let fixture: ComponentFixture<IpdPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpdPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpdPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
