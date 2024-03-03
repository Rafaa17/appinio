import { ApiProperty } from '@nestjs/swagger';

export class CreatePostRequestDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  summary: string;

  @ApiProperty()
  insights: string;
}
