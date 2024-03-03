import { Test, TestingModule } from '@nestjs/testing';
import { ChatGptService } from 'src/chat-gpt/chat-gpt.service';
import { UtilsService } from 'src/utils/utils.service';
import { CreatePostRequestDto } from './dto/create-post.request.dto';
import { PostsDatasource } from './posts.datasource';
import { PostsService } from './posts.service';

jest.mock('src/posts/posts.datasource');
jest.mock('src/chat-gpt/chat-gpt.service');
jest.mock('src/utils/utils.service');

describe('PostsService', () => {
  let service: PostsService;
  let postsDatasource: jest.Mocked<PostsDatasource>;
  let utilsService: jest.Mocked<UtilsService>;
  let chatGptService: jest.Mocked<ChatGptService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService, PostsDatasource, ChatGptService, UtilsService],
    }).compile();

    service = module.get<PostsService>(PostsService);
    postsDatasource = module.get<PostsDatasource>(
      PostsDatasource,
    ) as jest.Mocked<PostsDatasource>;
    utilsService = module.get<UtilsService>(
      UtilsService,
    ) as jest.Mocked<UtilsService>;
    chatGptService = module.get<ChatGptService>(
      ChatGptService,
    ) as jest.Mocked<ChatGptService>;
  });

  it('should find all posts by user', async () => {
    const userId = 1;
    postsDatasource.findAllByUserId.mockImplementationOnce(() =>
      Promise.resolve([]),
    );

    const res = await service.findAllByUser(userId);
    expect(res).toEqual([]);

    expect(postsDatasource.findAllByUserId).toHaveBeenCalledTimes(1);
    expect(postsDatasource.findAllByUserId).toHaveBeenCalledWith(userId);
  });

  it('should create a new post', async () => {
    const userId = 1;
    const content = 'testcontent';
    const insights = 'testinsights';
    const summary = 'testsummary';
    const createdAt = new Date();
    const updatedAt = new Date();
    const id = 1;
    const testUuid = 'test-uuid';

    utilsService.generateUuid.mockImplementationOnce(() => testUuid);

    const postRequest: CreatePostRequestDto = {
      content,
      insights,
      summary,
    };

    postsDatasource.create.mockImplementationOnce(() =>
      Promise.resolve({
        content,
        insights,
        createdAt,
        updatedAt,
        id,
        summary,
        userId,
        uuid: testUuid,
      }),
    );

    const res = await service.create(postRequest, userId);
    expect(res).toEqual({
      content,
      insights,
      createdAt,
      updatedAt,
      id,
      summary,
      userId,
      uuid: testUuid,
    });

    expect(postsDatasource.create).toHaveBeenCalledTimes(1);
    expect(postsDatasource.create).toHaveBeenCalledWith({
      ...postRequest,
      userId,
      uuid: testUuid,
    });
  });

  it('should summarize text', async () => {
    chatGptService.ask.mockImplementationOnce(() =>
      Promise.resolve(
        JSON.stringify({
          insights: 'test',
          summary: 'test',
        }),
      ),
    );

    const content = 'lorem lipsum';

    const res = await service.summarizeText({ content });

    expect(res).toEqual({
      insights: 'test',
      summary: 'test',
    });

    expect(chatGptService.ask).toHaveBeenCalledTimes(1);
    expect(chatGptService.ask).toHaveBeenCalledWith(
      `Summarize and exclude some insights about this content ${content}. Return in a JSON format. Include a summary field and an insights field`,
    );
  });
});
