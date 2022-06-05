import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SignUpUser } from '../model/signup-user.model';
import { AuthService } from '../service/auth.service';

export interface ValidationResult {
  [key: string]: boolean;
}

export class PasswordValidator {

  public static number(control: FormControl): ValidationResult | null{
    let hasNumber = /\d/.test(control.value);
    const valid = hasNumber;
    if (!valid) {
        return { number: true };
    }
    return null;
}

public static upper(control: FormControl): ValidationResult | null{
  let hasUpper = /[A-Z]/.test(control.value);
  const valid = hasUpper;
  if (!valid) {
      return { upper: true };
  }
  
  return null;
}

public static lower(control: FormControl): ValidationResult | null{
  let hasLower = /[a-z]/.test(control.value);
  const valid = hasLower;
  if (!valid) {
      return { lower: true };
  }
  return null;
}

public static passwordMatchValidator(g: FormGroup) {
  const password: string = g.get('password')!.value;
  const repeat: string = g.get('repeat')!.value;
  console.log(password+" - "+repeat)
  return password === repeat ? null : { mismatch: true };
}

  public static strong(control: FormControl): ValidationResult | null{
      let hasNumber = /\d/.test(control.value);
      let hasUpper = /[A-Z]/.test(control.value);
      let hasLower = /[a-z]/.test(control.value);
      // console.log('Num, Upp, Low', hasNumber, hasUpper, hasLower);
      const valid = hasNumber && hasUpper && hasLower;
      if (!valid) {
          // return what´s not valid
          return { strong: true };
      }
      return null;
  }
}


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [MessageService]
})
export class SignUpComponent implements OnInit {

  isRegisteredFail = false;
  isRegistered = false;
  signUpUser?: SignUpUser;

  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }
  
  private buildForm(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      password: [ '', [
        Validators.required,
        Validators.minLength(7),
        PasswordValidator.number,
        PasswordValidator.upper,
        PasswordValidator.lower
      ]],
      repeat: ['', [Validators.required]]
    }, { validators: this.checkPasswords })
  }

  checkPasswords: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get("password");
    const password_repeat = control.get("repeat");
    
    //Comprobamos unicamente
    return password &&
      password_repeat &&
      password.value !== password_repeat.value
      ? { equals: false }
      : null;
  };

  formulario = new FormGroup(
    {
      password: new FormControl("", Validators.minLength(2)),
      password_repeat: new FormControl("", Validators.minLength(2))
    },
    //El segundo parametro son opciones, y entre ellas esta validator. 
    { validators: [this.checkPasswords] }
  );

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
        this.toast("error", "Fallo con el servidor", "");
      }
    })
  }

  private toast(severity: string, summary: string, message: string): void {
    this.messageService.add({
      severity: severity, 
      summary: summary, 
      detail: message
    }); 
  }

}