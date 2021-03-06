import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JWT } from '../model/JWT.model';
import { LogInUser } from '../model/login-user.mode';
import { SignUpUser } from '../model/signup-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.authURL;

  constructor(private http: HttpClient) { }

  public signUp (signUpUser: SignUpUser): Observable<any> {
    return this.http.post<any>(this.authURL + "register", signUpUser);

  }

  public logIn (logInUser: LogInUser): Observable<JWT> {
    return this.http.post<JWT>(this.authURL + "login", logInUser);
  }

}
