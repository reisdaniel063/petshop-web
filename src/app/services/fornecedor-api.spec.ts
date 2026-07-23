import { TestBed } from '@angular/core/testing';

import { FornecedorApi } from './fornecedor-api';

describe('FornecedorApi', () => {
  let service: FornecedorApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FornecedorApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
