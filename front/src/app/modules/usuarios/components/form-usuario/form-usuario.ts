import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { UsuariosService } from '../../../../api/services/usuarios/usuarios.service';
//import { Usuario } from '../../interfaces/usuario.interface;
import { Usuario } from "../../interfaces/usuario.interface"

@Component({
  selector: 'app-form-usuario',
  imports: [ReactiveFormsModule, InputTextModule, Button],
  templateUrl: './form-usuario.html',
  styleUrl: './form-usuario.css',
})
export class FormUsuario {

  title:string = "Crear Usuario";

  private fb = inject(FormBuilder);

  router = inject(Router);

  form!: FormGroup;

  usuarioService = inject(UsuariosService);

  

  usuario = input<Usuario>();

  eventEmitterFormUsuario = output<Usuario>();

  ngOnInit(): void {
    if(this.usuario()){
      this.title = "Actualizar usuario"
    }

    this.form = this.fb.group({
      nombre: [this.usuario()?.nombre, [Validators.required]]
    });
  }

  ngOnDestroy(): void {}

  sendUsuario() {
    const usuario: Usuario = {
      id: this.usuario()?.id,
      nombre: this.form.get('nombre')?.value,
      apellido: this.form.get('apellido')?.value,
      mail: this.form.get('mail')?.value,
      password: this.form.get('password')?.value,
      token: this.form.get('token')?.value,
      rol: this.form.get('rol')?.value,
      verificado: this.form.get('verificado')?.value,
      fechaIngreso: this.form.get('fechaIngreso')?.value
    };

    this.eventEmitterFormUsuario.emit(usuario);

  }
}
