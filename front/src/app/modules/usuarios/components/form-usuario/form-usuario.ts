import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { UsuariosService } from '../../../../api/services/usuarios/usuarios.service';
import { Usuario } from "../../interfaces/usuario.interface"
import { Message } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';


@Component({
  selector: 'app-form-usuario',
  imports: [ReactiveFormsModule, InputTextModule, Message, PasswordModule,
    DividerModule],
  templateUrl: './form-usuario.html',
  styleUrls: ['./form-usuario.css']
})
export class FormUsuario {

  title:string = "Crear Usuario";

  private fb = inject(FormBuilder);

  router = inject(Router);

  form!: FormGroup;

  usuarioService = inject(UsuariosService);

  existeUsuario = input<boolean>();

  usuario = input<Usuario>();

  eventEmitterFormUsuario = output<Usuario>();

  ngOnInit(): void {
    
      this.form = this.fb.group({
      nombre: [this.usuario()?.nombre, [Validators.required]],
      apellido: [this.usuario()?.apellido, [Validators.required]],
      mail: [this.usuario()?.mail, [Validators.required, Validators.email]], 
      password: [this.usuario()?.password || '', 
                  [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')
                  ]
                ],
      direccion: [this.usuario()?.direccion, [Validators.required]],
      localidad: [this.usuario()?.localidad, [Validators.required]],
      provincia: [this.usuario()?.provincia, [Validators.required]],
      pais: [this.usuario()?.pais, [Validators.required]],
    });

  }
    isInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }  

  ngOnDestroy(): void {}

  sendUsuario() {

    if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

      const usuario: Usuario = {
      nombre: this.form.get('nombre')?.value,
      apellido: this.form.get('apellido')?.value,
      mail: this.form.get('mail')?.value,
      password: this.form.get('password')?.value,
      direccion: this.form.get('direccion')?.value,
      localidad: this.form.get('localidad')?.value,
      provincia: this.form.get('provincia')?.value,
      pais: this.form.get('pais')?.value
    };

    this.eventEmitterFormUsuario.emit(usuario);

  }
}
