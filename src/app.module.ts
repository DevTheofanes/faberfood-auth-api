import { Module } from '@nestjs/common';
import { UserController } from './controllers';
import { HashService, PrismaService, UserService } from './services';
@Module({
  controllers: [UserController],
  providers: [PrismaService, UserService, HashService],
})
export class AppModule {}
