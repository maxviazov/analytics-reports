import { Body, Controller, Logger, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('kafka')
@Controller('kafka')
export class KafkaController {
  private readonly logger = new Logger(KafkaController.name);

  constructor(private readonly kafkaService: KafkaService) {}

  /**
   * Sends a message to the specified Kafka topic
   * @param topic - The Kafka topic to send the message to
   * @param message - The message to send
   * @returns A status object indicating the result of the operation
   */
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
            type: { type: 'string', example: 'invitations' },
            data: {
              type: 'object',
              properties: {
                sentDate: {
                  type: 'string',
                  format: 'date',
                  example: '2023-08-17',
                },
                acceptedDate: {
                  type: 'string',
                  format: 'date',
                  example: '2023-08-18',
                },
                status: { type: 'string', example: 'Accepted' },
                userId: { type: 'integer', example: 1 },
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
    this.logger.log(
      `Sending message to topic ${topic}: ${JSON.stringify(message)}`,
    );
    await this.kafkaService.produceMessage(topic, message);
    return { status: 'Message sent' };
  }

  /**
   * Handles incoming messages from the 'analytics-reports' Kafka topic
   * @param message - The received message
   */
  @MessagePattern('analytics-reports')
  @ApiOperation({ summary: 'Handle incoming messages from Kafka' })
  @ApiResponse({ status: 200, description: 'Message processed successfully.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async handleMetric(@Payload() message: any) {
    this.logger.log(`Received message: ${JSON.stringify(message)}`);
    await this.kafkaService.handleMetric(message);
    this.logger.log(`Message processed`);
  }
}
