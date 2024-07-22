import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationsService {
  private readonly logger = new Logger(LocationsService.name);

  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  /**
   * Creates a new location.
   * @param createLocationDto - Data Transfer Object containing location data.
   * @returns The created location.
   */
  async createLocation(
    createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    try {
      const newLocation = this.locationRepository.create(createLocationDto);
      return await this.locationRepository.save(newLocation);
    } catch (error: any) {
      this.logger.error('Failed to create location', error.stack);
      throw error;
    }
  }

  /**
   * Fetches all locations.
   * @returns An array of locations.
   */
  async findAll(): Promise<Location[]> {
    try {
      return await this.locationRepository.find();
    } catch (error: any) {
      this.logger.error('Failed to fetch locations', error.stack);
      throw error;
    }
  }

  /**
   * Fetches a single location by ID.
   * @param id - The ID of the location to fetch.
   * @returns The location with the given ID.
   * @throws An error if the location is not found.
   */
  async findOne(id: number): Promise<Location> {
    try {
      const location = await this.locationRepository.findOne({ where: { id } });
      if (!location) {
        throw new Error(`Location with id: ${id} not found`);
      }
      return location;
    } catch (error: any) {
      this.logger.error('Failed to fetch location', error.stack);
      throw error;
    }
  }
}
