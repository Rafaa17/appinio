import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInRequestDto } from './dto/sign-in.request.dto';
import { RegisterRequestDto } from './dto/register.request.dto';
import { SignInResponseDto } from './dto/sign-in.response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInRequestDto: SignInRequestDto): Promise<SignInResponseDto> {
    const user = await this.usersService.findOne(signInRequestDto.username);
    if (user?.password !== signInRequestDto.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      username: user.username,
      email: user.email,
    };
  }

  async register(
    registerRequestDto: RegisterRequestDto,
  ): Promise<SignInResponseDto> {
    const user = await this.usersService.create(registerRequestDto);

    const payload = { sub: user.id, username: user.username };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      username: user.username,
      email: user.email,
    };
  }
}
