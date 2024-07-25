import { Body, Controller, Inject, Logger, Post } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('kafka')
@Controller('kafka')
export class KafkaController {
  private readonly logger = new Logger(KafkaController.name);

  constructor(
    private readonly kafkaService: KafkaService,
    @Inject('KAFKA_SERVICE') private readonly clientKafka: ClientKafka
  ) { }

  @Post('send')
  @ApiOperation({ summary: 'Send a message to a Kafka topic' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        topic: { type: 'string', example: 'analytics-reports' },
        message: {
          type: 'object',
          properties: {
            type: { type: 'string', example: 'users' },
            data: {
              type: 'object',
              properties: {
                accountId: { type: 'number', example: 34 },
                locationId: { type: 'number', example: 34 },
                language: { type: 'string', example: 'en' },
                connectionsData: { type: 'string', example: 'Facebook' },
                onboardingId: { type: 'number', example: 34 },
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Message sent successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  async sendMessage(
    @Body('topic') topic: string,
    @Body('message') message: any,
  ) {
    await this.produceMessage(topic, message);
  }

  async produceMessage(topic: string, message: any) {
    this.logger.log(`Sending message to topic ${topic}: ${JSON.stringify(message)}`);
    this.clientKafka.emit(topic, message);
    this.logger.log(`Message sent to topic ${topic}`);
    this.handleMetric(message);
  }

  @MessagePattern('analytics-reports')
  async handleMetric(@Payload() message: any) {
    this.logger.log(`Controller received message: ${JSON.stringify(message)}`);

    try {
      await this.kafkaService.handleMetric(message);
      this.logger.log(`Message processed`);
    } catch (error: any) {
      this.logger.error(`Error processing message: ${error.message}`, error.stack);
    }
  }
}
