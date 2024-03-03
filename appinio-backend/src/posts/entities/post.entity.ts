import { ApiProperty } from '@nestjs/swagger';
import { Post as PrismaPost } from '@prisma/client';

export class PostDto implements PrismaPost {
  @ApiProperty()
  id: number;

  @ApiProperty()
  uuid: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  summary: string;

  @ApiProperty()
  insights: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
