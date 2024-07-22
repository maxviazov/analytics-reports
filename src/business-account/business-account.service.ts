import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessAccount } from './entities/business-account.entity';
import { CreateBusinessAccountDto } from './dto/create-business-account.dto';

@Injectable()
export class BusinessAccountsService {
  private readonly logger = new Logger(BusinessAccountsService.name);

  constructor(
    @InjectRepository(BusinessAccount)
    private readonly businessAccountRepository: Repository<BusinessAccount>,
  ) {}

  /**
   * Create a new business account
   * @param createBusinessAccountDto - DTO containing data for the new business account
   * @returns The created BusinessAccount entity
   */
  async createBusinessAccount(
    createBusinessAccountDto: CreateBusinessAccountDto,
  ): Promise<BusinessAccount> {
    try {
      this.logger.log(
        `Creating business account with data: ${JSON.stringify(
          createBusinessAccountDto,
        )}`,
      );
      const newBusinessAccount = this.businessAccountRepository.create(
        createBusinessAccountDto,
      );
      return await this.businessAccountRepository.save(newBusinessAccount);
    } catch (error: any) {
      this.logger.error('Failed to create business account', error.stack);
      throw error;
    }
  }

  /**
   * Retrieve all business accounts
   * @returns An array of BusinessAccount entities
   */
  async findAll(): Promise<BusinessAccount[]> {
    try {
      return await this.businessAccountRepository.find({
        relations: ['account', 'onboarding'],
      });
    } catch (error: any) {
      this.logger.error('Failed to fetch business accounts', error.stack);
      throw error;
    }
  }

  /**
   * Retrieve a specific business account by ID
   * @param id - The ID of the business account to retrieve
   * @returns The BusinessAccount entity if found
   */
  async findOne(id: number): Promise<BusinessAccount> {
    try {
      const businessAccount = await this.businessAccountRepository.findOne({
        where: { id },
        relations: ['account', 'onboarding'],
      });
      if (!businessAccount) {
        throw new Error(`BusinessAccount with id: ${id} not found`);
      }
      return businessAccount;
    } catch (error: any) {
      this.logger.error('Failed to fetch business account', error.stack);
      throw error;
    }
  }
}
