import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../api/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, MenubarModule, RouterModule],

  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  private authService = inject(AuthService);
  private router = inject(Router);


  items = computed<MenuItem[]>(() => {
    
    const isLogged = this.authService.isAuthenticated();

    const baseItems: MenuItem[] = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/home'
      },
      {
        label: 'Carrito',
        icon: 'pi pi-shopping-cart',
        routerLink: '/usuarios/carrito-usuario'
      }
    ];

    if (isLogged) {
      baseItems.push({
        label: 'Perfil',
        icon: 'pi pi-user',
        items: [
          {
            label: 'Mi Cuenta',
            icon: 'pi pi-user-edit',
            routerLink: '/usuarios/mi-cuenta'
          },
          {
            label: 'Mis Pedidos',
            icon: 'pi pi-list',
            routerLink: '/usuarios/list-mis-pedidos'
          },
          {
            label: 'Cerrar Sesión',
            icon: 'pi pi-sign-out',
            command: () => this.logout()
          }
        ]
      });
    } else {
      baseItems.push(
        {
          label: 'Iniciar Sesión',
          icon: 'pi pi-sign-in',
          routerLink: '/login'
        },
        {
          label: 'Registrarse',
          icon: 'pi pi-user-plus',
          routerLink: '/usuarios/create-usuario'
        }
      );
    }

    return baseItems;
  });

  logout(): void {
    this.authService.logout();
  }
}
