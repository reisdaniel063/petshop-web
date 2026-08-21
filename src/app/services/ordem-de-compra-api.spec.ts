import { TestBed } from '@angular/core/testing';

import { OrdemDeCompraApi } from './ordem-de-compra-api';

describe('OrdemDeCompraApi', () => {
  let service: OrdemDeCompraApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdemDeCompraApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
