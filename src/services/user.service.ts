import { Injectable } from '@nestjs/common';
import {
  IFindUser,
  IUpdateUser,
  IUser,
  IUserParams,
} from 'src/domain/services';
import { HashService } from './hash.service';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashService: HashService,
  ) {}

  async create(user: IUserParams): Promise<IUser> {
    const { name, username, password, email } = user;
    const today = new Date().toISOString();

    const newAccount = await this.prismaService.user.create({
      data: {
        name,
        username,
        password: await this.hashService.generateHash(password),
        email,
        userClassificationId: 1,
        userAccess: [],
        createdAt: today,
        updatedAt: today,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        phone: true,
        userAccess: true,
        fkUserClassification: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      id: newAccount.id,
      name: newAccount.name,
      username: newAccount.username,
      email: newAccount.email,
      phone: newAccount.phone,
      userAccess: newAccount.userAccess,
      userClassification: newAccount.fkUserClassification,
      createdAt: newAccount.createdAt,
      updatedAt: newAccount.updatedAt,
    };
  }

  async findOne(params: IFindUser): Promise<IUser | null> {
    const user = await this.prismaService.user.findFirst({
      where: params,
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        password: true,
        phone: true,
        userAccess: true,
        fkUserClassification: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      password: user.password,
      userAccess: user.userAccess,
      userClassification: user.fkUserClassification,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async update(params: IUpdateUser): Promise<IUser> {
    const { id, name, username, email, phone } = params;
    const user = await this.findOne({ id });
    if (!user) throw new Error('Not Found.');
    const data: IUpdateUser = {};

    if (name && name !== user.name) {
      data.name = name;
    }

    if (username && username !== user.username) {
      const otherUserWithUsernameAlready =
        await this.prismaService.user.findFirst({
          where: {
            id: {
              not: id,
            },
            AND: { username },
          },
        });

      if (otherUserWithUsernameAlready) {
        throw new Error('Already Exists User with this username');
      }
      data.username = username;
    }

    if (email && email !== user.email) {
      const otherUserWithEmailAlready = await this.prismaService.user.findFirst(
        {
          where: {
            id: {
              not: id,
            },
            AND: { email },
          },
        },
      );

      if (otherUserWithEmailAlready) {
        throw new Error('Already Exists User with this email');
      }
      data.email = email;
    }

    if (phone && phone !== user.phone) {
      const otherUserWithPhoneAlready = await this.prismaService.user.findFirst(
        {
          where: {
            id: {
              not: id,
            },
            AND: { phone },
          },
        },
      );

      if (otherUserWithPhoneAlready) {
        throw new Error('Already Exists User with this phone');
      }

      data.phone = phone;
    }

    const accountUpdated = await this.prismaService.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        password: true,
        phone: true,
        userAccess: true,
        fkUserClassification: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      id: accountUpdated.id,
      name: accountUpdated.name,
      username: accountUpdated.username,
      email: accountUpdated.email,
      phone: accountUpdated.phone,
      password: accountUpdated.password,
      userAccess: accountUpdated.userAccess,
      userClassification: accountUpdated.fkUserClassification,
      createdAt: accountUpdated.createdAt,
      updatedAt: accountUpdated.updatedAt,
    };
  }

  async addFeatureAccess(params: {
    userId: number;
    feature: string;
  }): Promise<void> {
    const userPreview = await this.prismaService.user.findFirst({
      where: { id: params.userId },
    });

    if (!userPreview) {
      throw new Error('User not found');
    }

    const userAccessPreview = userPreview.userAccess as string[];

    if (!userAccessPreview.find((access) => access === params.feature)) {
      await this.prismaService.user.update({
        where: { id: params.userId },
        data: {
          userAccess: [...userAccessPreview, params.feature],
        },
      });
    }
  }
}
