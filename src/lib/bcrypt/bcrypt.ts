import * as bcrypt from 'bcrypt';

export class Bcrypt {
  private saltOrRounds: number = 10;

  async generateHash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, this.saltOrRounds);
    return hash;
  }

  async compareHash(password: string, passwordDb: string): Promise<boolean> {
    const status = bcrypt.compare(password, passwordDb);
    if (status) {
      return true;
    }
    return false;
  }
}
