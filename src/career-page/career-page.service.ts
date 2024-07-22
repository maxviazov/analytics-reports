import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CareerPage } from './entities/career-page.entity';
import { CreateCareerPageDto } from './dto/create-career-page.dto';

@Injectable()
export class CareerPagesService {
  private readonly logger = new Logger(CareerPagesService.name);

  constructor(
    @InjectRepository(CareerPage)
    private readonly careerPageRepository: Repository<CareerPage>,
  ) {}

  /**
   * Creates a new Career Page
   * @param createCareerPageDto - Data Transfer Object containing career page details
   * @returns The newly created Career Page
   */
  async createCareerPage(
    createCareerPageDto: CreateCareerPageDto,
  ): Promise<CareerPage> {
    try {
      const newCareerPage =
        this.careerPageRepository.create(createCareerPageDto);
      return await this.careerPageRepository.save(newCareerPage);
    } catch (error: any) {
      this.logger.error('Failed to create career page', error.stack);
      throw error;
    }
  }

  /**
   * Fetches all Career Pages
   * @returns An array of Career Pages
   */
  async findAll(): Promise<CareerPage[]> {
    try {
      return await this.careerPageRepository.find({
        relations: ['user'],
      });
    } catch (error: any) {
      this.logger.error('Failed to fetch career pages', error.stack);
      throw error;
    }
  }

  /**
   * Fetches a Career Page by its ID
   * @param id - The ID of the Career Page
   * @returns The Career Page with the specified ID
   */
  async findOne(id: number): Promise<CareerPage> {
    try {
      const careerPage = await this.careerPageRepository.findOne({
        where: { id },
        relations: ['user'],
      });
      if (!careerPage) {
        throw new Error(`CareerPage with id: ${id} not found`);
      }
      return careerPage;
    } catch (error: any) {
      this.logger.error('Failed to fetch career page', error.stack);
      throw error;
    }
  }
}
