import { ApiProperty } from '@nestjs/swagger';

export class SummarizePostRequestDto {
  @ApiProperty()
  content: string;
}
