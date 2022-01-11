import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvtempComponent } from './invtemp.component';

describe('InvtempComponent', () => {
  let component: InvtempComponent;
  let fixture: ComponentFixture<InvtempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvtempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvtempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
