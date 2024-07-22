import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka, Payload } from '@nestjs/microservices';
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

interface SourceMapEntry {
  service: any;
  dto: any;
  method: string;
}

@Injectable()
export class KafkaService implements OnModuleInit {
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
      dto: CreateUserDto,
      method: 'createOnboarding',
    },
    account: {
      service: this.accountsService,
      dto: CreateUserDto,
      method: 'createAccount',
    },
    landingPages: {
      service: this.landingPagesService,
      dto: CreateUserDto,
      method: 'createLandingPage',
    },
    businessAccounts: {
      service: this.businessAccountsService,
      dto: CreateUserDto,
      method: 'createBusinessAccount',
    },
    careerPages: {
      service: this.careerPagesService,
      dto: CreateUserDto,
      method: 'createCareerPage',
    },
    careerPosts: {
      service: this.careerPostsService,
      dto: CreateUserDto,
      method: 'createCareerPost',
    },
    traffic: {
      service: this.trafficService,
      dto: CreateUserDto,
      method: 'createTraffic',
    },
    clients: {
      service: this.clientsService,
      dto: CreateUserDto,
      method: 'createClient',
    },
    billing: {
      service: this.billingService,
      dto: CreateUserDto,
      method: 'createBilling',
    },
    businessCompanies: {
      service: this.businessCompaniesService,
      dto: CreateUserDto,
      method: 'createBusinessCompany',
    },
    jobPages: {
      service: this.jobPagesService,
      dto: CreateUserDto,
      method: 'createJobPage',
    },
    hiring: {
      service: this.hiringService,
      dto: CreateUserDto,
      method: 'createHiring',
    },
    locations: {
      service: this.locationsService,
      dto: CreateUserDto,
      method: 'createLocation',
    },
    businessJobs: {
      service: this.businessJobsService,
      dto: CreateUserDto,
      method: 'createBusinessJob',
    },
    organizations: {
      service: this.organizationsService,
      dto: CreateUserDto,
      method: 'createOrganization',
    },
    pages: {
      service: this.pagesService,
      dto: CreateUserDto,
      method: 'createPage',
    },
    invitations: {
      service: this.invitationsService,
      dto: CreateUserDto,
      method: 'createInvitation',
    },
    posts: {
      service: this.postsService,
      dto: CreateUserDto,
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
      'kafka.topic',
      'defaultTopic',
    );
  }

  /**
   * Initialize the module and connect to Kafka.
   */
  async onModuleInit() {
    try {
      await this.clientKafka.connect();
      this.logger.log(`Kafka connected and subscribed to ${this.topicName}`);
      this.clientKafka.subscribeToResponseOf(this.topicName);
    } catch (error: any) {
      this.logger.error(`Kafka connection failed: ${error.message}`);
    }
  }

  /**
   * Produce a message to a specific Kafka topic.
   * @param topic The topic to send the message to.
   * @param message The message to send.
   */
  async produceMessage(topic: string, message: string) {
    this.logger.log(
      `Sending message to topic ${topic}: ${JSON.stringify(message)}`,
    );
    await this.clientKafka.emit(topic, message);
    this.logger.log(`Message sent to topic ${topic}`);
    await this.handleMetric(message);
  }

  /**
   * Handle the incoming Kafka message and process the metric.
   * @param message The Kafka message payload.
   */
  async handleMetric(@Payload() message: string): Promise<void> {
    this.logger.log(`Received message: ${JSON.stringify(message)}`);

    let metric: any;
    try {
      metric = JSON.parse(JSON.stringify(message));
      this.logger.log(`Deserialized message: ${JSON.stringify(metric)}`);
    } catch (error: any) {
      this.logger.error('Error deserializing message:', error);
      return;
    }

    const { type, data } = metric;

    if (!this.sourceMap[type]) {
      this.logger.error(`Unknown metric type: ${type}`);
      return;
    }

    const { service, dto, method } = this.sourceMap[type];

    try {
      const instance = Object.assign(new dto(), data);
      this.logger.log(
        `Calling ${type}Service.${method} with data: ${JSON.stringify(instance)}`,
      );
      await service[method](instance);
      this.logger.log(
        `${type.charAt(0).toUpperCase() + type.slice(1)} metric processed successfully`,
      );

      await this.clientKafka.emit(process.env.KAFKA_CONFIRMATION_TOPIC, {
        status: 'success',
        type,
        data: instance,
      });
      this.logger.log('Confirmation message sent to Kafka');
    } catch (error: any) {
      this.logger.error(`Error processing ${type} metric: ${error.message}`);

      await this.clientKafka.emit(process.env.KAFKA_ERROR_TOPIC, {
        status: 'error',
        type,
        message: error.message,
      });
      this.logger.log('Error message sent to Kafka');
    }
  }
}
