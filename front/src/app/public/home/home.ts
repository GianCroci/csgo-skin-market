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
  imports: [CommonModule, ProductRow, ButtonModule,Carousel],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy{

  public skins: Producto[]= [];
  private skinService= inject(SkinsService);
  private skinSubscription?: Subscription;

  // Lista para el carrusel
  productosDestacados: Producto[] = [];
  productosRifles: Producto[] = [];
  productosCuchillos: Producto[] = [];
  productosRiflesAWP: Producto[] = [];


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


    this.productosRifles= this.skins.filter(skin=>
      skin.armas && skin.armas.categoria ==='Rifle');

    this.productosCuchillos= this.skins.filter(skin=>
    skin.armas && skin.armas.categoria ==='Cuchillo');

    /*
    this.productosDestacados= this.skins.(
      sort((a, b) => b.precio - a.precio) // Ordenamos de mayor a menor precio
      .slice(0, 10); // Tomamos los primeros 10');
  */
    this.productosRiflesAWP= this.skins.filter(skin=>
    skin.armas && skin.armas.categoria ==='AWP');
  }

  verTodosLosProductos(){

  }
  

}
