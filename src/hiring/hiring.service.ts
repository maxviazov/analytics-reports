import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hiring } from './entities/hiring.entity';
import { CreateHiringDto } from './dto/create-hiring.dto';

@Injectable()
export class HiringService {
  private readonly logger = new Logger(HiringService.name);

  constructor(
    @InjectRepository(Hiring)
    private readonly hiringRepository: Repository<Hiring>,
  ) {}

  /**
   * Creates a new hiring record.
   * @param createHiringDto - Data Transfer Object for creating a hiring record.
   * @returns The created hiring record.
   */
  async createHiring(createHiringDto: CreateHiringDto): Promise<Hiring> {
    try {
      const newHiring = this.hiringRepository.create(createHiringDto);
      return await this.hiringRepository.save(newHiring);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Failed to create hiring', error.stack);
      } else {
        this.logger.error('Failed to create hiring', JSON.stringify(error));
      }
      throw error;
    }
  }

  /**
   * Fetches all hiring records.
   * @returns An array of hiring records.
   */
  async findAll(): Promise<Hiring[]> {
    try {
      return await this.hiringRepository.find({
        relations: ['job'],
      });
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Failed to fetch hiring records', error.stack);
      } else {
        this.logger.error(
          'Failed to fetch hiring records',
          JSON.stringify(error),
        );
      }
      throw error;
    }
  }

  /**
   * Fetches a hiring record by ID.
   * @param id - The ID of the hiring record to fetch.
   * @returns The hiring record with the specified ID.
   * @throws Will throw an error if the hiring record is not found.
   */
  async findOne(id: number): Promise<Hiring> {
    try {
      const hiring = await this.hiringRepository.findOne({
        where: { id },
        relations: ['job'],
      });
      if (!hiring) {
        throw new Error(`Hiring record with id: ${id} not found`);
      }
      return hiring;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Failed to fetch hiring record', error.stack);
      } else {
        this.logger.error(
          'Failed to fetch hiring record',
          JSON.stringify(error),
        );
      }
      throw error;
    }
  }
}
