import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmenthistorylistComponent } from './treatmenthistorylist.component';

describe('TreatmenthistorylistComponent', () => {
  let component: TreatmenthistorylistComponent;
  let fixture: ComponentFixture<TreatmenthistorylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmenthistorylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmenthistorylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
