import { TestBed } from '@angular/core/testing';

import { SymbolGetterService } from './symbol-getter.service';

describe('SymbolGetterService', () => {
  let service: SymbolGetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SymbolGetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
