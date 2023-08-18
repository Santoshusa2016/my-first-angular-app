import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, exhaustMap, take } from "rxjs";
import { AuthService } from "./auth-service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authSvc: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authSvc.user.pipe(
      take(1),
      exhaustMap((user) => {
        //tip: we can also check URL before adding token
        if (!user) {
          return next.handle(req);
        }
        const clonedReq = req.clone({
          params: new HttpParams().set("auth", user.token),
        });

        //return observable
        return next.handle(clonedReq);
      })
    );
  }
}
