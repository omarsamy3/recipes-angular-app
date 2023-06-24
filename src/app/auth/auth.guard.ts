import { 
  ActivatedRouteSnapshot, 
  CanActivate, 
  CanLoad, 
  Route, 
  Router, 
  RouterStateSnapshot, 
  UrlSegment, 
  UrlTree 
} from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable, map, take } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthGaurd implements CanActivate{

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot, 
    router: RouterStateSnapshot
  ): boolean | UrlTree | Promise<boolean | UrlTree> |
      Observable<boolean | UrlTree>{
    return this.authService.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if(isAuth){
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
    );
  }
}