import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from './entities/page.entity';
import { CreatePageDto } from './dto/create-page.dto';

@Injectable()
export class PagesService {
  private readonly logger = new Logger(PagesService.name);

  constructor(
    @InjectRepository(Page)
    private readonly pageRepository: Repository<Page>,
  ) {}

  /**
   * Creates a new page
   * @param createPageDto - DTO containing page creation data
   * @returns The created page
   */
  async createPage(createPageDto: CreatePageDto): Promise<Page> {
    try {
      const newPage = this.pageRepository.create(createPageDto);
      return await this.pageRepository.save(newPage);
    } catch (error: any) {
      this.logger.error('Failed to create page', error.stack);
      throw error;
    }
  }

  /**
   * Fetches all pages
   * @returns An array of pages
   */
  async findAll(): Promise<Page[]> {
    try {
      return await this.pageRepository.find({
        relations: ['user'],
      });
    } catch (error: any) {
      this.logger.error('Failed to fetch pages', error.stack);
      throw error;
    }
  }

  /**
   * Fetches a page by its ID
   * @param id - The ID of the page to fetch
   * @returns The fetched page
   */
  async findOne(id: number): Promise<Page> {
    try {
      const page = await this.pageRepository.findOne({
        where: { id },
        relations: ['user'],
      });
      if (!page) {
        throw new Error(`Page with id: ${id} not found`);
      }
      return page;
    } catch (error: any) {
      this.logger.error('Failed to fetch page', error.stack);
      throw error;
    }
  }
}
