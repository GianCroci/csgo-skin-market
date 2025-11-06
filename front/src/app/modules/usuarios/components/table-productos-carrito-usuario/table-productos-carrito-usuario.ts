import {Component} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {Button} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {RouterLink} from '@angular/router';
import {CommonModule, CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-table-productos-carrito-usuario',
  imports: [
    Dialog,
    Button,
    TableModule,
    RouterLink,
    CommonModule,
    CurrencyPipe
  ],
  templateUrl: './table-productos-carrito-usuario.html',
  styleUrl: './table-productos-carrito-usuario.css',
})
export class TableProductosCarritoUsuario {
  // carrito?: Carrito;
  // mostrarModalVaciar = false;
  // mostrarModalPagar = false;
  // procesando = false;
  // procesoCompletado = false;
  // usuarioService = inject(UsuarioService);
  // productoService = inject(ProductoService);
  // activatedRouter = inject(ActivatedRoute)
  // productos: Carrito_Producto[] = [];
  // totalCarrito: number = 0;
  // idUsuario!: number;
  totalCarrito = 0;
  productos = [
    {
      nombre: 'Skin AWP | Dragon Lore',
      clasificacion: 'Rifle',
      cantidad: 1,
      precio: 1500.00,
      imagenUrl: 'img/AWP-Dragon-Lore.png'
    },
    {
      nombre: 'Guantes de Especialista | Fade',
      clasificacion: 'Guantes',
      cantidad: 1,
      precio: 2300.00,
      imagenUrl: 'img/Guantes-Fade.png'
    },
    {
      nombre: 'Skin AK-47 | Redline',
      clasificacion: 'Rifle',
      cantidad: 2,
      precio: 123.97,
      imagenUrl: 'img/AK-47-Asiimov.png'
    },
    {
      nombre: 'Cuchillo Karambit | Fade',
      clasificacion: 'Cuchillo',
      cantidad: 1,
      precio: 1800.00,
      imagenUrl: 'img/Cuchillo-Karambit-Fade.png'
    },
    {
      nombre: '\'The Doctor\' Romanov',
      clasificacion: 'Agente',
      cantidad: 1,
      precio: 12.00,
      imagenUrl: 'img/Agente-Romanov.png'
    },
    {
      nombre: 'Bayoneta M9 | Tiger Tooth',
      clasificacion: 'Cuchillo',
      cantidad: 1,
      precio: 750.00,
      imagenUrl: 'img/Bayoneta-M9-Tiger-Tooth.png'
    },
  ]

  // ngOnInit(): void {
  //   this.idUsuario = Number(this.activatedRouter.snapshot.paramMap.get('idUsuario'))
  //   this.listProductosCarritoUsuario();
  // }
  //
  // ngOnDestroy(): void {
  //   // Cleanup logic here
  // }
  //
  // listProductosCarritoUsuario(): void {
  //   this.usuarioService.getProductosCarrito(this.idUsuario).subscribe(
  //     {
  //       next: (carrito: Carrito) => {
  //         this.carrito = carrito;
  //         this.productos = this.carrito?.carrito_producto || [];
  //         this.productos = this.productos.sort((a, b) => a.producto.nombre.localeCompare(b.producto.nombre));
  //         console.log(this.carrito);
  //         this.totalCarrito = this.obtenerTotalDelCarrito(this.productos);
  //
  //       },
  //       error: () => {
  //
  //       },
  //       complete: () => {
  //
  //       }
  //     }
  //   )
  // }
  //
  // obtenerTotalDelCarrito(productosCarrito: Carrito_Producto[]): number {
  //   const total = productosCarrito.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
  //   return Number(total.toFixed(2));
  // }
  //
  //
  // eliminarProductoDelCarrito(productoId: number): void {
  //   console.log(`Eliminar producto con ID ${productoId} del carrito`);
  //   this.usuarioService.postEliminarProductoDelCarrito(this.idUsuario, {productoId}).subscribe({
  //       next: () => {
  //         // Actualiza la vista, por ejemplo, vuelve a cargar el carrito
  //         this.listProductosCarritoUsuario();
  //         console.log('Producto eliminado correctamente');
  //       },
  //       error: () => {
  //         console.error('Error al eliminar el producto');
  //       },
  //       complete: () => {
  //         // Opcional: lógica al terminar la petición
  //       }
  //     }
  //   )
  // }
  //
  // aumentarCantidadDeProductoAlCarrito(productoId: number): void {
  //   console.log(`Aumentando cantidad de  producto con ID ${productoId} al carrito`);
  //   this.productoService.postAgregarProductoAlCarrito(this.idUsuario, {productoId}).subscribe({
  //       next: () => {
  //         // Actualiza la vista, por ejemplo, vuelve a cargar el carrito
  //         console.log('Producto agregado correctamente');
  //       },
  //       error: () => {
  //         console.error('Error al agregar el producto');
  //       },
  //       complete: () => {
  //         // Opcional: lógica al terminar la petición
  //         this.listProductosCarritoUsuario();
  //       }
  //     }
  //   )
  //
  // }
  //
  //
  //
  // vaciarCarrito(usuarioId: number): void {
  //   console.log(`Vaciando el carrito del usuairo con ID: ${usuarioId}`);
  //   this.productoService.vaciarCarrito(usuarioId).subscribe({
  //       next: () => {
  //         // Actualiza la vista, por ejemplo, vuelve a cargar el carrito
  //
  //       },
  //       error: () => {
  //         console.error('Error al agregar el producto');
  //       },
  //       complete: () => {
  //         // Opcional: lógica al terminar la petición
  //         this.mostrarModalVaciar = false;
  //         this.listProductosCarritoUsuario();
  //       }
  //     }
  //   )
  // }
  //
  // vaciarCarritoConfirmacion() {
  //   this.mostrarModalVaciar = true;
  // }
  //
  // pagarCarrito(idUsuario: number) {
  //   this.procesando = true;
  //   this.procesoCompletado = false;
  //   this.productoService.vaciarCarrito(idUsuario).subscribe({
  //     next: () => {
  //       this.procesando = false;
  //       this.procesoCompletado = true;
  //       // Opcional: actualiza la vista
  //     },
  //     error: () => {
  //       this.procesando = false;
  //       // Maneja el error
  //     },
  //     complete: () => {
  //       // Opcional: lógica al terminar la petición
  //       this.listProductosCarritoUsuario();
  //     }
  //   });
  // }
  //
  // pagarCarritoConfirmacion() {
  //   this.mostrarModalPagar = true;
  //   this.procesando = false;
  //   this.procesoCompletado = false;
  // }


}
