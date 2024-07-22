import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Traffic } from './entities/traffic.entity';
import { CreateTrafficDto } from './dto/create-traffic.dto';

/**
 * Service to handle traffic-related operations
 */
@Injectable()
export class TrafficService {
  private readonly logger = new Logger(TrafficService.name);

  constructor(
    @InjectRepository(Traffic)
    private readonly trafficRepository: Repository<Traffic>,
  ) {
  }

  /**
   * Creates a new traffic entry.
   * @param createTrafficDto - DTO containing traffic details.
   * @returns The created Traffic entity.
   */
  async createTraffic(createTrafficDto: CreateTrafficDto): Promise<Traffic> {
    try {
      const newTraffic = this.trafficRepository.create(createTrafficDto);
      return await this.trafficRepository.save(newTraffic);
    } catch (error: any) {
      this.logger.error('Failed to create traffic', error.stack);
      throw error;
    }
  }

  /**
   * Finds all traffic entries.
   * @returns An array of Traffic entities.
   */
  async findAll(): Promise<Traffic[]> {
    try {
      return await this.trafficRepository.find({
        relations: ['location', 'landingPage', 'user'],
      });
    } catch (error: any) {
      this.logger.error('Failed to fetch traffic', error.stack);
      throw error;
    }
  }

  /**
   * Finds a single traffic entry by ID.
   * @param id - The ID of the traffic entry.
   * @returns The found Traffic entity.
   */
  async findOne(id: number): Promise<Traffic> {
    try {
      const traffic = await this.trafficRepository.findOne({
        where: { id },
        relations: ['location', 'landingPage', 'user'],
      });
      if (!traffic) {
        throw new Error(`Traffic with id: ${id} not found`);
      }
      return traffic;
    } catch (error: any) {
      this.logger.error('Failed to fetch traffic', error.stack);
      throw error;
    }
  }
}
