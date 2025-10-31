import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { FormUsuario } from '../../components/form-usuario/form-usuario';
import { Usuario } from '../../interfaces/usuario.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../../../../api/services/usuarios/usuarios.service';

@Component({
  selector: 'app-update-usuario',
  imports: [Button, FormUsuario, RouterLink],
  templateUrl: './update-usuario.component.html',
  styleUrl: './update-usuario.component.css',
})
export class UpdateUsuarioComponent implements OnInit, OnDestroy {

  router = inject(Router);
  usuarioService = inject(UsuariosService);
  activatedRouter = inject(ActivatedRoute);
  usuario!: Usuario;
  id: number = 0;
  spinner = true;

  ngOnInit(): void {
    this.id = Number(this.activatedRouter.snapshot.paramMap.get('id'));
    this.verUsuario();
  }

  ngOnDestroy(): void {}

  verUsuario() {
    this.usuarioService.verUsuario(this.id).subscribe({
      next: (usuario: Usuario) => {
        this.usuario = usuario;
      },
      error: (error) => {
        //mensaje de error
      },
      complete: () => {
        this.spinner = false;
      },
    });
  }

  actualizarUsuario(usuario: Usuario) {
    this.usuarioService.createUsuario(usuario).subscribe({
      next: (data: Usuario) => {
        console.log(data);
      },
      error: (error) => {
        //mensaje de error
      },
      complete: () => {
        this.router.navigate(['/usuarios/list-usuarios']);
      },
    });
  }
}
