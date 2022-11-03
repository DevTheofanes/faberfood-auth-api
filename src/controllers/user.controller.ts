import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IUser, IUserParams } from 'src/domain/services';
import { AuthorizationGuard } from 'src/guards';
import { UserService } from 'src/services';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createAccount(@Body() body: IUserParams): Promise<IUser> {
    return this.userService.create(body);
  }

  @Get('/info/:id')
  @UseGuards(AuthorizationGuard)
  async findAccount(@Param() params: { id: string }): Promise<IUser> {
    const user = await this.userService.findOne({
      id: +params.id,
    });

    if (!user) {
      throw new NotFoundException({
        error: 'User not found.',
      });
    }

    return {
      ...user,
      password: undefined,
    };
  }
}
