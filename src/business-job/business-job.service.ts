import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessJob } from './entities/business-job.entity';
import { CreateBusinessJobDto } from './dto/create-business-job.dto';

/**
 * Service to manage Business Jobs
 */
@Injectable()
export class BusinessJobsService {
  private readonly logger = new Logger(BusinessJobsService.name);

  constructor(
    @InjectRepository(BusinessJob)
    private readonly businessJobRepository: Repository<BusinessJob>,
  ) {
  }

  /**
   * Creates a new Business Job record
   * @param createBusinessJobDto - Data Transfer Object for creating a Business Job
   * @returns The newly created Business Job
   * @throws Error if creation fails
   */
  async createBusinessJob(
    createBusinessJobDto: CreateBusinessJobDto,
  ): Promise<BusinessJob> {
    try {
      this.logger.log(`Creating business job: ${JSON.stringify(createBusinessJobDto)}`);
      const newBusinessJob = this.businessJobRepository.create(createBusinessJobDto);
      return await this.businessJobRepository.save(newBusinessJob);
    } catch (error: any) {
      this.logger.error('Failed to create business job', error.stack);
      throw error;
    }
  }

  /**
   * Retrieves all Business Job records
   * @returns An array of Business Jobs
   * @throws Error if retrieval fails
   */
  async findAll(): Promise<BusinessJob[]> {
    try {
      this.logger.log('Fetching all business jobs');
      return await this.businessJobRepository.find({
        relations: [
          'company',
          'businessAccount',
          'location',
          'jobPage',
          'user',
        ],
      });
    } catch (error: any) {
      this.logger.error('Failed to fetch business jobs', error.stack);
      throw error;
    }
  }

  /**
   * Retrieves a single Business Job by ID
   * @param id - The ID of the Business Job
   * @returns The Business Job with the specified ID
   * @throws Error if retrieval fails or job not found
   */
  async findOne(id: number): Promise<BusinessJob> {
    try {
      this.logger.log(`Fetching business job with id: ${id}`);
      const businessJob = await this.businessJobRepository.findOne({
        where: { id },
        relations: [
          'company',
          'businessAccount',
          'location',
          'jobPage',
          'user',
        ],
      });
      if (!businessJob) {
        throw new Error(`BusinessJob with id: ${id} not found`);
      }
      return businessJob;
    } catch (error: any) {
      this.logger.error('Failed to fetch business job', error.stack);
      throw error;
    }
  }
}
