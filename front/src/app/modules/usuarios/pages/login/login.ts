import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Message } from 'primeng/message';
import { UsuariosService } from '../../../../api/services/usuarios/usuarios.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { AuthService } from '../../../../api/services/auth.service';
import { VideoBackgroundComponent } from "../../../../shared/video-background/video-background";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputTextModule, Message, VideoBackgroundComponent, Button],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private fb = inject(FormBuilder);

  router = inject(Router);

  form!: FormGroup;

  authService = inject(AuthService);

  existeUsuario = input<boolean>();

  usuario = input<Usuario>();

  errorLogin: string | null = null;



  ngOnInit(): void {

      this.form = this.fb.group({
      mail: [this.usuario()?.mail, [Validators.required, Validators.email]],
      password: [this.usuario()?.nombre, [Validators.required, Validators.minLength(6)]]
    });

    this.form.valueChanges.subscribe(() => (this.errorLogin = null));

  }
    isInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  ngOnDestroy(): void {}

  login(): void {

    this.errorLogin = null;

    if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }
    const {mail, password} = this.form.value;
    this.authService.login(mail, password).subscribe({
    next: () => {

      this.router.navigate(['/home']);
    },
    error: (error) => {

      console.log(error);
      if (error.status === 401) {
        this.errorLogin = "Contraseña incorrecta";
      }
      else if (error.status === 500) {
        this.errorLogin = "El correo no se encuentra registrado";
      }
      else {
        this.errorLogin = "Ocurrió un error inesperado. Intente más tarde.";
      }

    }
  });
}


}
