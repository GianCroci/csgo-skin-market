import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Producto } from '../../modules/usuarios/interfaces/producto.interface';


@Component({
  selector: 'app-product-card',
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard  {

  // @Input() permite que el componente PADRE (Home, Carousel, etc.)
  // le pase la información del producto.
  @Input() producto: Producto = {} as Producto  
// @Output() permite que este componente HIJO le "avise" al PADRE
  // que algo pasó (ej. el usuario hizo clic en "Agregar").
  @Output() productoAgregado = new EventEmitter<any>();

  agregarAlCarrito() {
    if(this.producto){
          console.log('Agregando desde la CARD:', this.producto);
          this.productoAgregado.emit(this.producto);
    };
    // Emitimos el evento hacia el padre, pasándole el producto
  }

}
