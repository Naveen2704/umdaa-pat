import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondsketchComponent } from './secondsketch.component';

describe('SecondsketchComponent', () => {
  let component: SecondsketchComponent;
  let fixture: ComponentFixture<SecondsketchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondsketchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondsketchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
