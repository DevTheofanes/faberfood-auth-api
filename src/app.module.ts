import { Module } from '@nestjs/common';
import { UserController } from './controllers';
import { PrismaService, UserService } from './services';
@Module({
  controllers: [UserController],
  providers: [PrismaService, UserService],
})
export class AppModule {}
