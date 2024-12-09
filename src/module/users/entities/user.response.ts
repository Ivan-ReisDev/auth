export class UserResponse {
  public id: number;
  public name: string;
  public email: string;

  constructor(props: UserResponse) {
    this.name = props.name;
    this.email = props.email;
    this.id = props.id;
  }
}
