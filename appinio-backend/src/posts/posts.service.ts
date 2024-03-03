import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ChatGptService } from 'src/chat-gpt/chat-gpt.service';
import { UtilsService } from 'src/utils/utils.service';
import { CreatePostRequestDto } from './dto/create-post.request.dto';
import { SummarizePostRequestDto } from './dto/summarize-post.request.dto';
import { SummarizePostResponseDto } from './dto/summarize-post.response.dto copy';
import { PostsDatasource } from './posts.datasource';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsDatasource: PostsDatasource,
    private readonly chatGPTService: ChatGptService,
    private readonly utilsService: UtilsService,
  ) {}

  findAllByUser(userId: number) {
    return this.postsDatasource.findAllByUserId(userId);
  }

  create(createPostDto: CreatePostRequestDto, userId: number) {
    return this.postsDatasource.create({
      content: createPostDto.content,
      summary: createPostDto.summary,
      insights: createPostDto.insights,
      userId,
      uuid: this.utilsService.generateUuid(),
    });
  }

  async summarizeText(
    summarizePostDto: SummarizePostRequestDto,
  ): Promise<SummarizePostResponseDto> {
    const response = await this.chatGPTService.ask(
      `Summarize and exclude some insights about this content ${summarizePostDto.content}. Return in a JSON format. Include a summary field and an insights field`,
    );

    try {
      const { insights, summary } = JSON.parse(response) as {
        summary: string;
        insights: string;
      };
      return {
        insights,
        summary,
      };
    } catch {
      Logger.error('There was an error parsing response from OpenAI');
      throw new InternalServerErrorException();
    }
  }
}
