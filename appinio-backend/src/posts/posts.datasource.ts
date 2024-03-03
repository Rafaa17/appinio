import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostDto } from './entities/post.entity';

@Injectable()
export class PostsDatasource {
  constructor(private readonly prisma: PrismaService) {}

  findAllByUserId(userId: number): Promise<PostDto[]> {
    return this.prisma.post.findMany({
      where: {
        userId,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }
  create(data: CreatePostDto): Promise<PostDto> {
    return this.prisma.post.create({
      data,
    });
  }
}
