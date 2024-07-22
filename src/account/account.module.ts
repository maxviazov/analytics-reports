import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsService } from './account.service';
import { AccountsController } from './account.controller';
import { Account } from './entities/account.entity';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

/**
 * AccountsModule is responsible for importing and providing the account-related services and controllers.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Account])], // Import TypeOrmModule to work with Account entity
  controllers: [AccountsController], // Register AccountsController
  providers: [
    AccountsService, // Register AccountsService
    {
      provide: APP_INTERCEPTOR, // Register LoggingInterceptor as a global interceptor
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER, // Register HttpExceptionFilter as a global filter
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [AccountsService], // Export AccountsService for use in other modules
})
export class AccountsModule {}
