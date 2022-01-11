import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvtemplistComponent } from './invtemplist.component';

describe('InvtemplistComponent', () => {
  let component: InvtemplistComponent;
  let fixture: ComponentFixture<InvtemplistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvtemplistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvtemplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
