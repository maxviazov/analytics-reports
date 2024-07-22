import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
  private readonly logger = new Logger(ClientsService.name);

  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  /**
   * Creates a new client.
   * @param createClientDto - The data transfer object containing client creation information.
   * @returns The created client.
   */
  async createClient(createClientDto: CreateClientDto): Promise<Client> {
    try {
      const newClient = this.clientRepository.create(createClientDto);
      return await this.clientRepository.save(newClient);
    } catch (error: any) {
      this.logger.error('Failed to create client', error.stack);
      throw error;
    }
  }

  /**
   * Retrieves all clients.
   * @returns A list of all clients.
   */
  async findAll(): Promise<Client[]> {
    try {
      return await this.clientRepository.find({
        relations: ['businessAccount'],
      });
    } catch (error: any) {
      this.logger.error('Failed to fetch clients', error.stack);
      throw error;
    }
  }

  /**
   * Retrieves a single client by ID.
   * @param id - The ID of the client to retrieve.
   * @returns The client with the specified ID.
   */
  async findOne(id: number): Promise<Client> {
    try {
      const client = await this.clientRepository.findOne({
        where: { id },
        relations: ['businessAccount'],
      });
      if (!client) {
        throw new Error(`Client with id: ${id} not found`);
      }
      return client;
    } catch (error: any) {
      this.logger.error('Failed to fetch client', error.stack);
      throw error;
    }
  }
}
