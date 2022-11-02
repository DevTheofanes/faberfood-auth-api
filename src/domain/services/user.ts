import { Prisma } from '@prisma/client';

export interface IUserParams {
  name: string;
  username: string;
  email?: string;
  phone?: string;
  password: string;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string | null;
  phone: string | null;
  password: string;
  active: boolean;
  userAccess: Prisma.JsonValue;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFindUser {
  id?: number;
  username?: string;
  email?: string;
  phone?: string;
}
