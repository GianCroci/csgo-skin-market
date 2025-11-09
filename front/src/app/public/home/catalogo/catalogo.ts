import { Component, inject, Inject, OnDestroy, OnInit } from '@angular/core';
import { SkinsService } from '../../../api/services/skins/skins.service';
import { Producto } from '../../../modules/usuarios/interfaces/producto.interface';
import { Subscription } from 'rxjs';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../../../shared/product-card/product-card';

@Component({
  selector: 'app-catalogo',
  imports: [CommonModule,
            PaginatorModule,
            ProductCard],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit, OnDestroy{
  
  private skinService= inject(SkinsService);
  private skinSubscription?: Subscription;
  
  public skinsCatalogo: Producto[]=[];
  public skinsEnPaginaActual:Producto []=[];
  
  public rows: number=9;
  public totalRec:number =0;


  ngOnInit(): void {
    this.mostrarTodasLasSkins();
  }
  ngOnDestroy(): void {
    this.skinSubscription?.unsubscribe();    
  }
  
  
  mostrarTodasLasSkins(): void{
    console.log("Cargando las skins");
    this.skinSubscription= this.skinService.listSkins().subscribe({
      next:(skins:Producto[]) =>{
        this.skinsCatalogo= skins;
        this.totalRec=skins.length;

        this.skinsEnPaginaActual= this.skinsCatalogo.slice(0,this.rows);
      },
      error:(err: any) =>{
        console.log("Error al cargar las skins", err);
      }
    });
  }
  
  onPageChange(event: PaginatorState){
    const startIndex = event.first || 0;

    const endIndex = startIndex + (event.rows || this.rows);

    this.skinsEnPaginaActual = this.skinsCatalogo.slice(startIndex, endIndex);

    window.scrollTo(0, 0);
  }


  onAgregarProducto(producto: Producto) {
  }
}
