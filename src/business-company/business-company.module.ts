import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessCompaniesService } from './business-company.service';
import { BusinessCompaniesController } from './business-company.controller';
import { BusinessCompany } from './entities/business-company.entity';
import { BusinessAccount } from '../business-account/entities/business-account.entity';
import { Location } from '../location/entities/location.entity';
import { User } from '../users/entities/user.entity';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

/**
 * Module that handles business company operations.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([
      BusinessCompany,
      BusinessAccount,
      Location,
      User,
    ]),
  ],
  controllers: [BusinessCompaniesController],
  providers: [
    BusinessCompaniesService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [BusinessCompaniesService],
})
export class BusinessCompaniesModule {}
