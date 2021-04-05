export class Principal {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  token: string;

  constructor(id: number, username: string, firstName: string, lastName: string, email: string,  role: string, token: string) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
    this.token = token;
  }

}
