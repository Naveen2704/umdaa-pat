import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CformsComponent } from './cforms.component';

describe('CformsComponent', () => {
  let component: CformsComponent;
  let fixture: ComponentFixture<CformsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CformsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
