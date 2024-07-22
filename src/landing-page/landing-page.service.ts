import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LandingPage } from './entities/landing-page.entity';
import { CreateLandingPageDto } from './dto/create-landing-page.dto';

/**
 * Service that provides methods for managing landing pages
 */
@Injectable()
export class LandingPagesService {
  private readonly logger = new Logger(LandingPagesService.name);

  constructor(
    @InjectRepository(LandingPage)
    private readonly landingPageRepository: Repository<LandingPage>,
  ) {
  }

  /**
   * Creates a new landing page
   * @param createLandingPageDto - Data Transfer Object containing landing page details
   * @returns The created landing page
   */
  async createLandingPage(
    createLandingPageDto: CreateLandingPageDto,
  ): Promise<LandingPage> {
    try {
      this.logger.log(`Creating landing page with data: ${JSON.stringify(createLandingPageDto)}`);
      const newLandingPage = this.landingPageRepository.create(createLandingPageDto);
      return await this.landingPageRepository.save(newLandingPage);
    } catch (error: any) {
      this.logger.error('Failed to create landing page', error.stack);
      throw error;
    }
  }

  /**
   * Fetches all landing pages
   * @returns An array of landing pages
   */
  async findAll(): Promise<LandingPage[]> {
    try {
      this.logger.log('Fetching all landing pages');
      return await this.landingPageRepository.find();
    } catch (error: any) {
      this.logger.error('Failed to fetch landing pages', error.stack);
      throw error;
    }
  }

  /**
   * Fetches a single landing page by ID
   * @param id - The ID of the landing page
   * @returns The landing page with the specified ID
   * @throws An error if the landing page is not found
   */
  async findOne(id: number): Promise<LandingPage> {
    try {
      this.logger.log(`Fetching landing page with id: ${id}`);
      const landingPage = await this.landingPageRepository.findOne({ where: { id } });
      if (!landingPage) {
        throw new Error(`LandingPage with id: ${id} not found`);
      }
      return landingPage;
    } catch (error: any) {
      this.logger.error(`Failed to fetch landing page with id: ${id}`, error.stack);
      throw error;
    }
  }
}
