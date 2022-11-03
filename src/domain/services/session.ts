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
  userClassification: {
    id: number;
    description: string;
  };
  userAccess: Prisma.JsonValue;
  iat: number;
  exp: number;
}

export interface ISessionResult {
  user: IUser;
  token: string;
}
