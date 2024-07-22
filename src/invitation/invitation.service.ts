import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invitation } from './entities/invitation.entity';
import { CreateInvitationDto } from './dto/create-invitation.dto';

@Injectable()
export class InvitationsService {
  private readonly logger = new Logger(InvitationsService.name);

  constructor(
    @InjectRepository(Invitation)
    private readonly invitationRepository: Repository<Invitation>,
  ) {}

  /**
   * Creates a new invitation record in the database
   * @param createInvitationDto - Data Transfer Object for creating a new invitation
   * @returns The created Invitation entity
   */
  async createInvitation(
    createInvitationDto: CreateInvitationDto,
  ): Promise<Invitation> {
    try {
      const newInvitation =
        this.invitationRepository.create(createInvitationDto);
      return await this.invitationRepository.save(newInvitation);
    } catch (error: any) {
      this.logger.error('Failed to create invitation', error.stack);
      throw error;
    }
  }

  /**
   * Retrieves all invitation records from the database
   * @returns An array of Invitation entities
   */
  async findAll(): Promise<Invitation[]> {
    try {
      return await this.invitationRepository.find({
        relations: ['user'],
      });
    } catch (error: any) {
      this.logger.error('Failed to fetch invitations', error.stack);
      throw error;
    }
  }

  /**
   * Retrieves a single invitation record by its ID
   * @param id - The ID of the invitation to retrieve
   * @returns The Invitation entity, if found
   */
  async findOne(id: number): Promise<Invitation> {
    try {
      const invitation = await this.invitationRepository.findOne({
        where: { id },
        relations: ['user'],
      });
      if (!invitation) {
        throw new Error(`Invitation with id: ${id} not found`);
      }
      return invitation;
    } catch (error: any) {
      this.logger.error('Failed to fetch invitation', error.stack);
      throw error;
    }
  }
}
