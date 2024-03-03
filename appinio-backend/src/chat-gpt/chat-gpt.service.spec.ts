import { Test, TestingModule } from '@nestjs/testing';
import { ChatGptService } from './chat-gpt.service';
import { ConfigService } from '@nestjs/config';

const mockGptAskFn = jest.fn().mockImplementation(() =>
  Promise.resolve({
    choices: [
      {
        message: {
          content: 'test',
        },
      },
    ],
  }),
);

jest.mock('openai', () => ({
  default: jest.fn().mockImplementation(() => {
    return {
      chat: {
        completions: {
          create: mockGptAskFn,
        },
      },
    };
  }),
}));

describe('ChatGptService', () => {
  let service: ChatGptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatGptService, ConfigService],
    }).compile();

    service = module.get<ChatGptService>(ChatGptService);
  });

  it('should ask gpt service', async () => {
    const res = await service.ask('test-prompt');

    expect(res).toEqual('test');
    expect(mockGptAskFn).toHaveBeenCalledTimes(1);
    expect(mockGptAskFn).toHaveBeenCalledWith({
      messages: [{ content: 'test-prompt', role: 'user' }],
      model: 'gpt-3.5-turbo',
    });
  });
});
