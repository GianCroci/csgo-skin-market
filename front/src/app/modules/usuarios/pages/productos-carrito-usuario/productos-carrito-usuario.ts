import { Component, inject } from '@angular/core';
import {
  TableProductosCarritoUsuario
} from '../../components/table-productos-carrito-usuario/table-productos-carrito-usuario';
import { Carrito_Producto } from '../../interfaces/carrito_producto.interface';
import { Carrito } from '../../interfaces/carrito.interface';
import { UsuariosService } from '../../../../api/services/usuarios/usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../api/services/auth.service';
import { OrdenService } from '../../../../api/services/ordenes/orden.service';

@Component({
  selector: 'app-productos-carrito-usuario',
  imports: [
    TableProductosCarritoUsuario
  ],
  templateUrl: './productos-carrito-usuario.html',
  styleUrl: './productos-carrito-usuario.css',
})
export class ProductosCarritoUsuario {
carrito?: Carrito;
  mostrarModalVaciar = false;
  mostrarModalPagar = false;
  procesando = false;
  usuarioService = inject(UsuariosService);
  ordenService = inject(OrdenService);
  activatedRouter = inject(ActivatedRoute)
  authService = inject(AuthService);
  productos: Carrito_Producto[] = [];
  totalCarrito: number = 0;
  idUsuario!: number;
  mostrarSpinner:boolean = false;
  procesoCompletado:boolean = false;

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


  onEliminarProducto(productoId: number): void {
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

  onAumentarCantidad(productoId: number): void {
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



  onVaciarCarrito(): void {
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

  onPagarCarrito() {
    this.mostrarSpinner = true;
    this.procesoCompletado = false;
    console.log(this.mostrarSpinner)

    const idsSkins = this.productos.map(producto => producto.skin.id_skin).filter(idSkin => idSkin != null);
    console.log('IDs de skins para la orden:', idsSkins);
    this.ordenService.generarOrden(this.idUsuario, idsSkins,this.totalCarrito).subscribe({
      next: () => {
        console.log('Orden generada correctamente');
      },
      error: () => {
        this.procesando = false;
      },
      complete: () => {
      }
    });


    this.usuarioService.vaciarCarrito(this.idUsuario).subscribe({
      next: () => {
        // Opcional: actualiza la vista
      },
      error: () => {
        this.procesando = false;
        // Maneja el error
      },
      complete: () => {
         setTimeout(() => {  // opcional, para que se vea el spinner 1s
        this.mostrarSpinner = false;
        this.procesoCompletado = true;
        this.listProductosCarritoUsuario();
      }, 2500);
      }
    });
  }

  pagarCarritoConfirmacion() {
    this.mostrarModalPagar = true;
    this.mostrarSpinner = false;
    this.procesoCompletado = false;
  }

}
