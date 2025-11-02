import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { FormUsuario } from '../../components/form-usuario/form-usuario';
import { Usuario } from '../../interfaces/usuario.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../../../../api/services/usuarios/usuarios.service';

@Component({
  selector: 'app-verificar-mail',
  imports: [Button, RouterLink],
  templateUrl: './verificar-mail.html',
  styleUrl: './verificar-mail.css',
})
export class VerificarMail implements OnInit, OnDestroy {

  router = inject(Router);
  usuarioService = inject(UsuariosService);
  activatedRouter = inject(ActivatedRoute);
  usuario!: Usuario;
  token!: string;

  ngOnInit(): void {
  this.token = this.activatedRouter.snapshot.paramMap.get('token') ?? '';
  if (this.token) {
    this.verificarMail(this.token);
  }
}


  ngOnDestroy(): void {}


  verificarMail(token: string) {
    this.usuarioService.verificarMail(token).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        //mensaje de error
      }
    });
  }
}