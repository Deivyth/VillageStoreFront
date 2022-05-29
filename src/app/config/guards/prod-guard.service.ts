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
    const espectedRol = route.data['espectedRol'];
    this.realRol = this.tokenService.isAdmin() ? 'admin' : 'user'

    if(!this.tokenService.isLogged() || espectedRol.indexOf(this.realRol) < 0 ) {
      this.router.navigate(['/']);
      return false;
    }
    return true;

  }
}
