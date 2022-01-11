import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugeditComponent } from './drugedit.component';

describe('DrugeditComponent', () => {
  let component: DrugeditComponent;
  let fixture: ComponentFixture<DrugeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
