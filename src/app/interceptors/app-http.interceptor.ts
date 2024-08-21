import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable, switchMap, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import {AuthService} from "../services/login/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;

    // Routes exemptées d'authentification
    const exemptedRoutes = ['/login', '/AppUser', '/home', '/register', '/blogs'];

    // Vérifier si l'URL de la requête contient l'une des routes exemptées
    const isExempted = exemptedRoutes.some(route => req.url.includes(route));

    // Vérifier si la requête a l'en-tête personnalisé pour ignorer le token
    const skipAuth = req.headers.has('X-Skip-Auth');

    if (!isExempted && !skipAuth) {
      const authUser = localStorage.getItem('authUser');
      const token = authUser ? JSON.parse(authUser).jwt : null;

      if (token) {
        authReq = req.clone({
          setHeaders: {Authorization: `Bearer ${token}`}
        });
      }
    }
    return next.handle(req);
  }
}

/*
    // Si la route est exemptée ou pas de token, passer a la refreshToke,
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token might be expired, try to refresh it
          return this.authService.refreshAccessToken().pipe(
            switchMap(() => {
              const newToken = this.authService.accessToken;
              if (newToken) {
                const newAuthReq = req.clone({
                  setHeaders: {Authorization: `Bearer ${newToken}`}
                });
                return next.handle(newAuthReq);
              }
              return throwError(error);
            })
          );
        }
        return throwError(error);
      })
    );
  }
}
*/
