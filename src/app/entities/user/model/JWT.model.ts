export class JWT {

    token: string;
    type: string;
    id: number;
    email: string;
    authorities: string [];

    constructor(
        token: string, 
        type: string,
        id: number,
        email: string, 
        authorities: string []
    ) {
        this.token = token
        this.type = type
        this.id = id;
        this.email = email
        this.authorities = authorities
    }

}