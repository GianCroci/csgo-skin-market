import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductRow } from './product-row/product-row';
import { Carousel } from './carousel/carousel';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Producto } from '../../modules/usuarios/interfaces/producto.interface';
import { SkinsService } from '../../api/services/skins/skins.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ProductRow, ButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy{

  public skins: Producto[]= [];
  private skinService= inject(SkinsService);
  private skinSubscription?: Subscription;

  // Lista para el carrusel
  productosDestacados: Producto[] = [];
  productosak47: Producto[] = [];
  productosSMG: Producto[] = [];
  productosM5: Producto[] = [];
  productosCuchillos: Producto[] = [];
  productosGuantes: Producto[] = [];
  productosRiflesAWP: Producto[]=[];



  ngOnInit(): void {

    this.cargarTodasLasSkins();
  }

  ngOnDestroy(): void {
    this.skinSubscription?.unsubscribe();
  }

  onAgregarProducto(producto: Producto) {
    // Agregar producto a carrito
    console.log('¡¡EVENTO FINAL RECIBIDO EN HOME!! Agregando:', producto.nombre_skin);
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


    /*
    this.productosDestacados= this.skins.(
      sort((a, b) => b.precio - a.precio) // Ordenamos de mayor a menor precio
      .slice(0, 10); // Tomamos los primeros 10');
  */
    this.productosSMG= this.skins.filter(skin=>
    skin.armas && skin.armas.categoria ==='SMG');
  }

  verTodosLosProductos(){

  }
  

}
