import { Body, Controller, Get, Param, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { PagesService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Pages')
@Controller('pages')
@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
export class PagesController {
  constructor(private readonly pagesService: PagesService) {
  }

  /**
   * Creates a new page
   * @param createPageDto Data Transfer Object for creating a page
   * @returns The created page
   */
  @Post()
  @ApiOperation({ summary: 'Create a new page' })
  @ApiResponse({ status: 201, description: 'Page created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createPageDto: CreatePageDto) {
    return this.pagesService.createPage(createPageDto);
  }

  /**
   * Retrieves all pages
   * @returns An array of all pages
   */
  @Get()
  @ApiOperation({ summary: 'Retrieve all pages' })
  @ApiResponse({ status: 200, description: 'Pages retrieved successfully' })
  findAll() {
    return this.pagesService.findAll();
  }

  /**
   * Retrieves a page by its ID
   * @param id The ID of the page
   * @returns The page with the specified ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a page by ID' })
  @ApiResponse({ status: 200, description: 'Page retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Page not found' })
  findOne(@Param('id') id: string) {
    return this.pagesService.findOne(+id);
  }
}
