import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BusinessCompany } from '../../business-company/entities/business-company.entity';
import { BusinessAccount } from '../../business-account/entities/business-account.entity';
import { Location } from '../../location/entities/location.entity';
import { JobPage } from '../../job-page/entities/job-page.entity';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Entity representing a Business Job
 */
@Entity('business_jobs')
export class BusinessJob {
  /**
   * Unique identifier for the business job
   * @example 1
   */
  @ApiProperty({
    description: 'Unique identifier for the business job',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The associated business company
   * @example { id: 1, name: 'Company Name' }
   */
  @ApiProperty({
    description: 'The associated business company',
    example: { id: 1, name: 'Company Name' },
  })
  @ManyToOne(() => BusinessCompany, (businessCompany) => businessCompany.id)
  @JoinColumn({ name: 'company_id' })
  company: BusinessCompany;

  /**
   * The associated business account
   * @example { id: 1, name: 'Business Account' }
   */
  @ApiProperty({
    description: 'The associated business account',
    example: { id: 1, name: 'Business Account' },
  })
  @ManyToOne(() => BusinessAccount, (businessAccount) => businessAccount.id)
  @JoinColumn({ name: 'business_account_id' })
  businessAccount: BusinessAccount;

  /**
   * The publish date of the job
   * @example '2024-07-20'
   */
  @ApiProperty({
    description: 'The publish date of the job',
    type: String,
    format: 'date',
    example: '2024-07-20',
  })
  @Column({ type: 'date' })
  publishDate: Date;

  /**
   * The location associated with the job
   * @example { id: 1, city: 'San Francisco' }
   */
  @ApiProperty({
    description: 'The location associated with the job',
    example: { id: 1, city: 'San Francisco' },
  })
  @ManyToOne(() => Location, (location) => location.id)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  /**
   * The job page associated with the job
   * @example { id: 1, name: 'Job Page' }
   */
  @ApiProperty({
    description: 'The job page associated with the job',
    example: { id: 1, name: 'Job Page' },
  })
  @ManyToOne(() => JobPage, (jobPage) => jobPage.id)
  @JoinColumn({ name: 'job_page_id' })
  jobPage: JobPage;

  /**
   * Indicates if the job is hiring
   * @example true
   */
  @ApiProperty({ description: 'Indicates if the job is hiring', example: true })
  @Column({ type: 'boolean' })
  hiring: boolean;

  /**
   * The date when the job became active (optional)
   * @example '2024-07-21'
   */
  @ApiProperty({
    description: 'The date when the job became active (optional)',
    type: String,
    format: 'date',
    example: '2024-07-21',
    required: false,
  })
  @Column({ type: 'date', nullable: true })
  jobActiveDate: Date;

  /**
   * The date when the job was paused (optional)
   * @example '2024-07-22'
   */
  @ApiProperty({
    description: 'The date when the job was paused (optional)',
    type: String,
    format: 'date',
    example: '2024-07-22',
    required: false,
  })
  @Column({ type: 'date', nullable: true })
  jobPausedDate: Date;

  /**
   * The date when the job was deleted (optional)
   * @example '2024-07-23'
   */
  @ApiProperty({
    description: 'The date when the job was deleted (optional)',
    type: String,
    format: 'date',
    example: '2024-07-23',
    required: false,
  })
  @Column({ type: 'date', nullable: true })
  jobDeletedDate: Date;

  /**
   * The associated user
   * @example { id: 1, name: 'User Name' }
   */
  @ApiProperty({
    description: 'The associated user',
    example: { id: 1, name: 'User Name' },
  })
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  constructor(
    id: number,
    company: BusinessCompany,
    businessAccount: BusinessAccount,
    publishDate: Date,
    location: Location,
    jobPage: JobPage,
    hiring: boolean,
    jobActiveDate: Date,
    jobPausedDate: Date,
    jobDeletedDate: Date,
    user: User,
  ) {
    this.id = id;
    this.company = company;
    this.businessAccount = businessAccount;
    this.publishDate = publishDate;
    this.location = location;
    this.jobPage = jobPage;
    this.hiring = hiring;
    this.jobActiveDate = jobActiveDate;
    this.jobPausedDate = jobPausedDate;
    this.jobDeletedDate = jobDeletedDate;
    this.user = user;
  }
}
