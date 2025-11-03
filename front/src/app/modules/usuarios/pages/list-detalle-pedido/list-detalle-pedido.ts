//import { ProductoService } from '@/service/productoservice';
//import { Product } from '@/domain/producto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-list-detalle-pedido',
  standalone: true,
  imports: [TableModule, TagModule, RatingModule, ButtonModule, CommonModule],
  templateUrl: './list-detalle-pedido.html',
  styleUrl: './list-detalle-pedido.css',
  //providers: [ProductService]
})
export class ListDetallePedido /*implements OnInit*/{

  ordenId!: number;

  constructor(private route: ActivatedRoute) {
  //private productService: ProductService;
  this.ordenId = Number(this.route.snapshot.paramMap.get('id'));
  console.log('ID recibido:', this.ordenId);
  }

  /*
  ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });
    }
  */

  orden =
    {
      id: 150,
      fecha: '16/07/2020',
      estado: 'Abierta',
      pago: 'Pagado',
      envio: 'No enviado',
      total: 1747.94,
      productos: [
        { nombre: 'Skin AWP | Dragon Lore', clasificacion: 'Rifle', cantidad: 1, precio: 1500.00, imagenUrl: 'img/AWP-Dragon-Lore.png'},
        { nombre: 'Skin AK-47 | Redline', clasificacion: 'Rifle', cantidad: 2, precio: 123.97, imagenUrl: 'img/AK-47-Asiimov.png' }
      ]
     }
     /*
    {
      id: 149,
      fecha: '16/07/2020',
      estado: 'Abierta',
      pago: 'Pagado',
      envio: 'Enviado',
      total: 1276.18,
      productos: [
        { nombre: 'Skin M4A4 | Howl', clasificacion: 'Rifle', cantidad: 1, precio: 1000.00, imagenUrl: 'img/M4A4-Howl.png'},
        { nombre: 'Skin Glock-18 | Fade', clasificacion: 'Pistola', cantidad: 1, precio: 276.18, imagenUrl: 'img/Glock-18-Fade.png'}
      ]
    }
    */
  }
