import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuariosService } from '../usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class CheckEmail {
  
constructor(private usuarioService : UsuariosService){}

 existeMail(mail : string): boolean{
  const existe =  this.usuarioService.existeMail(mail);
  return !!existe;
}

}
