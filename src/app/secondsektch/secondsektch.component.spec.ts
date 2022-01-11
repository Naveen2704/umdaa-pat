import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondsektchComponent } from './secondsektch.component';

describe('SecondsektchComponent', () => {
  let component: SecondsektchComponent;
  let fixture: ComponentFixture<SecondsektchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondsektchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondsektchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
