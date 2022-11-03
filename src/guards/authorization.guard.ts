import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IRequest } from 'src/domain/services';
import { SessionService } from 'src/services';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly sessionService: SessionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { headers, route, method } = context
      .switchToHttp()
      .getRequest() as IRequest;
    if (!headers.authorization) {
      throw new HttpException('Token Not Found.', HttpStatus.FORBIDDEN);
    }

    try {
      const tokenIsValid = this.sessionService.decodeToken(
        headers.authorization.split(' ')[1],
      );

      return true;
    } catch (error) {
      throw new UnauthorizedException({
        error: 'Token Invalid',
      });
    }
  }
}
