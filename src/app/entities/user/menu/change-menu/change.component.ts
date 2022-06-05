import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent implements OnInit {

  email!: string;
  name!: string;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.getEmail();
    this.getName();
  }

  getEmail(){
    this.email = this.tokenService.getEmail()!;
  }

  getName(){
    this.name = this.tokenService.getName()!;
  }

}