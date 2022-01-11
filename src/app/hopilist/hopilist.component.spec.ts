import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HopilistComponent } from './hopilist.component';

describe('HopilistComponent', () => {
  let component: HopilistComponent;
  let fixture: ComponentFixture<HopilistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HopilistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HopilistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
