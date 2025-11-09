import {HttpClient, HttpHeaders} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Usuario } from '../../../modules/usuarios/interfaces/usuario.interface';
import { map, Observable, throwError } from 'rxjs';
import { UsuarioMapper } from './mapping/usuarios.mapper';
import { UsuarioRest } from './mapping/usuario.interface.rest';
import { VerificarMail } from '../../../modules/usuarios/pages/verificar-mail/verificar-mail';
import {Carrito} from '../../../modules/usuarios/interfaces/carrito.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private readonly TOKEN_KEY = 'auth_token';
  http = inject(HttpClient);

  constructor() {}

  listUsuarios(): Observable<Usuario[]> {
    return this.http.get<UsuarioRest[]>(`${environment.api_url}/usuario/`).pipe(
      map((res)=>{
        return UsuarioMapper.mapRestUsuarioArrayToUsuarioArray(res)
      })
    )
  }

  eliminarUsuario(usuario: Usuario) {
    return this.http.delete(`${environment.api_url}/usuario/${usuario.id}`);
  }

  verUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.api_url}/usuario/${id}`);
  }

  existeMail(mail: string): Observable<boolean>{
    return this.http.get<boolean>(`${environment.api_url}/usuario/${mail}`);
  }

  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.api_url}/usuario/`, usuario);
  }

  updateUsuario(usuario: Usuario) {
    return this.http.put<Usuario>(`${environment.api_url}/usuario/${usuario.id}`,usuario);
  }

  verificarMail(token: string) {
    return this.http.put<Usuario>(`${environment.api_url}/usuario/${token}`, {});
  }

  login(mail:string, password:string){
    return this.http.post<Usuario>(`${environment.api_url}/usuario/login`, {mail, password});
  }

  getProductosCarrito(idUsuario:number): Observable<Carrito> {
    return this.http.get<Carrito>(`${environment.api_url}/usuario/carrito/${idUsuario}`);
  }

  postEliminarProductoDelCarrito(idUsuario:number , body:{productoId:number}):Observable<void>{
    return this.http.post<void>(`${environment.api_url}/usuario/borrarProducto/${idUsuario}`, body);

  }

  postAgregarProductoAlCarrito(idUsuario: number, body: {productoId: number}):Observable<void> {
    return this.http.post<void>(`${environment.api_url}/usuario/agregar/${idUsuario}`, body);
  }

  vaciarCarrito(idUsuario: number) {
    return this.http.post<void>(`${environment.api_url}/usuario/vaciar/${idUsuario}`,{});
  }

}
