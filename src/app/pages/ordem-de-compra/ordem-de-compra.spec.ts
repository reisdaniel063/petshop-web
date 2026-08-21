import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdemDeCompra } from './ordem-de-compra';

describe('OrdemDeCompra', () => {
  let component: OrdemDeCompra;
  let fixture: ComponentFixture<OrdemDeCompra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdemDeCompra],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdemDeCompra);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
