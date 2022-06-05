export class ChangeUser {

    id: number | undefined;
    email?: string;
    name?: string;
    password?: string;
  
    constructor(
      id: number | undefined,
      email?: string, 
      name?: string, 
      password?: string
    ) {
      this.id = id
      this.email = email
      this.name = name
      this.password = password
    }
  
}