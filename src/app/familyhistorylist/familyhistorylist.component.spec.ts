import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyhistorylistComponent } from './familyhistorylist.component';

describe('FamilyhistorylistComponent', () => {
  let component: FamilyhistorylistComponent;
  let fixture: ComponentFixture<FamilyhistorylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyhistorylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyhistorylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
