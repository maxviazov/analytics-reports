import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from './client.service';
import { ClientsController } from './client.controller';
import { Client } from './entities/client.entity';
import { BusinessAccount } from '../business-account/entities/business-account.entity';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

/**
 * Module for managing clients
 */
@Module({
  imports: [TypeOrmModule.forFeature([Client, BusinessAccount])],
  controllers: [ClientsController],
  providers: [
    ClientsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [ClientsService],
})
export class ClientModule { }
