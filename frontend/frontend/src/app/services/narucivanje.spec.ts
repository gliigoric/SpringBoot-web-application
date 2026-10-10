import { TestBed } from '@angular/core/testing';

import { Narucivanje } from './narucivanje';

describe('Narucivanje', () => {
  let service: Narucivanje;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Narucivanje);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
