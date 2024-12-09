import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User } from './entities/user';
import { Bcrypt } from 'src/lib/bcrypt/bcrypt';
import { UserResponse } from './entities/user.response';
@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcrypt: Bcrypt,
  ) {}
  public async created(user: User) {
    const newUser = new User(user);

    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: newUser.email,
      },
    });

    if (existingUser) {
      throw new ConflictException('Este usuário já existe');
    }

    const hash = await this.bcrypt.generateHash(newUser.password);

    const data = {
      name: newUser.name,
      email: newUser.email,
      password: hash,
    };

    const status = await this.prisma.user.create({
      data,
    });

    if (!status) {
      throw new HttpException(
        'Erro interno no servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findGetByAll(
    page: number,
    limit: number,
  ): Promise<UserResponse[]> {
    const skip = (page - 1) * limit;
    const docs = await this.prisma.user.findMany({
      skip,
      take: limit,
    });

    const userResponse = docs.map((user) => {
      return new UserResponse(user);
    });

    return userResponse;
  }

  public async findGetByAuth(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException('Usuário não existe');
    }

    return new User(user);
  }
}
