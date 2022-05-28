import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'app-user-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  constructor(
    private tokenService : TokenService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  logout(): void{
    this.tokenService.logOut();
  }

  getUserId(): number {
    return Number(this.tokenService.getId()!);
  }
}
