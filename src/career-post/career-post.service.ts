import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CareerPost } from './entities/career-post.entity';
import { CreateCareerPostDto } from './dto/create-career-post.dto';

@Injectable()
export class CareerPostsService {
  private readonly logger = new Logger(CareerPostsService.name);

  constructor(
    @InjectRepository(CareerPost)
    private readonly careerPostRepository: Repository<CareerPost>,
  ) {}

  /**
   * Create a new career post
   * @param createCareerPostDto - Data transfer object containing the details of the career post to create
   * @returns The created career post
   */
  async createCareerPost(
    createCareerPostDto: CreateCareerPostDto,
  ): Promise<CareerPost> {
    try {
      const newCareerPost =
        this.careerPostRepository.create(createCareerPostDto);
      return await this.careerPostRepository.save(newCareerPost);
    } catch (error: any) {
      this.logger.error('Failed to create career post', error.stack);
      throw error;
    }
  }

  /**
   * Find all career posts
   * @returns An array of all career posts
   */
  async findAll(): Promise<CareerPost[]> {
    try {
      return await this.careerPostRepository.find({
        relations: ['careerPage'],
      });
    } catch (error: any) {
      this.logger.error('Failed to fetch career posts', error.stack);
      throw error;
    }
  }

  /**
   * Find a specific career post by ID
   * @param id - The ID of the career post to find
   * @returns The found career post, or an error if not found
   */
  async findOne(id: number): Promise<CareerPost> {
    try {
      const careerPost = await this.careerPostRepository.findOne({
        where: { id },
        relations: ['careerPage'],
      });
      if (!careerPost) {
        throw new Error(`CareerPost with id: ${id} not found`);
      }
      return careerPost;
    } catch (error: any) {
      this.logger.error('Failed to fetch career post', error.stack);
      throw error;
    }
  }
}
