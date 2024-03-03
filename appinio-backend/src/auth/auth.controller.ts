import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register.request.dto';
import { SignInRequestDto } from './dto/sign-in.request.dto';
import { SignInResponseDto } from './dto/sign-in.response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOkResponse({
    type: SignInResponseDto,
  })
  signIn(
    @Body() signInRequestDto: SignInRequestDto,
  ): Promise<SignInResponseDto> {
    return this.authService.signIn(signInRequestDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @ApiOkResponse({
    type: SignInResponseDto,
  })
  register(
    @Body() registerRequestDto: RegisterRequestDto,
  ): Promise<SignInResponseDto> {
    return this.authService.register(registerRequestDto);
  }
}
