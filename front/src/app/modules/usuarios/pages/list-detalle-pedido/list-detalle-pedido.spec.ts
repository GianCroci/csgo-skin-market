import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDetallePedidoComponent } from './list-detalle-pedido';

describe('ListDetallePedido', () => {
  let component: ListDetallePedidoComponent;
  let fixture: ComponentFixture<ListDetallePedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDetallePedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDetallePedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
