import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Client, ClientKafka, Payload, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { OnboardingService } from '../onboarding/onboarding.service';
import { AccountsService } from '../account/account.service';
import { LandingPagesService } from '../landing-page/landing-page.service';
import { BusinessAccountsService } from '../business-account/business-account.service';
import { CareerPagesService } from '../career-page/career-page.service';
import { CareerPostsService } from '../career-post/career-post.service';
import { TrafficService } from '../traffic/traffic.service';
import { ClientsService } from '../client/client.service';
import { BillingService } from '../billing/billing.service';
import { BusinessCompaniesService } from '../business-company/business-company.service';
import { JobPagesService } from '../job-page/job-page.service';
import { HiringService } from '../hiring/hiring.service';
import { LocationsService } from '../location/location.service';
import { BusinessJobsService } from '../business-job/business-job.service';
import { OrganizationsService } from '../organization/organization.service';
import { PagesService } from '../page/page.service';
import { InvitationsService } from '../invitation/invitation.service';
import { PostsService } from '../post/post.service';
import { CreateOnboardingDto } from 'src/onboarding/dto/create-onboarding.dto';
import { CreateAccountDto } from 'src/account/dto/create-account.dto';
import { CreateLandingPageDto } from 'src/landing-page/dto/create-landing-page.dto';
import { CreateBusinessAccountDto } from 'src/business-account/dto/create-business-account.dto';
import { CreateCareerPageDto } from 'src/career-page/dto/create-career-page.dto';
import { CreateCareerPostDto } from 'src/career-post/dto/create-career-post.dto';
import { CreateTrafficDto } from 'src/traffic/dto/create-traffic.dto';
import { CreateClientDto } from 'src/client/dto/create-client.dto';
import { CreateBillingDto } from 'src/billing/dto/create-billing.dto';
import { CreateJobPageDto } from 'src/job-page/dto/create-job-page.dto';
import { CreateHiringDto } from 'src/hiring/dto/create-hiring.dto';
import { CreateLocationDto } from 'src/location/dto/create-location.dto';
import { CreateBusinessJobDto } from 'src/business-job/dto/create-business-job.dto';
import { CreateOrganizationDto } from 'src/organization/dto/create-organization.dto';
import { CreatePageDto } from 'src/page/dto/create-page.dto';
import { CreateInvitationDto } from 'src/invitation/dto/create-invitation.dto';
import { CreatePostDto } from 'src/post/dto/create-post.dto';

interface SourceMapEntry {
  service: any;
  dto: any;
  method: string;
}

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaService.name);
  private readonly topicName: string;

  private readonly sourceMap: Record<string, SourceMapEntry> = {
    users: {
      service: this.usersService,
      dto: CreateUserDto,
      method: 'createUser',
    },
    onboarding: {
      service: this.onboardingService,
      dto: CreateOnboardingDto,
      method: 'createOnboarding',
    },
    account: {
      service: this.accountsService,
      dto: CreateAccountDto,
      method: 'createAccount',
    },
    landingPages: {
      service: this.landingPagesService,
      dto: CreateLandingPageDto,
      method: 'createLandingPage',
    },
    businessAccounts: {
      service: this.businessAccountsService,
      dto: CreateBusinessAccountDto,
      method: 'createBusinessAccount',
    },
    careerPages: {
      service: this.careerPagesService,
      dto: CreateCareerPageDto,
      method: 'createCareerPage',
    },
    careerPosts: {
      service: this.careerPostsService,
      dto: CreateCareerPostDto,
      method: 'createCareerPost',
    },
    traffic: {
      service: this.trafficService,
      dto: CreateTrafficDto,
      method: 'createTraffic',
    },
    clients: {
      service: this.clientsService,
      dto: CreateClientDto,
      method: 'createClient',
    },
    billing: {
      service: this.billingService,
      dto: CreateBillingDto,
      method: 'createBilling',
    },
    businessCompanies: {
      service: this.businessCompaniesService,
      dto: CreateBusinessAccountDto,
      method: 'createBusinessCompany',
    },
    jobPages: {
      service: this.jobPagesService,
      dto: CreateJobPageDto,
      method: 'createJobPage',
    },
    hiring: {
      service: this.hiringService,
      dto: CreateHiringDto,
      method: 'createHiring',
    },
    locations: {
      service: this.locationsService,
      dto: CreateLocationDto,
      method: 'createLocation',
    },
    businessJobs: {
      service: this.businessJobsService,
      dto: CreateBusinessJobDto,
      method: 'createBusinessJob',
    },
    organizations: {
      service: this.organizationsService,
      dto: CreateOrganizationDto,
      method: 'createOrganization',
    },
    pages: {
      service: this.pagesService,
      dto: CreatePageDto,
      method: 'createPage',
    },
    invitations: {
      service: this.invitationsService,
      dto: CreateInvitationDto,
      method: 'createInvitation',
    },
    posts: {
      service: this.postsService,
      dto: CreatePostDto,
      method: 'createPost',
    },
  };

  constructor(
    @Inject('KAFKA_SERVICE')
    private readonly clientKafka: ClientKafka,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly onboardingService: OnboardingService,
    private readonly accountsService: AccountsService,
    private readonly landingPagesService: LandingPagesService,
    private readonly businessAccountsService: BusinessAccountsService,
    private readonly careerPagesService: CareerPagesService,
    private readonly careerPostsService: CareerPostsService,
    private readonly trafficService: TrafficService,
    private readonly clientsService: ClientsService,
    private readonly billingService: BillingService,
    private readonly businessCompaniesService: BusinessCompaniesService,
    private readonly jobPagesService: JobPagesService,
    private readonly hiringService: HiringService,
    private readonly locationsService: LocationsService,
    private readonly businessJobsService: BusinessJobsService,
    private readonly organizationsService: OrganizationsService,
    private readonly pagesService: PagesService,
    private readonly invitationsService: InvitationsService,
    private readonly postsService: PostsService,
  ) {
    this.topicName = this.configService.get<string>(
      'KAFKA_TOPIC',
      'defaultTopic',
    );
  }

  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: process.env.KAFKA_CLIENT_ID,
        brokers: process.env.KAFKA_BROKERS?.split(',') ?? [],
      },
      consumer: {
        groupId: process.env.KAFKA_CONSUMER_GROUP_ID || 'defaultGroupId',
      },
    },
  })
  private client: ClientKafka = new ClientKafka({});

  async onModuleInit() {
    try {
      this.logger.log('Initializing Kafka Module...');
      this.client.subscribeToResponseOf(process.env.KAFKA_TOPIC);
      await this.clientKafka.connect();
      this.logger.log(`Kafka connected and subscribed to ${this.topicName}`);
    } catch (error: any) {
      this.logger.error(`Kafka connection failed: ${error.message}`, error.stack);
    }
  }

  async onModuleDestroy() {
    this.logger.log('Closing Kafka connection...');
    await this.clientKafka.close();
    this.logger.log('Kafka connection closed');
  }

  async produceMessage(topic: string, message: any) {
    this.logger.log(`Sending message to topic ${topic}: ${JSON.stringify(message)}`);
    try {
      this.clientKafka.emit(topic, message);
      this.clientKafka.subscribeToResponseOf(topic);
      this.logger.log(`Message sent to topic ${topic}`);
    } catch (error: any) {
      this.logger.error(`Failed to send message to topic ${topic}: ${error.message}`, error.stack);
    }
  }

  async handleMetric(@Payload() message: any): Promise<void> {
    this.logger.log(`Received message: ${JSON.stringify(message)}`);

    const { type, data } = message.message;

    if (!this.sourceMap[type]) {
      this.logger.error(`Unknown metric type: ${type}`);
      return;
    }

    const { service, dto, method } = this.sourceMap[type];

    try {
      this.logger.log(`Data received for ${type}: ${JSON.stringify(data)}`);

      const instance = Object.assign(new dto(), data);
      this.logger.log(`DTO instance created: ${JSON.stringify(instance)}`);

      this.logger.log(`Calling ${type}Service.${method} with data: ${JSON.stringify(instance)}`);
      await service[method](instance);
      this.logger.log(`${type.charAt(0).toUpperCase() + type.slice(1)} metric processed successfully`);

      this.clientKafka.emit(process.env.KAFKA_CONFIRMATION_TOPIC, {
        status: 'success',
        type,
        data: instance,
      });
      this.logger.log('Confirmation message sent to Kafka');
    } catch (error: any) {
      this.logger.error(`Error processing ${type} metric: ${error.message}`, error.stack);

      this.clientKafka.emit(process.env.KAFKA_ERROR_TOPIC, {
        status: 'error',
        type,
        message: error.message,
      });
    }
  }
}
