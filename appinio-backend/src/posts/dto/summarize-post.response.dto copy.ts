import { ApiProperty } from '@nestjs/swagger';

export class SummarizePostResponseDto {
  @ApiProperty()
  summary: string;

  @ApiProperty()
  insights: string;
}
