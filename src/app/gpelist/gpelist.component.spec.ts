import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpelistComponent } from './gpelist.component';

describe('GpelistComponent', () => {
  let component: GpelistComponent;
  let fixture: ComponentFixture<GpelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
