import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DataView } from 'primeng/dataview';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { RouterModule } from '@angular/router';

interface Orden {
  id: number;
  fecha: string;
  estado: string;
  pago: string;
  envio: string;
  total: number;
}

@Component({
  selector: 'app-list-mis-pedidos',
  standalone: true,
  imports: [CommonModule, DataViewModule, CardModule, ButtonModule, RouterModule],
  templateUrl: './list-mis-pedidos.html',
  styleUrl: './list-mis-pedidos.css',
})
export class ListPedidosComponent {

  ordenes: Orden[] = [
    {
      id: 150,
      fecha: '16/07/2020',
      estado: 'Abierta',
      pago: 'Pagado',
      envio: 'No enviado',
      total: 1747.94
    },
    {
      id: 149,
      fecha: '16/07/2020',
      estado: 'Abierta',
      pago: 'Pagado',
      envio: 'Enviado',
      total: 1276.18
    }
  ];

}
