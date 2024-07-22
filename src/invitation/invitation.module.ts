import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationsService } from './invitation.service';
import { InvitationsController } from './invitation.controller';
import { Invitation } from './entities/invitation.entity';
import { User } from '../users/entities/user.entity';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

/**
 * Module for handling invitation-related functionality
 */
@Module({
  imports: [TypeOrmModule.forFeature([Invitation, User])],
  controllers: [InvitationsController],
  providers: [
    InvitationsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [InvitationsService],
})
export class InvitationsModule {}
