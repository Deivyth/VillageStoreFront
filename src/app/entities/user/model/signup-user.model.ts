export class SignUpUser {

  id: number;
  email: string;
  name: string;
  password: string;
  authorities: string [];

  constructor(
    id: number,
    email: string, 
    name: string, 
    password: string, 
    authorities: string []
  ) {
    this.id = id,
    this.email = email
    this.name = name
    this.password = password
    this.authorities = authorities
  }


}