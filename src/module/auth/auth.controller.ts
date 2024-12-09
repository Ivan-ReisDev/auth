import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dtos/user.response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  @Post()
  public async signIn(@Body() auth: AuthDto): Promise<AuthResponseDto> {
    const token = await this.authService.signIn(auth);
    return token;
  }
}
