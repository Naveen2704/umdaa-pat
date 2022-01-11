import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedobComponent } from './closedob.component';

describe('ClosedobComponent', () => {
  let component: ClosedobComponent;
  let fixture: ComponentFixture<ClosedobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
