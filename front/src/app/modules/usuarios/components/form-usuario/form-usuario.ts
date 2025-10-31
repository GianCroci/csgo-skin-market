import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { UsuariosService } from '../../../../api/services/usuarios/usuarios.service';
//import { Usuario } from '../../interfaces/usuario.interface;
import { Usuario } from "../../interfaces/usuario.interface"
import { Message } from 'primeng/message';

@Component({
  selector: 'app-form-usuario',
  imports: [ReactiveFormsModule, InputTextModule, Message],
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
    
      this.form = this.fb.group({
      nombre: [this.usuario()?.nombre, [Validators.required]],
      apellido: [this.usuario()?.nombre, [Validators.required]],
      mail: [this.usuario()?.mail, [Validators.required, Validators.email]], 
      password: [this.usuario()?.nombre, [Validators.required]]
    });

  }
    isInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }
  

  ngOnDestroy(): void {}

  sendUsuario() {

    console.log('🔥 sendUsuario ejecutado');
  console.log('Form valid:', this.form.valid);
  console.log('Form value:', this.form.value);

  if (this.form.invalid) {
    console.log('❌ Formulario inválido');
    console.log('Errores:', this.form.errors);
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control?.invalid) {
        console.log(`Campo ${key} inválido:`, control.errors);
      }
    });
    return;  // ← Detén la ejecución si es inválido
  }

    const usuario: Usuario = {
      nombre: this.form.get('nombre')?.value,
      apellido: this.form.get('apellido')?.value,
      mail: this.form.get('mail')?.value,
      password: this.form.get('password')?.value,
    };

    this.eventEmitterFormUsuario.emit(usuario);

  }
}
