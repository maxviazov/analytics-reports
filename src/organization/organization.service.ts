import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './entities/organization.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';

@Injectable()
export class OrganizationsService {
  private readonly logger = new Logger(OrganizationsService.name);

  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  /**
   * Creates a new organization.
   * @param createOrganizationDto Data transfer object for creating an organization.
   * @returns The newly created organization.
   */
  async createOrganization(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    try {
      const newOrganization = this.organizationRepository.create(
        createOrganizationDto,
      );
      return await this.organizationRepository.save(newOrganization);
    } catch (error: any) {
      this.logger.error('Failed to create organization', error.stack);
      throw error;
    }
  }

  /**
   * Retrieves all organizations.
   * @returns An array of organizations.
   */
  async findAll(): Promise<Organization[]> {
    try {
      return await this.organizationRepository.find({
        relations: ['user'],
      });
    } catch (error: any) {
      this.logger.error('Failed to fetch organizations', error.stack);
      throw error;
    }
  }

  /**
   * Retrieves a single organization by its ID.
   * @param id The ID of the organization to retrieve.
   * @returns The organization with the specified ID.
   * @throws An error if the organization is not found.
   */
  async findOne(id: number): Promise<Organization> {
    try {
      const organization = await this.organizationRepository.findOne({
        where: { id },
        relations: ['user'],
      });
      if (!organization) {
        throw new Error(`Organization with id: ${id} not found`);
      }
      return organization;
    } catch (error: any) {
      this.logger.error('Failed to fetch organization', error.stack);
      throw error;
    }
  }
}
