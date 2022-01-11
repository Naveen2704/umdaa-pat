import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GentempComponent } from './gentemp.component';

describe('GentempComponent', () => {
  let component: GentempComponent;
  let fixture: ComponentFixture<GentempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GentempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GentempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
