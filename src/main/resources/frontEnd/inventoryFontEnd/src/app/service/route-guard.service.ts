import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HardcodedAuthenticationService } from './hardcoded-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  constructor(
    private authinticationService : HardcodedAuthenticationService,
    private router:Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    console.log("ROUTE GUARD SERVICE");
    if(this.authinticationService.isUserLoggedIn()){
      return true;
    }
    this.router.navigate(['login'])
    return false;
  }
}
