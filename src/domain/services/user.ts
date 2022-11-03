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
  password?: string;
  userAccess: Prisma.JsonValue;
  userClassification: {
    id: number;
    description: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IFindUser {
  id?: number;
  username?: string;
  email?: string;
  phone?: string;
}
