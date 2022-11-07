import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserController, SessionController } from './controllers';
import { AuthMiddleware } from './middlewares';
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
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'user', method: RequestMethod.POST })
      .forRoutes(UserController);
  }
}
