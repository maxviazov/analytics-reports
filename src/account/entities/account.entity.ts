import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Entity representing a user account in the system
 */
@Entity('account')
export class Account {
  /**
   * Unique identifier for the account
   * @example 1
   */
  @ApiProperty({
    description: 'Unique identifier for the account',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Registration date of the account
   * @example '2024-07-20'
   */
  @ApiProperty({
    description: 'Registration date of the account',
    type: String,
    format: 'date',
    example: '2024-07-20',
  })
  @Column({ type: 'date', nullable: true })
  registrationDate: Date;

  /**
   * Postponed date (if applicable)
   * @example '2024-08-01'
   */
  @ApiProperty({
    description: 'Postponed date (if applicable)',
    type: String,
    format: 'date',
    example: '2024-08-01',
  })
  @Column({ type: 'date', nullable: true })
  postponedDate: Date;

  /**
   * Deletion date of the account (if applicable)
   * @example '2024-09-01'
   */
  @ApiProperty({
    description: 'Deletion date of the account (if applicable)',
    type: String,
    format: 'date',
    example: '2024-09-01',
  })
  @Column({ type: 'date', nullable: true })
  deleteDate: Date;

  /**
   * Last sign-in date
   * @example '2024-07-20'
   */
  @ApiProperty({
    description: 'Last sign-in date',
    type: String,
    format: 'date',
    example: '2024-07-20',
  })
  @Column({ type: 'date', nullable: true })
  signInDates: Date;

  /**
   * Name of the application used to register the account
   * @example 'MyApp'
   */
  @ApiProperty({
    description: 'Name of the application used to register the account',
    example: 'MyApp',
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  app: string;

  /**
   * Sign-in method used for the account
   * @example 'email'
   */
  @ApiProperty({
    description: 'Sign-in method used for the account',
    example: 'email',
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  signInMethod: string;

  /**
   * Invitations sent by the user
   * @example 'invite1, invite2'
   */
  @ApiProperty({
    description: 'Invitations sent by the user',
    example: 'invite1, invite2',
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  userInvitations: string;

  constructor(
    registrationDate: Date,
    postponedDate: Date,
    deleteDate: Date,
    signInDates: Date,
    app: string,
    signInMethod: string,
    userInvitations: string,
  ) {
    this.registrationDate = registrationDate;
    this.postponedDate = postponedDate;
    this.deleteDate = deleteDate;
    this.signInDates = signInDates;
    this.app = app;
    this.signInMethod = signInMethod;
    this.userInvitations = userInvitations;
  }
}
