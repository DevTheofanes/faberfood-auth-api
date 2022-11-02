import { Body, Controller, Post } from '@nestjs/common';
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
      return 'User Not Found';
    }

    const passwordIsValid = await this.hashService.compare(
      body.password,
      user.password,
    );

    if (!passwordIsValid) {
      return 'Password not is valid';
    }

    return {
      user,
      token: this.sessionService.generateToken(user),
    };
  }
}
