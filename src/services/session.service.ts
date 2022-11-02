import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { TokenPayload } from 'src/domain/services';

@Injectable()
export class SessionService {
  constructor(private readonly configService: ConfigService) {}

  generateToken(): string {
    return jwt.sign({ id: 1 }, this.configService.get<string>('TOKEN_SECRET'), {
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
