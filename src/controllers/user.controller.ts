import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IUser, IUserParams } from 'src/domain/services';
import { UserService } from 'src/services';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createAccount(@Body() body: IUserParams): Promise<IUser> {
    return await this.userService.create(body);
  }

  @Get('/info/:id')
  async findAccount(@Param() params: { id: string }): Promise<IUser> {
    return await this.userService.findOne(+params.id);
  }
}
