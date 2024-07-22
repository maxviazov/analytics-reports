import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BusinessAccount } from '../../business-account/entities/business-account.entity';
import { Location } from '../../location/entities/location.entity';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Entity representing a business company
 */
@Entity('business_companies')
export class BusinessCompany {
  /**
   * Primary key ID of the business company
   */
  @ApiProperty({
    description: 'Primary key ID of the business company',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Reference to the associated business account
   */
  @ApiProperty({
    description: 'Reference to the associated business account',
    example: { id: 1, businessName: 'My Business' },
  })
  @ManyToOne(() => BusinessAccount, (businessAccount) => businessAccount.id)
  @JoinColumn({ name: 'business_account_id' })
  businessAccount: BusinessAccount;

  /**
   * The date the business company was created
   */
  @ApiProperty({
    description: 'The date the business company was created',
    type: String,
    format: 'date',
    example: '2024-07-20',
  })
  @Column({ type: 'date' })
  createDate: Date;

  /**
   * The date the business company was last updated
   */
  @ApiProperty({
    description: 'The date the business company was last updated',
    type: String,
    format: 'date',
    example: '2024-07-21',
  })
  @Column({ type: 'date' })
  updateDate: Date;

  /**
   * Reference to the associated location
   */
  @ApiProperty({
    description: 'Reference to the associated location',
    example: { id: 1, city: 'San Francisco' },
  })
  @ManyToOne(() => Location, (location) => location.id)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  /**
   * The type of the business company
   */
  @ApiProperty({
    description: 'The type of the business company',
    example: 'Retail',
  })
  @Column({ type: 'varchar', length: 255 })
  type: string;

  /**
   * The number of views on the company page
   */
  @ApiProperty({
    description: 'The number of views on the company page',
    example: 100,
  })
  @Column({ type: 'int' })
  companyPageViews: number;

  /**
   * The date the business became active (if applicable)
   */
  @ApiProperty({
    description: 'The date the business became active (if applicable)',
    type: String,
    format: 'date',
    example: '2024-08-01',
    required: false,
  })
  @Column({ type: 'date', nullable: true })
  businessActiveDate: Date;

  /**
   * The date the business was paused (if applicable)
   */
  @ApiProperty({
    description: 'The date the business was paused (if applicable)',
    type: String,
    format: 'date',
    example: '2024-09-01',
    required: false,
  })
  @Column({ type: 'date', nullable: true })
  businessPausedDate: Date;

  /**
   * The date the business was deleted (if applicable)
   */
  @ApiProperty({
    description: 'The date the business was deleted (if applicable)',
    type: String,
    format: 'date',
    example: '2024-10-01',
    required: false,
  })
  @Column({ type: 'date', nullable: true })
  businessDeletedDate: Date;

  /**
   * Reference to the associated user
   */
  @ApiProperty({
    description: 'Reference to the associated user',
    example: { id: 1, name: 'John Doe' },
  })
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  constructor(
    businessAccount: BusinessAccount,
    createDate: Date,
    updateDate: Date,
    location: Location,
    type: string,
    companyPageViews: number,
    businessActiveDate: Date,
    businessPausedDate: Date,
    businessDeletedDate: Date,
    user: User,
  ) {
    this.businessAccount = businessAccount;
    this.createDate = createDate;
    this.updateDate = updateDate;
    this.location = location;
    this.type = type;
    this.companyPageViews = companyPageViews;
    this.businessActiveDate = businessActiveDate;
    this.businessPausedDate = businessPausedDate;
    this.businessDeletedDate = businessDeletedDate;
    this.user = user;
  }
}
