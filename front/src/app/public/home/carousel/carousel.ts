import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ProductCard } from '../../../shared/product-card/product-card';
import { Producto } from '../../../modules/usuarios/interfaces/producto.interface';
import { UsuariosService } from '../../../api/services/usuarios/usuarios.service';
import { AuthService } from '../../../api/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, CarouselModule, ProductCard],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel {
  usuarioService = inject(UsuariosService);
  authService = inject(AuthService);
  messageService = inject(MessageService);
  idUsuario!: number;

  @Input() productos: Producto[] = [];

  @Output() productoAgregadoCarousel = new EventEmitter<any>();

  responsiveOptions = [
      {
          breakpoint: '1400px',
          numVisible: 4,
          numScroll: 4
      },
      {
          breakpoint: '1200px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];

  ngOnInit(): void {
    this.idUsuario = this.authService.user()?.id!;
  }

  onProductoAgregado(producto: Producto) {
    console.log('Evento capturado en el CARRUSEL:', producto.nombre_skin);
    this.usuarioService.postAgregarProductoAlCarrito(this.idUsuario, {productoId:producto.id_skin}).subscribe({
        next: () => {
          // Actualiza la vista, por ejemplo, vuelve a cargar el carrito
          console.log('Producto agregado correctamente');
        },
        error: () => {
          console.error('Error al agregar el producto');
        },
        complete: () => {
          // Opcional: lógica al terminar la petición
          this.showBottomRight()
        }
      }
    )
  }

showBottomRight() {
    this.messageService.add({
      severity: 'success',
      summary: 'Producto agregado correctamente',
      detail: 'El producto ha sido añadido a tu carrito de compras.',
      key: 'br',
      life: 3000
    });
  }


}
