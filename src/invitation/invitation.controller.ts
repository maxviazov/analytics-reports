import { Body, Controller, Get, Param, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { InvitationsService } from './invitation.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Invitation } from './entities/invitation.entity';

@ApiTags('Invitations')
@Controller('invitations')
@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {
  }

  /**
   * Create a new invitation
   * @param createInvitationDto - DTO containing invitation details
   * @returns The created invitation
   */
  @ApiOperation({ summary: 'Create a new invitation' })
  @ApiResponse({
    status: 201,
    description: 'The invitation has been created.',
    type: Invitation,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post()
  create(@Body() createInvitationDto: CreateInvitationDto) {
    return this.invitationsService.createInvitation(createInvitationDto);
  }

  /**
   * Retrieve all invitations
   * @returns An array of invitations
   */
  @ApiOperation({ summary: 'Retrieve all invitations' })
  @ApiResponse({
    status: 200,
    description: 'List of invitations',
    type: [Invitation],
  })
  @Get()
  findAll() {
    return this.invitationsService.findAll();
  }

  /**
   * Retrieve a single invitation by ID
   * @param id - The ID of the invitation to retrieve
   * @returns The invitation with the specified ID
   */
  @ApiOperation({ summary: 'Retrieve a single invitation by ID' })
  @ApiResponse({ status: 200, description: 'The invitation', type: Invitation })
  @ApiResponse({ status: 404, description: 'Invitation not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invitationsService.findOne(+id);
  }
}
