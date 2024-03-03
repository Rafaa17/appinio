import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ChatGptModule } from './chat-gpt/chat-gpt.module';
import { ChatGptService } from './chat-gpt/chat-gpt.service';
import { PrismaModule } from './prisma/prisma.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    PostsModule,
    ChatGptModule,
    PrismaModule,
    AuthModule,
    UtilsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGptService],
})
export class AppModule {}
