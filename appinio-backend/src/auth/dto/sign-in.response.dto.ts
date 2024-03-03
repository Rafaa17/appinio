import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;
}
