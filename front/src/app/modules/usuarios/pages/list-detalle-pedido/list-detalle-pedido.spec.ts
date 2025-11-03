import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDetallePedido } from './list-detalle-pedido';

describe('ListDetallePedido', () => {
  let component: ListDetallePedido;
  let fixture: ComponentFixture<ListDetallePedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDetallePedido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDetallePedido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
