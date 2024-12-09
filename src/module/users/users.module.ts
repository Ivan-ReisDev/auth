import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/database/prisma.service';
import { Bcrypt } from 'src/lib/bcrypt/bcrypt';
@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, Bcrypt],
  exports: [UsersService],
})
export class UsersModule {}
