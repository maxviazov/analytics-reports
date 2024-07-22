import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Initialize the configuration module globally
ConfigModule.forRoot({
  isGlobal: true,
});

// Create a new instance of ConfigService to access environment variables
const configService = new ConfigService();

// Export a new DataSource instance for TypeORM with PostgreSQL configuration
// The configuration is pulled from environment variables using ConfigService
export default new DataSource({
  type: 'postgres', // Specifies the database type as PostgreSQL
  host: configService.get<string>('POSTGRES_HOST'), // Database host
  port: configService.get<number>('POSTGRES_PORT'), // Database port
  username: configService.get<string>('POSTGRES_USER'), // Database username
  password: configService.get<string>('POSTGRES_PASSWORD'), // Database password
  database: configService.get<string>('POSTGRES_DB'), // Database name
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // Path to the application's entities
  migrations: [__dirname + '/../migrations/*.{js,ts}'], // Path to the application's migrations
  synchronize: false, // Disables automatic synchronization of the database schema
});
