import { Body, Controller, Get, Param, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { OrganizationsService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { ApiTags } from '@nestjs/swagger';

/**
 * Controller for managing organizations.
 */
@ApiTags('Organizations')
@Controller('organizations')
@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {
  }

  /**
   * Creates a new organization.
   * @param createOrganizationDto - Data Transfer Object for creating an organization.
   * @returns The created organization.
   */
  @Post()
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationsService.createOrganization(createOrganizationDto);
  }

  /**
   * Retrieves all organizations.
   * @returns A list of all organizations.
   */
  @Get()
  findAll() {
    return this.organizationsService.findAll();
  }

  /**
   * Retrieves a specific organization by ID.
   * @param id - The ID of the organization to retrieve.
   * @returns The organization with the specified ID.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationsService.findOne(+id);
  }
}
