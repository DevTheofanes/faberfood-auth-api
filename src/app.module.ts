import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database';
import { PrismaService } from './database/prisma';
@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
