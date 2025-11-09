import {Component, effect, inject, OnDestroy, OnInit, signal} from '@angular/core';
import { ProductRow } from './product-row/product-row';
import { Carousel } from './carousel/carousel';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import {UsuariosService} from '../../api/services/usuarios/usuarios.service';
import {AuthService} from '../../api/services/auth.service';
import {MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';
import { Producto } from '../../modules/usuarios/interfaces/producto.interface';
import { SkinsService } from '../../api/services/skins/skins.service';
import { Subscription } from 'rxjs';
import { Usuario } from '../../../../../back/src/models/usuario.model';



@Component({
  selector: 'app-home',
  imports: [CommonModule, ProductRow, ButtonModule, Carousel, Toast],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers: [MessageService]
})
export class Home implements OnInit, OnDestroy{

  public skins: Producto[]= [];
  private skinService= inject(SkinsService);
  private skinSubscription?: Subscription;

  usuarioService = inject(UsuariosService);
  authService = inject(AuthService);
  usuario = signal<Usuario | null>(null)
  messageService = inject(MessageService);

  constructor() {
    effect(() => {
      const user = this.authService.user();
      if (user) {
        this.usuario.set(user);
      }
    });
  }

  idUsuario!: number;



  productosDestacados: Producto[] = [];
  productosak47: Producto[] = [];
  productosSMG: Producto[] = [];
  productosM5: Producto[] = [];
  productosCuchillos: Producto[] = [];
  productosGuantes: Producto[] = [];
  productosRiflesAWP: Producto[]=[];



  ngOnInit(): void {
    //this.idUsuario = this.authService.user()?.id!;
    this.authService.recargarUsuario();
    this.cargarTodasLasSkins();
  }

  ngOnDestroy(): void {
    this.skinSubscription?.unsubscribe();
  }

  onAgregarProducto(producto: Producto) {
    // Agregar producto a carrito
    this.idUsuario = this.authService.user()?.id!;
    console.log('¡¡EVENTO FINAL RECIBIDO EN HOME!! Agregando:', producto.nombre_skin);
    this.usuarioService.postAgregarProductoAlCarrito(this.idUsuario, { productoId: producto.id_skin }).subscribe({
        next: () => {
          // Actualiza la vista, por ejemplo, vuelve a cargar el carrito
          console.log('Producto agregado correctamente');
        },
        error: () => {
          console.error('Error al agregar el producto');
        },
        complete: () => {
          this.showBottomRight()
          // Opcional: lógica al terminar la petición
        }
      }
    )

  }

  cargarTodasLasSkins():void
  {
    this.skinSubscription= this.skinService.listSkins().subscribe({

      next:(productos: Producto[]) =>{
        console.log("Skins recibidas.")

        this.skins= productos;

        this.filtrarSkinsParaRows();
      },
      error:(err) =>{
        console.log("Fallo al cargar las skins");
      }
    });
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

  filtrarSkinsParaRows(){


    this.productosak47= this.skins.filter(skin=>
      skin.id_arma_base == 1
    );

    this.productosRiflesAWP= this.skins.filter(skin=>
      skin.id_arma_base == 2
    );

    this.productosCuchillos= this.skins.filter(skin=>
      skin.id_arma_base == 3
    );

    this.productosM5= this.skins.filter(skin=>
      skin.id_arma_base == 4
    );

    this.productosGuantes= this.skins.filter(skin=>
      skin.id_arma_base == 5
    );



    this.productosDestacados = [...this.skins]
      .sort((a, b) => Number(b.precio) - Number(a.precio))
      .slice(0, 6);
    this.productosSMG= this.skins.filter(skin=>
    skin.armas && skin.armas.categoria ==='SMG');
    }

  verTodosLosProductos(){

  }


}
