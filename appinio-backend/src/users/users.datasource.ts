import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './entities/user.entity';

@Injectable()
export class UsersDatasource {
  constructor(private readonly prismaService: PrismaService) {}

  findByUsername(username: string): Promise<UserDto> {
    return this.prismaService.user.findUnique({
      where: {
        username,
      },
    });
  }

  create(createUserDto: CreateUserDto): Promise<UserDto> {
    return this.prismaService.user.create({
      data: createUserDto,
    });
  }
}
