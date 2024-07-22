import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from '../../account/entities/account.entity';
import { Onboarding } from '../../onboarding/entities/onboarding.entity';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Entity representing a business account
 */
@Entity('business_account')
export class BusinessAccount {
  /**
   * Primary key for the business account entity
   * @example 1
   */
  @ApiProperty({
    description: 'Primary key for the business account entity',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Relation to the account entity
   * @example { id: 1, name: 'Account Name' }
   */
  @ApiProperty({
    description: 'Relation to the account entity',
    example: { id: 1, name: 'Account Name' },
  })
  @ManyToOne(() => Account, (account) => account.id)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  /**
   * Relation to the onboarding entity
   * @example { id: 1, stepsCompleted: 5 }
   */
  @ApiProperty({
    description: 'Relation to the onboarding entity',
    example: { id: 1, stepsCompleted: 5 },
  })
  @ManyToOne(() => Onboarding, (onboarding) => onboarding.id)
  @JoinColumn({ name: 'onboarding_id' })
  onboarding: Onboarding;

  /**
   * Name of the business
   * @example 'My Business'
   */
  @ApiProperty({
    description: 'Name of the business',
    example: 'My Business',
  })
  @Column({ type: 'varchar', length: 255 })
  businessName: string;

  /**
   * Type of the business
   * @example 'Retail'
   */
  @ApiProperty({
    description: 'Type of the business',
    example: 'Retail',
  })
  @Column({ type: 'varchar', length: 255 })
  businessType: string;

  /**
   * Date when the business account was created
   * @example '2024-07-20T00:00:00.000Z'
   */
  @ApiProperty({
    description: 'Date when the business account was created',
    type: String,
    format: 'date-time',
    example: '2024-07-20T00:00:00.000Z',
  })
  @Column({ type: 'date', nullable: true })
  createdAt: Date;

  /**
   * Date when the business account was last updated
   * @example '2024-07-21T00:00:00.000Z'
   */
  @ApiProperty({
    description: 'Date when the business account was last updated',
    type: String,
    format: 'date-time',
    example: '2024-07-21T00:00:00.000Z',
  })
  @Column({ type: 'date', nullable: true })
  updatedAt: Date;

  constructor(
    account: Account,
    onboarding: Onboarding,
    businessName: string,
    businessType: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.account = account;
    this.onboarding = onboarding;
    this.businessName = businessName;
    this.businessType = businessType;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
