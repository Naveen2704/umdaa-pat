import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalhistorylistComponent } from './personalhistorylist.component';

describe('PersonalhistorylistComponent', () => {
  let component: PersonalhistorylistComponent;
  let fixture: ComponentFixture<PersonalhistorylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalhistorylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalhistorylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
