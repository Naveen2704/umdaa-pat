import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OslistComponent } from './oslist.component';

describe('OslistComponent', () => {
  let component: OslistComponent;
  let fixture: ComponentFixture<OslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
