import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialhistorylistComponent } from './socialhistorylist.component';

describe('SocialhistorylistComponent', () => {
  let component: SocialhistorylistComponent;
  let fixture: ComponentFixture<SocialhistorylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialhistorylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialhistorylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
