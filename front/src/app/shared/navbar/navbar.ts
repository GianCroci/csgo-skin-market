import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, MenubarModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  items: MenuItem[] = []; // Array para guardar los items del menú

  ngOnInit() {
    // Definimos la estructura del menú
    // (Aún no tenemos las rutas, pero las dejamos listas)
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/home'
      },
      {
        label: 'Carrito',
        icon: 'pi pi-shopping-cart',
        routerLink: '/carrito'
      },
      {
        label: 'Perfil',
        icon: 'pi pi-user',
        items: [
          {
            label: 'Mi Cuenta',
            icon: 'pi pi-user-edit'
          },
          {
            label: 'Mis Pedidos',
            icon: 'pi pi-list',
            routerLink: '/usuarios/list-mis-pedidos'
          },
          {
            label: 'Cerrar Sesión',
            icon: 'pi pi-sign-out'
          }
        ]
      }
    ];
  }
}
