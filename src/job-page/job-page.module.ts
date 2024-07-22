import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPagesService } from './job-page.service';
import { JobPagesController } from './job-page.controller';
import { JobPage } from './entities/job-page.entity';
import { User } from '../users/entities/user.entity';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

/**
 * Module for job pages management
 */
@Module({
  imports: [TypeOrmModule.forFeature([JobPage, User])],
  controllers: [JobPagesController],
  providers: [
    JobPagesService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [JobPagesService],
})
export class JobPagesModule {}
