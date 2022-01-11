import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersiontwoComponent } from './versiontwo.component';

describe('VersiontwoComponent', () => {
  let component: VersiontwoComponent;
  let fixture: ComponentFixture<VersiontwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersiontwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersiontwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
