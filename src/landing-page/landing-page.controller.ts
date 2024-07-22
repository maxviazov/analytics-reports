import { Body, Controller, Get, Param, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LandingPagesService } from './landing-page.service';
import { CreateLandingPageDto } from './dto/create-landing-page.dto';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { LandingPage } from './entities/landing-page.entity';

@ApiTags('Landing Pages')
@Controller('landing-pages')
@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
export class LandingPagesController {
  constructor(private readonly landingPagesService: LandingPagesService) {
  }

  /**
   * Endpoint for creating a new landing page
   * @param createLandingPageDto Data Transfer Object for creating a landing page
   * @returns The created landing page
   */
  @Post()
  @ApiOperation({ summary: 'Create a new landing page' })
  @ApiBody({ type: CreateLandingPageDto })
  @ApiResponse({
    status: 201,
    description: 'Landing page created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(
    @Body() createLandingPageDto: CreateLandingPageDto,
  ): Promise<LandingPage> {
    return this.landingPagesService.createLandingPage(createLandingPageDto);
  }

  /**
   * Endpoint for retrieving all landing pages
   * @returns An array of landing pages
   */
  @Get()
  @ApiOperation({ summary: 'Get all landing pages' })
  @ApiResponse({
    status: 200,
    description: 'List of all landing pages.',
    type: [LandingPage],
  })
  findAll(): Promise<LandingPage[]> {
    return this.landingPagesService.findAll();
  }

  /**
   * Endpoint for retrieving a specific landing page by ID
   * @param id The ID of the landing page
   * @returns The landing page with the specified ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a landing page by ID' })
  @ApiParam({ name: 'id', description: 'ID of the landing page' })
  @ApiResponse({
    status: 200,
    description: 'Landing page retrieved successfully.',
    type: LandingPage,
  })
  @ApiResponse({ status: 404, description: 'Landing page not found.' })
  findOne(@Param('id') id: string): Promise<LandingPage> {
    return this.landingPagesService.findOne(+id);
  }
}
