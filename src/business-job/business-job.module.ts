import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessJobsService } from './business-job.service';
import { BusinessJobsController } from './business-job.controller';
import { BusinessJob } from './entities/business-job.entity';
import { BusinessCompany } from '../business-company/entities/business-company.entity';
import { BusinessAccount } from '../business-account/entities/business-account.entity';
import { Location } from '../location/entities/location.entity';
import { JobPage } from '../job-page/entities/job-page.entity';
import { User } from '../users/entities/user.entity';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

/**
 * Module for Business Jobs
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([
      BusinessJob,
      BusinessCompany,
      BusinessAccount,
      Location,
      JobPage,
      User,
    ]),
  ],
  controllers: [BusinessJobsController],
  providers: [
    BusinessJobsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [BusinessJobsService],
})
export class BusinessJobsModule {}
