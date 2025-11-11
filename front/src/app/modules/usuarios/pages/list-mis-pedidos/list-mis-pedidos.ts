import { Component, OnInit } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrdenService } from '../../../../api/services/ordenes/orden.service';
import { Orden } from '../../interfaces/orden.interface';
import { AuthService } from '../../../../api/services/auth.service';

@Component({
  selector: 'app-list-mis-pedidos',
  standalone: true,
  imports: [CommonModule, DataViewModule, CardModule, ButtonModule, RouterModule],
  providers: [OrdenService],
  templateUrl: './list-mis-pedidos.html',
  styleUrls: ['./list-mis-pedidos.css']
})

export class ListPedidosComponent implements OnInit{
  ordenes: Orden[] = [];
  userId = 1; // Aquí deberías obtener el ID del usuario autenticado

  constructor(
    private ordenService : OrdenService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const user = this.authService.user();
    const userId = user?.id;

    if (userId) {
      this.cargarOrdenes(userId);
    } else {
      console.error('No se encontró un usuario logueado.');
    }
  }

  cargarOrdenes(userId:number) {
    this.ordenService.getOrdenesPorUsuario(userId).subscribe({
      next: (data: Orden[]) => {
        this.ordenes = data;
        console.log('Órdenes obtenidas:', this.ordenes);
      },
      error: (err: any) => {
        console.error('Error al cargar las órdenes:', err);
      }
    });
  }
}
