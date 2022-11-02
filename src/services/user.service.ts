import { Injectable } from '@nestjs/common';
import { IUser, IUserParams } from 'src/domain/services';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: IUserParams): Promise<IUser> {
    const { name, username, password, email } = user;
    const today = new Date().toISOString();

    return await this.prismaService.user.create({
      data: {
        name,
        username,
        password,
        email,
        userAccess: [],
        createdAt: today,
        updatedAt: today,
      },
    });
  }

  async findOne(id: number): Promise<IUser> {
    return await this.prismaService.user.findFirst({
      where: { id },
    });
  }
}
