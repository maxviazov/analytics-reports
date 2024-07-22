import { Body, Controller, Get, Param, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { JobPagesService } from './job-page.service';
import { CreateJobPageDto } from './dto/create-job-page.dto';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JobPage } from './entities/job-page.entity';

@ApiTags('Job-Pages')
@Controller('job-pages')
@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
export class JobPagesController {
  constructor(private readonly jobPagesService: JobPagesService) {
  }

  /**
   * Creates a new job page
   * @param createJobPageDto - DTO containing job page creation data
   */
  @ApiOperation({ summary: 'Create a new job page' })
  @ApiResponse({
    status: 201,
    description: 'The job page has been successfully created.',
    type: JobPage,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post()
  create(@Body() createJobPageDto: CreateJobPageDto) {
    return this.jobPagesService.createJobPage(createJobPageDto);
  }

  /**
   * Retrieves all job pages
   */
  @ApiOperation({ summary: 'Get all job pages' })
  @ApiResponse({
    status: 200,
    description: 'List of job pages',
    type: [JobPage],
  })
  @Get()
  findAll() {
    return this.jobPagesService.findAll();
  }

  /**
   * Retrieves a job page by its ID
   * @param id - ID of the job page to retrieve
   */
  @ApiOperation({ summary: 'Get a job page by ID' })
  @ApiResponse({ status: 200, description: 'The job page', type: JobPage })
  @ApiResponse({ status: 404, description: 'Job page not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobPagesService.findOne(+id);
  }
}
