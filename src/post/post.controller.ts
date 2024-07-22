import { Body, Controller, Get, Param, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { PostsService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
export class PostsController {
  constructor(private readonly postsService: PostsService) {
  }

  /**
   * Create a new post
   * @param createPostDto Data Transfer Object for creating a post
   * @returns The created post
   */
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiBody({ type: CreatePostDto })
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  /**
   * Get all posts
   * @returns Array of all posts
   */
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved posts.' })
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  /**
   * Get a single post by ID
   * @param id ID of the post
   * @returns The post with the specified ID
   */
  @ApiOperation({ summary: 'Get a single post by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved the post.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @ApiParam({ name: 'id', description: 'ID of the post', type: 'string' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }
}
