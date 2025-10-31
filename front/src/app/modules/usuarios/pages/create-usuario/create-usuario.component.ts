import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../../../api/services/usuarios/usuarios.service';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';
import { Usuario } from '../../interfaces/usuario.interface';
import { Router, RouterLink } from '@angular/router';
import { FormUsuario } from "../../components/form-usuario/form-usuario";

@Component({
  selector: 'app-create-usuario',
  imports: [ReactiveFormsModule, InputTextModule, FormUsuario],
  templateUrl: './create-usuario.component.html',
  styleUrl: './create-usuario.component.css',
})
export class CreateUsuarioComponent implements OnInit, OnDestroy {
  router = inject(Router);

  usuarioService = inject(UsuariosService);

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  crearUsuario(usuario:Usuario) {
    this.usuarioService.createUsuario(usuario).subscribe({
      next: (data: Usuario) => {
        console.log(data);
      },
      error: (error) => {
        //mensaje de error
      },
      complete: () => {
        this.router.navigate(['/home']);
      },
    });
  }
}
