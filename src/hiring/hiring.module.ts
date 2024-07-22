import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HiringService } from './hiring.service';
import { HiringController } from './hiring.controller';
import { Hiring } from './entities/hiring.entity';
import { BusinessJob } from '../business-job/entities/business-job.entity';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

/**
 * Module for managing hiring-related functionality.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Hiring, BusinessJob])], // Importing TypeORM module with Hiring and BusinessJob entities
  controllers: [HiringController], // Registering HiringController
  providers: [
    HiringService, // Registering HiringService
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor, // Applying logging interceptor globally
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter, // Applying HTTP exception filter globally
    },
  ],
  exports: [HiringService], // Exporting HiringService for use in other modules
})
export class HiringModule {}
