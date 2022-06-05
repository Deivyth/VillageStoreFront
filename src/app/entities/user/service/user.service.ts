import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChangeUser } from '../model/change-user.mode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userURL = environment;

  constructor(private http: HttpClient) { }

  getUserByEmail(email: string){
    return this.http.get<ChangeUser>(this.userURL + email);
  }

  changeEmail(user: ChangeUser) {
    return this.http.post<ChangeUser>(this.userURL + "change-email", user);
  }

  changeName(user: ChangeUser) {
    return this.http.post<ChangeUser>(this.userURL + "change-email", user);
  }

  changePassword(user: ChangeUser) {
    return this.http.post<ChangeUser>(this.userURL + "change-email", user);
  }

}
