import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrdataComponent } from './ocrdata.component';

describe('OcrdataComponent', () => {
  let component: OcrdataComponent;
  let fixture: ComponentFixture<OcrdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcrdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcrdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
