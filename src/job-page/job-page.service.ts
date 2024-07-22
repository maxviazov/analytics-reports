import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPage } from './entities/job-page.entity';
import { CreateJobPageDto } from './dto/create-job-page.dto';

@Injectable()
export class JobPagesService {
  private readonly logger = new Logger(JobPagesService.name);

  constructor(
    @InjectRepository(JobPage)
    private readonly jobPageRepository: Repository<JobPage>,
  ) {}

  /**
   * Creates a new job page
   * @param createJobPageDto - Data Transfer Object for creating a job page
   * @returns The created job page
   */
  async createJobPage(createJobPageDto: CreateJobPageDto): Promise<JobPage> {
    try {
      const newJobPage = this.jobPageRepository.create(createJobPageDto);
      return await this.jobPageRepository.save(newJobPage);
    } catch (error: any) {
      this.logger.error('Failed to create job page', error.stack);
      throw error;
    }
  }

  /**
   * Retrieves all job pages
   * @returns An array of job pages
   */
  async findAll(): Promise<JobPage[]> {
    try {
      return await this.jobPageRepository.find({
        relations: ['user'],
      });
    } catch (error: any) {
      this.logger.error('Failed to fetch job pages', error.stack);
      throw error;
    }
  }

  /**
   * Retrieves a job page by ID
   * @param id - The ID of the job page
   * @returns The job page with the specified ID
   */
  async findOne(id: number): Promise<JobPage> {
    try {
      const jobPage = await this.jobPageRepository.findOne({
        where: { id },
        relations: ['user'],
      });
      if (!jobPage) {
        throw new Error(`JobPage with id: ${id} not found`);
      }
      return jobPage;
    } catch (error: any) {
      this.logger.error('Failed to fetch job page', error.stack);
      throw error;
    }
  }
}
