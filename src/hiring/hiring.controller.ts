import { Body, Controller, Get, Param, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { HiringService } from './hiring.service';
import { CreateHiringDto } from './dto/create-hiring.dto';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Hiring')
@Controller('hiring')
@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
export class HiringController {
  constructor(private readonly hiringService: HiringService) {
  }

  @Post()
  @ApiOperation({ summary: 'Create a new hiring record' })
  @ApiResponse({
    status: 201,
    description: 'The hiring record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createHiringDto: CreateHiringDto) {
    return this.hiringService.createHiring(createHiringDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all hiring records' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all hiring records.',
  })
  @ApiResponse({ status: 404, description: 'No hiring records found.' })
  findAll() {
    return this.hiringService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a hiring record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the hiring record.',
  })
  @ApiResponse({ status: 404, description: 'Hiring record not found.' })
  findOne(@Param('id') id: string) {
    return this.hiringService.findOne(+id);
  }
}
