import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmpsummaryComponent } from './rmpsummary.component';

describe('RmpsummaryComponent', () => {
  let component: RmpsummaryComponent;
  let fixture: ComponentFixture<RmpsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmpsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmpsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
