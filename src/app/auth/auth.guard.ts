import { Injectable } from "@angular/core";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth-service";
import { map, take } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthNGuard implements CanActivate {
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  //sect20:307 - AuthGuard to stop direct route access
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authSvc.user.pipe(
      take(1),
      map((user) => {
        let isAuth = !!user;
        if (isAuth) {
          console.log("AuthNGuard: user authenticated");
          return true;
        }
        //navigate user to auth page
        console.log("AuthNGuard: user not authenticated");
        this.router.createUrlTree(["/auth"]);
        return false;
      })
    );
  }
}
