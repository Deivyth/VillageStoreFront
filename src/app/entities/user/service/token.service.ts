import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {


  roles: string[] = [];

  constructor() { }

  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | undefined{
    return localStorage.getItem(TOKEN_KEY) ?? undefined;
  }

  public isLogged(): boolean {
    if(this.getToken()) {
      return true;
    } else {
      return false;
    }
  }

  public isAdmin(): boolean {
    if(!this.isLogged()) {
      return false;
    }
    const token = this.getToken();
    const payload = token?.split('.')[1];
    const payloadDecoded = atob(payload!);
    const values = JSON.parse(payloadDecoded);
    const id = values.roles;
    if(this.roles.indexOf('ROLE_ADMIN') < 0){
      return false;
    }
    return true;
  }

  public getId(): string | null{
    if(!this.isLogged()) {
      return null;
    } else { 
      const token = this.getToken();
      const payload = token?.split('.')[1];
      const payloadDecoded = atob(payload!);
      const values = JSON.parse(payloadDecoded);
      const id = values.id;
      return id;
    }
  }

  public logOut(): void {
    window.localStorage.clear();
  }

}
