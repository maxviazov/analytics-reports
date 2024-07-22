import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * Service for managing users
 */
@Injectable()
@ApiTags('users')
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  /**
   * Create a new user
   * @param createUserDto - Data Transfer Object containing user data
   * @returns The created user entity
   */
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log('Creating a new user');
    try {
      this.logger.log(
        `Creating user with data: ${JSON.stringify(createUserDto)}`,
      );
      const newUser = this.userRepository.create(createUserDto);
      return await this.userRepository.save(newUser);
    } catch (error: any) {
      this.logger.error('Failed to create user', error.stack);
      throw error;
    }
  }

  /**
   * Retrieve all users
   * @returns Array of user entities
   */
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all users.', type: [User] })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find({
        relations: ['account', 'location', 'onBoarding'],
      });
    } catch (error: any) {
      this.logger.error('Failed to fetch users', error.stack);
      throw error;
    }
  }

  /**
   * Retrieve a user by ID
   * @param id - The ID of the user
   * @returns The user entity if found
   */
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved the user.', type: User })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async findOne(id: number): Promise<User> {
    try {
      const searchedUser = await this.userRepository.findOne({
        where: { id: id },
        relations: ['account', 'location', 'onBoarding'],
      });
      if (!searchedUser) {
        throw new Error(`User with id: \`${id}\` not found`);
      }
      return searchedUser;
    } catch (error: any) {
      this.logger.error('Failed to fetch user', error.stack);
      throw error;
    }
  }
}
