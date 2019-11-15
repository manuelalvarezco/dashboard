import { TestBed } from '@angular/core/testing';

import { AdwordsService } from './adwords.service';

describe('AdwordsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdwordsService = TestBed.get(AdwordsService);
    expect(service).toBeTruthy();
  });
});
