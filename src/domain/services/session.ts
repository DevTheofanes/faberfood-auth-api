import { Prisma } from '@prisma/client';
import { IUser } from './user';

export interface ISessionParams {
  username?: string;
  email?: string;
  phone?: string;
  password: string;
}

export interface ITokenGenerateParams {
  id: number;
  userAccess: Prisma.JsonValue;
}

export interface TokenPayload {
  id: string;
  manager: boolean;
  iat: number;
  exp: number;
}

export interface ISessionResult {
  user: IUser;
  token: string;
}
