import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GentemplistComponent } from './gentemplist.component';

describe('GentemplistComponent', () => {
  let component: GentemplistComponent;
  let fixture: ComponentFixture<GentemplistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GentemplistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GentemplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
