import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagesService } from './page.service';
import { PagesController } from './page.controller';
import { Page } from './entities/page.entity';
import { User } from '../users/entities/user.entity';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

/**
 * Module for managing pages
 */
@Module({
  imports: [TypeOrmModule.forFeature([Page, User])],
  controllers: [PagesController],
  providers: [
    PagesService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [PagesService],
})
export class PagesModule {}
