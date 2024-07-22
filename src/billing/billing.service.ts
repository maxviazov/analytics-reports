import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Billing } from './entities/billing.entity';
import { CreateBillingDto } from './dto/create-billing.dto';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);

  constructor(
    @InjectRepository(Billing)
    private readonly billingRepository: Repository<Billing>,
  ) {}

  /**
   * Creates a new billing record
   * @param createBillingDto - Data Transfer Object for creating a billing record
   * @returns {Promise<Billing>} - The created billing record
   */
  async createBilling(createBillingDto: CreateBillingDto): Promise<Billing> {
    try {
      const newBilling = this.billingRepository.create(createBillingDto);
      return await this.billingRepository.save(newBilling);
    } catch (error: any) {
      this.logger.error('Failed to create billing', error.stack);
      throw error;
    }
  }

  /**
   * Retrieves all billing records
   * @returns {Promise<Billing[]>} - An array of billing records
   */
  async findAll(): Promise<Billing[]> {
    try {
      return await this.billingRepository.find({
        relations: ['businessAccount'],
      });
    } catch (error: any) {
      this.logger.error('Failed to fetch billing records', error.stack);
      throw error;
    }
  }

  /**
   * Retrieves a billing record by id
   * @param id - The id of the billing record
   * @returns {Promise<Billing>} - The billing record
   */
  async findOne(id: number): Promise<Billing> {
    try {
      const billing = await this.billingRepository.findOne({
        where: { id },
        relations: ['businessAccount'],
      });
      if (!billing) {
        throw new Error(`Billing record with id: ${id} not found`);
      }
      return billing;
    } catch (error: any) {
      this.logger.error('Failed to fetch billing record', error.stack);
      throw error;
    }
  }
}
