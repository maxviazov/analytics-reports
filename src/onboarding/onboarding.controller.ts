import { Body, Controller, Get, Param, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OnboardingService } from './onboarding.service';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';

/**
 * Controller for handling onboarding-related requests.
 */
@ApiTags('Onboarding')
@Controller('onboarding')
@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {
  }

  /**
   * Creates a new onboarding record.
   * @param createOnboardingDto - Data transfer object for creating an onboarding record.
   * @returns The created onboarding record.
   */
  @Post()
  @ApiOperation({ summary: 'Create a new onboarding record' })
  @ApiBody({ type: CreateOnboardingDto })
  @ApiResponse({
    status: 201,
    description: 'The onboarding record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createOnboardingDto: CreateOnboardingDto) {
    return this.onboardingService.createOnboarding(createOnboardingDto);
  }

  /**
   * Retrieves all onboarding records.
   * @returns An array of all onboarding records.
   */
  @Get()
  @ApiOperation({ summary: 'Retrieve all onboarding records' })
  @ApiResponse({
    status: 200,
    description: 'Array of all onboarding records.',
    type: [CreateOnboardingDto],
  })
  findAll() {
    return this.onboardingService.findAll();
  }

  /**
   * Retrieves a specific onboarding record by ID.
   * @param id - The ID of the onboarding record to retrieve.
   * @returns The onboarding record with the specified ID.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific onboarding record by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the onboarding record' })
  @ApiResponse({
    status: 200,
    description: 'The onboarding record with the specified ID.',
    type: CreateOnboardingDto,
  })
  @ApiResponse({ status: 404, description: 'Onboarding record not found.' })
  findOne(@Param('id') id: string) {
    return this.onboardingService.findOne(+id);
  }
}
