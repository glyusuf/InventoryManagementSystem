import { TestBed } from '@angular/core/testing';

import { ExpenseDataService } from './expense-data.service';

describe('ExpenseDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpenseDataService = TestBed.get(ExpenseDataService);
    expect(service).toBeTruthy();
  });
});
