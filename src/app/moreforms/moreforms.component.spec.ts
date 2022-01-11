import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreformsComponent } from './moreforms.component';

describe('MoreformsComponent', () => {
  let component: MoreformsComponent;
  let fixture: ComponentFixture<MoreformsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreformsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
