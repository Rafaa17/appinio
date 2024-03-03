import { Injectable } from '@nestjs/common';
import { RegisterRequestDto } from 'src/auth/dto/register.request.dto';
import { UtilsService } from 'src/utils/utils.service';
import { UsersDatasource } from './users.datasource';
import { UserDto } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersDatasource: UsersDatasource,
    private readonly utilsService: UtilsService,
  ) {}

  create(createUserDto: RegisterRequestDto): Promise<UserDto> {
    return this.usersDatasource.create({
      ...createUserDto,
      uuid: this.utilsService.generateUuid(),
    });
  }

  findOne(username: string) {
    return this.usersDatasource.findByUsername(username);
  }
}
