import { Component, inject, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { SkinsService } from '../../../../api/services/skins/skins.service';
import { UsuariosService } from '../../../../api/services/usuarios/usuarios.service';
import { AuthService } from '../../../../api/services/auth.service';

import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ButtonModule, TagModule, ToastModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  providers: [MessageService]
})
export class ProductDetail implements OnInit {

  private route = inject(ActivatedRoute);
  private skinsService = inject(SkinsService);
  private usuariosService = inject(UsuariosService);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  producto = signal<any>(null);
  idUsuario!: number;

  constructor() {
    effect(() => {
        const user = this.authService.user();
        if (user) {
            this.idUsuario = user.id;
        }
    });
  }

  ngOnInit() {
    this.authService.recargarUsuario();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.skinsService.getSkinById(Number(id)).subscribe({
        next: (data) => this.producto.set(data),
        error: (err) => console.error('Error al cargar producto:', err)
      });
    }
  }

  agregarAlCarrito() {
    const prod = this.producto();

    if (prod && this.idUsuario) {

      this.usuariosService.postAgregarProductoAlCarrito(this.idUsuario, { productoId: prod.id_skin }).subscribe({
        next: () => {
          console.log('Producto agregado correctamente desde detalle');
          this.showSuccessMessage();
        },
        error: (err) => {
          console.error('Error al agregar el producto al carrito', err);
           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo agregar al carrito' });
        }
      });

    } else {
        console.warn("Usuario no logueado, no se puede agregar al carrito");
        this.messageService.add({ severity: 'warn', summary: 'Atención', detail: 'Debes iniciar sesión para agregar productos.' });
    }
  }

  showSuccessMessage() {
    this.messageService.add({
      severity: 'success',
      summary: '¡Agregado!',
      detail: 'Producto añadido al carrito.',
      life: 3000
    });
  }

  goBack() {
    window.history.back();
  }
}
