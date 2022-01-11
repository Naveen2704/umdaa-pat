import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpendobComponent } from './opendob.component';

describe('OpendobComponent', () => {
  let component: OpendobComponent;
  let fixture: ComponentFixture<OpendobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpendobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpendobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
