import {Component, inject} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {Button, ButtonDirective} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {Carrito} from '../../interfaces/carrito.interface';
import {Carrito_Producto} from '../../interfaces/carrito_producto.interface';
import {UsuariosService} from '../../../../api/services/usuarios/usuarios.service';
import { AuthService } from '../../../../api/services/auth.service';

@Component({
  selector: 'app-table-productos-carrito-usuario',
  imports: [
    Dialog,
    Button,
    TableModule,
    RouterLink,
    CommonModule,
    ButtonDirective
  ],
  templateUrl: './table-productos-carrito-usuario.html',
  styleUrl: './table-productos-carrito-usuario.css',
})
export class TableProductosCarritoUsuario {
  carrito?: Carrito;
  mostrarModalVaciar = false;
  mostrarModalPagar = false;
  procesando = false;
  procesoCompletado = false;
  usuarioService = inject(UsuariosService);
  activatedRouter = inject(ActivatedRoute)
  authService = inject(AuthService);
  productos: Carrito_Producto[] = [];
  totalCarrito: number = 0;
  idUsuario!: number;


  ngOnInit(): void {
    this.idUsuario = this.authService.user()?.id!;
    this.listProductosCarritoUsuario();
  }

  ngOnDestroy(): void {
    // Cleanup logic here
  }

  listProductosCarritoUsuario(): void {
    this.usuarioService.getProductosCarrito(this.idUsuario).subscribe(
      {
        next: (carrito: Carrito) => {
          this.carrito = carrito;
          console.log('Carrito obtenido:', this.carrito);
          this.productos = this.carrito?.carrito_producto || [];
          this.productos = this.productos.sort((a, b) => a.skin.nombre_skin.localeCompare(b.skin.nombre_skin));
          this.totalCarrito = this.obtenerTotalDelCarrito(this.productos);

        },
        error: (err) => {
          console.error('Error al obtener productos del carrito:', err);
        },
        complete: () => {

        }
      }
    )
  }

  obtenerTotalDelCarrito(productosCarrito: Carrito_Producto[]): number {
    const total = productosCarrito.reduce((total, item) => total + (item.skin.precio * item.cantidad), 0);
    return Number(total.toFixed(2));
  }


  eliminarProductoDelCarrito(productoId: number): void {
    console.log(`Eliminar producto con ID ${productoId} del carrito`);
    this.usuarioService.postEliminarProductoDelCarrito(this.idUsuario, {productoId}).subscribe({
        next: () => {
          // Actualiza la vista, por ejemplo, vuelve a cargar el carrito
          this.listProductosCarritoUsuario();
          console.log('Producto eliminado correctamente');
        },
        error: () => {
          console.error('Error al eliminar el producto');
        },
        complete: () => {
          // Opcional: lógica al terminar la petición
        }
      }
    )
  }

  aumentarCantidadDeProductoAlCarrito(productoId: number): void {
    console.log(`Aumentando cantidad de  producto con ID ${productoId} al carrito`);
    this.usuarioService.postAgregarProductoAlCarrito(this.idUsuario, {productoId}).subscribe({
        next: () => {
          // Actualiza la vista, por ejemplo, vuelve a cargar el carrito
          console.log('Producto agregado correctamente');
        },
        error: () => {
          console.error('Error al agregar el producto');
        },
        complete: () => {
          // Opcional: lógica al terminar la petición
          this.listProductosCarritoUsuario();
        }
      }
    )

  }



  vaciarCarrito(): void {
    console.log(`Vaciando el carrito del usuairo con ID: ${this.idUsuario}`);
    this.usuarioService.vaciarCarrito(this.idUsuario).subscribe({
        next: () => {
          // Actualiza la vista, por ejemplo, vuelve a cargar el carrito

        },
        error: () => {
          console.error('Error al agregar el producto');
        },
        complete: () => {
          // Opcional: lógica al terminar la petición
          this.mostrarModalVaciar = false;
          this.listProductosCarritoUsuario();
        }
      }
    )
  }

  vaciarCarritoConfirmacion() {
    this.mostrarModalVaciar = true;
  }

  pagarCarrito() {
    this.procesando = true;
    this.procesoCompletado = false;
    this.usuarioService.vaciarCarrito(this.idUsuario).subscribe({
      next: () => {
        this.procesando = false;
        this.procesoCompletado = true;
        // Opcional: actualiza la vista
      },
      error: () => {
        this.procesando = false;
        // Maneja el error
      },
      complete: () => {
        // Opcional: lógica al terminar la petición
        this.listProductosCarritoUsuario();
      }
    });
  }

  pagarCarritoConfirmacion() {
    this.mostrarModalPagar = true;
    this.procesando = false;
    this.procesoCompletado = false;
  }


}
