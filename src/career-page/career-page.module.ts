import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareerPagesService } from './career-page.service';
import { CareerPagesController } from './career-page.controller';
import { CareerPage } from './entities/career-page.entity';
import { User } from '../users/entities/user.entity';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

/**
 * Module for Career Pages
 */
@Module({
  imports: [TypeOrmModule.forFeature([CareerPage, User])],
  controllers: [CareerPagesController],
  providers: [
    CareerPagesService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [CareerPagesService],
})
export class CareerPagesModule {}
