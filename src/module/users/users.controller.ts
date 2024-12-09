import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from './entities/user';
import { UsersService } from './users.service';
import { UserResponse } from './entities/user.response';
import { AuthGuard } from '../auth/auth.guard';
import { Public } from 'src/common/decorators/public';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Public()
  @UsePipes(ValidationPipe)
  @Post()
  public async created(@Body() data: User): Promise<void> {
    const user = new User(data);
    await this.userService.created(user);
  }

  @Get()
  async findGetAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ): Promise<UserResponse[]> {
    const users = await this.userService.findGetByAll(page, limit);
    return users;
  }
}
