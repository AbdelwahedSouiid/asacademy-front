import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthService} from "../services/login/auth.service";

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated || this.authService.accessToken) {
      return true;
    } else {
      localStorage.setItem('redirectUrl', this.router.url);
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
