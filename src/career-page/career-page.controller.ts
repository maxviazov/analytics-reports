import { Body, Controller, Get, Param, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { CareerPagesService } from './career-page.service';
import { CreateCareerPageDto } from './dto/create-career-page.dto';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Career-Pages')
@Controller('career-pages')
@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
export class CareerPagesController {
  constructor(private readonly careerPagesService: CareerPagesService) {
  }

  /**
   * Creates a new career page
   * @param createCareerPageDto The data to create a career page
   */
  @ApiOperation({ summary: 'Create a new career page' })
  @ApiResponse({ status: 201, description: 'Career page created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post()
  create(@Body() createCareerPageDto: CreateCareerPageDto) {
    return this.careerPagesService.createCareerPage(createCareerPageDto);
  }

  /**
   * Retrieves all career pages
   */
  @ApiOperation({ summary: 'Retrieve all career pages' })
  @ApiResponse({
    status: 200,
    description: 'Career pages retrieved successfully',
  })
  @Get()
  findAll() {
    return this.careerPagesService.findAll();
  }

  /**
   * Retrieves a career page by ID
   * @param id The ID of the career page
   */
  @ApiOperation({ summary: 'Retrieve a career page by ID' })
  @ApiResponse({
    status: 200,
    description: 'Career page retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Career page not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.careerPagesService.findOne(+id);
  }
}
