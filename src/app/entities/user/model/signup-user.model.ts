export class SignUpUser {

  email: string;
  name: string;
  password: string;
  authorities: string [];

  constructor(
    email: string, 
    name: string, 
    password: string, 
    authorities: string []
  ) {
    this.email = email
    this.name = name
    this.password = password
    this.authorities = authorities
  }


}