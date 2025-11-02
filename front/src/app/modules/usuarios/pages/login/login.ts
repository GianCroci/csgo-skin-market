import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Message } from 'primeng/message';
import { UsuariosService } from '../../../../api/services/usuarios/usuarios.service';
import { Usuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputTextModule, Message],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
title:string = "Crear Usuario";

  private fb = inject(FormBuilder);

  router = inject(Router);

  form!: FormGroup;

  usuariosServices = inject(UsuariosService);

  existeUsuario = input<boolean>();

  usuario = input<Usuario>();

 

  ngOnInit(): void {
    
      this.form = this.fb.group({
      mail: [this.usuario()?.mail, [Validators.required, Validators.email]], 
      password: [this.usuario()?.nombre, [Validators.required, Validators.minLength(6)]]
    });

  }
    isInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }  

  ngOnDestroy(): void {}

  login(mail: string, password: string) {
    this.usuariosServices.login(mail, password).subscribe({
      next: (data: Usuario) => {
        console.log('se registro correctamente es usuario con mail: ' + data.mail);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.router.navigate(['/home']);
      },
    });
  }
}
