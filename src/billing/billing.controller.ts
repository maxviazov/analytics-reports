import { Body, Controller, Get, Param, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateBillingDto } from './dto/create-billing.dto';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Billing')
@Controller('billing')
@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
export class BillingController {
  constructor(private readonly billingService: BillingService) {
  }

  /**
   * Create a new billing record
   * @param createBillingDto DTO for creating a new billing record
   */
  @Post()
  @ApiOperation({ summary: 'Create a new billing record' })
  @ApiResponse({
    status: 201,
    description: 'The billing record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createBillingDto: CreateBillingDto) {
    return this.billingService.createBilling(createBillingDto);
  }

  /**
   * Retrieve all billing records
   */
  @Get()
  @ApiOperation({ summary: 'Retrieve all billing records' })
  @ApiResponse({
    status: 200,
    description: 'The billing records have been successfully retrieved.',
  })
  findAll() {
    return this.billingService.findAll();
  }

  /**
   * Retrieve a billing record by ID
   * @param id ID of the billing record to retrieve
   */
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a billing record by ID' })
  @ApiResponse({
    status: 200,
    description: 'The billing record has been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'Billing record not found.' })
  findOne(@Param('id') id: string) {
    return this.billingService.findOne(+id);
  }
}
