import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UtilsService } from 'src/utils/utils.service';
import { UsersDatasource } from './users.datasource';

jest.mock('src/utils/utils.service');
jest.mock('src/users/users.datasource');

describe('UsersService', () => {
  let service: UsersService;
  let utilsService: jest.Mocked<UtilsService>;
  let usersDatasource: jest.Mocked<UsersDatasource>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersDatasource, UtilsService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    utilsService = module.get<UtilsService>(
      UtilsService,
    ) as jest.Mocked<UtilsService>;
    usersDatasource = module.get<UsersDatasource>(
      UsersDatasource,
    ) as jest.Mocked<UsersDatasource>;
  });

  it('should create user', async () => {
    const testUsername = 'testusername';
    const password = 'testpassword';
    const email = 'testemail';
    const id = 0;
    const testUuid = 'test-uuid';
    const createdAt = new Date();
    const updatedAt = new Date();

    utilsService.generateUuid.mockImplementationOnce(() => testUuid);

    usersDatasource.create.mockImplementationOnce(() =>
      Promise.resolve({
        username: testUsername,
        password,
        email,
        createdAt,
        updatedAt,
        id: id,
        uuid: testUuid,
      }),
    );

    const res = await service.create({
      username: testUsername,
      password,
      email,
    });

    expect(res).toEqual({
      username: testUsername,
      password,
      email,
      createdAt,
      updatedAt,
      id: id,
      uuid: testUuid,
    });

    expect(usersDatasource.create).toHaveBeenCalledTimes(1);
  });

  it('should find a user by username', async () => {
    const testUsername = 'testusername';
    const password = 'testpassword';
    const email = 'testemail';
    const id = 0;
    const testUuid = 'test-uuid';
    const createdAt = new Date();
    const updatedAt = new Date();

    usersDatasource.findByUsername.mockImplementationOnce((testUsername) =>
      Promise.resolve({
        username: testUsername,
        password,
        email,
        createdAt,
        updatedAt,
        id: id,
        uuid: testUuid,
      }),
    );

    const res = await service.findOne(testUsername);

    expect(res).toEqual({
      username: testUsername,
      password,
      email,
      createdAt,
      updatedAt,
      id: id,
      uuid: testUuid,
    });
  });
});
