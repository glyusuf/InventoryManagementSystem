import { TestBed } from '@angular/core/testing';

import { LedgerDataService } from './ledger-data.service';

describe('LedgerDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LedgerDataService = TestBed.get(LedgerDataService);
    expect(service).toBeTruthy();
  });
});
