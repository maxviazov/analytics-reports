import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { Billing } from './entities/billing.entity';
import { BusinessAccount } from '../business-account/entities/business-account.entity';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

/**
 * BillingModule is responsible for handling the billing logic.
 * It includes controllers, services, and entities related to billing.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Billing, BusinessAccount])],
  controllers: [BillingController],
  providers: [
    BillingService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [BillingService],
})
export class BillingModule {}
