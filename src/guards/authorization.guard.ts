import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IHeaders } from 'src/domain/services/http';
import { SessionService } from 'src/services';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly sessionService: SessionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const headers = context.switchToHttp().getRequest().headers as IHeaders;

    if (!headers.authorization) {
      throw new HttpException('Token Not Found.', HttpStatus.FORBIDDEN);
    }

    try {
      const tokenIsValid = this.sessionService.decodeToken(
        headers.authorization.split(' ')[1],
      );
      console.log(tokenIsValid);

      return true;
    } catch (error) {
      throw new UnauthorizedException({
        error: 'Token Invalid',
      });
    }
  }
}
