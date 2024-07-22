import { Body, Controller, Get, Param, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { TrafficService } from './traffic.service';
import { CreateTrafficDto } from './dto/create-traffic.dto';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * Controller to handle traffic-related operations
 */
@ApiTags('Traffic')
@Controller('traffic')
@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
export class TrafficController {
  constructor(private readonly trafficService: TrafficService) {
  }

  /**
   * Creates a new traffic record
   * @param createTrafficDto - DTO containing traffic data
   * @returns The created traffic record
   */
  @Post()
  @ApiOperation({ summary: 'Create a new traffic record' })
  @ApiBody({ type: CreateTrafficDto })
  @ApiResponse({
    status: 201,
    description: 'The traffic record has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input.',
  })
  create(@Body() createTrafficDto: CreateTrafficDto) {
    return this.trafficService.createTraffic(createTrafficDto);
  }

  /**
   * Fetches all traffic records
   * @returns An array of traffic records
   */
  @Get()
  @ApiOperation({ summary: 'Get all traffic records' })
  @ApiResponse({
    status: 200,
    description: 'Array of all traffic records.',
    type: [CreateTrafficDto],
  })
  findAll() {
    return this.trafficService.findAll();
  }

  /**
   * Fetches a specific traffic record by ID
   * @param id - ID of the traffic record
   * @returns The traffic record with the specified ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a traffic record by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the traffic record',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'The traffic record has been successfully fetched.',
    type: CreateTrafficDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Traffic record not found.',
  })
  findOne(@Param('id') id: string) {
    return this.trafficService.findOne(+id);
  }
}
