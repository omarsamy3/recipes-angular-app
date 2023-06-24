import { HttpEvent, HttpHandler,
   HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, exhaustMap, take } from "rxjs";
import { AuthService } from "./auth.service";


@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1), //take(1) takes the latest user and then unsubscribes
      /*
      exhaustMap waits for the first observable to complete,
      then it replaces it with the second observable
      */
      exhaustMap(user => {
        if(!user){
          return next.handle(req);
        }
        //Return a user token only if there is a user.
        const modifiedRequest = req.clone(
          {
            params: new HttpParams().set('auth', user.token!)
          });
        return next.handle(modifiedRequest);
      })
    )
  }
  
}