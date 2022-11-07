import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { SessionService, UserService } from 'src/services';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { headers, method, route } = req;

    if (!headers.authorization) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ error: 'Token Not Found.' });
    }

    try {
      const tokenIsValid = this.sessionService.decodeToken(
        headers.authorization.split(' ')[1],
      );

      const user = await this.userService.findOne({
        id: tokenIsValid.id,
      });

      const userAccess = user.userAccess as string[];
      const featureAccess = `${method}:${route.path}`;
      if (!userAccess.find((access) => access === featureAccess)) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ error: 'Access Invalid' });
      }

      req.userId = user.id;
      next();
    } catch (error: any) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ error: 'Token Invalid' });
    }
  }
}
