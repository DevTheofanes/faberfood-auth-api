import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UsePipes,
  // UseGuards,
} from '@nestjs/common';
import { IReq, IUpdateUser, IUser, IUserParams } from 'src/domain/services';
import {
  CreateUserValidatorPipe,
  UpdateAccountValidatorPipe,
} from 'src/pipes/validators';
import { UserService } from 'src/services';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(CreateUserValidatorPipe)
  @Post()
  async createAccount(@Body() body: IUserParams): Promise<IUser> {
    let user: IUser | undefined;
    try {
      user = await this.userService.create(body);
    } catch (error: any) {
      throw new BadRequestException({ error: error.message });
    }

    if (!user) {
      throw new NotFoundException({
        error: 'User not found.',
      });
    }

    return user;
  }

  @Get('/info/:id')
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

  @UsePipes(UpdateAccountValidatorPipe)
  @Put()
  async updateAccount(
    @Body() body: IUpdateUser,
    @Req() { userId }: IReq,
  ): Promise<IUser> {
    let user: IUser | undefined;
    try {
      user = await this.userService.update({
        id: userId,
        ...body,
      });
    } catch (error: any) {
      throw new BadRequestException({ error: error.message });
    }

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
