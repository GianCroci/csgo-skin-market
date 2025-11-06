import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Producto } from '../../../modules/usuarios/interfaces/producto.interface';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkinsService {

  http = inject(HttpClient);
  
  constructor() { }


  listSkins(): Observable<Producto[]> {

    return this.http.get<Producto[]>(`${environment.api_url}/skin`);
  }

  
  
}
