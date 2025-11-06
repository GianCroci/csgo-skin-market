import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../../../shared/product-card/product-card';
import { Producto } from '../../../modules/usuarios/interfaces/producto.interface';


@Component({
  selector: 'app-product-row',
  imports: [CommonModule, ProductCard],
  templateUrl: './product-row.html',
  styleUrl: './product-row.css',
})
export class ProductRow {

  @Output() productoAgregadoFila = new EventEmitter<any>();

  @Input() titulo: string = '';
  @Input() productos: Producto[] = [];

  // Este componente solo "hará de puente"

  onProductoAgregado(producto:Producto){
    console.log("Evento capturado en la fila: ", producto.nombre_skin);
    this.productoAgregadoFila.emit(producto);

  }

  }
  

