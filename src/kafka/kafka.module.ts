import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { KafkaController } from './kafka.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { AccountsModule } from '../account/account.module';
import { LandingPagesModule } from '../landing-page/landing-page.module';
import { BusinessAccountsModule } from '../business-account/business-account.module';
import { CareerPagesModule } from '../career-page/career-page.module';
import { CareerPostsModule } from '../career-post/career-post.module';
import { TrafficModule } from '../traffic/traffic.module';
import { ClientModule } from '../client/client.module';
import { BillingModule } from '../billing/billing.module';
import { BusinessCompaniesModule } from '../business-company/business-company.module';
import { JobPagesModule } from '../job-page/job-page.module';
import { BusinessJobsModule } from '../business-job/business-job.module';
import { LocationsModule } from '../location/location.module';
import { HiringModule } from '../hiring/hiring.module';
import { OnboardingModule } from '../onboarding/onboarding.module';
import { OrganizationsModule } from '../organization/organization.module';
import { PagesModule } from '../page/page.module';
import { InvitationsModule } from '../invitation/invitation.module';
import { PostsModule } from '../post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          const brokers = configService.get<string>('KAFKA_BROKERS');
          const groupId = configService.get<string>('KAFKA_GROUP_ID');
          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                brokers: brokers ? brokers.split(',') : [],
              },
              consumer: {
                groupId: groupId || 'default-group',
              },
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
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
    InvitationsModule,
    PostsModule,
  ],
  providers: [KafkaService],
  controllers: [KafkaController],
  exports: [KafkaService],
})
export class KafkaModule { }
