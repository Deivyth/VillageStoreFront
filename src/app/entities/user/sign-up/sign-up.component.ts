import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpUser } from '../model/signup-user.model';
import { AuthService } from '../service/auth.service';
import { passwordMatchValidator } from './password.helpers';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  isRegisteredFail = false;
  isRegistered = false;
  signUpUser?: SignUpUser;

  signupForm?: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }
  
  private buildForm(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      password: [ '', [Validators.required] ],
      repeatPassword: ['', [Validators.required]]
    })
  }

  private createFromForm(): SignUpUser {
    return {
      ...this.signUpUser,
      email: this.signupForm?.get(['email'])!.value,
      name: this.signupForm?.get(['name'])!.value,
      password: this.signupForm?.get(['password'])!.value
    };
  }

  onRegister(): void {
    const signupUser: any = this.createFromForm();
    this.authService.signUp(signupUser).subscribe({
      next: (data) => {
        this.isRegistered = true;
        this.isRegisteredFail = false;

        this.router.navigate(['/']);
      } ,
      error: (err) => {
        this.isRegisteredFail = false;
      }
    })
  }

}