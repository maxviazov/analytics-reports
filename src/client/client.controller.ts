import { Body, Controller, Get, Param, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { ClientsService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * Controller for managing clients
 */
@ApiTags('Clients')
@Controller('clients')
@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {
  }

  /**
   * Create a new client
   * @param createClientDto Data Transfer Object for creating a client
   * @returns The created client
   */
  @Post()
  @ApiOperation({ summary: 'Create a new client' })
  @ApiResponse({
    status: 201,
    description: 'The client has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.createClient(createClientDto);
  }

  /**
   * Get all clients
   * @returns List of all clients
   */
  @Get()
  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved list of clients.',
  })
  @ApiResponse({ status: 404, description: 'Clients not found.' })
  findAll() {
    return this.clientsService.findAll();
  }

  /**
   * Get a single client by ID
   * @param id ID of the client to retrieve
   * @returns The client with the specified ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a single client by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved client.' })
  @ApiResponse({ status: 404, description: 'Client not found.' })
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }
}
