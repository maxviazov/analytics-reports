import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessAccountsService } from './business-account.service';
import { BusinessAccountsController } from './business-account.controller';
import { BusinessAccount } from './entities/business-account.entity';
import { Account } from '../account/entities/account.entity';
import { Onboarding } from '../onboarding/entities/onboarding.entity';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

/**
 * Module for handling business account related functionality
 */
@Module({
  imports: [TypeOrmModule.forFeature([BusinessAccount, Account, Onboarding])], // Import TypeOrmModule with BusinessAccount, Account, and Onboarding entities
  controllers: [BusinessAccountsController], // Register BusinessAccountsController
  providers: [
    BusinessAccountsService, // Register BusinessAccountsService
    {
      provide: APP_INTERCEPTOR, // Provide LoggingInterceptor globally
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER, // Provide HttpExceptionFilter globally
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [BusinessAccountsService], // Export BusinessAccountsService for use in other modules
})
export class BusinessAccountsModule {
}
