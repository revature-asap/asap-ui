export class User {
    public id: number;
    public username: string;
    public password: string;
    public firstname: string;
    public lastname: string;
    public email: string;
    public role: string;

    constructor(id: number, username: string, password: string, firstname: string, lastname: string, email: string, role: string)
    {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.role = role;
    }
  
}