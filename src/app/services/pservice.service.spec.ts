import { TestBed } from '@angular/core/testing';

import { PserviceService } from './pservice.service';

describe('PserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PserviceService = TestBed.get(PserviceService);
    expect(service).toBeTruthy();
  });
});
