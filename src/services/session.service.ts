import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { ITokenGenerateParams, TokenPayload } from 'src/domain/services';

@Injectable()
export class SessionService {
  constructor(private readonly configService: ConfigService) {}

  generateToken(params: ITokenGenerateParams): string {
    return jwt.sign(params, this.configService.get<string>('TOKEN_SECRET'), {
      expiresIn: '7d',
    });
  }

  decodeToken(token: string): TokenPayload {
    return jwt.verify(
      token,
      this.configService.get<string>('TOKEN_SECRET'),
    ) as TokenPayload;
  }
}
