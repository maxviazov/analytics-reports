import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessCompany } from './entities/business-company.entity';
import { CreateBusinessCompanyDto } from './dto/create-business-company.dto';

@Injectable()
export class BusinessCompaniesService {
  private readonly logger = new Logger(BusinessCompaniesService.name);

  constructor(
    @InjectRepository(BusinessCompany)
    private readonly businessCompanyRepository: Repository<BusinessCompany>,
  ) {}

  /**
   * Creates a new business company record.
   * @param createBusinessCompanyDto - Data Transfer Object for creating a business company.
   * @returns The created BusinessCompany entity.
   */
  async createBusinessCompany(
    createBusinessCompanyDto: CreateBusinessCompanyDto,
  ): Promise<BusinessCompany> {
    try {
      const newBusinessCompany = this.businessCompanyRepository.create(
        createBusinessCompanyDto,
      );
      return await this.businessCompanyRepository.save(newBusinessCompany);
    } catch (error: any) {
      this.logger.error('Failed to create business company', error.stack);
      throw error;
    }
  }

  /**
   * Fetches all business company records.
   * @returns An array of BusinessCompany entities.
   */
  async findAll(): Promise<BusinessCompany[]> {
    try {
      return await this.businessCompanyRepository.find({
        relations: ['businessAccount', 'location', 'user'],
      });
    } catch (error: any) {
      this.logger.error('Failed to fetch business companies', error.stack);
      throw error;
    }
  }

  /**
   * Fetches a business company record by its ID.
   * @param id - The ID of the business company.
   * @returns The BusinessCompany entity.
   * @throws Error if the business company is not found.
   */
  async findOne(id: number): Promise<BusinessCompany> {
    try {
      const businessCompany = await this.businessCompanyRepository.findOne({
        where: { id },
        relations: ['businessAccount', 'location', 'user'],
      });
      if (!businessCompany) {
        throw new Error(`BusinessCompany with id: ${id} not found`);
      }
      return businessCompany;
    } catch (error: any) {
      this.logger.error('Failed to fetch business company', error.stack);
      throw error;
    }
  }
}
