import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export class Bcrypt {
  private saltOrRounds: number = 10;

  async generateHash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, this.saltOrRounds);
    return hash;
  }

  async compareHash(password: string, passwordDb: string): Promise<boolean> {
    const status = await bcrypt.compare(password, passwordDb);
    if (status === true) {
      return true;
    }
    throw new UnauthorizedException('Usuário ou senha incorreto');
  }
}
