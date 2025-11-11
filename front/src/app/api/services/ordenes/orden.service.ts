import { carrito_producto } from './../../../../../../back/node_modules/.prisma/client/index.d';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Orden } from '../../../modules/usuarios/interfaces/orden.interface';
import { environment } from '../../../../environments/environment';
import { Carrito } from '../../../modules/usuarios/interfaces/carrito.interface';

@Injectable({
  providedIn: 'root'
})

export class OrdenService {

  private apiUrl = 'http://localhost:3000/api/orden';

  constructor(private http: HttpClient) {}

  getOrdenesPorUsuario(idUsuario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuario/${idUsuario}`);
  }

  getOrdenPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  generarOrden(idUsuario: number,idsSkins:number[],totalCarrito:number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/generar/orden/${idUsuario}`, { idsSkins,totalCarrito });
  }
}
