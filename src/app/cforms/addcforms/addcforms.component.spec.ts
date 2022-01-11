import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcformsComponent } from './addcforms.component';

describe('AddcformsComponent', () => {
  let component: AddcformsComponent;
  let fixture: ComponentFixture<AddcformsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcformsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
