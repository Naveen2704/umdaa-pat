import { TestBed } from '@angular/core/testing';

import { GpeService } from './gpe.service';

describe('GpeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GpeService = TestBed.get(GpeService);
    expect(service).toBeTruthy();
  });
});
