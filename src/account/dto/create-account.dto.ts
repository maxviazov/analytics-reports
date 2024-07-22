import { IsDate, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for creating an account
 */
export class CreateAccountDto {
  /**
   * Registration date of the account
   * @example '2024-07-20T00:00:00.000Z'
   */
  @ApiProperty({
    description: 'Registration date of the account',
    type: String,
    format: 'date-time',
    example: '2024-07-20T00:00:00.000Z',
  })
  @IsDate()
  registrationDate: Date;

  /**
   * Postponed date (if applicable)
   * @example '2024-08-01T00:00:00.000Z'
   */
  @ApiProperty({
    description: 'Postponed date (if applicable)',
    type: String,
    format: 'date-time',
    example: '2024-08-01T00:00:00.000Z',
  })
  @IsDate()
  postponedDate: Date;

  /**
   * Deletion date of the account (if applicable)
   * @example '2024-09-01T00:00:00.000Z'
   */
  @ApiProperty({
    description: 'Deletion date of the account (if applicable)',
    type: String,
    format: 'date-time',
    example: '2024-09-01T00:00:00.000Z',
  })
  @IsDate()
  deleteDate: Date;

  /**
   * Last sign-in date
   * @example '2024-07-20T10:00:00.000Z'
   */
  @ApiProperty({
    description: 'Last sign-in date',
    type: String,
    format: 'date-time',
    example: '2024-07-20T10:00:00.000Z',
  })
  @IsDate()
  signInDates: Date;

  /**
   * Name of the application used to register the account
   * @example 'MyApp'
   */
  @ApiProperty({
    description: 'Name of the application used to register the account',
    type: String,
    example: 'MyApp',
  })
  @IsString()
  app: string;

  /**
   * Sign-in method used for the account
   * @example 'email'
   */
  @ApiProperty({
    description: 'Sign-in method used for the account',
    type: String,
    example: 'email',
  })
  @IsString()
  signInMethod: string;

  /**
   * Invitations sent by the user
   * @example 'InvitationCode123'
   */
  @ApiProperty({
    description: 'Invitations sent by the user',
    type: String,
    example: 'InvitationCode123',
  })
  @IsString()
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
