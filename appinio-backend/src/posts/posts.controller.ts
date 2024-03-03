import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreatePostRequestDto } from './dto/create-post.request.dto';
import { SummarizePostRequestDto } from './dto/summarize-post.request.dto';
import { PostDto } from './entities/post.entity';
import { PostsService } from './posts.service';
import { SummarizePostResponseDto } from './dto/summarize-post.response.dto copy';

@UseGuards(AuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOkResponse({
    type: PostDto,
    isArray: true,
  })
  @Get()
  findAll(@Request() req) {
    return this.postsService.findAllByUser(req.user.sub);
  }

  @ApiOkResponse({
    type: PostDto,
  })
  @Post()
  create(@Body() createPostRequestDto: CreatePostRequestDto, @Request() req) {
    return this.postsService.create(createPostRequestDto, req.user.sub);
  }

  @ApiOkResponse({
    type: SummarizePostResponseDto,
  })
  @Post('/summarize')
  async summarizeText(
    @Body() summarizePostDto: SummarizePostRequestDto,
  ): Promise<SummarizePostResponseDto> {
    return this.postsService.summarizeText(summarizePostDto);
  }
}
