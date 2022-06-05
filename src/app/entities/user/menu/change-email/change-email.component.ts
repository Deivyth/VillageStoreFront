import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ChangeUser } from '../../model/change-user.mode';
import { SignUpUser } from '../../model/signup-user.model';
import { TokenService } from '../../service/token.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss'],
  providers: [MessageService]
})
export class ChangeEmailComponent implements OnInit {

  emailForm!: FormGroup;
  user?: SignUpUser;

  constructor(
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private userService: UserService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.updateForm();
  }

  private buildForm(): void {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
    })
  }

  private updateForm(): void{
    this.emailForm?.patchValue({
      email: this.tokenService.getEmail()
    })
  }

  private createFromForm() {
    //To Do
    return {
      ...this.user,
      id: this.tokenService.getId(),
      email: this.emailForm?.get(['email'])!.value
    }
  }

  changeEmail() {
    const userToChange: any = this.createFromForm();
    this.userService.changeEmail(userToChange).subscribe({
      next: (userUpdate) => {
        // TO DO
        this.toast("success","Operacion realizada con exito", "Usuario actualizado");
      },
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
