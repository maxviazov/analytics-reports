import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareerPostsService } from './career-post.service';
import { CareerPostsController } from './career-post.controller';
import { CareerPost } from './entities/career-post.entity';
import { CareerPage } from '../career-page/entities/career-page.entity';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

/**
 * Module for managing career posts
 */
@Module({
  imports: [TypeOrmModule.forFeature([CareerPost, CareerPage])],
  controllers: [CareerPostsController],
  providers: [
    CareerPostsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [CareerPostsService],
})
export class CareerPostsModule {}
