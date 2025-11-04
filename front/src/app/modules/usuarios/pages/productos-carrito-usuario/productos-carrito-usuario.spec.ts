import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosCarritoUsuario } from './productos-carrito-usuario';

describe('ProductosCarritoUsuario', () => {
  let component: ProductosCarritoUsuario;
  let fixture: ComponentFixture<ProductosCarritoUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosCarritoUsuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosCarritoUsuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
