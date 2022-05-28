import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const ID_KEY = 'AuthId';
const TOKEN_KEY = 'AuthToken';
const EMAIL_KEY = 'AuthEmail';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenService {


  roles: string[] = [];
  isLogged: boolean = false;

  constructor() { }

  public setId(id : string): void {
    window.sessionStorage.removeItem(ID_KEY);
    window.sessionStorage.setItem(ID_KEY, id);
  }

  public getId(): string | undefined{
    return sessionStorage.getItem(ID_KEY) ?? undefined;
  }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | undefined{
    return sessionStorage.getItem(TOKEN_KEY) ?? undefined;
  }

  public setEmail(email: string): void {
    window.sessionStorage.removeItem(EMAIL_KEY);
    window.sessionStorage.setItem(EMAIL_KEY, email);
  }

  public getEmail(): string | undefined{
    return sessionStorage.getItem(EMAIL_KEY) ?? undefined;
  }

  public setAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if(sessionStorage.getItem(AUTHORITIES_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)!).forEach( (item : any) => {
        this.roles.push(item.authority);
      });
    }

    return this.roles;
  }

  public logOut(): void {
    window.sessionStorage.clear();
    this.isLogged = false;
  }

}
