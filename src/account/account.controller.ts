import { Body, Controller, Get, Param, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { AccountsService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Accounts')
@Controller('accounts')
@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {
  }

  /**
   * Creates a new account
   * @param createAccountDto Data transfer object for creating an account
   * @returns The created account
   */
  @ApiOperation({ summary: 'Create a new account' })
  @ApiResponse({
    status: 201,
    description: 'The account has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiBody({ type: CreateAccountDto })
  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.createAccount(createAccountDto);
  }

  /**
   * Retrieves all accounts
   * @returns A list of all accounts
   */
  @ApiOperation({ summary: 'Get all accounts' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all accounts.',
  })
  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  /**
   * Retrieves an account by its ID
   * @param id The ID of the account to retrieve
   * @returns The account with the specified ID
   */
  @ApiOperation({ summary: 'Get account by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the account.',
  })
  @ApiResponse({ status: 404, description: 'Account not found.' })
  @ApiParam({
    name: 'id',
    description: 'ID of the account to retrieve',
    type: 'string',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(+id);
  }
}
