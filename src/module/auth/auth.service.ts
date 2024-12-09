import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dtos/user.dto';
import { UsersService } from '../users/users.service';
import { Bcrypt } from 'src/lib/bcrypt/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthResponseDto } from './dtos/user.response.dto';

@Injectable()
export class AuthService {
  private expirationJwtTime: number;
  constructor(
    private readonly bcrypt: Bcrypt,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.expirationJwtTime = +this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }
  public async signIn(auth: AuthDto): Promise<AuthResponseDto> {
    const userDto = new AuthDto(auth);
    const data = await this.userService.findGetByAuth(userDto.email);

    if (this.bcrypt.compareHash(userDto.password, data.password)) {
      const payload = {
        sub: data.id,
        email: data.email,
      };
      const token = this.jwtService.sign(payload);
      return { token, expireIn: this.expirationJwtTime };
    }
    throw new UnauthorizedException('Usuário ou senha incorreto');
  }
}
