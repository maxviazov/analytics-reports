import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import knex, { Knex } from 'knex';
import knexConfig from '../knexfile';

/**
 * Service responsible for managing database migrations.
 * It initializes the Knex query builder with configuration based on the current NODE_ENV.
 * Implements the OnModuleInit lifecycle hook to run migrations automatically upon module initialization.
 */
@Injectable()
export class MigrationService implements OnModuleInit {
  private knex: Knex;

  /**
   * Constructs the MigrationService with injected dependencies.
   * Initializes the Knex instance with environment-specific configuration.
   * @param {ConfigService} configService - The configuration service to access environment variables.
   */
  constructor(private readonly configService: ConfigService) {
    const environment =
      this.configService.get<string>('NODE_ENV') || 'development';
    this.knex = knex(knexConfig[environment]);
  }

  /**
   * Lifecycle hook method called once the module hosting this service is fully initialized.
   * Triggers the execution of database migrations.
   */
  async onModuleInit() {
    await this.runMigrations();
  }

  /**
   * Executes the latest database migrations.
   * Logs the batch number and names of migrations that were run.
   * Catches and logs any errors that occur during migration.
   */
  async runMigrations() {
    try {
      console.log('Running migrations...');
      const [batchNo, log] = await this.knex.migrate.latest();
      console.log(
        `Migrations completed. Batch number: ${batchNo}. Migrations: ${log.join(', ')}`,
      );
    } catch (error) {
      console.error('Migration failed:', error);
    }
  }
}
