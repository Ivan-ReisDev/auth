import { IsEmail, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  public email: string;
  @IsString()
  public password: string;

  constructor(props: AuthDto) {
    Object.assign(this, props);
  }
}
