import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProductosCarritoUsuario } from './table-productos-carrito-usuario';

describe('TableProductosCarritoUsuario', () => {
  let component: TableProductosCarritoUsuario;
  let fixture: ComponentFixture<TableProductosCarritoUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableProductosCarritoUsuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableProductosCarritoUsuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
