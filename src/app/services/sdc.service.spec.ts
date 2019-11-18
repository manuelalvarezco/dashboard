import { TestBed } from '@angular/core/testing';

import { SdcService } from './sdc.service';

describe('SdcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SdcService = TestBed.get(SdcService);
    expect(service).toBeTruthy();
  });
});
