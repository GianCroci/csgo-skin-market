import { Component } from '@angular/core';
import { ProductRow } from './product-row/product-row';
import { Carousel } from './carousel/carousel';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Carousel, ProductRow, ButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  // Lista para el carrusel
  productosDestacados: any[] = [
    { id: '1', nombre: 'AWP | Dragon Lore', clasificacion: 'Rifle', precio: 4500.00, imagenUrl: 'img/AWP-Dragon-Lore.png' },
    { id: '2', nombre: 'Cuchillo Karambit | Fade', clasificacion: 'Cuchillo', precio: 1800.00, imagenUrl: 'img/Cuchillo-Karambit-Fade.png' },
    { id: '3', nombre: 'AK-47 | Asiimov', clasificacion: 'Rifle', precio: 350.00, imagenUrl: 'img/AK-47-Asiimov.png' },
    { id: '12', nombre: 'Guantes de Especialista | Fade', clasificacion: 'Guantes', precio: 2300.00, imagenUrl: 'img/Guantes-Fade.png' },
    { id: '16', nombre: '\'The Doctor\' Romanov', clasificacion: 'Agente', precio: 12.00, imagenUrl: 'img/Agente-Romanov.png' }
  ];

  // Rifles
  productosRifles: any[] = [
    { id: '3', nombre: 'AK-47 | Asiimov', clasificacion: 'Rifle', precio: 350.00, imagenUrl: 'img/AK-47-Asiimov.png' },
    { id: '1', nombre: 'AWP | Dragon Lore', clasificacion: 'Rifle', precio: 4500.00, imagenUrl: 'img/AWP-Dragon-Lore.png' },
    { id: '4', nombre: 'M4A4 | Howl', clasificacion: 'Rifle', precio: 3200.00, imagenUrl: 'img/M4A4-Howl.png' },
    { id: '6', nombre: 'M4A1-S | Printstream', clasificacion: 'Rifle', precio: 250.00, imagenUrl: 'img/M4A1-S-Printstream.png' },
    { id: '7', nombre: 'Glock-18 | Fade', clasificacion: 'Pistola', precio: 1500.00, imagenUrl: 'img/Glock-18-Fade.png' },
    { id: '8', nombre: 'USP-S | Kill Confirmed', clasificacion: 'Pistola', precio: 90.00, imagenUrl: 'img/USP-S-Kill-Confirmed.png' }
  ];

  // Cuchillos
  productosCuchillos: any[] = [
    { id: '2', nombre: 'Cuchillo Karambit | Fade', clasificacion: 'Cuchillo', precio: 1800.00, imagenUrl: 'img/Cuchillo-Karambit-Fade.png' },
    { id: '5', nombre: 'Bayoneta M9 | Tiger Tooth', clasificacion: 'Cuchillo', precio: 750.00, imagenUrl: 'img/Bayoneta-M9-Tiger-Tooth.png' },
    { id: '9', nombre: 'Cuchillo Mariposa | Doppler', clasificacion: 'Cuchillo', precio: 2100.00, imagenUrl: 'img/Butterfly-Doppler.png' },
    { id: '10', nombre: 'Cuchillo Huntsman | Slaughter', clasificacion: 'Cuchillo', precio: 450.00, imagenUrl: 'img/Huntsman-Slaughter.png' }
  ];

  // Guantes
  productosGuantes: any[] = [
    { id: '11', nombre: 'Guantes Deportivos | Slingshot', clasificacion: 'Guantes', precio: 1100.00, imagenUrl: 'img/Guantes-Slingshot.png' },
    { id: '12', nombre: 'Guantes de Especialista | Fade', clasificacion: 'Guantes', precio: 2300.00, imagenUrl: 'img/Guantes-Fade.png' },
    { id: '13', nombre: 'Guantes Broken Fang | Jade', clasificacion: 'Guantes', precio: 300.00, imagenUrl: 'img/Guantes-Jade.png' }
  ];

  //  Agentes
  productosAgentes: any[] = [
    { id: '14', nombre: 'Sir Bloody Darryl', clasificacion: 'Agente', precio: 35.00, imagenUrl: 'img/Agente-Darryl.png' },
    { id: '15', nombre: 'Special Agent Ava', clasificacion: 'Agente', precio: 18.00, imagenUrl: 'img/Agente-Ava.png' },
    { id: '16', nombre: '\'The Doctor\' Romanov', clasificacion: 'Agente', precio: 12.00, imagenUrl: 'img/Agente-Romanov.png' }
  ]


  onAgregarProducto(producto: any) {
    // Agregar producto a carrito
    console.log('¡¡EVENTO FINAL RECIBIDO EN HOME!! Agregando:', producto.nombre);
  }

  verTodosLosProductos() {
    // lógica para navegar
    console.log("Navegando a todos los productos...");
  }

}
