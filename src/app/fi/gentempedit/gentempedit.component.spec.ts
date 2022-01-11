import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GentempeditComponent } from './gentempedit.component';

describe('GentempeditComponent', () => {
  let component: GentempeditComponent;
  let fixture: ComponentFixture<GentempeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GentempeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GentempeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
