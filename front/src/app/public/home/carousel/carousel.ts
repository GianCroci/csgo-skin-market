import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ProductCard } from '../../../shared/product-card/product-card';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, CarouselModule, ProductCard],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel {
  @Input() productos: any[] = [];

  @Output() productoAgregadoCarousel = new EventEmitter<any>();

  onProductoAgregado(producto: any) {
    console.log('Evento capturado en el CARRUSEL:', producto.nombre);
    this.productoAgregadoCarousel.emit(producto);
  }
}
