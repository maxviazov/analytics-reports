import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrafficService } from './traffic.service';
import { TrafficController } from './traffic.controller';
import { Traffic } from './entities/traffic.entity';
import { Location } from '../location/entities/location.entity';
import { LandingPage } from '../landing-page/entities/landing-page.entity';
import { User } from '../users/entities/user.entity';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

/**
 * Module to handle traffic-related operations
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Traffic, Location, LandingPage, User]), // Import required entities
  ],
  controllers: [TrafficController], // Declare controllers
  providers: [
    TrafficService, // Declare services
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor, // Global logging interceptor
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter, // Global exception filter
    },
  ],
  exports: [TrafficService], // Export services
})
export class TrafficModule {
}
