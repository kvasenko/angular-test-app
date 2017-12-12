export class User {
  public email: string;
  public password: string;
  public name: string;
  public id: number;
  constructor (
    email: string,
    password: string,
    name: string,
    id?: number
  ) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.id = id;
  }
}
