import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '../services/login/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('/projet/login')) {
      const newReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.authService.accessTokon)
      });
      return next.handle(newReq);
    } else {
      return next.handle(req);
    }
  }
}
