import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

jest.mock('src/users/users.service');
jest.mock('@nestjs/jwt');

describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(
      UsersService,
    ) as jest.Mocked<UsersService>;
    jwtService = module.get<JwtService>(JwtService) as jest.Mocked<JwtService>;
  });

  it('should login a user', async () => {
    const testUsername = 'testusername';
    const password = 'testpassword';
    const email = 'testemail';
    const token = 'testtoken';
    const id = 0;

    usersService.findOne.mockImplementationOnce((testUsername) =>
      Promise.resolve({
        username: testUsername,
        password,
        email,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: id,
        uuid: 'test',
      }),
    );

    jwtService.signAsync.mockImplementationOnce(() => Promise.resolve(token));

    const result = await service.signIn({
      username: testUsername,
      password: password,
    });

    expect(result).toEqual({
      accessToken: token,
      username: testUsername,
      email,
    });

    expect(usersService.findOne).toHaveBeenCalledTimes(1);
    expect(usersService.findOne).toHaveBeenCalledWith(testUsername);

    expect(jwtService.signAsync).toHaveBeenCalledTimes(1);
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      sub: id,
      username: testUsername,
    });
  });

  it('should register a new user', async () => {
    const testUsername = 'testusername';
    const password = 'testpassword';
    const email = 'testemail';
    const token = 'testtoken';
    const id = 0;

    usersService.create.mockImplementationOnce(() =>
      Promise.resolve({
        username: testUsername,
        password,
        email,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: id,
        uuid: 'test',
      }),
    );

    jwtService.signAsync.mockImplementationOnce(() => Promise.resolve(token));

    const result = await service.register({
      username: testUsername,
      password: password,
      email,
    });

    expect(result).toEqual({
      accessToken: token,
      username: testUsername,
      email,
    });

    expect(usersService.create).toHaveBeenCalledTimes(1);
    expect(usersService.create).toHaveBeenCalledWith({
      username: testUsername,
      password: password,
      email,
    });

    expect(jwtService.signAsync).toHaveBeenCalledTimes(1);
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      sub: id,
      username: testUsername,
    });
  });
});
