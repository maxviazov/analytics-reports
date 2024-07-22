import { Body, Controller, Get, Param, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { BusinessAccountsService } from './business-account.service';
import { CreateBusinessAccountDto } from './dto/create-business-account.dto';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * Controller for handling business account related requests
 */
@ApiTags('Business Accounts')
@Controller('business-accounts')
@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
export class BusinessAccountsController {
  constructor(
    private readonly businessAccountsService: BusinessAccountsService,
  ) {
  }

  /**
   * Create a new business account
   * @param createBusinessAccountDto DTO for creating a business account
   * @returns The created business account
   */
  @ApiOperation({ summary: 'Create a new business account' })
  @ApiResponse({
    status: 201,
    description: 'The business account has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post()
  create(@Body() createBusinessAccountDto: CreateBusinessAccountDto) {
    return this.businessAccountsService.createBusinessAccount(
      createBusinessAccountDto,
    );
  }

  /**
   * Retrieve all business accounts
   * @returns An array of business accounts
   */
  @ApiOperation({ summary: 'Retrieve all business accounts' })
  @ApiResponse({ status: 200, description: 'Retrieved all business accounts.' })
  @Get()
  findAll() {
    return this.businessAccountsService.findAll();
  }

  /**
   * Retrieve a single business account by ID
   * @param id The ID of the business account to retrieve
   * @returns The retrieved business account
   */
  @ApiOperation({ summary: 'Retrieve a business account by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the business account to retrieve',
    example: 1,
  })
  @ApiResponse({ status: 200, description: 'Retrieved the business account.' })
  @ApiResponse({ status: 404, description: 'Business account not found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessAccountsService.findOne(+id);
  }
}
