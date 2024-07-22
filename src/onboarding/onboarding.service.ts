import { Injectable, Logger } from '@nestjs/common';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Onboarding } from './entities/onboarding.entity';
import { Repository } from 'typeorm';

/**
 * Service for managing onboarding records.
 */
@Injectable()
export class OnboardingService {
  private readonly logger = new Logger(OnboardingService.name);

  constructor(
    @InjectRepository(Onboarding)
    private readonly onboardingRepository: Repository<Onboarding>,
  ) {
  }

  /**
   * Creates a new onboarding record.
   * @param createOnboardingDto - Data transfer object containing the details for the new onboarding.
   * @returns The created onboarding entity.
   * @throws An error if the creation fails.
   */
  async createOnboarding(
    createOnboardingDto: CreateOnboardingDto,
  ): Promise<Onboarding> {
    try {
      this.logger.log(
        `Creating onboarding with data: ${JSON.stringify(createOnboardingDto)}`,
      );
      const newOnboarding =
        this.onboardingRepository.create(createOnboardingDto);
      return await this.onboardingRepository.save(newOnboarding);
    } catch (error: any) {
      this.logger.error('Failed to create onboarding', error.stack);
      throw error;
    }
  }

  /**
   * Retrieves all onboarding records.
   * @returns An array of onboarding entities.
   * @throws An error if the retrieval fails.
   */
  async findAll(): Promise<Onboarding[]> {
    try {
      this.logger.log('Fetching all onboardings');
      return await this.onboardingRepository.find();
    } catch (error: any) {
      this.logger.error('Failed to fetch onboardings', error.stack);
      throw error;
    }
  }

  /**
   * Retrieves a specific onboarding record by its ID.
   * @param id - The ID of the onboarding to retrieve.
   * @returns The onboarding entity.
   * @throws An error if the retrieval fails or the onboarding is not found.
   */
  async findOne(id: number): Promise<Onboarding> {
    try {
      this.logger.log(`Fetching onboarding with id: ${id}`);
      const searchedOnboarding = await this.onboardingRepository.findOne({
        where: { id },
      });
      if (!searchedOnboarding) {
        throw new Error(`Onboarding with id: ${id} not found`);
      }
      return searchedOnboarding;
    } catch (error: any) {
      this.logger.error('Failed to fetch onboarding', error.stack);
      throw error;
    }
  }
}
