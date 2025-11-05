import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../../../shared/product-card/product-card';
import { Producto } from '../../../modules/usuarios/interfaces/producto.interface';
import { SkinsService } from '../../../api/services/skins/skins.service';


@Component({
  selector: 'app-product-row',
  imports: [CommonModule, ProductCard],
  templateUrl: './product-row.html',
  styleUrl: './product-row.css',
})
export class ProductRow implements OnInit, OnDestroy {


  
  public producto: Producto[] = [];
  private skinsService = inject(SkinsService);
  @Output() productoAgregadoFila = new EventEmitter<any>();


  ngOnInit(): void {
    this.cargarTodasLasSkins();
  }
  ngOnDestroy(): void {
}

  cargarTodasLasSkins(){
    this.skinsService.listSkins().subscribe({
      next: (productos: Producto[]) => {
        productos= this.producto;
        console.log('Productos cargados:', this.producto)
      }});

  }
  // Cuando la card emite un evento, este método lo captura
  onProductoAgregado(producto: any) {
    console.log('Evento capturado en la FILA:', producto.nombre);
    // Y lo vuelve a emitir hacia el componente HOME
    this.productoAgregadoFila.emit(producto);
  }

  
  @Input() titulo: string = '';
  @Input() productos: any[] = [];

  // Este componente solo "hará de puente"


  }
  

