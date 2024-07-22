import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';

/**
 * AccountsService handles the business logic for accounts, including creating and retrieving accounts.
 */
@Injectable()
export class AccountsService {
  private readonly logger = new Logger(AccountsService.name);

  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  /**
   * Creates a new account.
   * @param createAccountDto - Data Transfer Object for creating an account.
   * @returns A promise that resolves to the created Account.
   */
  async createAccount(createAccountDto: CreateAccountDto): Promise<Account> {
    try {
      const newAccount = this.accountRepository.create(createAccountDto);
      return await this.accountRepository.save(newAccount);
    } catch (error: any) {
      this.logger.error('Failed to create account', error.stack);
      throw error;
    }
  }

  /**
   * Retrieves all accounts.
   * @returns A promise that resolves to an array of Account entities.
   */
  async findAll(): Promise<Account[]> {
    try {
      return await this.accountRepository.find();
    } catch (error: any) {
      this.logger.error('Failed to fetch accounts', error.stack);
      throw error;
    }
  }

  /**
   * Retrieves an account by its ID.
   * @param id - The ID of the account to retrieve.
   * @returns A promise that resolves to the Account entity if found.
   * @throws An error if the account is not found or if there is a database error.
   */
  async findOne(id: number): Promise<Account> {
    try {
      const account = await this.accountRepository.findOne({ where: { id } });
      if (!account) {
        throw new Error(`Account with id: ${id} not found`);
      } else {
        return account;
      }
    } catch (error: any) {
      this.logger.error('Failed to fetch account', error.stack);
      throw error;
    }
  }
}
