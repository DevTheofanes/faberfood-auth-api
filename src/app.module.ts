import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserController, SessionController } from './controllers';
import {
  HashService,
  PrismaService,
  UserService,
  SessionService,
} from './services';
@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [UserController, SessionController],
  providers: [PrismaService, UserService, HashService, SessionService],
})
export class AppModule {}
