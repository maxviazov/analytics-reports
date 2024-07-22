import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsService } from './location.service';
import { LocationsController } from './location.controller';
import { Location } from './entities/location.entity';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

/**
 * Module to handle locations-related functionality
 */
@Module({
  imports: [TypeOrmModule.forFeature([Location])], // Import TypeOrmModule with Location entity
  controllers: [LocationsController], // Register LocationsController
  providers: [
    LocationsService, // Register LocationsService
    {
      provide: APP_INTERCEPTOR, // Provide LoggingInterceptor globally
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER, // Provide HttpExceptionFilter globally
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [LocationsService], // Export LocationsService for use in other modules
})
export class LocationsModule {}
