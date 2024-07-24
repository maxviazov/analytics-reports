import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { setupMiddleware } from './middleware/setupMiddleware';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';

// Load environment variables from .env file
dotenv.config();
// Define the application’s port. Use environment variable or default to 5000
const PORT = parseInt(process.env.PORT || '5000', 10);

/**
 * The main bootstrap function to initialize and start the NestJS application.
 * It sets up the Swagger documentation, establishes a database connection,
 * and starts the application listening on the defined port.
 */
async function bootstrap() {
  // Create a logger instance for bootstrap logging
  const logger = new Logger('bootstrap');
  // Create a new NestJS application instance
  const app = await NestFactory.create(AppModule);

  // Setup middleware
  setupMiddleware(app);

  // Retrieve the DataSource instance to manage database connection
  const dataSource = app.get(DataSource);
  // Retrieve the ConfigService instance (though not used further in this snippet)
  app.get(ConfigService);
  app.useGlobalFilters(new HttpExceptionFilter());

  // Configure Swagger for API documentation
  const config = new DocumentBuilder()
    .setTitle('Kafka Module API')
    .setDescription('API documentation for the Kafka module')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start the application and listen on the defined port
  await app.listen(PORT, async () => {
    logger.log(`Server is running on http://localhost:${PORT}...`);
    try {
      // Test database connection by executing a simple SELECT query
      await dataSource.query('SELECT 1');
      logger.log('Database connection established');
    } catch (error: any) {
      // Log database connection error
      logger.error(`Database connection failed: ${error.message}`);
    }
  });
}

// Execute the bootstrap function and handle promise resolution or rejection
bootstrap()
  .then(() => {
    console.log('Application started successfully.');
  })
  .catch((error) => {
    console.error('Application failed to start:', error);
  });
