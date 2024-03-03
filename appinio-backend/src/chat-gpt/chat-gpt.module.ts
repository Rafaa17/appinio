import { Module } from '@nestjs/common';

import { ChatGptService } from './chat-gpt.service';

@Module({
  controllers: [],
  exports: [ChatGptService],
  imports: [],
  providers: [ChatGptService],
})
export class ChatGptModule {}
