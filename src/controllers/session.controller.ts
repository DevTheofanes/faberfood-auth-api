import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ISessionParams, ISessionResult } from 'src/domain/services';
import { HashService, SessionService, UserService } from 'src/services';

@Controller('session')
export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UserService,
    private readonly hashService: HashService,
  ) {}

  @Post()
  async createSession(
    @Body() body: ISessionParams,
  ): Promise<ISessionResult | string> {
    const user = await this.userService.findOne({
      username: body.username,
      email: body.email,
      phone: body.phone,
    });

    if (!user) {
      throw new HttpException('User Not Found.', HttpStatus.NOT_FOUND);
    }

    const passwordIsValid = await this.hashService.compare(
      body.password,
      user.password,
    );

    if (!passwordIsValid) {
      throw new HttpException('Password not is valid', HttpStatus.BAD_REQUEST);
    }

    return {
      user,
      token: this.sessionService.generateToken({
        id: user.id,
        userAccess: user.userAccess,
      }),
    };
  }
}
