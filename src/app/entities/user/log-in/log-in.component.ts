import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogInUser } from '../model/login-user.mode';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  isLoginFail = false;
  loginUser?: LogInUser;
  email: string =  "";
  password: string = "";
  roles: string[] = [];

  loginForm?: FormGroup;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.buildForm();

    if(this.tokenService.getToken()) {
      this.tokenService.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    const loginUser: any = this.createFromForm();
    this.authService.logIn(loginUser).subscribe({
      next: (data) => {
        this.tokenService.isLogged = true;
        this.isLoginFail = false;

        this.tokenService.setId( data.id.toString() );
        this.tokenService.setToken(data.token);
        this.tokenService.setEmail(data.email);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/']);
      } ,
      error: (err) => {
        this.tokenService.isLogged = false;
        this.isLoginFail = true;
        console.log(err);
      }
    })
  }

  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', {require: true}],
      password: ['', { require: true }]
    })
  }

  private createFromForm() {
    return {
      ...this.loginUser,
      email: this.loginForm?.get(['email'])!.value,
      password: this.loginForm?.get(['password'])!.value,
    }
  }

}
