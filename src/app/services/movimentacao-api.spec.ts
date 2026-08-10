import { TestBed } from '@angular/core/testing';

import { MovimentacaoApi } from './movimentacao-api';

describe('MovimentacaoApi', () => {
  let service: MovimentacaoApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovimentacaoApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
