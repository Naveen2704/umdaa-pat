import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminsComponent } from './examins.component';

describe('ExaminsComponent', () => {
  let component: ExaminsComponent;
  let fixture: ComponentFixture<ExaminsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExaminsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
