import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ProductCard } from '../../../shared/product-card/product-card';
import { Producto } from '../../../modules/usuarios/interfaces/producto.interface';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, CarouselModule, ProductCard],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel {
  @Input() productos: Producto[] = [];

  @Output() productoAgregadoCarousel = new EventEmitter<any>();

  onProductoAgregado(producto: Producto) {
    console.log('Evento capturado en el CARRUSEL:', producto.nombre_skin);
    this.productoAgregadoCarousel.emit(producto);
  }
}
