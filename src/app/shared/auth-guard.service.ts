import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable() //other services can inject into this guard service
export class AuthGuard
{
  constructor(private authService: AuthService
    , private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean 
  { 
    //the method can return both sync/async hence we have Observable, Promise for async  
    //validate auth via service & return a promise.
    return this.authService.isAuthenticated()
      .then(
        (authenticated: boolean) => {
          if (authenticated) {
            return true;
          } else {
            //route user back to root/home page
            this.router.navigate(['/']);
          }
        }
      );
  }

  canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate();
  }
}
