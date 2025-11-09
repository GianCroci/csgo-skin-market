import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: number;
    nombre: string;
    apellido: string;
    mail: string;
    rol: string;
    provincia: string;
    pais: string
  };
}

interface User {
  id: number;
  nombre: string;
  apellido: string;
  mail: string;
  rol: string;
  provincia: string;
  pais: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private readonly TOKEN_KEY = 'auth_token';

  // Signals para estado reactivo
  private userSignal = signal<User | null>(null);
  private isAuthSignal = signal<boolean>(false);

  // Exponer como readonly
  user = this.userSignal.asReadonly();
  isAuthenticated = this.isAuthSignal.asReadonly();

  // Computed para el nombre completo
  fullName = computed(() => {
    const user = this.userSignal();
    return user ? `${user.nombre} ${user.apellido}` : '';
  });




  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checkAuthStatus();
  }

  public recargarUsuario(): void {
  this.checkAuthStatus();
}


  login(mail: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.api_url}/usuario/login`, {mail, password})
      .pipe(
        tap(response => {
          if (response.success && response.token) {

            localStorage.setItem(this.TOKEN_KEY, response.token);

            // Actualizar estado


            this.userSignal.set(response.user);
            this.isAuthSignal.set(true);
          }
        }),
        catchError(error => {
          console.error('Error en login:', error);
          return throwError(() => error);
        })
      );
  }


  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.userSignal.set(null);
    this.isAuthSignal.set(false);
    this.router.navigate(['/login']);
  }


  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }


  private checkAuthStatus(): void {
    const token = this.getToken();

    if (token) {

      try {
        const payload = this.decodeToken(token);

        // Verificar si el token no ha expirado


        if (payload.exp * 1000 > Date.now()) {
          this.userSignal.set({
            id: payload.id_usuario,
            nombre: payload.nombre,
            apellido: payload.apellido,
            mail: payload.mail,
            rol: payload.rol,
            provincia: payload.provincia,
            pais: payload.pais

          });
          this.isAuthSignal.set(true);
        } else {

          this.logout();
        }
      } catch (error) {
        console.error('Token inválido:', error);
        this.logout();
      }
    }
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      throw new Error('Token inválido');
    }
  }

  hasRole(role: string): boolean {
    const user = this.userSignal();
    return user?.rol === role;
  }
}
