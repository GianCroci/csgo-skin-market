import { Component, effect, inject, signal } from '@angular/core';
import { UsuariosService } from '../../../../api/services/usuarios/usuarios.service';
import { Usuario } from '../../../../../../../back/src/models/usuario.model';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../../api/services/auth.service';
import { VideoBackgroundComponent } from "../../../../shared/video-background/video-background";


@Component({
  selector: 'app-mi-cuenta',
  imports: [VideoBackgroundComponent],
  templateUrl: './mi-cuenta.html',
  styleUrl: './mi-cuenta.css',
})
export class MiCuenta {
  authService = inject(AuthService);
  usuario = signal<Usuario | null>(null)

  imagenUrl = 'images/skins/perfil-chem.png'

  constructor() {
    effect(() => {
      const user = this.authService.user();
      if (user) {
        this.usuario.set(user);
      }
    });
  }

  ngOnInit() {
    
    this.authService.recargarUsuario();
  }

  ngOnDestroy(){}
  
  }
