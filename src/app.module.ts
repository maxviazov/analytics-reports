import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaModule } from './kafka/kafka.module';
import { UsersModule } from './users/users.module';
import kafkaConfig from './config/kafka-config';
import { LoggingInterceptor } from './logging/logging.interceptor';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';
import { MigrationService } from './migration.service';
import { AccountsModule } from './account/account.module';
import { LocationsModule } from './location/location.module';
import { LandingPagesModule } from './landing-page/landing-page.module';
import { BusinessAccountsModule } from './business-account/business-account.module';
import { CareerPagesModule } from './career-page/career-page.module';
import { CareerPostsModule } from './career-post/career-post.module';
import { TrafficModule } from './traffic/traffic.module';
import { ClientModule } from './client/client.module';
import { BillingModule } from './billing/billing.module';
import { BusinessCompaniesModule } from './business-company/business-company.module';
import { JobPagesModule } from './job-page/job-page.module';
import { BusinessJobsModule } from './business-job/business-job.module';
import { HiringModule } from './hiring/hiring.module';
import { OnboardingModule } from './onboarding/onboarding.module';
import { OrganizationsModule } from './organization/organization.module';
import { PagesModule } from './page/page.module';
import { PostsModule } from './post/post.module';
import { InvitationsModule } from './invitation/invitation.module';

/**
 * The AppModule class is the root module of the application.
 * It orchestrates the application by including all the feature modules and configuring global modules like ConfigModule and TypeOrmModule.
 * It also sets up global providers like APP_INTERCEPTOR and APP_FILTER for logging and exception handling across the application.
 */
@Module({
  imports: [
    // Global configuration module for accessing environment variables and application configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [kafkaConfig],
    }),
    // TypeORM module for database connection and entity management, configured asynchronously with database connection settings from ConfigModule
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST', 'localhost'),
        port: parseInt(configService.get<string>('POSTGRES_PORT', '5432'), 10),
        username: configService.get<string>('POSTGRES_USER', 'postgres'),
        password: configService.get<string>('POSTGRES_PASSWORD', 'postgres'),
        database: configService.get<string>('POSTGRES_DB', 'test'),
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
      inject: [ConfigService],
    }),
    // ClientsModule for setting up microservices, in this case, Kafka, with configuration provided asynchronously from ConfigModule
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          const brokers = configService.get<string>('KAFKA_BROKERS');
          const clientId = configService.get<string>('KAFKA_CLIENT_ID');
          const groupId = configService.get<string>('KAFKA_GROUP_ID');

          if (!brokers || !clientId || !groupId) {
            throw new Error('Kafka configuration is invalid');
          }

          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                brokers: brokers.split(','),
                clientId,
              },
              consumer: {
                groupId,
              },
            },
          };
        },
      },
    ]),
    // Feature modules that implement the core functionality of the application
    KafkaModule,
    UsersModule,
    AccountsModule,
    LocationsModule,
    LandingPagesModule,
    BusinessAccountsModule,
    CareerPagesModule,
    CareerPostsModule,
    TrafficModule,
    ClientModule,
    BillingModule,
    BusinessCompaniesModule,
    JobPagesModule,
    BusinessJobsModule,
    HiringModule,
    OnboardingModule,
    OrganizationsModule,
    PagesModule,
    PostsModule,
    InvitationsModule,
  ],
  controllers: [],
  providers: [
    // MigrationService for database migrations
    MigrationService,
    // Global logging interceptor for request logging
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    // Global HTTP exception filter for handling exceptions and formatting error responses
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
