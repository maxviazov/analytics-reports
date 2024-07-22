# Analytics Reports Service

This service handles various business functionalities, including user management, account management, onboarding, and
business operations. It leverages Kafka for messaging and microservices communication.

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Running the Application](#running-the-application)
4. [Kafka API](#kafka-api)
5. [Entity and DTO Definitions](#entity-and-dto-definitions)
6. [Usage](#usage)
7. [Contributing](#contributing)
8. [License](#license)

## Installation

1. Clone the repository:

    ```bash
    git clone https://git@bitbucket.org:noviopus/analytics-reports.git
    cd analytics-reports
    ```

2. Install the dependencies:

    ```bash
    yarn install
    ```

3. Set up the environment variables:

   Create a `.env` file in the root directory and add the necessary environment variables:

    ```plaintext
    PORT=5000
    POSTGRES_HOST=localhost
    POSTGRES_PORT=5432
    POSTGRES_USER=yourusername
    POSTGRES_PASSWORD=yourpassword
    POSTGRES_DB=yourdatabase
    KAFKA_BROKERS=localhost:9092
    KAFKA_CLIENT_ID=analytics-reports-client
    KAFKA_GROUP_ID=analytics-reports-group
    ```

## Configuration

The application uses a combination of `ConfigModule` for environment variables and `TypeOrmModule` for database
connections.

### Kafka Configuration

The Kafka configuration is loaded from the environment variables and used in the `ClientsModule`:

```typescript
ClientsModule.registerAsync([
  {
    name: 'KAFKA_SERVICE',
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: configService.get<string[]>('KAFKA_BROKERS'),
          clientId: configService.get<string>('KAFKA_CLIENT_ID'),
        },
        consumer: {
          groupId: configService.get<string>('KAFKA_GROUP_ID'),
        },
      },
    }),
  },
]);
```

## Running the Application

1. Build the application:

    ```bash
    yarn build
    ```

2. Run database migrations:

    ```bash
    yarn migration:run
    ```

3. Start the application:

    ```bash
    yarn start:prod
    ```

## Kafka API

### Producing Messages

The `KafkaService` provides a method to produce messages to Kafka topics:

```typescript
async
produceMessage(topic
:
string, message
:
string
):
Promise < void > {
  this.logger.log(`Sending message to topic ${topic}: ${JSON.stringify(message)}`);
  await this.clientKafka.emit(topic, message);
  this.logger.log(`Message sent to topic ${topic}`);
}
```

### Consuming Messages

The `KafkaService` handles incoming Kafka messages and processes metrics:

```typescript
async
handleMetric(@Payload()
message: string
):
Promise < void > {
  const { type, data } = JSON.parse(message);
  if(!
this.sourceMap[type]
)
{
  this.logger.error(`Unknown metric type: ${type}`);
  return;
}
const { service, dto, method } = this.sourceMap[type];
const instance = Object.assign(new dto(), data);
await service[method](instance);
this.logger.log(`Metric processed successfully`);
}
```

## Entity and DTO Definitions

### User Entity

```typescript
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @ManyToOne(() => Location)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @Column({ length: 50 })
  language: string;

  @Column({ name: 'connections_data', length: 255 })
  connectionsData: string;

  @ManyToOne(() => Onboarding)
  @JoinColumn({ name: 'onboarding_id' })
  onBoarding: Onboarding;
}
```

### CreateUserDto

```typescript
export class CreateUserDto {
  @ApiProperty({ description: 'Associated account ID', example: 1 })
  @IsInt()
  accountId: number;

  @ApiProperty({ description: 'Associated location ID', example: 1 })
  @IsInt()
  locationId: number;

  @ApiProperty({ description: 'Preferred language', example: 'en' })
  @IsString()
  language: string;

  @ApiProperty({ description: 'User connections data', example: '{}' })
  @IsString()
  connectionsData: string;

  @ApiProperty({ description: 'Associated onboarding ID', example: 1 })
  @IsInt()
  onBoardingId: number;
}
```

## Usage

To produce a message to a Kafka topic:

```typescript
const kafkaService = new KafkaService();
kafkaService.produceMessage('your-topic', 'your-message');
```

To consume and handle messages:

```typescript
kafkaService.handleMetric('{"type": "users", "data": {"accountId": 1, "locationId": 1, "language": "en", "connectionsData": "{}", "onBoardingId": 1}}');
```

## Supported Kafka Event Types

The following event types are supported by the Kafka module:

1. `users`
2. `onboarding`
3. `account`
4. `landingPages`
5. `businessAccounts`
6. `careerPages`
7. `careerPosts`
8. `traffic`
9. `clients`
10. `billing`
11. `businessCompanies`
12. `jobPages`
13. `hiring`
14. `locations`
15. `businessJobs`
16. `organizations`
17. `pages`
18. `invitations`
19. `posts`

Each event type corresponds to a specific service, DTO, and method for handling the event within the application.

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
