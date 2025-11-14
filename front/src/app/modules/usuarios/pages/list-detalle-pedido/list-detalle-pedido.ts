//import { ProductoService } from '@/service/productoservice';
//import { Product } from '@/domain/producto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { OrdenService } from '../../../../api/services/ordenes/orden.service';

@Component({
  selector: 'app-list-detalle-pedido',
  standalone: true,
  imports: [TableModule, TagModule, RatingModule, ButtonModule, CommonModule],
  templateUrl: './list-detalle-pedido.html',
  styleUrl: './list-detalle-pedido.css',
})
export class ListDetallePedidoComponent implements OnInit{

  ordenId!: number;
  orden: any = null; // acá vamos a guardar la respuesta del backend
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private ordenService: OrdenService
  ) {}

  ngOnInit() {
    this.ordenId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID recibido:', this.ordenId);

    if (this.ordenId) {
      this.cargarDetalle();
    }
  }

  cargarDetalle() {
    this.ordenService.getOrdenPorId(this.ordenId).subscribe({
      next: (data) => {
        this.orden = data;
        this.loading = false;
        console.log('Detalle de orden:', this.orden);
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al cargar el detalle de la orden:', err);
      }
    });
  }

  goBack() {
    window.history.back();
  }

  }
