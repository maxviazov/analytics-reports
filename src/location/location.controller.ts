import { Body, Controller, Get, Param, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { LocationsService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Locations')
@Controller('locations')
@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {
  }

  @Post()
  @ApiOperation({ summary: 'Create a new location' })
  @ApiResponse({ status: 201, description: 'Location created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.createLocation(createLocationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all locations' })
  @ApiResponse({ status: 200, description: 'Return all locations.' })
  findAll() {
    return this.locationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a location by ID' })
  @ApiResponse({ status: 200, description: 'Return the location.' })
  @ApiResponse({ status: 404, description: 'Location not found.' })
  findOne(@Param('id') id: string) {
    return this.locationsService.findOne(+id);
  }
}
