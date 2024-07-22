import { Body, Controller, Get, Param, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { BusinessJobsService } from './business-job.service';
import { CreateBusinessJobDto } from './dto/create-business-job.dto';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BusinessJob } from './entities/business-job.entity';

/**
 * Controller to manage Business Jobs
 */
@ApiTags('Business-Jobs')
@Controller('business-jobs')
@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
export class BusinessJobsController {
  constructor(private readonly businessJobsService: BusinessJobsService) {
  }

  /**
   * Create a new business job
   * @param createBusinessJobDto Data for the new business job
   * @returns The created business job
   */
  @Post()
  @ApiOperation({ summary: 'Create a new business job' })
  @ApiResponse({
    status: 201,
    description: 'The business job has been created.',
    type: BusinessJob,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createBusinessJobDto: CreateBusinessJobDto) {
    return this.businessJobsService.createBusinessJob(createBusinessJobDto);
  }

  /**
   * Get all business jobs
   * @returns A list of all business jobs
   */
  @Get()
  @ApiOperation({ summary: 'Get all business jobs' })
  @ApiResponse({
    status: 200,
    description: 'A list of all business jobs.',
    type: [BusinessJob],
  })
  findAll() {
    return this.businessJobsService.findAll();
  }

  /**
   * Get a specific business job by ID
   * @param id The ID of the business job to retrieve
   * @returns The business job with the specified ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific business job by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the business job to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'The business job with the specified ID.',
    type: BusinessJob,
  })
  @ApiResponse({ status: 404, description: 'Business job not found' })
  findOne(@Param('id') id: string) {
    return this.businessJobsService.findOne(+id);
  }
}
