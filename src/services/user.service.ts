import { Injectable } from '@nestjs/common';
import { IFindUser, IUser, IUserParams } from 'src/domain/services';
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

  async findOne(params: IFindUser): Promise<IUser> {
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
      throw new Error('User not found');
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
}
