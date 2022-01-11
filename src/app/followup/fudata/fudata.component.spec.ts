import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FudataComponent } from './fudata.component';

describe('FudataComponent', () => {
  let component: FudataComponent;
  let fixture: ComponentFixture<FudataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FudataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FudataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
