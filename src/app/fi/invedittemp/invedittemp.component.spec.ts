import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvedittempComponent } from './invedittemp.component';

describe('InvedittempComponent', () => {
  let component: InvedittempComponent;
  let fixture: ComponentFixture<InvedittempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvedittempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvedittempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
