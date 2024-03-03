import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { ChatGptModule } from 'src/chat-gpt/chat-gpt.module';
import { PostsDatasource } from './posts.datasource';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [ChatGptModule, UtilsModule],
  controllers: [PostsController],
  providers: [PostsService, PostsDatasource],
})
export class PostsModule {}
