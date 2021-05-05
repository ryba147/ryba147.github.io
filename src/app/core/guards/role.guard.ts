import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(public auth: AuthService, public userService: UserService, public router: Router) {}

  canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const expectedRole = childRoute.data.expectedRole;


    if (this.auth.isLoggedIn && this.userService.getUser().role === expectedRole) {
      return true;
    }
    this.router.navigate(['profile']);
    return false;
  }
}
