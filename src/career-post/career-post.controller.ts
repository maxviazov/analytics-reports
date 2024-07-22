import { Body, Controller, Get, Param, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { CareerPostsService } from './career-post.service';
import { CreateCareerPostDto } from './dto/create-career-post.dto';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * Controller to manage Career Posts
 */
@ApiTags('Career-Posts')
@Controller('career-posts')
@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
export class CareerPostsController {
  constructor(private readonly careerPostsService: CareerPostsService) {
  }

  /**
   * Create a new career post
   * @param createCareerPostDto Data transfer object for creating a career post
   */
  @Post()
  @ApiOperation({ summary: 'Create a new career post' })
  @ApiResponse({
    status: 201,
    description: 'The career post has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createCareerPostDto: CreateCareerPostDto) {
    return this.careerPostsService.createCareerPost(createCareerPostDto);
  }

  /**
   * Get all career posts
   */
  @Get()
  @ApiOperation({ summary: 'Get all career posts' })
  @ApiResponse({
    status: 200,
    description: 'Successful retrieval of career posts.',
  })
  @ApiResponse({ status: 404, description: 'Career posts not found.' })
  findAll() {
    return this.careerPostsService.findAll();
  }

  /**
   * Get a career post by ID
   * @param id The ID of the career post
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a career post by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successful retrieval of the career post.',
  })
  @ApiResponse({ status: 404, description: 'Career post not found.' })
  findOne(@Param('id') id: string) {
    return this.careerPostsService.findOne(+id);
  }
}
