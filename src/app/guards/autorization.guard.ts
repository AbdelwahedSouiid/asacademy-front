import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from "@angular/core";
import { AuthService } from "../services/login/auth.service";

@Injectable()
export class AuthorizationGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (this.authService.isAuthenticated) {
      const requiredRoles = route.data['roles'] as string[];
      const userRoles = this.authService.roles;
      console.log('Required roles:', requiredRoles);
      console.log('User roles:', userRoles);

      const roleMatch = requiredRoles.every(role => userRoles.includes(role));
      if (roleMatch) {
        console.log('All required roles match');
        return true;
      } else {
        this.router.navigateByUrl('/unauth')
        return false;
      }
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
