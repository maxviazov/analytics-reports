import { Body, Controller, Get, Param, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { BusinessCompaniesService } from './business-company.service';
import { CreateBusinessCompanyDto } from './dto/create-business-company.dto';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * Controller for managing business companies
 */
@ApiTags('Business-Companies')
@Controller('business-companies')
@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
export class BusinessCompaniesController {
  constructor(
    private readonly businessCompaniesService: BusinessCompaniesService,
  ) {
  }

  /**
   * Creates a new business company
   * @param createBusinessCompanyDto - DTO for creating a business company
   * @returns The created business company
   */
  @Post()
  @ApiOperation({ summary: 'Create a new business company' })
  @ApiBody({ type: CreateBusinessCompanyDto })
  @ApiResponse({
    status: 201,
    description: 'The business company has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createBusinessCompanyDto: CreateBusinessCompanyDto) {
    return this.businessCompaniesService.createBusinessCompany(
      createBusinessCompanyDto,
    );
  }

  /**
   * Retrieves a list of all business companies
   * @returns A list of all business companies
   */
  @Get()
  @ApiOperation({ summary: 'Retrieve a list of all business companies' })
  @ApiResponse({
    status: 200,
    description: 'List of business companies retrieved successfully.',
  })
  findAll() {
    return this.businessCompaniesService.findAll();
  }

  /**
   * Retrieves a specific business company by ID
   * @param id - The ID of the business company
   * @returns The business company with the specified ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific business company by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the business company',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Business company retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Business company not found.' })
  findOne(@Param('id') id: string) {
    return this.businessCompaniesService.findOne(+id);
  }
}
