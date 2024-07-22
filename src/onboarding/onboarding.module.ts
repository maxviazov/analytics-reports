import { Module } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { OnboardingController } from './onboarding.controller';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Onboarding } from './entities/onboarding.entity';

/**
 * Module for handling onboarding-related operations.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Onboarding])], // Import TypeOrmModule with Onboarding entity
  controllers: [OnboardingController], // Register OnboardingController
  providers: [
    OnboardingService, // Register OnboardingService
    {
      provide: APP_INTERCEPTOR, // Provide LoggingInterceptor globally
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER, // Provide HttpExceptionFilter globally
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [OnboardingService], // Export OnboardingService for use in other modules
})
export class OnboardingModule {
}
