import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../../../shared/product-card/product-card';

@Component({
  selector: 'app-product-row',
  imports: [CommonModule, ProductCard],
  templateUrl: './product-row.html',
  styleUrl: './product-row.css',
})
export class ProductRow {
  @Input() titulo: string = '';
  @Input() productos: any[] = [];

  // Este componente solo "hará de puente"
  @Output() productoAgregadoFila = new EventEmitter<any>();

  // Cuando la card emite un evento, este método lo captura
  onProductoAgregado(producto: any) {
    console.log('Evento capturado en la FILA:', producto.nombre);
    // Y lo vuelve a emitir hacia el componente HOME
    this.productoAgregadoFila.emit(producto);
  }
}
