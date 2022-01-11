import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialsketchComponent } from './specialsketch.component';

describe('SpecialsketchComponent', () => {
  let component: SpecialsketchComponent;
  let fixture: ComponentFixture<SpecialsketchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialsketchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialsketchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
