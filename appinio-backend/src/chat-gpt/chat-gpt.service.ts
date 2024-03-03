import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI, { ClientOptions } from 'openai';

@Injectable()
export class ChatGptService {
  private api: OpenAI;

  constructor(private readonly configService: ConfigService) {
    const configuration: ClientOptions = {
      apiKey: configService.get('OPENAI_API_KEY'),
    };

    this.api = new OpenAI(configuration);
  }

  async ask(message: string): Promise<string> {
    try {
      const response = await this.api.chat.completions.create({
        messages: [{ content: message, role: 'user' }],
        model: 'gpt-3.5-turbo',
      });

      return response.choices[0].message.content;
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }
}
