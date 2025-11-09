import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Producto } from '../../modules/usuarios/interfaces/producto.interface';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-product-card',
  imports: [CommonModule, CardModule, ButtonModule,RouterModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard  {

  @Input() producto: Producto = {} as Producto

  @Output() productoAgregado = new EventEmitter<any>();

  agregarAlCarrito() {
    if(this.producto){
          console.log('Agregando desde la CARD:', this.producto);
          this.productoAgregado.emit(this.producto);
    };
    // Emitimos el evento hacia el padre, pasándole el producto
  }

}
