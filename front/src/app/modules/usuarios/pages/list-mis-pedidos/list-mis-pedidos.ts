import { Component } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-list-mis-pedidos',
  standalone: true,
  imports: [CommonModule, DataViewModule, CardModule, ButtonModule, RouterModule],
  templateUrl: './list-mis-pedidos.html',
  styleUrl: './list-mis-pedidos.css'
})

export class ListPedidosComponent {

  ordenes = [
    { id: 150, fecha: '16/07/2020', estado: 'Abierta', pago: 'Pagado', envio: 'No enviado', total: 1747.94 },
    { id: 149, fecha: '16/07/2020', estado: 'Abierta', pago: 'Pagado', envio: 'Enviado', total: 1276.18 }
  ];

  constructor() {
  console.log('ordenes:', this.ordenes);
}
}
