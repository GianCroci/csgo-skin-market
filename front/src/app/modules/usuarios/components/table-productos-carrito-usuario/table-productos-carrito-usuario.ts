import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {Button, ButtonDirective} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {Carrito} from '../../interfaces/carrito.interface';
import {Carrito_Producto} from '../../interfaces/carrito_producto.interface';
import {UsuariosService} from '../../../../api/services/usuarios/usuarios.service';
import { AuthService } from '../../../../api/services/auth.service';
import { ProgressSpinner } from 'primeng/progressspinner';
import { OrdenService } from '../../../../api/services/ordenes/orden.service';

@Component({
  selector: 'app-table-productos-carrito-usuario',
  imports: [
    Dialog,
    Button,
    TableModule,
    RouterLink,
    CommonModule,
    ButtonDirective,
    ProgressSpinner
],
  templateUrl: './table-productos-carrito-usuario.html',
  styleUrl: './table-productos-carrito-usuario.css',
})
export class TableProductosCarritoUsuario {
  @Input() productos: Carrito_Producto[] = [];
  @Input() totalCarrito: number = 0;
  @Input() mostrarSpinner: boolean = false;
  @Input() procesoCompletado: boolean = false;

  @Output() eliminarProducto = new EventEmitter<number>();
  @Output() aumentarCantidad = new EventEmitter<number>();
  @Output() vaciarCarrito = new EventEmitter<void>();
  @Output() pagarCarrito = new EventEmitter<void>();
  @Output() mostrarModalVaciarChange = new EventEmitter<boolean>();
  @Output() mostrarModalPagarChange = new EventEmitter<boolean>();

  mostrarModalVaciar = false;
  mostrarModalPagar = false;

  onEliminarProducto(id: number) {
    this.eliminarProducto.emit(id);
  }

  onAumentarCantidad(id: number) {
    this.aumentarCantidad.emit(id);
  }

  onVaciarCarrito() {
    this.vaciarCarrito.emit();
  }

  onPagarCarrito() {
    this.pagarCarrito.emit();
  }

  abrirModalVaciar() {
    this.mostrarModalVaciar = true;
    this.mostrarModalVaciarChange.emit(true);
  }

  abrirModalPagar() {
    this.mostrarModalPagar = true;
    this.mostrarModalPagarChange.emit(true);
  }


}
