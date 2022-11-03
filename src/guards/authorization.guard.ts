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
      const userAccess = tokenIsValid.userAccess as string[];

      const featureAccess = `${method}:${route.path}`;
      if (!userAccess.find((access) => access === featureAccess)) {
        throw new UnauthorizedException({
          customMessage: 'Access Invalid',
        });
      }

      return true;
    } catch (error: any) {
      let message = 'Token Invalid';

      if (error?.response?.customMessage) {
        message = error?.response?.customMessage;
      }

      throw new UnauthorizedException({
        error: message,
      });
    }
  }
}
