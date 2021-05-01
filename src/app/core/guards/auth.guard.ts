import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  // returns true when the route can be activated, otherwise false
  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //
  //   if (!this.authService.isLoggedIn()) {
  //     this.router.navigate(['login']);
  //     return false;
  //   }
  //   return true;
  // }

  login(loginForm): void {
    this.authService
      .authUser(new URLSearchParams(loginForm.value).toString())
      .subscribe(
        (response) => {
          // this.authService.setUser(JSON.stringify(response.userData));
          this.authService.setUser(response.userData);
          console.log(1111, this.authService.userSubject);
          console.log("loginComponent| this.u !== null: ", this.authService.userSubject !== null);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    console.log("user", this.authService.userSubject);
    console.log("is logged????", this.authService.isLoggedIn);

    return true;
    // if (!this.authService.isLoggedIn) {
    //   this.router.navigate(['login']);
    //   return false;
    // }
    // return true;
  }
}

