import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandingPagesService } from './landing-page.service';
import { LandingPagesController } from './landing-page.controller';
import { LandingPage } from './entities/landing-page.entity';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

/**
 * Module that provides services and controllers for managing landing pages
 */
@Module({
  imports: [TypeOrmModule.forFeature([LandingPage])],
  controllers: [LandingPagesController],
  providers: [
    LandingPagesService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [LandingPagesService],
})
export class LandingPagesModule {}
