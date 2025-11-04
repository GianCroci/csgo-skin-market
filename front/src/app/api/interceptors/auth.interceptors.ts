// src/app/interceptors/auth.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  const publicUrls = ['/usuario/login', '/usuario/create-usuario'];
  const isPublicUrl = publicUrls.some(url=>req.url.includes(url))
  
  // Si hay token, agregarlo al header
  let authReq = req;
  if (token && !isPublicUrl) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  return next(authReq).pipe(
    catchError((error) => {
      // Si es error 401 (no autenticado), hacer logout
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
      }
      // Si es error 403 (no autorizado)
      if (error.status === 403) {
        router.navigate(['/unauthorized']);
      }
      
      return throwError(() => error);
    })
  );
};