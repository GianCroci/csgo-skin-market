import { Component, inject, input, output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Usuario } from '../../interfaces/usuario.interface';
import { Button } from 'primeng/button';
import { UsuariosService } from '../../../../api/services/usuarios/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla-usuarios-list',
  imports: [TableModule, Button],
  templateUrl: './tabla-usuarios-list.html',
  styleUrl: './tabla-usuarios-list.css',
})
export class TablaUsuariosList {
  usuarioService = inject(UsuariosService);
  usuarios = input.required<Usuario[]>();

  router = inject(Router);

  eventEmitterTableUsuario = output<boolean>();

  createUsuario() {
    this.router.navigate([`usuarios/create-usuario`]);
  }

  editarUsuario(usuario: Usuario) {
    this.router.navigate([`usuarios/update-usuario`, usuario.id]);
  }

  verUsuario(usuario: Usuario) {
    this.router.navigate([`usuarios/detail-usuario`, usuario.id]);
    //usuarios/detail-usuario/1
  }

  eliminarUsuario(usuario: Usuario) {
    this.usuarioService.eliminarUsuario(usuario).subscribe({
      next: (data) => {
        //mensaje de exito
      },
      error: (error) => {
        //mensaje de error
      },
      complete: () => {
        this.eventEmitterTableUsuario.emit(true);
      },
    });
  }
}
