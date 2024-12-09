import { IsEmail, IsString, MinLength } from 'class-validator';

export class User {
  public readonly id?: number;
  @IsEmail()
  public email: string;
  @IsString()
  @MinLength(8)
  public password: string;
  @IsString()
  public name: string;

  constructor(props: User) {
    Object.assign(this, props);
  }
}
