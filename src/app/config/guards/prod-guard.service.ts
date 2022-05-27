import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenService } from 'src/app/entities/user/service/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProdGuardService implements CanActivate {

  realRol?: string;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    const espectedRol = "Hola";
    const roles = this.tokenService.getAuthorities();
    this.realRol = "user";
    roles.forEach(rol => {
      if (rol == "ROLE_ADMIN") {
        this.realRol = "admin";
      }
    })

    if(!this.tokenService.getToken() || espectedRol.indexOf(this.realRol) === -1 ) {
      this.router.navigate(['/']);

      return false;
    }
    return true;

  }
}
