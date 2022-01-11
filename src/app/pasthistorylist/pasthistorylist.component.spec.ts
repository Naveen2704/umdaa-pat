import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasthistorylistComponent } from './pasthistorylist.component';

describe('PasthistorylistComponent', () => {
  let component: PasthistorylistComponent;
  let fixture: ComponentFixture<PasthistorylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasthistorylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasthistorylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
